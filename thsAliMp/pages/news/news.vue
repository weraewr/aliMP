<template>
	<!--index.wxml-->
	<!-- <PageWrap> -->
	<view class="container">
		<!-- <view class="school" @tap="goSchool">
			<view class="schoolContent">
				<view class="schoolTitle">股民学校</view>
				<view class="schoolDescript">200w+用户都在学，全网最权威，内容最全面的股市知识教学</view>
			</view>
			<view class="schoolImg"><image src="../../static/gmxx.png"></image></view>
		</view> -->
		<view class="newsTitle">精选要闻</view>
		<view class="newsListWrap">
			<view v-for="(item, index) in list" :key="index" class="newsListItemWrap">
				<view class="newsListItemWrapNoImg" v-if="!item.imgurl" :data-seq="item.seq" :data-index="index+1" @tap="handleShowArticle">
					<view class="newsListItemTitle">{{item.title}}</view>
					<view class="newsListItemDes">{{item.summ}}</view>
					<view class="newsListItemInfo">
						<view class="newsListItemFrom" v-if="item.source">{{item.source}}</view>
						<view class="newsListItemAgo">{{item.ctime}}</view>
					</view>
				</view>
				<view :class="'newsListItemWrapImg ' + (item.readBefore ? 'newsListItemWrapReadBefore' : '')" v-else-if="item.imgurl==='guanggao'" :data-index="index+1"
				 @tap="gotoAD">
					<view class="newsListItemImg">
						<image class="newsListItemImgInner" src="../../static/adPop.png" mode="widthFix"></image>
					</view>
					<view class="newsListItemInnerWrap">
						<view class="newsListItemTitle">{{item.title}}</view>
						<view class="newsListItemInfo">
							<view class="newsListItemFrom" v-if="item.source">{{item.source}}</view>
						</view>
					</view>
				</view>
				<view :class="'newsListItemWrapImg ' + (item.readBefore ? 'newsListItemWrapReadBefore' : '')" v-else :data-seq="item.seq" :data-index="index+1"
				 @tap="handleShowArticle">
					<view class="newsListItemImg">
						<image class="newsListItemImgInner" :src="'https:' + item.imgurl"></image>
					</view>
					<view class="newsListItemInnerWrap">
						<view class="newsListItemTitle">{{item.title}}</view>
						<view class="newsListItemInfo">
							<view class="newsListItemFrom" v-if="item.source">{{item.source}}</view>
							<view class="newsListItemAgo">{{item.ctime}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="newsListLoadMoreWrap">
			<image class="newsListLoadMoreImg" src="../../static/load.png" v-if="!nomore && !reGet"></image>
			<view class="newsListLoadMoreText" v-if="!nomore && !reGet">正在加载更多</view>
			<view class="newsListLoadMoreText" v-if="nomore && !reGet">没有更多了~</view>
			<view class="newsListLoadMoreText" v-if="reGet" @click="reGetData">暂无数据，点击重试</view>
		</view>

		<!-- <Nav default="news"></Nav> -->
	</view>
	<!-- </PageWrap> -->
</template>

<script>
//index.js
//获取应用实例
const utils = require("../../utils/util");
const url = require("../../utils/url");
import { hxmPageStat, hxmClickStat } from '../../utils/stat.js'
let curPage = 1;
let reqListUrl = '';
let version = '1.4.5';
// import Nav from "../../components/nav/index";
// import PageWrap from "../../components/pageWrap/index";

export default {
	data() {
		return {
			list: [],
			loading: false,
			nomore: false,
			readBefore: [],
			sensitiveWordList: [],
			reGet: false,
			lock: false,
			onShareAppMessage: function(options) {
				let that = this;
				// 设置菜单中的转发按钮触发转发事件时的转发内容
				let shareObj = {
					path: `/pages/news/news`
				};
				return shareObj;
			},
			onLoad: function() {
				curPage = 1; // 在顶部三个点中开启转发功能

				// uni.showShareMenu(); // 获取浏览过的列表

				let readBefore = uni.getStorageSync('readBefore') || [];
				this.setData({
					readBefore: readBefore
				}); // 获取首页数据
				// this.methods.getData.call(this, curPage)
				
				this.methods.getSensitiveWord.call(this);
			},
			methods: {
				getSensitiveWord: function() {
					utils._get({
						url: 'https://news.10jqka.com.cn/tapp/global/special/block/normallist?item=Alipay_words'
					}).then(({data}) => {
						const res = data.list[0].name;
						this.methods.getReqUrl.call(this, version);
						this.setData({
							sensitiveWordList: res.substr(1, res.length - 2).split(',')
						});
					}).catch(e => {
						console.error(e);
					});
				},
				// 获取接口
				getReqUrl: function(version) {
					utils._get({
						url: url.getReqUrl(version)
					}).then(({
						data
					}) => {
						if (data.headline) {
							reqListUrl = data.headline;
							this.methods.getData.call(this, curPage);
						}
					}).catch(e => {
						console.error(e);
						this.reGet = true;
					});
				},
				// 返回过滤后的新闻列表
				filterNews: function(newsList) {
					let res = [];
					const sensitive = this.sensitiveWordList;
					for (const news of newsList) {
					    let flag = false;
					    for (const word of sensitive) {
							// 如果新闻标题包含敏感关键词，将flag设为true
					        if (news.title.includes(word)) {
					            flag = true;
					            break;
					        };
					    }
					    if (!flag) {
					        res.push({...news});
					    }
					}
					return res;
				},
				// 获取数据
				getData: function(page, fn) {
					if (this.nomore) return;
					this.setData({
						loading: true
					});

					utils._get({
						url: url.newsList(page, reqListUrl)
					}).then(data => {
						if (data.data && !data.data.more) {
							this.setData({
								nomore: true
							});
						}
						if (data.status_code === 0) {
							this.loading = false;

							if (page === 1) {
								let info = {
									ctime: "",
									imgurl: "guanggao",
									seq: "",
									source: "同花顺官方广告",
									title: "要炒股先开户！现在开户立享高息理财，低费率交易，客户经理1对1服务多重福利！"
								}
								data.data.list.splice(2, 0, info);
								const list = this.methods.filterNews.call(this, data.data.list)
								this.setData({
									loading: false,
									list: this.methods.formatData.call(this, list)
								});
							} else {
								const list = this.methods.filterNews.call(this, data.data.list)
								this.setData({
									loading: false,
									list: this.list.concat(this.methods.formatData.call(this, list))
								});
							}

							curPage++;
						} else {
							this.setData({
								loading: false,
								nomore: true
							});
						}

						if (fn) fn();
					}).catch(e => {
						console.log('获取数据失败了')
						this.setData({
							loading: false,
							nomore: true
						});
						console.error(e);
					});
				},
				// 格式化数据
				formatData: function(arr) {
					let newList = [];
					arr.map(item => {
						newList.push({ ...item,
							readBefore: this.readBefore.indexOf(item.seq) >= 0,
							ctime: utils._timeAgo(item.ctime * 1000)
						});
					});
					return newList;
				}
			}
		};
	},

	// components: {
	//   Nav,
	//   PageWrap
	// },
	props: {},
	onPullDownRefresh: function() {
		if (this.loading) return;
		this.setData({
			nomore: false
		});
		curPage = 1;
		this.methods.getData.call(this, curPage, () => {
			uni.stopPullDownRefresh();
		});
	},
	onReachBottom: function() {
		if (this.loading) return;
		this.methods.getData.call(this, curPage);
	},
	oShow: function() {
		hxmPageStat('free_mp_zfbzixun');
	},
	onLoad: function() {
		curPage = 1;
		// uni.showShareMenu();
		let readBefore = uni.getStorageSync('readBefore') || [];
		this.setData({
			readBefore: readBefore
		});
		this.methods.getSensitiveWord.call(this);
	},
	methods: {
		// 点开文章
		reGetData: function() {
			this.reGet = false;
			setTimeout(() => {
				this.methods.getReqUrl.call(this, version);
			}, 1000)
		},
		handleShowArticle: function(e) {
			if(this.lock) {
				return ;
			}
			this.lock = true;
			
			let {
				seq, index
			} = e.currentTarget.dataset;

			if (seq) {
				hxmClickStat('free_mp_zfbzixun.yaowen.'+index, {targid: 'seq_'+seq});
				
				uni.navigateTo({
					url: `/pages/article/article?seq=${seq}`
				}); // 添加选中的文章seq到本地存储

				let readBefore = this.readBefore || [];
				readBefore.unshift(seq); // 更新已点过的文章的样式

				let newList = this.list;
				newList.map(item => {
					if (item.seq === seq) {
						item.readBefore = true;
					}
				});
				this.setData({
					readBefore: readBefore,
					list: newList
				});
				uni.setStorageSync('readBefore', readBefore);
			}
			setTimeout(()=>{
				this.lock = false;
			}, 1500);
		},
		// 跳转广告
		gotoAD: () => {
			hxmClickStat('kaihu.adv');
			let url = 'https://nkh-ths.showcai.com.cn/?thsChannel=wx_H5_zfb_zxkh&source=352&branchid=0290'; // 支付宝
			// let url = 'https://nkh-ths.showcai.com.cn/?thsChannel=wx_H5_quark_zxkh&source=352&branchid=0290'; // 夸克
			// let url = 'https://nkh-ths.showcai.com.cn/?thsChannel=wx_H5_UCweb_zxkh&source=352&branchid=0290'; // UC
			uni.navigateTo({
				url: '../webview/webview?url=' + encodeURIComponent(url)
			})
		},
		goSchool: function() {
			hxmClickStat('free_mp_zfbzixun.zfbshool')
			
			let url = 'https://t.10jqka.com.cn/m/package/pkgMarket';
			uni.navigateTo({
				url: '../webview/webview?url=' + encodeURIComponent(url)
			})
		}
	}
};
</script>
<style>
	@import "./index.css";
</style>
