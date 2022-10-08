<template>
	<view class="bindWrap">
		<view class="itemWrap">
			<view class="tit">手机号</view>
			<view class="inputWrap">
				<input type="number" :focus="true" maxlength="11" @input="phoneHandleInput($event)" v-model="phoneNum" placeholder="请输入手机号">
				<image class="close" @click="clearPhoneNum" src="../../static/phone_close.png" v-show="phoneNum.length > 0"></image>
			</view>
		</view>
		<view class="itemWrap">
			<view class="tit">验证码</view>
			<view class="inputWrap">
				<input type="number" maxlength="6" @input="verifyHandleInput($event)" v-model="verify" placeholder="请输入验证码">
				<view class="getCode" v-if="verifyCodeTime == 60" @click="getCode">获取验证码</view>
				<view class="send" v-else>{{verifyCodeTime + '秒后重发'}}</view>
			</view>
		</view>
		<view class="errorInfo">{{error_msg}}</view>
		<view class="bindBtn" :class="{active: active}" @click="bind">登录</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import { hxmClickStat } from '../../utils/stat.js'
	import RSA from '../../static/lib/wxapp_rsa.js'
	import func from '../../static/lib/tool.js'
	import api from '../../http/api.js'
	export default {
		data() {
			return {
				phoneNum: '',
				verify: '',
				countTimer: null, //倒计时定时器
				error_msg: '', //错误信息
				bindLock: false, //请求锁
				publicKey: '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCO7fhk4du6g+BC9xaAlebmgVa4qO9X0P1/STxydiIeaLDbZB1HqQ67659P2ZoKik4jYGJ0flM4Z1wQlaIRGOGM7LjkJusfXxaPa6x0zoMuVjJf1E2whHOInzu7KEqfEIptY9akd1LAv2yWuQT6TglYg/c0gpZMYugqLaDrwRUc6QIDAQAB-----END PUBLIC KEY-----',//加密公钥

			};
		},
		computed: {
			...mapState(['verifyCodeTime', 'timeStart','loginInfo']),
			active() {
				return this.phoneNumComplate && this.verifyCodeComplate;
			},
			phoneNumComplate() {
				// return this.phoneNum.replace(/[^\d]/g, "").length == 11;
				return this.phoneNum.replace(/[^\d]/g, "").length > 0;
			},
			verifyCodeComplate() {
				return this.verify.replace(/[^\d]/g, "").length == 6;
			}
		},
		methods: {
			phoneHandleInput(e) {
				this.phoneNum = e.target.value.replace(/[^\d]/g, "").slice(0, 11);
				// if (
				// 	!/^1[3456789]\d{9}$/.test(this.phoneNum) &&
				// 	this.phoneNum.length == 11
				// ) {
				// 	return (this.error_msg = "请输入正确的手机号");
				// } else {
				// 	if (this.error_msg) {
				// 		this.error_msg = "";
				// 	}
				// }
			},
			verifyHandleInput(e) {
				this.verify = e.target.value.replace(/[^\d]/g, "").slice(0, 6);
			},
			clearPhoneNum() {
				this.phoneNum = '';
				this.error_msg = '';
				this.phoneNum = '';
			},
			getCode() {
				if (this.phoneNumComplate && !this.error_msg && this.verifyCodeTime == 60) {
					//发送验证码
					this.encrptyPhoneNum();
					this.$store.commit("setVerifyCodeTime", 59);
					this.$store.commit("setTimeStart", +new Date());
					let diffTime;
					this.countTimer = setInterval(() => {
						diffTime = 59 - Math.floor((+new Date() - this.timeStart) / 1000);
						if (diffTime <= 0) {
							clearInterval(this.countTimer)
							this.$store.commit("setVerifyCodeTime", 60);
						} else {
							this.$store.commit("setVerifyCodeTime", diffTime);
						}
					}, 1000)
				} else if (!this.error_msg) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
				}
			},
			encrptyPhoneNum() {
				let that = this;
				let encrypt_rsa = new RSA.RSAKey();
				encrypt_rsa = RSA.KEYUTIL.getKey(this.publicKey);
				let encStr = encrypt_rsa.encrypt(this.phoneNum);
				encStr = RSA.hex2b64(encStr);
				uni.request({
					url: api.smsSend,
					method: 'POST',
					time: 3000,
					data: {
						mobile: encStr
					},
					success(res) {
						if(res.data.status_code == '0') {
							//验证码发送成功
							uni.showToast({
								title: '验证码发送成功',
								icon: 'success'
							})
						} else {
							uni.showToast({
								title: '验证码发送失败',
								icon: 'none'
							});
							that.resetVerifyState();
						}
					},
					fail(err) {
						console.log(err);
						uni.showToast({
							title: '验证码发送失败',
							icon: 'none'
						});
						that.resetVerifyState();
					}
				})
			},
			resetVerifyState() {
				this.$store.commit("setVerifyCodeTime", 60);
				clearInterval(this.countTimer);
				this.bindLock = false;
			},
			bind() {
				// 此处登录接口
				if (this.active && !this.error_msg && !this.bindLock) {
					uni.showLoading({
						title: '登录中...'
					})
					this.bindLock = true;
					let encrypt_rsa = new RSA.RSAKey();
					encrypt_rsa = RSA.KEYUTIL.getKey(this.publicKey);
					let mobile = encrypt_rsa.encrypt(this.phoneNum);
					mobile = RSA.hex2b64(mobile);
					let signcode = encrypt_rsa.encrypt(this.verify);
					signcode = RSA.hex2b64(signcode);
					let that = this;
					uni.request({
						url: api.smsCheck,
						method: 'POST',
						time: 3000,
						data: {
							mobile: mobile,
							signcode: signcode,
						},
						success(res) {
							uni.hideLoading();
							if(res.data.status_code == 0) {
								//登录成功
								let loginInfo = that.loginInfo;
								loginInfo.account = res.data.result.userName;
								loginInfo.userid = res.data.result.userId;
								loginInfo.expire = res.data.result.expire;
								loginInfo.sessionid = res.data.result.sessionid;
								uni.setStorageSync('loginInfo', JSON.stringify(loginInfo));
								that.$store.commit("setLoginInfo", loginInfo);
								uni.showToast({
									title: '登录成功',
									icon: 'success'
								})
								that.resetVerifyState();
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								}, 1000)
							} else {
								//登录失败
								uni.showToast({
									title: '请输入正确的验证码',
									icon: 'none'
								})
								that.bindLock = false;
								that.resetVerifyState();
							}
						},
						fail(err) {
							console.log(err);
							uni.hideLoading();
							uni.showToast({
								title: '出现异常，登录失败',
								icon: 'none'
							})
							that.bindLock = false;
							that.resetVerifyState();
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.bindWrap {
		.itemWrap {
			height: 96rpx;
			padding: 0 32rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30rpx;

			.tit {
				width: 162rpx;
			}

			.inputWrap {
				flex: 1;
				display: flex;

				input {
					flex: 1
				}

				.close {
					width: 42rpx;
					height: 42rpx;
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}

				.getCode {
					width: 150rpx;
					color: #4691EE;
				}

				.send {
					color: #eee;
				}
			}
		}

		.errorInfo {
			height: 40rpx;
			line-height: 40rpx;
			padding-left: 194rpx;
			color: #e93035;
			font-size: 24rpx;
		}

		.bindBtn {
			width: 686rpx;
			height: 88rpx;
			margin: 88rpx auto 0;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(left, #f8b089, #f49897);
			color: #fff;
			font-size: 30rpx;
			letter-spacing: 12rpx;
			border-radius: 44rpx;

			&.active {
				background: linear-gradient(left, #F26312, #E93030);
			}
		}
	}
</style>
