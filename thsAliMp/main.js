import Vue from 'vue'
import App from './App'
import store from './store'
import filters from './filters'
import httpHead from './http/index.js'


Vue.config.productionTip = false
Vue.prototype.$store = store

Vue.prototype.$http = httpHead

Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			let keys = [];
			let val, data;
			Object.keys(obj).forEach(function(key) {
				keys = key.split('.');
				val = obj[key];
				data = that.$data;
				keys.forEach(function(key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val);
					} else {
						if (!data[key2]) {
							that.$set(data, key2, {});
						}
					}
					data = data[key2];
				})
			});
			callback && callback();
		},
		getStoreLoginInfo() {
			let userLoginInfo = uni.getStorageSync('loginInfo');
			if (userLoginInfo) {
				//检查session_key是否过期
				let data = JSON.parse(userLoginInfo);
				this.checkSession(data);
			}
		},
		checkSession(data) {
			let expire = data.expire || 0;
			if(expire*1000 < (+new Date())) {
				// 已过期，清空数据
				let loginInfo = {};
				loginInfo.account = '';
				loginInfo.userid = '';
				loginInfo.expire = '';
				loginInfo.sessionid = '';
				this.$store.commit("setLoginInfo", loginInfo);
				uni.setStorageSync('loginInfo', JSON.stringify(loginInfo));
			} else {
				// 未过期
				this.$store.commit("setLoginInfo", data);
			}
		}
	}
});

App.mpType = 'app'

Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName])
})

const app = new Vue({
	...App
})
app.$mount()
