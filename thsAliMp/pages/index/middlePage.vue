<template>
	<view class="thskh">
		<web-view :src="webSrc"></web-view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                webSrc:''
            }
        },
        onLoad(opt) {
			// console.log(opt.url,"155")
            let {
            	url
            } = opt;
            if (!url) {
            	return;
            }
			
            let decodeUrl = decodeURIComponent(url);
			this.webSrc = decodeUrl;
			console.log(this.webSrc,"23")
        }
    }
</script>

<style>
</style>