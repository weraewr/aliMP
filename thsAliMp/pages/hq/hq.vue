<template>
	<view>
		<view>
			<web-view id="web-view1" :src="webSrc" @message="onmessage"></web-view>
		</view>
		<!-- <cover-view class="btmWrap" :class="[iPhoneX ? 'iPhoneX' : '']">
			<cover-view class="deal" @click="jumpBackWash">
				<cover-image class="bgBtn" src="../../static/jyBtn.png"></cover-image>
				<cover-view class="text">交易</cover-view>
			</cover-view>
			<cover-view v-if="!isIndex">
				<cover-view class="zx item" @click="optionChange">
					<cover-image class="icon" :src="optionIcon"></cover-image>
					<cover-view class="text">自选</cover-view>
					<button id="btnLogin" v-if="!loginInfo.account" :style="{backgroundColor: 'transparent', color: 'transparent'}" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhone">登录</button>
				</cover-view>
			</cover-view>
			<cover-view class="share item">
				<cover-image class="icon" src="../../static/share.png"></cover-image>
				<cover-view class="text">分享</cover-view>
				<button class="transBtn" open-type="share">分享</button>
			</cover-view>
		</cover-view>
		<cover-view class="backWashWrap" v-show="canOpenApp">
			<cover-image class="bgBtn" src="../../static/jyBtn.png"></cover-image>
			<cover-view class="text">返回APP<cover-image class="rightArrow" src="../../static/arrows_white.png"></cover-image></cover-view>
			<button class="transBtn" open-type="launchApp" :app-parameter="backwashInfo" @launchapp="launchAppSuccess" @error="launchAppError">返回APP</button>
		</cover-view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import api from '../../http/api.js';
	import { hxmClickStat } from '../../utils/stat.js';
	export default {
		data() {
			return {
				webSrc: '',
				isOption: false,
				code: '',//股票代码
				name: '',//股票名称
				id: '',//股票市场id
				sharePath: '',//分享图片
				marketAndCode: '',
				popUpType: 'download',//弹窗类型
				optionIcon: '../../static/add.png',//自选图标
				optionText: '加自选',//自选文案
				showPop: true,
				isIndex: false,//是否是指数
				canOpenApp: false, // 能否打开app
				backwashInfo: '' // 回流需要带的参数
			};
		},
		onShow() {
			if(this.loginInfo.account) {
				this.checkOptional(this.code);
			}
			// this.showOpenApp();
		},
		onShareAppMessage: function( options ){
		　　let that = this;
		　　// 设置菜单中的转发按钮触发转发事件时的转发内容
			let url = `/pages/hq/hq`;
		　　let shareObj = {
		　　　　title: `${this.name}(${this.code})`,        // 默认是小程序的名称(可以写slogan等)
				path: `/pages/index/index?url=${url}&marketAndCode=${this.marketAndCode}&name=${this.name}&isIndex=${this.isIndex ? 1 : 2}&shareType=hq`
		　　};
		　　return shareObj;
		},
		onLoad(opt) {
			let {marketAndCode,name,isIndex} = opt;
			if(!marketAndCode || !name) {
				return;
			}
			if(isIndex) {
				this.isIndex = true;
			}
			this.name = name;
			this.code = marketAndCode.split('_')[1];
			this.id = marketAndCode.split('_')[2];
			this.marketAndCode = marketAndCode;
			if(this.platform == 'ios'){
				this.webSrc = 'https://ozone.10jqka.com.cn/tg_templates/doubleone/2020-q1/mphqForAli/index.html#code=' + marketAndCode + '&source=zfb';
				// this.webSrc = 'https://testm.10jqka.com.cn/tg_templates/doubleone/2020-q1/mphqForAli/index.html#code=' + marketAndCode + '&source=quark';
			} else {
				this.webSrc = 'https://ozone.10jqka.com.cn/tg_templates/doubleone/2020-q1/mphqForAli/indexA.html#code=' + marketAndCode + '&source=zfb';
				// this.webSrc = 'https://testm.10jqka.com.cn/tg_templates/doubleone/2020-q1/mphqForAli/indexA.html#code=' + marketAndCode + '&source=quark';
			}
			this.backwashInfo = `client.html?action=ymtz^webid=2205^marketid=${this.id}^stockcode=${this.code}^codelist=${this.code}^namelist=${this.name}^marketlist=${this.id}`;
			// uni.showShareMenu({
			//   withShareTicket: true
			// })
			this.webViewContext = my.createWebViewContext('web-view1');
			if(this.loginInfo.account) {
				this.checkOptional(this.code);
			}			
		},
		computed: {
			...mapState(['loginInfo', 'iPhoneX', 'scene', 'appFlag', 'platform'])
		},
		methods: {
			onmessage(e) {
				// 获取网页发过来的消息
				let data = e.detail;
				
				if(data.selfOperate) {
					// 自选股操作
					if(data.selfOperate === 'add') {
						// 添加自选股
						this.optionChange();
					} else if(data.selfOperate === 'del') {
						// 删除自选股
						this.optionChange();
					}
				} else if(data.getSelfStatus) {
					if(this.loginInfo.account) {
						this.checkOptional(this.code);
					}
				}
			},
			checkOptional(code) {
				let that = this;
				uni.request({
					url: api.checkIsOptionalStock,
					method: 'POST',
					time: 3000,
					data: {
						sessionidLogin: that.loginInfo.sessionid,
						userid: that.loginInfo.userid,
						code: code
					},
					success(res) {
						if(res.data.status_code == 0 && res.data.result) {
							//请求成功
							that.isOption = res.data.result.isOptional;
							if(that.isOption) {
								that.webViewContext.postMessage({selfStatus: 'del'});
								setTimeout(()=>{ // 针对安卓处理
									that.webViewContext.postMessage({selfStatus: 'del'});
								}, 1000)
								that.optionIcon = '../../static/del.png';
								that.optionText = '删自选'
							}
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			optionChange() {
				if(!this.loginInfo.account) {
					// 登录操作
					this.bindphone();
					return;
				}
				let that = this;
				let stateText = '';
				let resText = '';
				let url = '';
				let data = {
					sessionidLogin: this.loginInfo.sessionid,
					userid: this.loginInfo.userid,
					code: this.code
				};
				if(this.isOption) {
					stateText = '正在删除中...';
					resText = '删除'
					url = api.deleteOptionalStock;
					data.operation = 'delete';
				} else {
					stateText = '正在添加中...';
					resText = '添加'
					url = api.addOptionalStock;
					data.id = that.id;
					data.operation = 'add';
				}
				uni.showLoading({
					title: stateText
				})
				uni.request({
					url: url,
					data: data,
					method: 'POST',
					time: 3000,
					success(res) {
						uni.hideLoading();
						if(res.data.status_code == 0) {
							//请求成功
							// uni.showToast({
							// 	title: resText + '成功',
							// 	icon: that.isOptional ? 'none' : 'success'
							// })
							that.webViewContext.postMessage({selfOperateResult: resText+'成功'});
							
							that.isOption = !that.isOption
							if(that.isOption) {
								that.webViewContext.postMessage({selfStatus: 'del'});
								that.optionIcon = '../../static/del.png';
								that.optionText = '删自选'
							} else {
								that.webViewContext.postMessage({selfStatus: 'add'});
								that.optionIcon = '../../static/add.png';
								that.optionText = '加自选'
							}
						} else {
							// uni.showToast({
							// 	title: resText + '失败',
							// 	icon: 'none'
							// })
							that.webViewContext.postMessage({selfOperateResult: resText+'失败'});
						}
					},
					fail(err) {
						console.log(err)
						uni.hideLoading();
						// uni.showToast({
						// 	title: resText + '失败',
						// 	icon: 'none'
						// })
						that.webViewContext.postMessage({selfOperateResult: resText+'失败'});
					}
				})
			},
			bindphone() {				
				uni.navigateTo({
					url: '../bindphonenum/bindphonenum'
				});
			},
			jumpBackWash() {
				uni.navigateTo({
					url: '../backWash/backWash'
				})
			},
			changePopUpState(type, data) {
				if(type == 1) {
					this.showPop = false;
				}
			},
			showOpenApp() {
				let that = this;
				uni.getSystemInfo({
					success: function (res) {
						var version = res.SDKVersion;
						version = version.replace(/\./g, "")
						if(version < 251) {
							that.canOpenApp = that.canOpenAppLow();
						} else {
							that.canOpenApp = that.canOpenAppHeigh();
						}
					},
				})
			},
			canOpenAppLow() {
				if(this.scene == 1069) {
					return true;
				} else {
					if(this.scene == 1036) {
						this.$store.commit('setFlag', true);
						return true;
					} else {
						if(this.scene == 1089 || this.scene == 1090 || this.scene == 1038) {
							if(this.appFlag) {
								return true;
							} else {
								return false;
							}
						} else {
							this.$store.commit('setFlag', false);
							return false;
						}
					}
				}
			},
			canOpenAppHeigh() {
				if(this.scene == 1069 || this.scene == 1036) {
					this.$store.commit('setFlag', true);
					return true;
				} else {
					if(this.scene == 1089 || this.scene == 1090 || this.scene == 1038) {
						if(this.appFlag) {
							return true;
						} else {
							return false;
						}
					} else {
						this.$store.commit('setFlag', false);
						return false;
					}
				}
			},
			launchAppSuccess(e) {
				console.log('success', e)
				hxmClickStat('backApp');
			},
			launchAppError(e) {
				console.log('error', e)
				hxmClickStat('backApp');
				this.jumpBackWash()
			}
		}
	}
</script>

<style lang="less">
	.btmWrap {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 98rpx;
		background-color: #FFFFFF;
		z-index: 99;
		display: flex;
		align-items: center;
		padding: 0 32rpx;
		box-sizing: border-box;
		&.iPhoneX {
			height: 156rpx;
			padding: 0 32rpx 58rpx;
		}
		.deal {
			width: 206rpx;
			height: 72rpx;
			border-radius: 36rpx;
			color: #FFFFFF;
			font-size: 30rpx;
			margin-right: 60rpx;
			position: relative;
			overflow: hidden;
			.text {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			.btnBg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
		}
		
		.item {
			height: 72rpx;
			width: 75rpx;
			position: relative;
			margin: 0 80rpx;
			.icon {
				width: 30rpx;
				height: 30rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				position: absolute;
				top: 5rpx;
				left: 50%;
				transform: translateX(-50%);
			}
			.text {
				font-size: 20rpx;
				position: absolute;
				bottom: 5rpx;
				left: 50%;
				transform: translateX(-50%);
			}
			#idLogin {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
			}
			.transBtn {
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: transparent;
				z-index: 2;
				color: transparent;
			}
		}
	}
	
	.backWashWrap {
		position: fixed;
		bottom: 14%;
		right: -4%;
		width: 188rpx;
		height: 64rpx;
		border-radius: 32rpx;
		color: #FFFFFF;
		font-size: 24rpx;
		overflow: hidden;
		.text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-60%, -50%);
			.rightArrow {
				display: inline-block;
				width: 15rpx;
				margin-left: 8rpx;
				vertical-align: middle;
				position: relative;
				top: -1rpx;
			}
		}
		.btnBg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
		.transBtn {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: transparent;
			z-index: 2;
			color: transparent;
		}
	}
</style>
