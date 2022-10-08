<template>
	<view>
		<view class="textContent">
			<textarea maxlength="140" v-model="content" @input="inputHandler" auto-height="true"></textarea>
		</view>
		<view class="btn" :class="{active: inputComplete}" @click="submit">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			};
		},
		computed: {
			inputComplete() {
				return this.content.length > 0;
			}
		},
		methods: {
			inputHandler(e) {
				this.content = e.target.value;
			},
			submit() {
				if(Math.random() - 0.5 > 0) {
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					})
					this.content = '';
				} else {
					uni.showToast({
						title: '提交失败，请稍候再试',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.textContent {
		height: 240rpx;
		margin: 32rpx 32rpx 60rpx;
		border: 1px solid #999;
		border-radius: 16rpx;
		box-sizing: border-box;
		textarea {
			height: 100%;
			width: 666rpx;
			margin: 12rpx;
			box-sizing: border-box;
		}
	}
	.btn {
		margin: 0 32rpx;
		height: 88rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(left, #999, #666);
		color: #fff;
		font-size: 30rpx;
		letter-spacing: 12rpx;
		border-radius: 44rpx;
		&.active {
			background: linear-gradient(left, #F26312, #E93030);
		}
	}
</style>
