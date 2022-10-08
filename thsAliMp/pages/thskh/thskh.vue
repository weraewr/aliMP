<template>
	<view>
		<view class="thskh">
		<web-view :src="webSrc" class="thskhView"></web-view>
	    </view>
		
	    
	</view>
	
</template>

<script>
	import {
		hxmPageStat
	} from '../../utils/stat.js'
	export default {
		data() {
			return {
				webSrc: 'https://eq.10jqka.com.cn/webpage/open-account/index.html#/',
				url: '',
			};
		},
		onShow() {
			hxmPageStat('free_mp_zfbkaihu')
		},
		onLoad(opt) {
			let {
				url
			} = opt;
			if (!url) {
				return;
			}
			this.webSrc = decodeURIComponent(url);
		},
	}
</script>

<style lang="less">
.thskh{
	position: relative;
	
}.thskhView{
		height: 70vh;
	}
</style>
