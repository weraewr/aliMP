<template>
	<view class="navWrap">
		<!-- 自定义标题栏部分 -->
		<cover-view class="navBar">
			<cover-view class="contentWrap">
				<cover-view class="leftContent">
					<cover-view v-if="loginInfo.account"><!-- 已登录账号头像 -->
						<image class="headBtn" :src="headUrl" v-if="headUrl" @click="itemClick(1)"></image>
					</cover-view>
					<cover-view class="login" v-else><!-- 未登录 -->
						<button id="btnLogin" :class="[platform == 'ios' ? 'ios' : '']" :style="{backgroundColor: '#fff',color: '#000',fontSize: '30rpx'}" @click="bindphone">登录</button>
					</cover-view>
				</cover-view>
			</cover-view>
		</cover-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import { hxmPageStat, hxmClickStat } from '../../utils/stat.js';
	export default {
		props: ['navInfo', 'showAccount'],
		data() {
			return {
			};
		},
		mounted() {
		},
		computed: {
			...mapState(['sysInfo', 'loginInfo', 'platform', 'headUrl', 'showGuidance'])
		},
		methods: {
			showMenu() {
				this.$emit('showMenu');
			},
			bindphone(e) {
				hxmClickStat('free_mp_zfbhangqing.zfblogin');
				
				uni.navigateTo({
					url: '../../pages/bindphonenum/bindphonenum'
				});
			},
			itemClick(type) {
				this.$emit('itemClick', type);
			}
		}
	}
</script>

<style lang="less">
	.navBar {
		height: 80rpx;
		background-color: transparent;

		.contentWrap {
			.leftContent {
				height: 100%;
				display: flex;
				align-items: center;

				.headBtn {
					width: 64rpx;
					height: 64rpx;
					background-size: 100% 100%;
					background-repeat: no-repeat;
					border-radius: 50%;
				}

				.login {
					font-size: 30rpx;
					color: #000;
					min-width: 85rpx;
					
					#btnLogin {
						border: none;
					}
				}
			}
		}
	}
</style>
