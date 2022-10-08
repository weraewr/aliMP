<template>
	<view @click="changePopUpState(1)">
		<cover-view class="popUpWrap" v-if="showPop">
			<cover-view class="userWrap" @click.stop v-if="popUpType == 'userInfo'">
				<view class="content">
					<cover-view class="userName item">{{loginInfo.account}}</cover-view>
					<cover-view class="btn_one_wrap">
						<image class="btn_one item" src="../../static/popUpBtn.png" @click="exitLogin"></image>
						<view class="text" @click="exitLogin">退出登录</view>
					</cover-view>
				</view>
				<view class="headWrap">
					<image class="headBg" src="../../static/headBg.png"></image>
					<image class="headIcon" v-if="headUrl" :src="headUrl"></image>
				</view>
			</cover-view>
		</cover-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		props: ['showPop','popUpType'],
		data() {
			return {
				shareUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1002883910,489905458&fm=26&gp=0.jpg'
			};
		},
		computed: {
			...mapState(['loginInfo', 'headUrl']),
		},
		methods: {
			changePopUpState(type, data) {
				this.$emit('changePopUpState', type, data);
			},
			exitLogin() {
				this.$emit('exitLogin')
			},
			jump() {
				uni.navigateTo({
					url: '../../pages/bindphonenum/bindphonenum'
				});
			}
		}
	}
</script>

<style lang="less">
	.popUpWrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2000;
		background-color: rgba(0, 0, 0, 0.4);

		.userWrap {
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: 2000;
			transform: translate(-50%, -50%);
			width: 560rpx;
			height: 426rpx;
			border-radius: 0 0 16rpx 16rpx;
			background-color: transparent;

			.headWrap {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 128rpx;
				z-index: 2010;
				border-radius: 16rpx 16rpx 0 0;
				margin-bottom: -16rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.headIcon {
					width: 112rpx;
					height: 112rpx;
					border-radius: 50%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					z-index: 2013;
				}
				
				.headBg {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-size: 100% 100%;
					background-repeat: no-repeat;
					z-index: 2011;
				}
			}

			.content {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 314rpx;
				padding-top: 16rpx;
				background-color: #fff;
				border-radius: 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.item {
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
				}

				.userName {
					padding: 0 20rpx;
					font-size: 40rpx;
					border: 1px solid transparent;
				}

				.btn_one_wrap {
					position: relative;
					width: 464rpx;
					height: 88rpx;
					border-radius: 44rpx;
					font-size: 30rpx;
					color: #f00;
					text-align: center;
					line-height: 88rpx;

					.text {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						font-size: 30rpx;
						color: #fff;
						background-color: transparent;
					}
				}
			}
		}
	}
</style>
