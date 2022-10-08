<script>
	import {
		mapState,
		mapMutations,
		mapActions,
		
	} from 'vuex';
	export default {
		onLaunch: function() {
			//调试使用，清理缓存
			// uni.clearStorage();
			this.getNavHeight();
			this.getStoreLoginInfo();
			this.getiPhoneX();
			this.$store.dispatch("getMarketMap");
			this.init();
			// this.$store.dispatch('getToken',{first: false});
			uni.loadFontFace({
			  family: 'THS',
			  source: 'url("https://i.thsi.cn/m/fonts/THSMoneyfont-Medium.ttf")',
			  success() {
			  }
			})
		},
		globalData: {
			userInfo: null
		},
		onShow: function(opts) {
			if(!this.sysInfo.rheight) {
				this.getNavHeight();
			}
			this.$store.commit('setScene', opts.scene);
		},
		onHide: function() {
		},
		computed: {
			...mapState(['oldMarketMap', 'newMarketMap','sysInfo','loginInfo']),
		},
		methods: {
			...mapActions['getMarketMap'],
			getiPhoneX() {
				uni.getSystemInfo({
					success: res => {
						let model = res.model.replace(/\s/g, '').toLocaleLowerCase();
						let sys = res.system.replace(/\s/g, '').toLocaleLowerCase();
						let xList = ['iphonex', 'iphonrx'];
				
						if (xList.some(item => model.match(item))) {
							this.globalData.isX = true;
							this.$store.commit('setiPhoneX', true);
						}
				
						if (sys.match('ios')) {
							this.globalData.isIOS = true;
						}
						const modelTwo = res.model;
						if (/iphone\sx/i.test(modelTwo) ||
							(/iphone/i.test(modelTwo) && /unknown/.test(modelTwo)) ||
							/iphone\s11/i.test(modelTwo)) {
							this.globalData.isX = true;
							this.$store.commit('setiPhoneX', true);
						}
					},
					fail(err) {
						console.log(err);
						this.getiPhoneX();
					}
				});
			},
			getNavHeight() {
				let that = this;
				this.getSysInfo();
			},
			getSysInfo() {
				let that = this;
				let res = uni.getSystemInfoSync();
				this.formatSysInfo(res);
			},
			formatSysInfo(data) {
				if(data.platform == 'devtools') {
					this.$store.commit("setPlatform", 'pc');
				} else if(data.platform == 'ios') {
					this.$store.commit("setPlatform", 'ios');
				} else if(data.platform == 'android') {
					this.$store.commit("setPlatform", 'android');
				}
			},
			getUserLoginInfo(data) {
				// let that = this;
				// this.$store.dispatch('getToken',{first: true}).then().catch(()=>{
				// 	setTimeout(()=>{
				// 		this.getUserLoginInfo();
				// 	},500)
				// })
			},
			init() {
				// let guidance = uni.getStorageSync('guidance');
				// if(!guidance) {
				// 	this.$store.commit("setShowGuidance", true);
				// }
			}
		}
	};
</script>

<style>
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
	body {
		color: #323232;
		background-color: #FFFFFF;
		/* font-family: 'THS'; */
	}
</style>
