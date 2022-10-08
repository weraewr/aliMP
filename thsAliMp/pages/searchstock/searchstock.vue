<template>
	<view class="searchstock">
		<view class="searchBox">
			<view class="searchWrap btn">
				<view class="iconWrap" v-if="showState">
					<image class="searchIcon" src='../../static/search.png'></image>
					<text>搜股票名称/股票代码</text>
				</view>
				<view class="inputSearch">
					<input type="text" :focus="true" @focus="hidIcon" @blur="showIcon" :placeholder="searchText" v-model="searchContent" @input="inputHandle">
				</view>
			</view>
		</view>
		<view class="paddingBox"></view>
		<view class="hotSrarch" v-if="!searchContent">
			<view class="hotSearchWrap" v-if="hotData.length > 0">
				<view class="tit">大家都在搜</view>
				<view class="hotItem" v-for="(item, index) in hotData" :key="item.name">
					<view class="info" @click="jump(item)">
						<view class="rank">{{index + 1}}</view>
						<view class="stockName">{{item.name}}</view>
						<view class="precent" :class="[item && item.gain < 0 ? 'down' : 'up']">{{item && item.gain | formatPrecent}}</view>
					</view>
					<view class="btn" v-if="loginInfo.account" @click="optionChange(item)">{{item.optional ? '删自选' : '加自选'}}</view>
					<view class="btn" v-else>
						<button id="btnLogin" :style="{backgroundColor: 'transparent'}" @click="getPhoneNumber">加自选</button>
					</view>
				</view>
			</view>
		</view>
		<view class="searchContent" v-else-if="searchData.length > 0">
			<view class="searchItem" v-for="item in searchData" :key="item.name">
				<view class="leftWrap" @click="jump(item)">
					<view class="stockName">
						<view class="name">
							<rich-text :nodes="parseHtml(item.name_new)"></rich-text>
						</view>
						<view class="code">
							<rich-text :nodes="parseHtml(item.code_new)"></rich-text>
						</view>
					</view>
					<view class="price" :class="[item.newPrice < 0 ? 'down' : 'up']">{{item.newPrice | price}}</view>
					<view class="precent" :class="[item.gain < 0 ? 'down' : '',item.gain > 0 ? 'up' : '']">{{item.gain | formatPrecent}}</view>
				</view>
				<view class="option" v-if="loginInfo.account" @click="optionChange(item)" :class="[item.optional ? 'del' : '']">{{item.optional ? '删自选' : '加自选'}}</view>
				<view class="option" v-else>
					<button id="btnLogin" :style="{backgroundColor: 'transparent'}" @click="getPhoneNumber">加自选</button>
				</view>
			</view>
		</view>
		<view class="searchContent" v-else-if="searchData.length == 0 && !searching && searchContent">
			<view class="noContent">
				找不到任何匹配内容
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import formatSearch from '../../static/lib/formatSearch.js'
	import func from '../../static/lib/tool.js'
	import api from '../../http/api.js'
	import parseHtml from '../../utils/html-parser.js'
	export default {
		data() {
			return {
				showState: true,
				searchText: '',
				searchContent: '',
				hotData: [],
				searchData: [],
				checkTimer: null,//检查定时器
				searchTimer: null,//搜索定时器
				searching: false,//是否在搜索
				searchStatus: false,//是否可以搜索状态
			};
		},
		computed: {
			...mapState(['oldMarketMap', 'newMarketMap', 'loginInfo']),
		},
		onLoad() {
			// uni.showShareMenu({
			//   withShareTicket: true
			// })
			uni.loadFontFace({
				family: 'THS',
				source: 'url("https://i.thsi.cn/m/fonts/THSMoneyfont-Medium.ttf")',
				success() {
				}
			})
		},
		onShow() {
			this.getHotData();
		},
		onShareAppMessage: function( options ){
		　　let that = this;
		　　// 设置菜单中的转发按钮触发转发事件时的转发内容
			let url = '/pages/searchstock/searchstock'
		　　let shareObj = {
				path: `/pages/index/index?url=${url}&shareType=searchstock`
		　　};
		　　return shareObj;
		},
		methods: {
			hidIcon() {
				this.showState = false;
				this.searchText = '请输入股票';
				this.searchStatus = false;
			},
			showIcon() {
				this.searchStatus = true;
				if (!this.searchContent) {
					this.showState = true;
					this.searchText = '';
				}
			},
			inputHandle(e) {
				this.searchTimer && clearTimeout(this.searchTimer);
				this.searchTimer = setTimeout(()=>{
					if(e.target.value && !this.searchStatus) {
						this.getSearchData(e.target.value)
					}
				},300)
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
			getPhoneNumber(e) {
				// if (e.detail.iv && e.detail.encryptedData) {
				// 	let data = {
				// 		iv: e.detail.iv,
				// 		encryptedData: e.detail.encryptedData
				// 	}
				// 	let param = {
				// 		data: data,
				// 		http: this.$http
				// 	}
				// 	this.$store.dispatch('promiseLogin', param)
				// 	.then(()=>{
				// 		this.getHotData();
				// 		//请求后端接口，检查是否已经添加过自选
				// 		if(this.searchContent) {
				// 			this.getSearchData(this.searchContent);
				// 		}
				// 	})
				// 	.catch(()=>{
				// 		console.log('登录失败了')
				// 	})
				// } else {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '您未授权手机号',
				// 	})
				// }
				uni.navigateTo({
					url: '../bindphonenum/bindphonenum'
				});
			},
			optionChange(item) {
				let stateText = '';
				let resText = '';
				let url = '';
				let data = {
					sessionidLogin: this.loginInfo.sessionid,
					userid: this.loginInfo.userid,
					code: item.code
				};
				if(item.optional) {
					stateText = '正在删除中...';
					resText = '删除'
					url = api.deleteOptionalStock;
					data.operation = 'delete';
				} else {
					stateText = '正在添加中...';
					resText = '添加'
					url = api.addOptionalStock;
					data.id = item.id;
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
							uni.showToast({
								title: resText + '成功',
								icon: item.optional ? 'none' : 'success'
							})
							item.optional = !item.optional
						} else {
							uni.showToast({
								title: resText + '失败',
								icon: 'none'
							})
						}
					},
					fail(err) {
						console.log(err)
						uni.hideLoading();
						uni.showToast({
							title: resText + '失败',
							icon: 'none'
						})
					}
				})
			},
			getHotData() {
				let that = this;
				this.hotData = [];
				let userid = this.loginInfo.account ? this.loginInfo.userid : null;
				let sessionid = this.loginInfo.account ? this.loginInfo.sessionid : null;
				uni.request({
					url: api.everyOneIsSearching,
					method: 'POST',
					time: 3000,
					data: {
						userid: userid,
						sessionidLogin: sessionid
					},
					success(res) {
						if(res.data.status_code == 0) {
							if(res.data.result.list) {
								let resData = JSON.parse(res.data.result.list);
								that.hotData = that.formatHotData(resData);
							}
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			formatHotData(data) {
				let newArr = [];
				if(data.length > 0) {
					data.forEach((item)=>{
						let newItem = item;
						if(item.zhangdiefu) {
							newItem.gain = item.zhangdiefu.replace(/%/, '');
						}
						newArr.push(newItem)
					})
				}
				return newArr;
			},
			getSearchData(str) {
				let that = this;
				let userid = this.loginInfo.account ? this.loginInfo.userid : null;
				let sessionid = this.loginInfo.account ? this.loginInfo.sessionid : null;
				uni.showLoading({
					title: '加载中...'
				})
				this.searchData = [];
				this.searching = true;
				uni.request({
					url: api.intelligentSearch,
					method: 'POST',
					time: 3000,
					data: {
						userid: userid,
						sessionidLogin: sessionid,
						query: str
					},
					success(res) {
						uni.hideLoading();
						if(res.data.status_code == 0 && res.data.result.query == that.searchContent) {
							if(res.data.result.list) {
								let resData = JSON.parse(res.data.result.list);
								if(resData.length > 0) {
									that.searchData = formatSearch(resData, that.searchContent, ['name', 'code']);
								} else {
									that.searchData = [];
								}
							}
						} else {
							that.searchData = [];
						}
					},
					fail(err) {
						uni.hideLoading();
						console.log(err)
					},
					complete() {
						that.searching = false;
					}
				})
			},
			parseHtml(str) {
				return parseHtml(str);
			}
		}
	}
</script>

<style lang="less">
	.searchstock {
		// font-family: 'THS';
	}
	.btn {
		border-radius: 36rpx;
		box-shadow: 0 2rpx 8rpx 4rpx #F5F5F5;
		background-color: #FFFFFF;
	}

	.paddingBox {
		margin: 32rpx auto 48rpx;
		height: 72rpx;
	}
	.searchBox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 152rpx;
		background-color: #FFFFFF;
		z-index: 10;
	}
	.searchWrap {
		margin: 32rpx auto 48rpx;
		width: 686rpx;
		height: 72rpx;
		position: relative;

		.iconWrap {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;

			.searchIcon {
				width: 32rpx;
				height: 32rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				margin-right: 25rpx;
			}
		}

		.inputSearch {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
			display: flex;
			align-items: center;
			padding-left: 32rpx;
			font-size: 24rpx;

			input {
				width: 620rpx;
			}
		}
	}

	.hotSrarch {
		.hotSearchWrap {
			.tit {
				font-size: 40rpx;
				margin-bottom: 12rpx;
				padding-left: 32rpx;
				font-weight: bold;
			}

			.hotItem {
				font-family: 'THS';
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 96rpx;
				margin: 0 32rpx;

				.info {
					flex: 1;
					display: flex;
					align-items: center;

					.rank {
						width: 32rpx;
						height: 32rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #999999;
						color: #FFFFFF;
						margin-right: 16rpx;
						font-size: 24rpx;
						border-radius: 8rpx;
					}

					.stockName {
						font-family: "PingFang Medium", "PingFang SC", "Source Han Sans";
						font-size: 28rpx;
						margin-right: 24rpx;
					}

					.precent {
						font-size: 28rpx;

						&.up {
							color: #E93030;
						}

						&.down {
							color: #009900;
						}
					}
				}
				.btn {
					width: 128rpx;
					height: 56rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					box-shadow: 0 2rpx 8rpx 0 rgba(233, 48, 48, 0.20), inset 0 0 4rpx 0 rgba(233, 48, 48, 0.30);
					border-radius: 28rpx;
					font-size: 24rpx;
					color: #f27451;
					#btnLogin {
						height: 56rpx;
						line-height: 56rpx;
						box-sizing: border-box;
						font-size: 24rpx;
						color: #f27451;
						padding: 0;
						border: none;
					}
				}
			}
			.hotItem:nth-child(2) {
				.info {
					.rank {
						background-color: #E93030;
					}
				}
			}
			
			.hotItem:nth-child(3) {
				.info {
					.rank {
						background-color: #E98630;
					}
				}
			}
			
			.hotItem:nth-child(4) {
				.info {
					.rank {
						background-color: #E9B630;
					}
				}
			}
		}
	}
	
	.searchContent {
		.searchItem {
			font-family: 'THS';
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 96rpx;
			margin: 0 32rpx;
			.leftWrap {
				flex: 1;
				display: flex;
				align-items: center;
				.stockName {
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: 256rpx;
					.name {
						font-family: "PingFang Medium", "PingFang SC", "Source Han Sans";
						font-size: 32rpx;
					}
					.code {
						font-size: 24rpx;
						color: #999999;
					}
				}
				.price {
					width: 155rpx;
					font-size: 32rpx;
					&.up {
						color: #E93030;
					}
					&.down {
						color: #009900;
					}
				}
				.precent {
					flex: 1;
					font-size: 32rpx;
					&.up {
						color: #E93030;
					}
					&.down {
						color: #009900;
					}
				}
			}
			.option {
				width: 128rpx;
				height: 56rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				box-shadow: 0 2rpx 8rpx 4rpx #F5F5F5;
				border-radius: 28rpx;
				font-size: 24rpx;
				color: #323232;
				&.del {
					color: #999;
				}
				#btnLogin {
					height: 56rpx;
					line-height: 56rpx;
					box-sizing: border-box;
					font-size: 24rpx;
					color: #323232;
					padding: 0;
					border: none;
				}
			}
		}
		.noContent {
			color: #999;
			font-size: 24rpx;
			text-align: center;
		}
	}
</style>
