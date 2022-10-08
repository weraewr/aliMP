<template>
	<view class="webview">
		<view>
			<web-view :src="webSrc" v-if="webSrc"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webSrc: '',
				url: ''
			};
		},
		onShow() {
			
		},
		onLoad(opt) {
			let url = opt.url;
			if(!url) {
				return ;
			}
			let decodeUrl = decodeURIComponent(url);
			this.webSrc = decodeUrl;
			console.log(this.webSrc,"23");
			console.log(typeof(this.webSrc))
		},
		computed: {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	
</style>
