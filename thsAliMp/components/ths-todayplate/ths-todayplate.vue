<template>
	<view class="todayPlateWrap">
		<view class="titleWrap">
			<view class="plate">今日板块</view>
			<view class="jumpMore" @click="jumpMore">查看全部板块</view>
		</view>
		<scroll-view class="contentWrap" scroll-x="true" show-scrollbar="false">
			<view class="itemWrap">
				<view class="plateWrap">
					<view class="smallTit">热门概念</view>
					<view class="plateContent">
						<view class="plateItemWrap" @click="jumpBlockDetail(item)" :class="['plate_' + index]" v-for="(item, index) in hotConcept" :key="item.blockName">
							<view class="topWrap item">
								<view class="name" v-resetfontsize="{originSize: 28, unit: 'rpx'}"><text>{{item.blockName | defaultValue}}</text></view>
								<view class="rate" :class="[item.blockGain < 0 ? 'low' : 'up']">{{item.blockGain | onlyPrecent}}</view>
							</view>
							<view class="btmWrap item">
								<view class="name">{{item.sharesName | defaultValue}}</view>
								<view class="rate" :class="[item.sharesGain < 0 ? 'low' : 'up']">{{item.sharesGain | onlyPrecent}}</view>
							</view>
						</view>
						<view class="line line_one"></view>
						<view class="line line_two"></view>
					</view>
				</view>
			</view>
			<view class="itemWrap">
				<view class="plateWrap">
					<view class="smallTit">热门行业</view>
					<view class="plateContent">
						<view class="plateItemWrap" @click="jumpBlockDetail(item)" :class="['plate_' + index]" v-for="(item, index) in hotIndustry" :key="item.blockName">
							<view class="topWrap item">
								<view class="name">{{item.blockName | defaultValue}}</view>
								<view class="rate" :class="[item.blockGain < 0 ? 'low' : 'up']">{{item.blockGain | onlyPrecent}}</view>
							</view>
							<view class="btmWrap item">
								<view class="name">{{item.sharesName | defaultValue}}</view>
								<view class="rate" :class="[item.sharesGain < 0 ? 'low' : 'up']">{{item.sharesGain | onlyPrecent}}</view>
							</view>
						</view>
						<view class="line line_one"></view>
						<view class="line line_two"></view>
					</view>
				</view>
			</view>
			<view class="itemWrap">
				<view class="plateWrap">
					<view class="smallTit">5日持续热度板块</view>
					<view class="plateContent">
						<view class="plateItemWrap" @click="jumpBlockDetail(item)" :class="['plate_' + index]" v-for="(item, index) in maximumHeatInFiveDays" :key="item.blockName">
							<view class="topWrap item">
								<view class="name">{{item.blockName | defaultValue}}</view>
								<view class="rate" :class="[item.blockGain < 0 ? 'low' : 'up']">{{item.blockGain | onlyPrecent}}</view>
							</view>
							<view class="btmWrap item">
								<view class="name">{{item.sharesName | defaultValue}}</view>
								<view class="rate" :class="[item.sharesGain < 0 ? 'low' : 'up']">{{item.sharesGain | onlyPrecent}}</view>
							</view>
						</view>
						<view class="line line_one"></view>
						<view class="line line_two"></view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { hxmClickStat } from '../../utils/stat.js'
	export default {
		props: ['hotConcept', 'hotIndustry', 'maximumHeatInFiveDays'],
		data() {
			return {
				
			};
		},
		methods: {
			jumpMore() {
				hxmClickStat('free_mp_zfbhangqing.zfbbankuai.more')
				
				uni.navigateTo({
					url: '../../pages/allstock/allstock'
				})
			},
			jumpBlockDetail(data) {
				uni.navigateTo({
					url: `../../pages/blockdetail/blockdetail?code=${data.blockid}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.todayPlateWrap {
		.titleWrap {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding: 0 32rpx;
			.plate {
				font-size: 40rpx;
				font-weight: bold;
			}
			.jumpMore {
				color: #999;
				font-size: 24rpx;
			}
		}
		.contentWrap {
			padding-top: 12rpx;
			width: 100%;
			white-space: nowrap;
			height: 330rpx;
			.itemWrap:nth-child(1) {
				display: inline-block;
				padding-left: 32rpx;
			}
			.itemWrap {
				display: inline-block;
				min-width: 646rpx;
			}
			.itemWrap:nth-child(3) {
				display: inline-block;
				padding-right: 32rpx;
				.plateWrap {
					margin-right: 0;
				}
			}
			.plateWrap {
				display: inline-block;
				position: relative;
				min-width: 622rpx;	
				height: 266rpx;
				border-radius: 16rpx;
				box-shadow: 0 2rpx 8rpx 4rpx #F5F5F5;
				background-color: #FFFFFF;
				// margin-right: 24rpx;
				margin: 15rpx 24rpx 5rpx 0;
				.smallTit {
					position: absolute;
					top: 0;
					left: 0;
					padding: 9rpx 24rpx;
					border-radius: 16rpx 0 16rpx 0;
					background: linear-gradient(left, #F26312, #E93030);
					font-size: 22rpx;
					color: #fff;
				}
				.plateContent {
					padding: 0 23rpx;
					display: flex;
					align-items: center;
					margin-top: 75rpx;
					min-width: 622rpx;
					height: 159rpx;
					box-sizing: border-box;
					.line {
						width: 1px;
						height: 128rpx;
						background-color: #eee;
						&.line_one {
							order: 2;
						}
						&.line_two {
							order: 4;
						}
					}
					.plateItemWrap {
						text-align: center;
						display: flex;
						flex-direction: column;
						height: 100%;
						justify-content: space-between;
						margin: 0 16rpx;
						flex: 1;
						&.plate_0 {
							order: 1;
						}
						&.plate_1 {
							order: 3;
						}
						&.plate_2 {
							order: 5;
						}
						.item {
							.up {
								color: #e93030;
							}
							.low {
								color: #009900;
							}
						}
						.topWrap {
							.name {
								font-size: 24rpx;
							}
							.rate {
								font-family: 'THS';
								font-size: 34rpx;
							}
						}
						.btmWrap {
							.name {
								font-size: 24rpx;
								color: #666;
							}
							.rate {
								font-family: 'THS';
								font-size: 24rpx;
							}
						}
					}
				}
			}
			.item {
				flex-direction: column;
			}
		}
	}
</style>
