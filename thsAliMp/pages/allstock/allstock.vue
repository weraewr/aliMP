<template>
	<view>
		<ths-unify-list class="ths-list" :titShow="true" :titText="titText" :optionText="optionText" :listActive="listActive"
		 @changeList="changeList" :infoTit="infoTit" :load="load" :colorKey="colorKey" :listData="listData" :titArr="titArr"
		 :titDataType="titDataType" @sortData="sortData" :inverted="inverted" :isFixed="isTop" :fixedTop="fixedTop"
		 :fixedType="1" @jump="jump" :showShorBtn="showShorBtn">
		</ths-unify-list>
	</view>
</template>

<script>
	import qsort from '../../static/lib/sort.js'
	import checkData from '../../static/lib/checkData.js'
	import api from '../../http/api.js'
	export default {
		data() {
			return {
				isTop: false,
				fixedTop: '',
				listScrollTop: '', //列表距离上顶部的距离
				listNowTop: '', //列表目前距离上顶部的距离
				inverted: false,
				optionText: ['行业板块', '概念板块', '地域板块'],
				titText: '',
				listActive: 1,
				infoTit: ['涨跌幅', '涨速'],
				load: 2,
				colorKey: 'gainSpeed',
				titArr: ['gain', 'gainSpeed'],
				titDataType: [1, 1], //配合titArr，表示数据是百分数，还是普通数
				industry: [],
				concept: [],
				reign: [],
				listData: [], //显示的数据
				listArr: ['industry', 'concept', 'reign'],
				nowList: '', //记录当前显示数据
				healthData: {}, //健康数据对象

				dataTimer: null, //更新数据定时器
				isShowNow: true, //是否在浏览当前页
				isUpdata: false, //是否立即更新数据
				
				showShorBtn: false,//排序按钮是否隐藏
			};
		},
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
			// 	if (!that.listScrollTop) {
			// 		that.listScrollTop = res[1].scrollTop + res[0].top;
			// 	}
			// 	that.listNowTop = res[0].top;
			// })
		},
		onShareAppMessage(options) {
			let that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			let url = '/pages/allstock/allstock'
			let shareObj = {
				path: `/pages/index/index?url=${url}&shareType=allstock`
			};
			return shareObj;
		},
		onLoad() {
			//加载数据
			this.getData('industry', 1);
			// uni.showShareMenu({
			// 	withShareTicket: true
			// })
			//开启定时器
			this.dataTimer = setInterval(() => {
				if (this.isShowNow) {
					this.listArr.forEach((item) => {
						this.getData(item);
					})
				}
				if (!this.isUpdata && !this.isShowNow) {
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
		onShow() {
			this.isShowNow = true;
			if (this.isUpdata) {
				this.listArr.forEach((item) => {
					this.getData(item);
				})
			}
		},
		onHide() {
			this.isShowNow = false;
		},
		destroyed() {
			this.isShowNow = false;
		},
		methods: {
			changeList(type) {
				this.listActive = type;
				//每次切换列表数据时，重置排序项为第一项
				let data = this[this.listArr[type - 1]];
				let healthData = checkData(data, this.titArr);

				//首先判断数据有没有没有，没有就向后端请求
				this.inverted = false;
				let listData = qsort(healthData.dataArr, 0, healthData.dataArr.length, this.titArr[0], this.inverted).concat(
					healthData.errArr);
				if (data.length == 0) {
					this.getData(this.listArr[type - 1], 1)
				} else {
					// this.listData = data;
					this.listData = listData;
				}
			},
			sortData(type, isUp) {
				if (this.listNowTop < 0) {
					uni.pageScrollTo({
						scrollTop: this.listScrollTop
					})
				}

				this.listData.sort(function() {
					return .5 - Math.random();
				});
				this.healthData = checkData(this.listData, this.titArr)
				if(this.healthData.dataArr.length == 0) {
					this.showShorBtn = true;
				} else {
					this.showShorBtn = false;
				}
				this.listData = qsort(this.healthData.dataArr, 0, this.healthData.dataArr.length, this.titArr[type - 1], !isUp).concat(
					this.healthData.errArr);
				this.inverted = !isUp;
				this.nowList = this.titArr[type - 1];
			},
			formatData(data, datName) {
				that.hyData = JSON.parse(data);
				that.listData = that.hyData;
			},
			getData(name, type) {
				//获取对应板块数据
				let that = this;
				if (type == 1) {
					uni.showLoading({
						title: '加载中'
					})
				}
				uni.request({
					url: api.searchBlockInfoList,
					method: 'POST',
					time: 3000,
					data: {
						type: name //默认先获取行业数据
					},
					success(res) {
						if (res.data.status_code == 0) {
							//请求成功
							let resData = JSON.parse(res.data.result.blockInfoList)
							if (resData.length > 0) {
								//得到健康数据
								that.healthData = checkData(resData, that.titArr)
								//赋值 排好序的值 + 异常数据（比如停牌）
								if (that.nowList) {
									that[name] = qsort(that.healthData.dataArr, 0, that.healthData.dataArr.length, that.nowList, that.inverted).concat(
										that.healthData.errArr);
								} else {
									that[name] = qsort(that.healthData.dataArr, 0, that.healthData.dataArr.length, that.titArr[0]).concat(that.healthData
										.errArr);
								}
								if (type == 1) {
									that.listData = that[name];
									uni.hideLoading();
									if(that.healthData.dataArr.length == 0) {
										that.showShorBtn = true;
									} else {
										that.showShorBtn = false;
									}
								} else {
									that.listData = that[that.listArr[that.listActive - 1]];
								}
								//加载顺利，没有更多数据了
								that.load = 3;
							} else {
								that.load = 4;
							}
						} else {
							that.load = 4;
							if (type == 1) {
								uni.hideLoading();
								uni.showToast({
									title: '数据获取失败，请稍候再试',
									icon: 'none'
								})
							}
						}
					},
					fail(err) {
						console.log(err);
						that.load = 4;
						if (type == 1) {
							uni.hideLoading();
							uni.showToast({
								title: '数据获取失败，请稍候再试',
								icon: 'none'
							})
						}
					}
				})
			},
			jump(data) {
				uni.navigateTo({
					url: `../blockdetail/blockdetail?code=${data.code}`
				})
			}
		}
	}
</script>

<style lang="less">
	
</style>
