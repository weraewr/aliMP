<template>
	<view>
		<i-toast id="toast"></i-toast>
		<PageWrap>
			<view class="artWrap" v-if="!loading">
				<view class="artTitle">{{title}}</view>
				<view class="artInfo">
					<text class="artFrom">{{from}}</text>
					<text class="artDate">{{date}}</text>
				</view>
				<view class="artCont">
					<jyf-parser :html="article_article"></jyf-parser>
				</view>
				<view class="artRelief">免责声明：本文转载上述内容出于传递更多信息之目的，不代表同花顺财经观点。同花顺力求保证数据的完全正确，如有错漏请以证监会指定上市公司信息披露平台为准。各类信息服务基于人工智能算法，投资据此操作，风险自担。</view>
				<!-- <button v-if="fromApp" :class="'backToApp ' + (backToAppShow ? 'backToAppActive' : '')" open-type="launchApp"
				 app-parameter="wechat" @error="launchAppError">
					<text>打开同花顺</text>
					<image class="backToAppIcon" src="../../static/point.png"></image>
				</button> -->
				<view :class="'artBot ' + (isX ? 'artBotIphoneX' : '')">
					<!-- <view class="artBotBack" @tap="handleToIndex">
        <image class="artBotBackIcon" src="../../static/back.png"></image>
        <text class="artBotBackText">返回要闻</text>
      </view> -->
					<view class="artBotShare">
						<text class="artBotShareText">分享至：</text>
						<button class="artBotShareBtn" open-type="share">
							<image class="artBotShareIcon" src="../../static/share.png"></image>
						</button>
					</view>
				</view>
			</view>
		</PageWrap>
		<!-- <canvas canvas-id="shareCanvas" style="width:420px;height:336px;position: absolute;left:-420px"></canvas> -->
	</view>
</template>

<script>
	//index.js
	//获取应用实例
	const app = getApp().globalData;

	const util = require("../../utils/util");
	const url = require("../../utils/url");
	// const WxParse = require('../../utils/wxParse/wxParse')
	const {
		$Toast
	} = require("../../iview/base/index");
	// const {
	// 	getShareImg
	// } = require("../../utils/getShare");
	let timer = null;
	let delay = null;
	let sharePath = null;
	import iToast from "../../iview/toast/index";
	import PageWrap from "../../components/pageWrap/index";

	export default {
		data() {
			return {
				seq: 0,
				title: '',
				from: '',
				date: '',
				wechat: {},
				fromApp: false,
				backToAppShow: true,
				artCont: '',
				loading: true,
				isX: false,
				article_article: ""
			};
		},

		components: {
			iToast,
			PageWrap
		},
		props: {},
		onShareAppMessage: function() {
			let url = '/pages/article/article'
			return {
				title: this.title,
				imageUrl: sharePath,
				path: `/pages/index/index?url=${url}&seq=${this.seq}&shareType=article`,
				success: function(res) {},
				fail: function(err) {}
			}
		},
		onLoad: function(opt) {
			// let appOpt = uni.getLaunchOptionsSync(); // 在顶部三个点中开启转发功能
			// uni.showShareMenu()
			
			// 判断是否来自app
			// this.setData({
			// 	fromApp: util._isFromApp(appOpt.scene)
			// }); 
			
			// 判断是否为iphoneX
			if (getApp().globalData.isX) {
				this.setData({
					isX: true
				});
			}

			let {
				seq
			} = opt;
			this.seq = seq;
			this.setData({
				loading: true
			});
			
			console.log('文章详情',url.newsArticle(seq))
			util._get({
				url: url.newsArticle(seq)
			}).then(data => {
				if (data.status_code === 0) {
					this.setData({
						loading: false,
						title: data.data.title || '',
						from: data.data.source || '',
						date: util.formatTime(new Date(data.data.ctime * 1000)) || Date.parse(new Date()),
						artCont: data.data.content || ''
					});
					// WxParse.wxParse('article', 'html', data.data.content, this, 0)
					setTimeout(() => {
						this.article_article = data.data.content;
					}, 200);
					let summ = data.data.content.replace(/\s/g, '').replace(/<(.*?)>/g, '');
					// getShareImg({
					// 	from: data.data.source || '',
					// 	cont: summ,
					// 	ctx: uni.createCanvasContext('shareCanvas'),
					// 	success: path => {
					// 		sharePath = path; // 在顶部三个点中开启转发功能
					// 		uni.showShareMenu();
					// 	}
					// });
				} else {
					$Toast({
						content: '文章加载失败',
						type: 'error'
					});
				} // console.log(data)

			}).catch(e => {
				console.error(e);
			}); // let article = this.data.artCont;

			/**
			 * WxParse.wxParse(bindName , type, data, target,imagePadding)
			 * 1.bindName绑定的数据名(必填)
			 * 2.type可以为html或者md(必填)
			 * 3.data为传入的具体数据(必填)
			 * 4.target为Page对象,一般为this(必填)
			 * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
			 */
			// let that = this;
			// WxParse.wxParse('article', 'html', article, that, 5)

		},
		methods: {
			// 跳转回首页
			handleToIndex: function() {
				if (getCurrentPages().length > 1) {
					uni.navigateBack({
						delta: getCurrentPages().length - 1
					});
				} else {
					uni.reLaunch({
						url: '/pages/news/news'
					});
				}
			},
			launchAppError: function(e) {
			},
			onPageScroll: function(e) {
				if (!this.fromApp) return;
				if (this.backToAppShow) this.setData({
					backToAppShow: false
				});

				if (timer) {
					clearTimeout(timer);
					timer = null;
				}

				if (!timer) {
					timer = setTimeout(() => {
						clearTimeout(timer);
						clearTimeout(delay);
						timer = null;
						delay = setTimeout(() => {
							if (!this.backToAppShow) this.setData({
								backToAppShow: true
							});
						}, 800);
					}, 50);
				}
			}
		}
	};
</script>
<style>
	@import "./index.css";
</style>
