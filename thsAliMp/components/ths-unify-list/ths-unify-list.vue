<template>
	<view class="thsUnifyList">
		<view class="titWrap" :class="{'isFixed': isFixed}" :style="{top: fixedTop}">
			<template v-if="titShow">
				<view class="titText">{{titText}}</view>
				<!-- 标题选项 -->
				<view class="optionWrap">
					<view class="optItem" v-for="(item, index) in optionText" :key="item" :class="{active: listActive == index + 1}"
					 @click="changeList(index + 1)">
						<text>{{item}}</text>
					</view>
				</view>
			</template>
			<!-- 具体列表内容 -->
			<view class="contentWrap tit">
				<view class="item stockName">股票名称</view>
				<view class="item" v-for="(item, index) in infoTit" :key="item" >
					<text @click="sortData(index + 1)">{{item}}</text>
					<view class="sortWrap" v-if="sortType == index + 1 && !showShorBtn" @click="sortData(index + 1)">
						<view class="upSort" :class="{active: inverted}"></view>
						<view class="downSort" :class="{active: !inverted}"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="paddingBox" :style="{height: isFixed ? paddingHeight : 0}"></view>
		<view class="stockWrap">
			<view class="contentWrap items" v-for="items in listData" :key="items.code" @click="jump(items)">
				<view class="item stockName">
					<view class="name">{{items && items.name | defaultValue}}</view>
					<view class="code">{{items && items.code | defaultValue}}</view>
				</view>
				<view class="item" :class="[items && items[colorKey] > 0 ? 'up' : '', items && items[colorKey] < 0 ? 'down' : '']" v-for="(item, index) in titArr" :key="item">
					<text v-if="titDataType[index] == 1"
					:class="[items && items[item] > 0 && item != 'newPrice' ? 'up' : '', items && items[item] < 0 && item != 'newPrice' ? 'down' : '', items && items[item] == 0 && item != 'newPrice' ? 'zero' : '']">
						<text v-if="item == 'gain' && items.suspend && items.suspend != '--'">
							停牌
						</text>
						<text v-else>
							{{item && items[item] | formatPrecent}}
						</text>
					</text>
					<text v-else-if="titDataType[index] == 2"
					:class="[items && items[item] > 0 && item != 'newPrice' ? 'up' : '', items && items[item] < 0 && item != 'newPrice' ? 'down' : '', items && items[item] == 0 && item != 'newPrice' ? 'zero' : '']">
						{{item && items[item] | formatNum}}
					</text>
					<text v-else
					:class="[items && items[item] > 0 && item != 'newPrice' ? 'up' : '', items && items[item] < 0 && item != 'newPrice' ? 'down' : '', items && items[item] == 0 && item != 'newPrice' ? 'zero' : '']">
						{{item && items[item] | price}}
					</text>
				</view>
			</view>
		</view>
		<view class="loadmore" v-if="load">
			<view class="text">
				{{loadText}}
				<image class="loading" v-if="load == 2" src="../../static/load.png"></image>
			</view>
		</view>
		<view class="speicalText" v-if="showSpecialText">
			{{specialText}}
		</view>
	</view>
</template>

<script>
	import func from '../../static/lib/tool.js'
	import { hxmClickStat } from '../../utils/stat.js'
	import {
		mapState
	} from 'vuex';
	export default {
		props: ['titText', 'optionText', 'isFixed', 'infoTit', 'titArr', 'titDataType','listData', 'colorKey', 'load', 'titShow',
			'listActive', 'fixedTop', 'inverted', 'sortTypeStatus', 'showSpecialText', 'specialText', 'showShorBtn'
		],
		data() {
			return {
				paddingHeight: 0,
				sortType: 1, //当前那个模块的排序按钮出现
				// shortBtnShow: !this.showShorBtn,//排序按钮是否出现，默认是出现，针对9点15到9点半做特殊处理
			};
		},
		computed: {
			...mapState(['oldMarketMap', 'newMarketMap', 'loginInfo']),
			loadText() {
				if (this.load == '1') {
					return '加载更多';
				} else if (this.load == '2') {
					return '正在加载...';
				} else if (this.load == '3') {
					return '没有更多了';
				} else if (this.load == '4') {
					return '暂无数据';
				} else {
					return '';
				}
			}
		},
		watch: {
			sortTypeStatus() {
				if(this.sortTypeStatus) {
					this.sortType = this.sortTypeStatus;
				}
			}
		},
		mounted() {
			if (this.fixedType == 1) {
				this.fixedTop = this.sysInfo.rheight + 'px';
			}
			this.getTitHeight();
			if(this.sortTypeStatus) {
				this.sortType = this.sortTypeStatus;
			}
		},
		methods: {
			jump(data) {
				this.$emit('jump', data)
			},
			changeList(type) {
				if(this.listActive != type) {
					if(this.sortTypeStatus) {
						this.sortType = this.sortTypeStatus;
					} else {
						this.sortType = 1;
					}
					this.$emit('changeList', type)
					
					if(type == 1) {
						// 涨幅榜
						hxmClickStat('free_mp_zfbhangqing.zfbzhangfu')
					} else if(type == 2) {
						// 跌幅榜
						hxmClickStat('free_mp_zfbhangqing.zfbdiefu')
					} else if(type == 3) {
						// 成交榜
						hxmClickStat('free_mp_zfbhangqing.zfbchengjiao')
					} else if(type == 4) {
						// 涨速榜
						hxmClickStat('free_mp_zfbhangqing.zfbzhangsu')
					}
				}
			},
			getTitHeight() {
				let that = this;
				const query = uni.createSelectorQuery().in(this)
				query.select('.titWrap').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec(function(res) {
					that.paddingHeight = res[0].height + 'px';
				})
			},
			sortData(type) {
				if(this.showShorBtn) {
					return;
				}
				let invertedState = '';
				if (type == this.sortType) {
					invertedState = this.inverted
				} else {
					this.sortType = type;
					invertedState = true;
				}
				this.$emit('sortData', type, invertedState);
			}
		}
	}
</script>

<style lang="less">
	.thsUnifyList {
		// font-family: 'THS';
	}
	.titWrap {
		background-color: #fff;

		&.isFixed {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
		}

		.titText {
			font-size: 40rpx;
			padding: 0 0 32rpx 32rpx;
			font-weight: bold;
		}

		.optionWrap {
			display: flex;
			align-items: flex-end;
			padding-left: 32rpx;

			.optItem {
				// width: 118rpx;
				margin-right: 64rpx;
				font-size: 26rpx;
				color: #666;

				&.active {
					font-size: 34rpx;
					color: #323232;
					font-weight: bold;

					text {
						position: relative;
						z-index: 10;

						&::after {
							content: '';
							width: 100%;
							height: 17rpx;
							position: absolute;
							left: 0;
							bottom: 0;
							background: linear-gradient(left, #f8b089, #f49898);
							z-index: -1;
						}
					}
				}
			}
		}
	}

	.stockWrap {
		font-family: 'THS';
		display: flex;
		flex-direction: column;

		&.inverted {
			flex-direction: column-reverse;
		}
	}

	.contentWrap {
		box-sizing: border-box;
		padding: 0 32rpx;
		display: flex;
		background-color: #fff;

		&.tit {
			
			.item {
				color: #999;
			}

			.item {
				font-size: 24rpx;

				.sortWrap {
					width: 8rpx;
					height: 34rpx;
					margin: 0 12rpx 0 8rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.upSort {
						// margin: 8rpx 0 5rpx;
						margin-bottom: 5rpx;
						border: 8rpx solid transparent;
						border-bottom-color: #EEE;

						&.active {
							border-bottom-color: #E93030;
						}
					}

					.downSort {
						border: 8rpx solid transparent;
						border-top-color: #EEE;

						&.active {
							border-top-color: #E93030;
						}
					}
				}
			}

		}

		.item {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			font-size: 32rpx;
			height: 71rpx;
			align-items: center;
			color: #323232;

			&.up {
				color: #e93030;
			}

			&.down {
				color: #009900;
			}
			
			text {
				&.up {
					color: #e93030;
				}
				
				&.down {
					color: #009900;
				}
				&.zero {
					color: #323232;
				}
			}
		}

		.stockName {
			justify-content: flex-start;
			flex-basis: 50rpx;
		}

		&.items {
			margin-bottom: 25rpx;

			.stockName {
				flex-direction: column;
				align-items: flex-start;

				.name {
					font-family: "PingFang Medium", "PingFang SC", "Source Han Sans";
					font-size: 30rpx;
					color: #323232;
				}

				.code {
					font-family: "PingFang Medium", "PingFang SC", "Source Han Sans";
					font-size: 24rpx;
					color: #666;
				}
			}
		}
	}

	.loadmore {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;

		.text {
			position: relative;
			color: #999;
			font-size: 30rpx;

			&::before {
				content: '';
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: -40rpx;
				width: 20rpx;
				height: 1px;
				background-color: #999;
			}

			&::after {
				content: '';
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: -40rpx;
				width: 20rpx;
				height: 1px;
				background-color: #999;
			}

			.loading {
				width: 30rpx;
				height: 30rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				animation: turnround infinite linear 0.5s;
			}
			
			@keyframes turnround {
				0% {
					transform: rotate(0);
				}
			
				100% {
					transform: rotate(360deg);
				}
			}
		}
	}
	.speicalText {
		text-align: center;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		color: #999;
	}
</style>
