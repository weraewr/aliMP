<template>
	<view class="uni-tabbar">
		<view class="uni-tabbar__item" v-for="(item,index) in tabbar" :key="index" @tap="changeTab(item)">
			<view class="uni-tabbar__bd">
				<view class="uni-tabbar__icon">
					<image v-if="item.pagePath == pagePath" class="icon-img" mode="aspectFit" :src="item.selectedIconPath"></image>
					<image v-else class="icon-img" mode="aspectFit" :src="item.iconPath"></image>
				</view>
			</view>
			<view class="uni-tabbar__label" :class="{'active': item.pagePath == pagePath}">
				{{item.text}}
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			pagePath: String
		},
		data() {
			return {
				page: 'contact',
				showPage: false,
				containerHeight: 400,
				tabbar: [
					//动态切换的菜单，先隐藏，动态插入
					// {
					// 	"pagePath": "/pages/user/user",
					// 	"iconPath": "/static/img/user.png",
					// 	"selectedIconPath": "/static/img/user_on.png",
					// 	"text": "我的"
					// }
				]
			};
		},
		watch: {
			pagePath: {
				handler(val) {
					console.log('pagePath监听===val', val)
				},
				immediate: true
			}
		},
		mounted() {
			// 根据自己的业务需求判断条件为true，替换即可
			if (true) {
				this.tabbar.splice(0, 0, {
			"pagePath": "/pages/index/index",
			"iconPath": "/static/1.png",
			"selectedIconPath": "/static/111.png",
			"text": "行情"
		}, {
			"pagePath": "/pages/optional/optional",
			"iconPath": "/static/2.png",
			"selectedIconPath": "/static/222.png",
			"text": "自选"
		}, {
			"pagePath": "/pages/thskh/thskh",
			"iconPath": "/static/5.png",
			"selectedIconPath": "/static/555.png",
			"text": "开户"
		})
			}
		},
		methods: {
			changeTab(item) {
				this.page = item.pagePath;
				// 使用reLaunch关闭所有的页面，打开新的栏目页面
				uni.reLaunch({
					url: this.page
				});
				// uni.navigateTo({
				// 	url: this.page
				// })
			},
		}
	}
</script>

<style lang="scss" scoped>
	.uni-tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		display: flex;
		justify-content: space-around;
		height: 98upx;
		padding: 16upx 0;
		box-sizing: border-box;
		border-top: solid 1upx white;
		background-color: #fff;
		box-shadow: 0px 0px 17upx 1upx rgba(206, 206, 206, 0.32);

		.uni-tabbar__item {
			display: block;
			line-height: 24upx;
			font-size: 20upx;
			text-align: center;
			width: 25%;
		}

		.uni-tabbar__icon {
			height: 24px;
			line-height: 24px;
			text-align: center;
		}

		.icon {
			display: inline-block;
		}

		.uni-tabbar__label {
			line-height: 24upx;
			font-size: 24upx;
			color: #323232;

			&.active {
				color: #e93030;
			}
		}

		.icon-img {
			height: 24px;
			width: 24px;
		}
	}
</style>

