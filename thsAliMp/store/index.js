import Vue from 'vue'
import Vuex from 'vuex'
import httpHead from '../http/index.js'
import api from '../http/api.js'
import { hxmClickStat } from '../utils/stat.js'

Vue.use(Vuex)

let lock = false;//请求锁

const store = new Vuex.Store({
	state: {
		showGuidance: false,//是否显示添加引导
		iPhoneX: false,//是否是iPhoneX机型
		sysInfo: {},
		loginInfo: {
			account: '',
			isNew: '',
			maidian: '',
			token: '',
			userid: ''
		},
		platform: '',
		headUrl: 'https://u.thsi.cn/avatar/default/12_108_108.png',//头像地址
		verifyCodeTime: 60,
		timeStart: '',
		oldMarketMap: {
			"16": "hs",
			"17": "hs",
			"22": "hs",
			"32": "hs",
			"33": "hs",
			"176": "hk",
			"177": "hk",
			"178": "hk",
			"88": "usa",
			"169": "usa",
			"170": "usa",
			"185": "usa",
			"186": "usa",
			"129": "sb",
			"144": "sb",
			"145": "sb"
		},
		newMarketMap: {},
		scene: 0 ,// 场景值
		appFlag: false // 回跳App的flag值
	},
	mutations: {
		setiPhoneX(state, type) {
			state.iPhoneX = type;
		},
		setShowGuidance(state, type) {
			state.showGuidance = type;
		},
		setSysInfo(state, obj) {
			state.sysInfo = obj;
		},
		setLoginInfo(state, obj) {
			for (let item in obj) {
				state.loginInfo[item] = obj[item];
			}
		},
		setPlatform(state, type) {
			state.platform = type;
		},
		setVerifyCodeTime(state, time) {
			state.verifyCodeTime = time;
		},
		setTimeStart(state, date) {
			state.timeStart = date;
		},
		setMarkMap(state, data) {
			state.newMarketMap = data;
		},
		setHeadUrl(state, url) {
			//加时间戳，是为了解决头像图片缓存导致不更新问题
			state.headUrl = url + '?ts=' + new Date().getTime();
		},
		setScene(state, value) {
			state.scene = value;
		},
		setFlag(state, flag) {
			state.appFlag = flag;
		}
	},
	getters: {
		getLoginInfo(state) {
			return state.loginInfo
		}
	},
	actions: {
		getToken(ctx,payload) {
			if(lock) {
				return;
			}
			lock = true;
			return new Promise(function(resolve, reject) {
				
				uni.login({
					success(res) {
						uni.request({
							url: api.getOpenidAndSessionKey,
							data: {
								code: res.code
							},
							method: 'POST',
							time: 3000,
							success(res) {
								if(res.data.status_code == 0) {
									//请求成功,拿到token和maidian 存入storage中，以便下次查询使用
									let resData = {
										token: res.data.result.token,
										maidian: res.data.result.maidian,
									}
									if(res.data.result.account) {
										resData.account = res.data.result.account;
									}
									if(res.data.result.userid) {
										resData.userid = res.data.result.userid;
									}
									uni.setStorageSync('loginInfo', JSON.stringify(resData));
									ctx.commit("setLoginInfo", resData);
									resolve();
								} else {
									if(payload.first) {
										uni.showToast({
											title: "获取登录信息失败，请稍后再试",
											icon: 'none'
										})
									}
									reject();
								}
								lock = false;
							},
							fail(err) {
								lock = false;
								console.log(err);
								if(payload.first) {
									uni.showToast({
										title: "获取登录信息失败，请稍后再试",
										icon: 'none'
									})
								}
								reject();
							}
						})
					},
					fail(err) {
						lock = false;
						console.log(err)
						uni.showToast({
							title: "获取登录信息失败，请稍后再试",
							icon: 'none'
						})
						reject();
					}
				})
			});
		},
		getMarketMap: function(ctx) {
			uni.request({
				url: api.readPinYin,
				method: 'GET',
				time: 3000,
				success: function(res) {
					if (res.data.length > 0) {
						ctx.commit('setMarkMap', Object.assign({}, ...res.data))
					}
				}
			})
		},
		loginComplate: function(ctx, payload) {
			if(lock) {
				return;
			}
			lock = true;
			uni.showLoading({
				title: '登录中...'
			})
			let that = this;
			uni.request({
				method: 'POST',
				url: api.authorizeTel,
				time: 3000,
				data: {
					token: that.getters.getLoginInfo.token,
					iv: payload.data.iv,
					encryedData: payload.data.encryptedData
				},
				success(res) {
					lock = false;
					uni.hideLoading();
					if (res.data.status_code == 0) {
						//请求成功,得到account isNew
						let loginInfo = that.getters.getLoginInfo;
						loginInfo.account = res.data.result.account;
						loginInfo.isNew = res.data.result.isNew;
						if(res.data.result.userid) {
							loginInfo.userid = res.data.result.userid;
						}
						uni.setStorageSync('loginInfo', JSON.stringify(loginInfo));
						ctx.commit("setLoginInfo", loginInfo);
						hxmClickStat('yijianlogin', {
							is_new: res.data.result.isNew,
							user_id: res.data.result.userid
						});
						uni.showToast({
							title: '登录成功',
							icon: 'success'
						})
					} else {
						uni.showToast({
							title: '登录失败，请稍候再试',
							icon: 'none'
						})
					}
				},
				fail(err) {
					lock = false;
					console.log(err);
					uni.hideLoading();
					uni.showToast({
						title: '登录失败，请稍候再试',
						icon: 'none'
					})
				}
			})
		},
		promiseLogin: function(ctx, payload) {
			let that = this;
			if(lock) {
				return;
			}
			lock = true;
			return new Promise(function(resolve, reject) {
				uni.showLoading({
					title: '登录中...'
				})
				uni.request({
					method: 'POST',
					url: api.authorizeTel,
					time: 3000,
					data: {
						token: that.getters.getLoginInfo.token,
						iv: payload.data.iv,
						encryedData: payload.data.encryptedData
					},
					success(res) {
						lock = false;
						uni.hideLoading();
						if (res.data.status_code == 0) {
							//请求成功,得到account isNew
							let loginInfo = that.getters.getLoginInfo;
							loginInfo.account = res.data.result.account;
							loginInfo.isNew = res.data.result.isNew;
							if(res.data.result.userid) {
								loginInfo.userid = res.data.result.userid;
							}
							uni.setStorageSync('loginInfo', JSON.stringify(loginInfo));
							ctx.commit("setLoginInfo", loginInfo);
							uni.showToast({
								title: '登录成功',
								icon: 'success'
							})
							resolve();
						} else {
							uni.showToast({
								title: '登录失败，请稍候再试',
								icon: 'none'
							})
							reject();
						}
					},
					fail(err) {
						lock = false;
						console.log(err);
						uni.hideLoading();
						uni.showToast({
							title: '登录失败，请稍候再试',
							icon: 'none'
						})
						reject();
					}
				})
			});
		},
		exitLogin: function(ctx, payload) {
			if(lock) {
				return;
			}
			lock = true;
			uni.showLoading({
				title: '退出登录中...'
			})
			let that = this;
			uni.request({
				method: 'POST',
				url: api.loginOut,
				time: 3000,
				data: {
					token: that.getters.getLoginInfo.token
				},
				success(res) {
					lock = false;
					uni.hideLoading();
					if (res.data.status_code == 0) {
						//请求成功,得到account isNew
						let loginInfo = that.getters.getLoginInfo;
						loginInfo.account = '';
						loginInfo.isNew = '';
						uni.setStorageSync('loginInfo', JSON.stringify(loginInfo));
						ctx.commit("setLoginInfo", loginInfo);
						uni.showToast({
							title: '退出登录成功',
							icon: 'success'
						})
					} else {
						uni.showToast({
							title: '退出登录失败，请稍候再试',
							icon: 'none'
						})
					}
				},
				fail(err) {
					lock = false;
					console.log(err);
					uni.hideLoading();
					uni.showToast({
						title: '退出登录失败，请稍候再试',
						icon: 'none'
					})
				}
			})
		}
	}
})

export default store
