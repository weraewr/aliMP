<template>
	<view class="container">
		
		<view v-if="indexDialogShow && isShowIndexDialog" class="indexDialogFather">
			<view v-if="indexDialogShow && isShowIndexDialog" class="indexFirstDialog">
				<image @tap="indexDialogShow = false" class="closeIcon" src="../../static/phone_close.png" mode="widthFix"></image>
			    <image @tap=jumpToDailogUrl class="indexDialogImg" :src="indexDialogImg"></image>
		    </view>
		</view>
		
		<view class="indexDialogcover" v-if="indexDialogShow && isShowIndexDialog"></view>
		
		<view class="topWrap">
			<ths-nav
				:navInfo="getNavInfo" 
				@loginComplete="loginComplete" 
				:showAccount="showAccount" 
				@showMenu="showMenu" 
				@itemClick="itemClick"></ths-nav>
			<view class="openInfoWrap">
				<view class="openStat" v-if="jyrType >= 0">
					<image class="icon" :src="jyrInfo.iconSrc"></image>
					<text>{{jyrInfo.text | defaultValue}}</text>
				</view>
				<view class="date">{{nowDate}}</view>
			</view>
			<view class="searchWrap" @click="jumpSearch">
				<image class="icon" src="../../static/search.png"></image>
				<text>搜股票名称/代码</text>
			</view>
		</view>
		<view class="exponentWrap">
			<view class="exponentItem" @click="jumpExponent(item, true)" v-for="item in exponentData" :class="[item.gainPoint < 0 ? 'fall' : 'rise']" :key="item.name">
				<view class="exponentName">{{item.name | defaultValue}}</view>
				<view class="exponentNum">{{item.newPrice | price}}</view>
				<view class="exponentInfo">
					<view class="num">{{item.gainPoint | formatNum}}</view>
					<view class="precent">{{item.gain | formatPrecent}}</view>
				</view>
			</view>
		</view>
		
		<view class="contrast">
			<ths-contrast :rise="rise" :fall="fall"></ths-contrast>
		</view>
		
		<!-- <ths-headline :newsList="newsList" :upDate="newsUpdate" v-if="newsList.length > 0"></ths-headline> -->
		
		<view class="todayPlate">
			<ths-todayplate :hotConcept="hotConcept" :hotIndustry="hotIndustry" :maximumHeatInFiveDays="maximumHeatInFiveDays"></ths-todayplate>
		</view>
		
		<view class="ths-list-model"></view>
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
			@changeList="changeList" 
			:titShow="true" 
			@sortData="sortData" 
			:inverted="inverted"
			@jump="jump"
			:sortTypeStatus="sortTypeStatus"
			:showSpecialText="noShowRank"
			:specialText="specialText">
		</ths-unify-list>
		<view class="awardPop" v-if="showAwardPop && isShowAdDialog">
			<image @tap="showAwardPop = false" class="popClose" src="../../static/phone_close.png" mode="widthFix"></image>
			<image @tap="awardUrl" class="awardImage" :src="indexADImg" mode="widthFix"></image>
		</view>
		<ths-popUp :showPop="showPop" @changePopUpState="changePopUpState" @exitLogin="exitLogin" :popUpType="popUpType"></ths-popUp>
		
		
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	import dialogConfig from '../../static/lib/indexDialog.js'
	import func from '../../static/lib/tool.js'
	import qsort from '../../static/lib/sort.js'
	import quickSort from '../../static/lib/quickSort.js'
	import checkData from '../../static/lib/checkData.js'
	import api from '../../http/api.js'
	import { hxmPageStat, hxmClickStat } from '../../utils/stat.js'
	export default {
		data() {
			return {
				isShowIndexDialog: false,//首页弹窗是否配置
				indexDialogImg: '',//首页弹窗配置图片
				indexDialogGotoUrl: '',//首页弹窗跳转链接
				indexDialogShow: true,//首页弹窗与遮罩层控制器
				isShowAdDialog: false,//配置文件中的广告位弹窗控制
				indexADImg:'',//首页广告位配置图片
				indexADGotoUrl:'',//首页广告位跳转链接
				indexDialogCount: 1, //计数是用户第几次进入首页
				jyrInfo: {
					iconSrc: '',
					text: ''
				},
				nowDate: '',
				jyrIconArr: [
					'../../static/noOpen.png',
					'../../static/gather.png',
					'../../static/gather.png',
					'../../static/opening.png',
					'../../static/noon.png',
					'../../static/opening.png',
					'../../static/closeOpen.png'],
				jyrTextArr: ['未开盘', '集合竞价中', '即将开盘', '开盘中', '午间休盘', '开盘中', '已收盘'],
				jyrType: '',
				showAccount: false,
				listScrollTop: '',//列表距离上顶部的距离
				listNowTop: '',//列表目前距离上顶部的距离
				inverted: false,
				getNavInfo: {
					bgColor: '',
					title: ''
				},
				showPop: false,
				isTop: false,
				fixedTop: '',
				exponentData: [{
					name: '上证指数',
					newPrice: '',
					gainPoint: '',
					gain: ''
				},{
					name: '深证成指',
					newPrice: '',
					gainPoint: '',
					gain: ''
				},{
					name: '创业板指',
					newPrice: '',
					gainPoint: '',
					gain: ''
				}],
				time: '',
				openType: 4,
				listActive: '1',
				newsUpdate: '',
				newsList: [],
				rise: '',
				fall: '',
				hotConcept: [
					{"blockGain":"","blockName":"","blockid":"","sharesGain":"","sharesName":"","sharesid":""},
					{"blockGain":"","blockName":"","blockid":"","sharesGain":"","sharesName":"","sharesid":""},
					{"blockGain":"","blockName":"","blockid":"","sharesGain":"","sharesName":"","sharesid":""},
				],
				hotIndustry: [
					{"blockGain":"","blockName":"","blockid":"","sharesGain":"","sharesName":"","sharesid":""},
					{"blockGain":"","blockName":"","blockid":"","sharesGain":"","sharesName":"","sharesid":""},
					{"blockGain":"","blockName":"","blockid":"","sharesGain":"","sharesName":"","sharesid":""},
				],
				maximumHeatInFiveDays: [
					{"blockGain":"","blockName":"","blockid":"","sharesGain":"","sharesName":"","sharesid":""},
					{"blockGain":"","blockName":"","blockid":"","sharesGain":"","sharesName":"","sharesid":""},
					{"blockGain":"","blockName":"","blockid":"","sharesGain":"","sharesName":"","sharesid":""},
				],
				titArr: ['newPrice', 'gain', 'gainSpeed'],
				titDataType: [0,1,1],
				colorKey: 'gain',
				listArr: ['resultListByGain', 'resultListByGainDESC', 'resultListByTotal', 'resultListByGainSpeed'],
				nowList: '',//记录当前排序的类型
				listData: [],
				titText: '股票排行',
				optionText: ['涨幅榜','跌幅榜','成交额','涨速榜'],
				infoTit: ['最新价', '涨跌幅', '涨速'],
				sortArr: ['2', '2', '2', '3'],//不同类型默认排序选项
				sortTypeStatus: '2',//重置排序选项
				resultListByGain: [{"code":"--","gain":"--","gainPoint":"--","gainSpeed":"--","id":"--","name":"--","newPrice":"--","suspend":"--","total":"--","yesterdayPrice":"--"}], 
				resultListByGainDESC: [{"code":"--","gain":"--","gainPoint":"--","gainSpeed":"--","id":"--","name":"--","newPrice":"--","suspend":"--","total":"--","yesterdayPrice":"--"}], 
				resultListByGainSpeed: [{"code":"--","gain":"--","gainPoint":"--","gainSpeed":"--","id":"--","name":"--","newPrice":"--","suspend":"--","total":"--","yesterdayPrice":"--"}], 
				resultListByTotal: [{"code":"--","gain":"--","gainPoint":"--","gainSpeed":"--","id":"--","name":"--","newPrice":"--","suspend":"--","total":"--","yesterdayPrice":"--"}],
				noShowRank: false,//不显示排行榜数据
				specialText: '当前暂无数据',
				showAwardPop: true,
				popUpType: 'userInfo',//弹出类型
				indexDataTimer: null,//更新首页数据定时器
				isShowIndex: true,//是否在浏览首页
			}
		},
		watch: {
			jyrType() {
				//监听交易日状态值
				this.jyrInfo.iconSrc = this.jyrIconArr[this.jyrType];
				this.jyrInfo.text = this.jyrTextArr[this.jyrType];
			},
			'loginInfo.userid': {
				//监听用户userid值
				handler: function(newValue, oldValue) {
					if(newValue) {
						//有值，存入store中
						let headUrl = `https://u.thsi.cn/avatar/${newValue}1000/${newValue}.gif`;
						this.$store.commit('setHeadUrl', headUrl);
					}
				},
				deep: true
			}
		},
		computed: {
			...mapState(['oldMarketMap', 'newMarketMap','sysInfo','loginInfo']),
		},
		onPageScroll() {
			let that = this;
			const query = uni.createSelectorQuery()
			query.select('.ths-list-model').boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(function(res) {
				if (res[0].top <= 0) {
					that.isTop = true;
					that.fixedTop = '0px';
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
		onShareAppMessage: function( options ){
		　　let that = this;
		　　// 设置菜单中的转发按钮触发转发事件时的转发内容
		　　let shareObj = {
				path: `/pages/index/index`
		　　};
		　　return shareObj;
		},
		onLoad(opt) {
			//获取首页弹窗配置
			this.getIndexDialogData();
			//获取首页广告位配置
			this.getIndexADData();
			//记录首页进入的计数器
			// this.setIndexDialogCount()
			//设置导航栏
			this.setPageNav();
			if(this.loginInfo.userid) {
				//每次首页显示，都获取一下头像，解决app更换头像同步问题
				let headUrl = `https://u.thsi.cn/avatar/${this.loginInfo.userid}1000/${this.loginInfo.userid}.gif`;
				this.$store.commit('setHeadUrl', headUrl);
			}
			// //获取头条数据
			this.getNews();
			//格式化排行数据
			let data = this[this.listArr[this.listActive - 1]];
			this.listData = qsort(data, 0, data.length, this.titArr[0]);
			//开启一个30秒轮询接口的定时器
			//获取首页数据
			this.getIndexData();
			// uni.showShareMenu({
			//   withShareTicket: true
			// })
			let {url, shareType} = opt;
			//页面分享处理 根具ShareType值区分分享情况
			if(shareType=='hq') {
				let {url, marketAndCode, name, isIndex} = opt;
				let jumpUrl;
				if(isIndex == 1) {
					jumpUrl = `${url}?marketAndCode=${marketAndCode}&name=${name}&isIndex={isIndex}`;
				} else {
					jumpUrl = `${url}?marketAndCode=${marketAndCode}&name=${name}`;
				}
				uni.navigateTo({
					url:jumpUrl
				})
				
			} else if(shareType == 'allstock') {
				uni.navigateTo({
					url: url
				})
			} else if(shareType == 'blockdetail') {
				let {url, code} = opt;
				uni.navigateTo({
					url: `${url}?code=${code}`
				})
			} else if(shareType == 'searchstock') {
				uni.navigateTo({
					url: url
				})
			} else if(shareType == 'article') {
				let {seq} = opt;
				uni.navigateTo({
					url: `${url}?seq=${seq}`
				})
			}
			
			//开启定时器
			this.indexDataTimer = setInterval(()=>{
				if(this.isShowIndex) {
					this.getNews();
					this.getIndexData(1);
				}
			}, 30000)
			
			uni.loadFontFace({
			  family: 'THS',
			  source: 'url("https://i.thsi.cn/m/fonts/THSMoneyfont-Medium.ttf")',
			  success() {
			  }
			})
			
			hxmPageStat('free_mp_zfbhangqing');
		},
		onShow() {
			this.getStoreLoginInfo();
			if(!this.isShowIndex) {
				//检测到需要立即更新数据
				this.getNews();
				this.getIndexData(1);
				this.isShowIndex = true;
			}
			if(this.rise && this.fall) {
				let rise = this.rise;
				let fall = this.fall;
				this.rise = 1*rise + 1;
				this.fall = fall*1 - 1;
				setTimeout(()=>{
					this.rise = rise;
					this.fall = fall;
				},0)
			}
		},
		onHide() {
			this.isShowIndex = false;
		},
		methods: {
			getIndexADData(){
				//获取是否展示首页广告位
					const that = this;
					uni.request({
						url: api.getIndexADIsShow,
						method: 'GET',
						time: 3000,
						success: function(res) {
							if (res.data && res.data.code == 0) {
								console.log(res.data.data.zfb_indexAD_isShow,"351");
								that.isShowAdDialog = res.data.data.zfb_indexAD_isShow;
								that.getIndexADImg();//获取弹窗图片
							} else {
								that.isShowAdDialog = false;
								console.log("获取失败");
							}
						},
						fail: function() {
							that.isShowAdDialog = false;
							console.log("getisShowfail");
						}
					});
			},
			getIndexADImg(){
				//获取广告位的图片地址
					const that = this;
					uni.request({
						url: api.getIndexADImg,
						method: 'GET',
						time: 3000,
						success: function(res) {
							if (res.data && res.data.code == 0) {
								console.log(res.data.data.zfb_indexAD_img,"351");
								that.indexADImg = res.data.data.zfb_indexAD_img;
								that.getIndexADUrl();//获取弹窗图片
							} else {
								that.isShowAdDialog = false;
								console.log("获取失败");
							}
						},
						fail: function() {
							that.isShowAdDialog = false;
							console.log("getImgfail");
						}
					});
			},
			getIndexADUrl(){
				//获取广告位的点击跳转地址
					const that = this;
					uni.request({
						url: api.getIndexADGotoUrl,
						method: 'GET',
						time: 3000,
						success: function(res) {
							if (res.data && res.data.code == 0) {
								console.log(res.data.data.zfb_indexAD_gotoUrl,"351");
								that.indexADGotoUrl = res.data.data.zfb_indexAD_gotoUrl;
								// that.getIndexDialogUrl();//获取弹窗图片
							} else {
								that.isShowAdDialog = false;
								console.log("获取失败");
							}
						},
						fail: function() {
							that.isShowAdDialog = false;
							console.log("geturlfail");
						}
					});
			},
			getIndexDialogData(){
				//获取是否展示首页弹窗
					const that = this;
					uni.request({
						url: api.getIndexDialogIsShow,
						method: 'GET',
						time: 3000,
						success: function(res) {
							if (res.data && res.data.code == 0) {
								console.log(res.data.data.zfb_indexDialog_isShow,"351");
								that.isShowIndexDialog = res.data.data.zfb_indexDialog_isShow;
								that.getIndexDialogImg();//获取弹窗图片
							} else {
								that.isShowIndexDialog = false;
								console.log("获取失败");
							}
						},
						fail: function() {
							that.isShowIndexDialog = false;
							console.log("getisShowfail");
						}
					});
			},
			getIndexDialogImg(){
				//获取弹窗的图片地址
					const that = this;
					uni.request({
						url: api.getIndexDialogImg,
						method: 'GET',
						time: 3000,
						success: function(res) {
							if (res.data && res.data.code == 0) {
								console.log(res.data.data.zfb_indexDialog_img,"351");
								that.indexDialogImg = res.data.data.zfb_indexDialog_img;
								that.getIndexDialogUrl();//获取弹窗图片
							} else {
								that.isShowIndexDialog = false;
								console.log("获取失败");
							}
						},
						fail: function() {
							that.isShowIndexDialog = false;
							console.log("getImgfail");
						}
					});
			},
			getIndexDialogUrl(){
				//获取弹窗的点击跳转地址
					const that = this;
					uni.request({
						url: api.getIndexDialogGotoUrl,
						method: 'GET',
						time: 3000,
						success: function(res) {
							if (res.data && res.data.code == 0) {
								console.log(res.data.data.zfb_indexDialog_gotoUrl,"351");
								that.indexDialogGotoUrl = res.data.data.zfb_indexDialog_gotoUrl;
								// that.getIndexDialogUrl();//获取弹窗图片
							} else {
								that.isShowIndexDialog = false;
								console.log("获取失败");
							}
						},
						fail: function() {
							that.isShowIndexDialog = false;
							console.log("geturlfail");
						}
					});
			},
			//点击跳转弹窗地址
			jumpToDailogUrl(){
				console.log(this.indexDialogGotoUrl,"484");
				let url = this.indexDialogGotoUrl;
				uni.navigateTo({
					url:'/pages/middlePage/middlePage?url=' + encodeURIComponent(url) //跳转中转页，由中转页参数跳转？
				})
				// window.open(this.indexDialogGotoUrl)
				// plus.runtime.openURL(this.indexDialogGotoUrl)
			},
			
			// setIndexDialogCount(){
			// 	console.log(sessionStorage.getItem("indexDialogCount"),"326")
			// 	if(!sessionStorage.getItem("indexDialogCount")){
			// 		this.indexDialogShow = true;
			// 	}else{
			// 		this.indexDialogShow = false;
			// 	}
			// },
			// hideIndexDialog(){
			// 	this.indexDialogShow = false;
			// 	// sessionStorage.setItem("indexDialogCount",this.indexDialogCount);
			// },
			setPageNav() {
				this.getNavInfo.bgColor = '#fff';
				this.getNavInfo.title = '同花顺股票';
			},
			jumpSearch() {
				hxmClickStat('free_mp_zfbhangqing.zfbsearch');
				
				uni.navigateTo({
					url: '../searchstock/searchstock'
				})
			},
			jumpExponent(data, isIndex) {
				let marketAndCode
				if(JSON.stringify(this.newMarketMap) != '{}') {
					marketAndCode = func.getMarkAndCode(data.id, data.code, this.newMarketMap)
				} else {
					marketAndCode = func.getMarkAndCode(data.id, data.code, this.oldMarketMap)
				}
				if(marketAndCode && data.name) {
					if(marketAndCode.indexOf('1A0001') > -1){
						// 上证
						hxmClickStat('free_mp_zfbhangqing.zfbshangzheng');
					} else if(marketAndCode.indexOf('399001') > -1){
						// 深证
						hxmClickStat('free_mp_zfbhangqing.zfbshenzheng');
					} else if(marketAndCode.indexOf('399006') > -1){
						// 创业
						hxmClickStat('free_mp_zfbhangqing.zfbchuangye');
					}
					
					uni.navigateTo({
						url: `../hq/hq?marketAndCode=${marketAndCode}&name=${data.name}&isIndex=${isIndex}`
					})
				}
			},
			getIndexData(type) {
				//获取首页数据
				let that = this;
				if(!type) {
					uni.showLoading({
						title: '正在加载中...'
					})
				}
				uni.request({
					url: api.searchIndex,
					method: 'POST',
					time: 3000,
					success(res) {
						uni.hideLoading();
						if(res.data.status_code == 0) {
							//获取首页数据成功
							that.formatIndexData(res.data.result);
						} else {
							if(!type) {
								uni.showToast({
									title: '获取数据失败,请稍候再试',
									icon: 'none'
								})
							}
						}
					},
					fail(err) {
						console.log(err);
						uni.hideLoading();
						if(!type) {
							uni.showToast({
								title: '获取数据失败,请稍候再试',
								icon: 'none'
							})
						}
					}
				})
			},
			formatIndexData(data) {
				this.formatJyr(data.jyr);
				this.formatThreeBlock(data.threeIndexList);
				this.formatTodayBlock(data.hotConcept, data.hotIndustry, data.maximumHeatInFiveDays);
				this.formatRankData(data.resultListByGain, data.resultListByGainDESC, data.resultListByGainSpeed, data.resultListByTotal);
				if(data.szzs) {
					this.rise = data.szzs;
				}
				if(data.xdzs) {
					this.fall = data.xdzs;
				}
			},
			formatJyr(data) {
				if(data.length > 0) {
					let jyrArr = data.split(',');
					this.nowDate = jyrArr[1];
					let jyrType = this.jyrTextArr.indexOf(jyrArr[0]);
					if(jyrType != -1) {
						this.jyrType = jyrType;
					}
				}
			},
			formatThreeBlock(data) {
				if(data) {
					this.exponentData = JSON.parse(data);
				}
			},
			formatTodayBlock(hotConcept, hotIndustry, maximumHeatInFiveDays) {
				//热门概念 热门行业 5日持续
				if(hotConcept) {
					this.hotConcept = JSON.parse(hotConcept);
				}
				if(hotIndustry) {
					this.hotIndustry = JSON.parse(hotIndustry);
				}
				if(maximumHeatInFiveDays) {
					this.maximumHeatInFiveDays = JSON.parse(maximumHeatInFiveDays);
				}
				
			},
			formatRankData(resultListByGain, resultListByGainDESC, resultListByGainSpeed, resultListByTotal) {
				//涨幅 跌幅 涨速 成交
				if(resultListByGain && resultListByGain != '--') {
					this.resultListByGain = JSON.parse(resultListByGain);
				}
				if(resultListByGainDESC && resultListByGainDESC != '--') {
					this.resultListByGainDESC = JSON.parse(resultListByGainDESC);
				}
				if(resultListByGainSpeed && resultListByGainSpeed != '--') {
					this.resultListByGainSpeed = JSON.parse(resultListByGainSpeed);
				}
				if(resultListByTotal && resultListByTotal != '--') {
					this.resultListByTotal = JSON.parse(resultListByTotal);
				}
				if(resultListByGain == '--' && resultListByGainDESC == '--' && resultListByGainSpeed == '--' && resultListByTotal == '--') {
					this.noShowRank = true;
					this.resultListByGain = [];
					this.resultListByGainDESC = [];
					this.resultListByGainSpeed = [];
					this.resultListByTotal = [];
				} else {
					this.noShowRank = false;
				}
				let data = this[this.listArr[this.listActive - 1]];
				if(this.nowList) {
					this.listData = qsort(data, 0, data.length, this.nowList,this.inverted);
				} else {
					this.listData = qsort(data, 0, data.length, this.titArr[1],this.inverted);
				}
			},
			loginComplete(data) {
				// 请求后端接口，进行登录
				let param = {
					data: data,
					http: this.$http
				}
				this.$store.dispatch('loginComplate', param);
			},
			exitLogin() {
				let that = this;
				uni.showToast({
					title: '退出登录中...',
					icon: 'icon'
				})
				//退出登录操作
				let loginInfo = that.loginInfo;
				loginInfo.account = '';
				loginInfo.userid = '';
				loginInfo.expire = '';
				loginInfo.sessionid = '';
				that.$store.commit("setLoginInfo", loginInfo);
				uni.setStorageSync('loginInfo', JSON.stringify(loginInfo));
				that.showAccount = false;
				that.getNavInfo.type = 1;
				that.showPop = false;
				setTimeout(() => {
					uni.showToast({
						title: '退出登录成功',
						icon: 'success'
					})
				},1000);
			},
			itemClick(type) {
				if(type == 1) {
					this.showPop = true;
				} else if(type == 2) {
					uni.navigateTo({
						url: '../feedback/feedback'
					})
				}
			},
			showMenu(type) {
				this.showAccount = !this.showAccount;
			},
			changePopUpState(type, data) {
				if(type == 1) {
					this.showPop = false;
				}
			},
			cancel(type) {
				this.$refs['show' + type].close()
			},
			changeList(type) {
				//设置当前显示那个list
				this.listActive = type;
				//设置当前显示的数据
				let data = this[this.listArr[type - 1]];
				//设置当前list的默认排序选项
				this.sortTypeStatus = this.sortArr[type - 1];
				this.nowList = this.titArr[this.sortTypeStatus- 1];
				//设置默认排序规则
				this.inverted = type == 2 ? true : false;
				//对当前数据进行排序并赋值
				this.listData = qsort(data, 0, data.length, this.titArr[this.sortTypeStatus- 1],this.inverted);//每次点击新的tab后，重置排序规则为第一个
			},
			getNews() {
				let that = this;
				uni.request({
					url: 'https://news.10jqka.com.cn/tapp/news/headline/ths',
					method: 'GET',
					time: 3000,
					data: {},
					success(res) {
						let param = res.data.data;
						if (param && param.length > 0) {
							that.formatNews(param);
						}
					},
					fail() {
						console.log('fail')
					}
				})
			},
			formatNews(data) {
				let arr = [];
				let upDateTime = '';
				data.forEach((item) => {
					if (item.seq && item.webrsid == 'seq_' + item.seq) {
						arr.push(item);
						if (item.rtime > upDateTime) {
							upDateTime = item.rtime;
						}
					}
				})
				this.newsList = arr;
				this.newsUpdate = func.getTime(upDateTime, 1);
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
				let sortData = qsort(this.listData, 0, this.listData.length, this.titArr[type - 1], !isUp);
				this.listData = sortData;
				this.inverted = !isUp;
				this.nowList = this.titArr[type - 1];
			},
			jumpHq() {
				uni.navigateTo({
					url: '../hq/hq'
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
			//跳转广告位链接
			awardUrl() {
				hxmClickStat('kaihu.adv');
				let url = this.indexADGotoUrl; // 支付宝
				// let url = 'https://nkh-ths.showcai.com.cn/?thsChannel=wx_H5_quark_fckh&source=352&branchid=0290'; // 夸克
				// let url = 'https://nkh-ths.showcai.com.cn/?thsChannel=wx_H5_UCweb_fckh&source=352&branchid=0290'; // uc
				uni.navigateTo({
					url: '../webview/webview?url=' + encodeURIComponent(url)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		position: relative;
	}
	.indexDialogFather{
		position: fixed;
		display:flex;
		z-index: 9999;
		top: 13vw;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		.indexFirstDialog{
		// margin-top: 22vw;
		background: #fff;
		width: 74vw;
		height: 800rpx;
		border-radius: 8rpx;
		.indexDialogImg{
			width: 100%;
			height: 100%;
		}
	}
	    .closeIcon{
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		right: 13vw;
		top: 12vw;
	}
	}
	
	.indexDialogcover{
		position: fixed;
		z-index: 9998;
		display: flex;
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.7;
	}
	
	.popUp {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
		z-index: 2000;
		.content {
			width: 100rpx;
			height: 100rpx;
			background-color: #fff;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.topWrap {
		height: 180rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx 0 0;

		.openInfoWrap {
			min-width: 40%;
			.openStat {
				display: flex;
				align-items: center;

				.icon {
					width: 60rpx;
					height: 60rpx;
					margin-top: 12rpx;
					margin-right: 20rpx;
				}

				font-size: 38rpx;
				font-weight: bold;
				color: #323232;
			}

			.date {
				font-family: 'THS';
				padding-top: 18rpx;
				color: #323232;
				font-size: 24rpx;
			}

		}

		.searchWrap {
			display: flex;
			align-items: center;
			width: 343rpx;
			height: 76rpx;
			border-radius: 38rpx;
			box-shadow: 0 2rpx 8rpx 4rpx #f5f5f5;
			font-size: 24rpx;

			.icon {
				width: 32rpx;
				height: 32rpx;
				margin: 0 25rpx;
			}
		}
	}

	.exponentWrap {
		height: 180rpx;
		display: flex;
		padding: 0 32rpx;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		font-size: 24rpx;

		.exponentItem {
			height: 163rpx;
			width: 213rpx;
			border-radius: 16rpx;
			text-align: center;

			&.rise {
				background: linear-gradient(left, #F26312, #E93030);
				box-shadow: 0 8px 24px 0 rgba(233,48,48,0.20);
			}

			&.fall {
				background: linear-gradient(left, #69C311, #009900);
				box-shadow: 0 8px 24px 0 rgba(0,153,0,0.20);
			}

			.exponentName {
				height: auto;
				padding-top: 24rpx;
			}

			.exponentNum {
				font-family: 'THS';
				height: auto;
				padding-top: 7rpx;
				font-size: 34rpx;
			}

			.exponentInfo {
				font-family: 'THS';
				display: flex;
				padding-top: 7rpx;
				justify-content: center;

				.num {
					padding-right: 16rpx;
				}
			}
		}
	}

	.contrast {
		position: relative;
		margin: 32rpx 0;
	}

	.todayPlate {
		margin: 48rpx 0;
	}

	.stockRank {
		.tit {
			font-size: 40rpx;
			padding: 0 0 32rpx 32rpx;
		}

		.optionWrap {
			display: flex;
			align-items: flex-end;
			padding-left: 32rpx;

			.optItem {
				width: 118rpx;
				font-size: 26rpx;
				color: #999;

				&.active {
					font-size: 34rpx;
					color: #323232;

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
	.awardPop {
		position: fixed;
		bottom: 150rpx;
		right: 20rpx;
		width: 217rpx;
		height: 196rpx;
		.popClose {
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			left: 0rpx;
			top: -15rpx;
		}
		.awardImage {
			width: 100%;
			height: 100%;
		}
	}
</style>
