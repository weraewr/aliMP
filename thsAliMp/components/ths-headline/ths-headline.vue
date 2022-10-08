<template>
	<view>
		<view class="contentWrap" :class="{'show': !showState}">
			<view class="topWrap" @tap="change">
				<image class="headIcon" src="../../static/THSlogo.png"></image>
				<view class="centerWrap">
					<swiper v-if="showState" class="swiper" :disable-touch="true" :touchable="false" circular :autoplay="true"
					 :vertical="true" :interval="interval" :duration="duration">
						<swiper-item v-for="item in newsList" :key="item.seq">
							<text>{{item.title}}</text>
						</swiper-item>
					</swiper>
					<view v-else class="newDate">
						<text>更新时间{{upDate}}</text>
					</view>
				</view>
				<view class="icon">
					<image class="up" src="../../static/arrows_hz.png" v-if="!showState"></image>
					<image class="down" src="../../static/arrows_hz.png" v-if="showState"></image>
				</view>
			</view>
			<view class="infoWrap" v-if="!showState">
				<view class="item" v-for="(item, index) in newsList" :key="item.seq" @click="jumpNews(item)">
					<text class="serial">{{index + 1}}</text>
					<text class="content">{{item.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { hxmClickStat } from '../../utils/stat.js'
	export default {
		props: ['newsList', 'upDate'],
		data() {
			return {
				interval: 2500,
				duration: 500,
				showState: true,
				lock: false
			};
		},
		methods: {
			change() {
				this.showState = !this.showState;
				
				if(this.showState) {
					// 展开
					hxmClickStat('free_mp_zfbhangqing.zfbtoutiao.less')
				} else {
					// 收起
					hxmClickStat('free_mp_zfbhangqing.zfbtoutiao.more')
				}
			},
			jumpNews(data) {
				if(this.lock){
					return;
				}
				this.lock = true;
				
				uni.navigateTo({
				  url: `/pages/article/article?seq=${data.seq}`
				});
				
				setTimeout(()=>{
					this.lock = false;
				}, 1500);
			}
		}
	}
</script>

<style lang="less" scoped>
	.contentWrap {
		font-family: "PingFang Medium", "PingFang SC", "Source Han Sans";
		box-shadow: 0 2rpx 8rpx 4rpx #F5F5F5;
		margin: 0 21rpx;
		border-radius: 16rpx;
		max-height: 96rpx;
		overflow: hidden;
		// transition: max-height 0.25s;
		
		&.show {
			display: flex;
			flex-direction: column;
			max-height: 500rpx;
			// transition: max-height 0.35s;
			padding-bottom: 30rpx
		}

		.topWrap {
			display: flex;
			width: 100%;
			height: 96rpx;
			justify-content: space-between;
			align-items: center;

			.headIcon {
				width: 156rpx;
				height: 28rpx;
				margin: 0 24rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}

			.centerWrap {
				width: 527rpx;
				height: 100%;
				padding-right: 16rpx;
				display: flex;
				align-items: center;

				.swiper {
					width: 100%;
					height: 100%;
					font-size: 28rpx;

					swiper-item {
						display: flex;
						align-items: center;

						text {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}

				.newDate {
					font-family: 'THS';
					display: flex;
					width: 100%;
					font-size: 24rpx;
					justify-content: flex-end;
					color: #999;
				}
			}

			.icon {
				height: 13rpx;
				width: 24rpx;
				margin-right: 24rpx;
				position: relative;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-repeat: no-repeat;
				}

				.up {
					transform: rotate(180deg);
				}
			}
		}
		.infoWrap {
			margin-top: 10rpx;
			.item {
				height: 60rpx;
				padding: 0 24rpx;
				display: flex;
				justify-content: start;
				.serial {
					font-family: 'THS';
					color: #999;
					margin-right: 24rpx;
				}
				.content {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 30rpx;
				}
			}
			.item:nth-child(1) {
				.serial {
					color: #E93030;
				}
			}
			.item:nth-child(2) {
				.serial {
					color: #E98630;
				}
			}
			.item:nth-child(3) {
				.serial {
					color: #E9B630;
				}
			}
		}
	}
</style>
