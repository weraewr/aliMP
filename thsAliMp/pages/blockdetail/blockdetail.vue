<template>
	<view class="blockdetail">
		<view class="topInfo">
			<view class="blockName">{{name}}(<text class="blockCode">{{code}}</text>)</view>
			<view class="dataInfo" :class="[gain < 0 ? 'down' : 'up']">
				<view class="num">{{newPrice | price}}</view>
				<view class="precent">{{gain && gain | formatPrecent}}</view>
			</view>
		</view>
		<view class="contentInfo" @click="changeTextState" v-if="intro">
			<view class="textContent" :class="[showText ? 'showText' : 'hideText']">{{intro}}</view>
			<view class="icon">
				<image src="../../static/arrows_hz.png" class="arrow" :class="[showText ? 'down' : 'up']"></image>
			</view>
		</view>
		<view class="long" v-if="longArr.length > 0">
			<view class="tit">龙头股</view>
			<view class="longWrap" :class="[longArr.length == 3 ? 'three' : '']">
				<view class="longItem" v-for="item in longArr" :key="item.code" @click="jump(item)">
					<view class="stockName">{{item.name | defaultValue}}</view>
					<view class="dataInfo" :class="[item.gain < 0 ? 'down' : 'up']">
						<view class="price">{{item.newPrice | price}}</view>
						<view class="precent">{{item.gain | formatPrecent}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<ths-unify-list
			class="ths-list"
			:titShow="true"
			:titText="titText"
			:optionText="optionText"
			:listActive="listActive"
			@changeList="changeList"
			:infoTit="infoTit"
			:load="load"
			:colorKey="colorKey"
			:listData="listData"
			:titArr="titArr"
			:titDataType="titDataType"
			@sortData="sortData"
			:inverted="inverted"
			:isFixed="isTop"
			:fixedTop="fixedTop"
			:fixedType="1"
			@jump="jump"
			:sortTypeStatus="sortTypeStatus">
		</ths-unify-list>
	</view>
</template>

<script>
	import func from '../../static/lib/tool.js'
	import qsort from '../../static/lib/sort.js'
	import checkData from '../../static/lib/checkData.js'
	import api from '../../http/api.js'
	import {
		mapState
	} from 'vuex';
	export default {
		onPageScroll() {
			// let that = this;
			// const query = uni.createSelectorQuery()
			// query.select('.ths-list').boundingClientRect()
			// query.selectViewport().scrollOffset()
			// query.exec(function(res) {
			// 	if (res[0].top <= 0) {
			// 		that.isTop = true;
			// 		that.fixedTop = '0px';
			// 	} else {
			// 		if (that.isTop) {
			// 			that.isTop = false;
			// 		}
			// 	}
			// 	if(!that.listScrollTop) {
			// 		that.listScrollTop = res[1].scrollTop + res[0].top;
			// 	}
			// 	that.listNowTop = res[0].top;
			// })
		},
		data() {
			return {
				name: '--',
				code: '--',
				newPrice: '',
				gain: '',
				longArr: [],//龙头股数组
				showText: false,
				isTop: false,
				fixedTop: '',
				intro: '',//简介
				listScrollTop: '',//列表距离上顶部的距离
				listNowTop: '',//列表目前距离上顶部的距离
				inverted: false,
				titText: '成分股',
				listActive: 1,
				infoTit: ['最新价', '涨跌幅'],
				load: 2,
				colorKey: 'gain',
				titArr: ['newPrice','gain'],
				titDataType: [0,1],//配合titArr，表示数据是百分数，还是普通数
				listData: [],//显示的数据
				sharesInfoList: [],//从后端获取的数据
				sortTypeStatus: '2',//重置排序选项
				nowKey: '',//记录当前的排序关键字
				healthData: {},//健康数据对象
				
				dataTimer: null,//更新数据定时器
				isShowNow: true,//是否在浏览当前页
				isUpdata: false,//是否立即更新数据
			};
		},
		onLoad(opt) {
			let { code } = opt;
			this.getBlockData(code);
			// uni.showShareMenu({
			//   withShareTicket: true
			// });
			this.dataTimer = setInterval(()=>{
				if(this.isShowNow) {
					this.getBlockData(this.code, 1);
				}
				if(!this.isUpdata && !this.isShowNow) {
					this.isUpdata = true;
				}
			}, 30000)
			uni.loadFontFace({
				family: 'THS',
				source: 'url("https://i.thsi.cn/m/fonts/THSMoneyfont-Medium.ttf")',
				success() {
				}
			})
		},
		onShareAppMessage: function( options ){
		　　let that = this;
		　　// 设置菜单中的转发按钮触发转发事件时的转发内容
			let url = '/pages/blockdetail/blockdetail'
		　　let shareObj = {
				path: `/pages/index/index?url=${url}&code=${this.code}&shareType=blockdetail`
		　　};
		　　return shareObj;
		},
		onShow() {
			this.isShowNow = true;
			if(this.isUpdata) {
				this.listArr.forEach((item)=>{
					this.getBlockData(this.code, 1);
				})
			}
		},
		onHide() {
			this.isShowNow = false;
		},
		destroyed() {
			this.isShowNow = false;
		},
		computed: {
			...mapState(['oldMarketMap', 'newMarketMap', 'loginInfo']),
		},
		methods: {
			changeTextState() {
				this.showText = !this.showText;
			},
			changeList(type) {
				this.listActive = type;
				//每次切换列表数据时，重置排序项为第一项
				let data = this[this.listArr[type - 1]];
				this.listData = qsort(data, 0, data.length, this.titArr[0]);
			},
			sortData(type, isUp) {
				if(this.listNowTop < 0) {
					uni.pageScrollTo({
						scrollTop: this.listScrollTop
					})
				}
				
				this.listData.sort(function() {
				    return .5 - Math.random();
				});
				this.healthData = checkData(this.listData, this.titArr)
				this.listData = qsort(this.healthData.dataArr, 0, this.healthData.dataArr.length, this.titArr[type - 1], !isUp).concat(this.healthData.errArr);
				
				this.inverted = !isUp;
				this.nowKey = this.titArr[type - 1];
			},
			getBlockData(code, type) {
				//获取板块数据
				if(!type) {
					uni.showLoading({
						title: '正在加载'
					})
				}
				let that = this;
				uni.request({
					url: api.searchBlockInfo,
					method: 'POST',
					time: 3000,
					data: {
						code: code
					},
					success(res) {
						!type&& uni.hideLoading();
						if(res.data.status_code == 0) {
							//数据获取成功
							that.formatData(res.data.result);
							if(!type) {
								that.load = 3;
							}
						} else {
							if(!type) {
								uni.showToast({
									title: '数据获取失败，请稍候再试',
									icon: 'none'
								})
							}
							if(!type) {
								that.load = 4;
							}
						}
						
					},
					fail(err) {
						console.log(err)
						!type && uni.hideLoading();
						if(!type) {
							uni.showToast({
								title: '数据获取失败，请稍候再试',
								icon: 'none'
							})
							that.load = 4;
						}
					}
				})
			},
			formatData(data) {
				this.name = data.blockInfo.name;
				this.code = data.blockInfo.code;
				this.newPrice = data.blockInfo.newPrice;
				this.gain = data.blockInfo.gain;
				if(data.bellwetherStockList) {
					this.longArr = data.bellwetherStockList.slice(0, 3);
				}
				if(data.sharesInfoList) {
					this.sharesInfoList = data.sharesInfoList;
					if(this.sharesInfoList && this.sharesInfoList.length > 0) {
						this.healthData = checkData(this.sharesInfoList, this.titArr)
						//赋值 排好序的值 + 异常数据（比如停牌）
						if(this.nowKey) {
							this.listData = qsort(this.healthData.dataArr, 0, this.healthData.dataArr.length, this.nowKey, this.inverted).concat(this.healthData.errArr);
						} else {
							this.listData = qsort(this.healthData.dataArr, 0, this.healthData.dataArr.length, this.titArr[1]).concat(this.healthData.errArr);
						}
					}
				}
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
			}
		}
	}
</script>

<style lang="less" scoped>
	.blockdetail {
		// font-family: 'THS';
		background-color: #FFFFFF;
		padding-top: 24rpx;
	}
	.topInfo {
		margin: 0 32rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 40rpx;
		.blockName {
			font-weight: bold;
			.blockCode {
				font-family: 'THS';
			}
		}
		.dataInfo {
			font-family: 'THS';
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			&.up {
				color: #E93030;
			}
			&.down {
				color: #009900;
			}
			.num {
				margin-right: 24rpx;
			}
		}
	}
	.contentInfo {
		margin: 0 32rpx 32rpx;
		background-color: #FFFFFF;
		.textContent {
			transition: max-height 0.5s;
			font-size: 24rpx;
			max-height: 66rpx;
			&.hideText {
				display: -webkit-box;
				
				overflow: hidden;
				
				text-overflow: ellipsis;
				
				word-wrap: break-word;
				
				white-space: normal !important;
				
				-webkit-line-clamp: 2;
				
				-webkit-box-orient: vertical;
			}
			&.showText {
				transition: max-height 0.75s;
				max-height: 1000rpx;
			}
		}
		
		.icon {
			margin: 16rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.arrow {
				width: 24rpx;
				height: 14rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				transform: rotate(180deg);
				&.up {
					transform: rotate(0);
				}
			}
		}
	}
	.long {
		margin:0 32rpx 16rpx;
		.tit {
			font-size: 40rpx;
			font-weight: bold;
		}
		.longWrap {
			display: flex;
			margin: 32rpx 0;
			height: 141rpx;
			.longItem {
				margin-right: 24rpx;
				width: 213rpx;
				height: 141rpx;
				background-color: #FFFFFF;
				box-shadow: 0 2px 8px 4px #F5F5F5;
				border-radius: 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.stockName {
					font-size: 28rpx;
					margin-bottom: 8rpx;
				}
				.dataInfo {
					font-family: 'THS';
					display: flex;
					justify-content: center;
					font-size: 24rpx;
					&.up {
						color: #e93030;
					}
					&.down {
						color: #009900;
					}
					.price {
						margin-right: 24rpx;
					}
				}
			}
			&.three {
				justify-content: space-between;
				.longItem {
					margin-right: 0;
				}
			}
		}
	}
</style>
