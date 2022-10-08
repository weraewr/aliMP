<template>
	<view class="optional">		
		<view class="searchWrap btn" @click="jumpSearch">
			<image class="searchIcon" src='../../static/search.png'></image>
			<text>搜股票名称/股票代码</text>
		</view>
		
		<view class="infoText" @click="jumpBackWash">
			当前只展示沪深A股自选数据
		</view>
		<ths-unify-list class="ths-list"
			:infoTit="infoTit" 
			:titText="titText" 
			:optionText="optionText" 
			:fixedTop="fixedTop" 
			:fixedType="1" 
			:listData="listData" 
			:isFixed="isTop" 
			:titArr="titArr" 
			:titDataType="titDataType"
			:colorKey="colorKey"
			 :listActive="listActive" 
			 :titShow="false" 
			 @sortData="sortData" 
			 :inverted="inverted"
			 @jump="jump"
			 :sortTypeStatus="sortTypeStatus">
		</ths-unify-list>
		<view class="btmBtn btn" v-if="!loginInfo.account">
			<!-- <view class="login" v-if="loginInfo.account" @click="jumpSearch">添加自选股</view> -->
			<view class="noLogin">
				<button id="btnLogin" :style="{backgroundColor: '#fff',color: '#000',fontSize: '30rpx'}" @click="bindphone"><text>登录同步自选股</text></button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	import qsort from '../../static/lib/sort.js'
	import checkData from '../../static/lib/checkData.js'
	import func from '../../static/lib/tool.js'
	import api from '../../http/api.js'
	import { hxmPageStat, hxmClickStat } from '../../utils/stat.js';
	export default {
		data() {
			return {
				fixedTop: '0',
				isTop: false,
				titText: '',
				optionText: [],
				titArr: ['newPrice', 'gain'],
				infoTit: ['最新价', '涨跌幅'],
				listActive: '1',
				titDataType: [0,1],
				colorKey: 'gain',
				listData: [],
				listScrollTop: '',//列表距离上顶部的距离
				listNowTop: '',//列表目前距离上顶部的距离
				inverted: false,
				nowKey: '',//记录当前的排序关键字
				healthData: {},//处理好的数据对象
				
				dataTimer: null,//更新数据定时器
				isShowNow: true,//是否在浏览当前页
				isUpdata: false,//是否立即更新数据
				sortTypeStatus: '2',//重置排序选项
				
				getNavInfo: {
					type:'optional',
					bgColor: '',
					title: '',
					iconImg: '/static/aiHua.png'
				},
			};
		},
		onPageScroll() {
			let that = this;
			const query = uni.createSelectorQuery()
			query.select('.ths-list').boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(function(res) {
				if (res[0].top <= that.sysInfo.rheight) {
					that.isTop = true;
					that.fixedTop = that.sysInfo.rheight + 'px';
				} else {
					if (that.isTop) {
						that.isTop = false;
					}
				}
				if(!that.listScrollTop) {
					that.listScrollTop = res[1].scrollTop + res[0].top;
				}
				that.listNowTop = res[0].top;
			})
		},
		computed: {
			...mapState(['oldMarketMap', 'newMarketMap','sysInfo','loginInfo']),
		},
		onShareAppMessage( options ) {
		　　let that = this;
		　　// 设置菜单中的转发按钮触发转发事件时的转发内容
		　　let shareObj = {
				path: `/pages/optional/optional`
		　　};
		　　return shareObj;
		},
		onLoad() {
			//设置导航栏
			this.setPageNav();
			// uni.showShareMenu({
			//   withShareTicket: true
			// })
			this.openDataTimer();
			uni.loadFontFace({
				family: 'THS',
				source: 'url("https://i.thsi.cn/m/fonts/THSMoneyfont-Medium.ttf")',
				success() {
				}
			})
			
			hxmPageStat('free_mp_zfbzixuan')
		},
		onShow() {
			this.getStoreLoginInfo();
			//设置正在浏览当前页
			if(this.loginInfo.account) {
				this.getOptionalStock()
			} else {
				this.listData = [];
				this.closeDataTimer();
			}
			this.isShowNow = true;
		},
		onHide() {
			this.isShowNow = false;
		},
		destroyed() {
			this.isShowNow = false;
		},
		methods: {
			setPageNav() {
				this.getNavInfo.bgColor = '#fff';
				this.getNavInfo.title = '同花顺自选股';
			},
			jumpBackWash() {
				uni.navigateTo({
					url: '../backWash/backWash'
				})
			},
			sortData(type, isUp) {
				if(this.listNowTop < 0) {
					uni.pageScrollTo({
						scrollTop: this.listScrollTop - this.sysInfo.rheight
					})
				}
				//重新计算健康数据
				this.healthData = checkData(this.listData, this.titArr)
				this.listData = qsort(this.healthData.dataArr, 0, this.healthData.dataArr.length, this.titArr[type - 1], !isUp).concat(this.healthData.errArr);
				this.inverted = !isUp;
				this.nowKey = this.titArr[type - 1];
			},
			jumpSearch() {
				hxmClickStat('free_mp_zfbzixuan.zfbsearch')
				
				uni.navigateTo({
					url: '../searchstock/searchstock'
				})
			},
			getOptionalStock() {
				let that = this;
				uni.request({
					url: api.searchOptionalStock,
					method: 'POST',
					time: 3000,
					data: {
						sessionidLogin: that.loginInfo.sessionid,
						userid: that.loginInfo.userid
					},
					success(res) {
						if(res.data.status_code == 0 && res.data.result.sharesInfoList) {
							let resData = JSON.parse(res.data.result.sharesInfoList);
							if(resData.length > 0) {
								//得到健康数据
								if(that.nowKey) {
									that.healthData = checkData(resData, that.titArr)
									//赋值 排好序的值 + 异常数据（比如停牌）
									that.listData = qsort(that.healthData.dataArr, 0, that.healthData.dataArr.length, that.nowKey, that.inverted).concat(that.healthData.errArr);
								} else {
									that.healthData = checkData(resData, that.titArr)
									//赋值 排好序的值 + 异常数据（比如停牌）
									that.listData = qsort(that.healthData.dataArr, 0, that.healthData.dataArr.length, that.titArr[1], that.inverted).concat(that.healthData.errArr);
								}
							}
						} else {
							that.listData = [];
						}
					},
					fail(err) {
						console.log(err)
						that.listData = [];
					}
				})
			},
			jump(data) {
				let marketAndCode
				if(JSON.stringify(this.newMarketMap) != '{}') {
					marketAndCode = func.getMarkAndCode(data.id, data.code, this.newMarketMap)
				} else {
					marketAndCode = func.getMarkAndCode(data.id, data.code, this.oldMarketMap)
				}
				if(marketAndCode && data.name) {
					uni.navigateTo({
						url: `../hq/hq?marketAndCode=${marketAndCode}&name=${data.name}`
					})
				}
			},
			openDataTimer() {
				//开启更新数据定时器
				this.dataTimer = setInterval(()=>{
					if(this.isShowNow) {
						this.getOptionalStock()
					}
				}, 30000)
			},
			closeDataTimer() {
				//关闭更新数据定时器
				this.dataTimer && clearInterval(this.dataTimer)
			},
			itemClick() {
				hxmClickStat('wencai');
				let url = 'https://eq.10jqka.com.cn/ai/webapp/miniprogramIndex.html?source=ths_mobile_weixinmp&guide=0';
				uni.navigateTo({
					url: '../webview/webview?url=' + encodeURIComponent(url)
				})
			},
			bindphone() {
				hxmClickStat('free_mp_zfbzixuan.zfbshouquan')
				
				uni.navigateTo({
					url: '../bindphonenum/bindphonenum'
				});
			}
		}
	}
</script>

<style lang="less">
	.optional {
		// font-family: 'THS';
		padding-top: 32rpx;
	}
	.btn {
		border-radius: 36rpx;
		box-shadow: 0 2rpx 8rpx 4rpx #F5F5F5;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		background-color: #FFFFFF;
	}
	.searchWrap {
		margin: 0 auto 30rpx;
		width: 686rpx;
		height: 72rpx;
		.searchIcon {
			width: 32rpx;
			height: 32rpx;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin-right: 25rpx;
		}
	}
	
	.infoText {
		font-size: 20rpx;
		margin-left: 32rpx;
	}
	.btmBtn {
		margin: 32rpx auto;
		width: 343rpx;
		height: 72rpx;
		.login {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.noLogin {
			height: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			#btnLogin {
				display: flex;
				align-items: center;
				height: 100%;
				font-size: 24rpx;
				border: none;
			}
		}
	}
</style>
