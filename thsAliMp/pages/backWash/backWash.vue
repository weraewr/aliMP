<template>
	<view>
		<!-- <view class="tit">打开同花顺APP</view> -->
		
		<view class="logoWrap">
			<image class="thsLogo" src="../../static/ths.png"></image>
		</view>
		
		<view class="btnWrap">
			<view class="btn">
				立即打开
			</view>
			<button class="jumpService" send-message-title="同花顺" :send-message-img="shareUrl" open-type="contact" show-message-card="true" session-from="weapp">立即行动</button>
		</view>
		
		<view class="stepWrap">
			<view class="stepItem">
				<view class="num">1</view>
				<view class="text">发送卡片</view>
			</view>
			<view class="stepLine"></view>
			<view class="stepItem">
				<view class="num">2</view>
				<view class="text">点击打开链接</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shareUrl: 'https://s.thsi.cn/js/m/ozoneactivity/2020-q1/mphq/images/mpGuide1.png'
			};
		},
		onLoad(opt) {
			// uni.showShareMenu({
			//   withShareTicket: true
			// });
		},
		onShareAppMessage: function( options ){
		　　let that = this;
		　　// 设置菜单中的转发按钮触发转发事件时的转发内容
			let url = '/pages/backWash/backWash'
		　　let shareObj = {
				path: `/pages/index/index?url=${url}`
		　　};
		　　return shareObj;
		}
	}
</script>

<style lang="less">
	.tit {
		margin: 32rpx;
		font-size: 34rpx;
		font-weight: bold;
	}
	
	.logoWrap {
		display: flex;
		justify-content: center;
		padding: 80rpx 0 110rpx;
		.thsLogo {
			width: 200rpx;
			height: 282rpx;
		}
	}
	
	.btnWrap {
		height: 88rpx;
		width: 684rpx;
		position: relative;
		margin: 0 auto;
		box-sizing: border-box;
		.btn {
			position: absolute;
			top: 0;
			left: 0;
			height: 88rpx;
			width: 100%;
			background: linear-gradient(left, #F26312, #E93030);
			text-align: center;
			line-height: 88rpx;
			border-radius: 44rpx;
			font-size: 26rpx;
			color: #fff;
			z-index: 1;
		}
		.jumpService {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 5;
			height: 100%;
			width: 100%;
			color: transparent;
			height: 88rpx;
			padding: 0;
			background-color: transparent;
			&::after{
				border: none;
			}
		}
	}
	
	.stepWrap {
		margin: 100rpx 32rpx;
		.stepItem {
			height: 40rpx;
			display: flex;
			align-items: center;
			.num {
				height: 32rpx;
				width: 32rpx;
				background-color: #CCCCCC;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				color: #FFFFFF;
				margin-right: 16rpx;
				border-radius: 50%;
			}
			.text {
				font-size: 28rpx;
			}
		}
		.stepLine {
			width: 1rpx;
			height: 56rpx;
			background-color: #EEEEEE;
			margin-left: 16rpx;
		}
	}
</style>
