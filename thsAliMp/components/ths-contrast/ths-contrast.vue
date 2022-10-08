<template>
	<view class="wrap" v-if="fall && fall != '--' && rise && rise != '--'">
		<view class="contentWrap">
			<canvas id="contrast" :style="{width: c_w + 'px', height: c_h + 'px'}"></canvas>
		</view>
		<view class="textInfo" v-if="rise !== '' && fall !== ''">
			<view class="fallText">跌 {{fall}}家</view>
			<view class="riseText">涨 {{rise}}家</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['rise','fall'],
		data() {
			return {
				ctx: null,
				c_h: '',
				c_w: '',
				c_c: '',
				white_w: '',
				rise_width: '',
				fall_width: '',
			}
		},
		watch: {
			rise() {
				if(this.rise != '--') {
					this.getDescBox();
				}
			},
			fall() {
				if(this.fall != '--') {
					this.getDescBox();
				}
			}
		},
		mounted() {
			this.getDescBox();
		},
		methods: {
			getDescBox() {
				uni.createSelectorQuery().in(this).select('.contentWrap').boundingClientRect(result => {
					if (result && this.rise && this.fall && this.rise != '--' && this.rise != '--') {
						this.c_h = result.height;//canvas 高度
						this.c_w = result.width;//canvas 宽度
						this.c_c = result.width * 0.067;//中间灰条宽度
						this.white_w = this.c_c * 0.174;//空白宽度
						
						let rate = this.fall / (this.fall*1 + this.rise*1);
						if(rate < 0.05) {
							rate = 0.05;
						} else if(rate > 0.95) {
							rate = 0.95;
						}
						this.fall_width = Math.floor(rate * this.c_w * (1 - 0.067)) ;
						this.rise_width = this.c_w - this.c_c - this.fall_width;
						
						this.draw();
					} else if(result && !this.rise && !this.fall) {
						//处理空的情况
						// this.c_h = result.height;//canvas 高度
						// this.c_w = result.width;//canvas 宽度
						// this.c_c = result.width * 0.067;//中间灰条宽度
						// this.white_w = this.c_c * 0.174;//空白宽度
						// this.fall_width = Math.floor(0.5 * this.c_w * (1 - 0.067)) ;
						// this.rise_width = this.c_w - this.c_c - this.fall_width;
						// this.draw();
					} else {
						this.getDescBox();
					}
				}).exec();
			},
			draw() {
				//中间白隙占比 0.174 宽度占比0.067
				this.ctx = uni.createCanvasContext('contrast', this);
				let fallColor = this.ctx.createLinearGradient(0,0,this.fall_width,0);
				fallColor.addColorStop(0, '#69C311');
				fallColor.addColorStop(1, '#009900');
				this.ctx.arc(this.c_h / 2, this.c_h / 2, this.c_h / 2, Math.PI / 2 , -Math.PI /2, 0);
				this.ctx.moveTo(this.c_h / 2, 0);
				this.ctx.lineTo(this.fall_width, 0);
				this.ctx.lineTo(this.fall_width - this.white_w, this.c_h);
				this.ctx.lineTo(this.c_h / 2, this.c_h);
				this.ctx.setFillStyle(fallColor);
				this.ctx.fill();
				
				this.ctx.beginPath();
				this.ctx.moveTo(this.fall_width,0);
				this.ctx.lineTo(this.fall_width + this.white_w, 0);
				this.ctx.lineTo(this.fall_width, this.c_h);
				this.ctx.lineTo(this.fall_width - this.white_w, this.c_h);
				this.ctx.closePath();
				this.ctx.setFillStyle('#FFFFFF');
				this.ctx.fill();
				
				this.ctx.beginPath();
				this.ctx.moveTo(this.fall_width,this.c_h);
				this.ctx.lineTo(this.fall_width + this.white_w, 0);
				this.ctx.lineTo(this.fall_width + this.white_w + this.c_c, 0);
				this.ctx.lineTo(this.fall_width + this.c_c, this.c_h);
				this.ctx.closePath();
				this.ctx.setFillStyle('#666666');
				this.ctx.fill();
				
				this.ctx.beginPath();
				this.ctx.moveTo(this.fall_width + this.white_w + this.c_c, 0);
				this.ctx.lineTo(this.fall_width + this.white_w*2 + this.c_c, 0);
				this.ctx.lineTo(this.fall_width + this.white_w + this.c_c, this.c_h);
				this.ctx.lineTo(this.fall_width + this.c_c, this.c_h);
				this.ctx.closePath();
				this.ctx.setFillStyle('#FFFFFF');
				this.ctx.fill();
				
				this.ctx.beginPath();
				let riseColor = this.ctx.createLinearGradient(this.fall_width + this.white_w + this.c_c,0,this.c_w,0);
				riseColor.addColorStop(0, '#F26312');
				riseColor.addColorStop(1, '#E93030');
				this.ctx.setFillStyle(riseColor);
				this.ctx.arc(this.c_w - this.c_h / 2, this.c_h / 2, this.c_h / 2, 0 , Math.PI * 2, 1);
				this.ctx.fill()
				this.ctx.moveTo(this.c_w - this.c_h / 2, 0);
				this.ctx.lineTo(this.fall_width + this.white_w * 2 + this.c_c, 0);
				this.ctx.lineTo(this.fall_width + this.c_c + this.white_w,this.c_h);
				this.ctx.lineTo(this.c_w - this.c_h / 2, this.c_h)
				this.ctx.setFillStyle(riseColor);
				this.ctx.fill();
				this.ctx.draw();
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		margin: 0 32rpx;
	}
	.contentWrap {
		width: 100%;
		height: 14rpx;
		padding: 0;

		canvas {
			width: 100%;
			height: 100%;
		}
	}
	.textInfo {
		font-family: 'THS';
		display: flex;
		justify-content: space-between;
		font-size: 20rpx;
		padding-top: 8rpx;
		.fallText {
			color: #009900;
		}
		.riseText {
			color: #e93030;
		}
	}
</style>
