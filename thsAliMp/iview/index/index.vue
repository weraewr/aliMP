<template>
<view class="i-index i-class">
    <scroll-view scroll-y :style="parse.setScrollStyle(height)" @scroll="handlerScroll" :scroll-top="scrollTop">
        <slot></slot>  
        <view class="i-index-fixed" catchtouchstart="handlerTouchMove" catchtouchmove="handlerTouchMove" catchtouchend="handlerTouchEnd">
            <view class="i-index-fixed-item" v-for="(item, index) in fixedData" :key="index" :data-index="index" @tap.stop="handlerFixedTap">{{item}}</view>
        </view>  
        <view class="i-index-tooltip" :style="isTouches ? 'display:block' : 'display:none'">{{currentName}}</view>
    </scroll-view>
</view>
</template>

<script module="parse" lang="wxs" src="./parse.wxs"></script>

<script>

export default {
  data() {
    return {
      scrollTop: 0,
      fixedData: [],
      current: 0,
      timer: null,
      startTop: 0,
      itemLength: 0,
      currentName: '',
      isTouches: false
    };
  },

  components: {},
  props: {
    height: {
      type: String,
      default: '300'
    },
    itemHeight: {
      type: Number,
      default: 18
    }
  },
  externalClasses: ['i-class'],
  relations: {
    '../index-item/index': {
      type: 'child',

      linked() {
        this.updateDataChangeFun();
      },

      linkChanged() {
        this.updateDataChangeFun();
      },

      unlinked() {
        this.updateDataChangeFun();
      }

    }
  },
  methods: {
    loop() {},

    updateDataChangeFun() {
      const indexItems = this.getRelationNodes('../index-item/index');
      const len = indexItems.length;
      const fixedData = this.fixedData;
      /*
       * 使用函数节流限制重复去设置数组内容进而限制多次重复渲染
       * 暂时没有研究微信在渲染的时候是否会进行函数节流
      */

      if (len > 0) {
        if (this.timer) {
          clearTimeout(this.timer);
          this.setData({
            timer: null
          });
        }

        this.timer = setTimeout(() => {
          const data = [];
          indexItems.forEach(item => {
            if (item.data.name && fixedData.indexOf(item.data.name) === -1) {
              data.push(item.data.name);
              item.updateDataChange();
            }
          });
          this.setData({
            fixedData: data,
            itemLength: indexItems.length
          }); //组件加载完成之后重新设置顶部高度

          this.setTouchStartVal();
        }, 0);
        this.setData({
          timer: this.timer
        });
      }
    },

    handlerScroll(event) {
      const detail = event.detail;
      const scrollTop = detail.scrollTop;
      const indexItems = this.getRelationNodes('../index-item/index');
      indexItems.forEach((item, index) => {
        let data = item.data;
        let offset = data.top + data.height;

        if (scrollTop < offset && scrollTop >= data.top) {
          this.setData({
            current: index,
            currentName: data.currentName
          });
        }
      });
    },

    getCurrentItem(index) {
      const indexItems = this.getRelationNodes('../index-item/index');
      let result = {};
      result = indexItems[index].data;
      result.total = indexItems.length;
      return result;
    },

    triggerCallback(options) {
      this.$emit('change', options);
    },

    handlerFixedTap(event) {
      const eindex = event.currentTarget.dataset.index;
      const item = this.getCurrentItem(eindex);
      this.setData({
        scrollTop: item.top,
        currentName: item.currentName,
        isTouches: true
      });
      this.triggerCallback({
        index: eindex,
        current: item.currentName
      });
    },

    handlerTouchMove(event) {
      const data = this;
      const touches = event.touches[0] || {};
      const pageY = touches.pageY;
      const rest = pageY - data.startTop;
      let index = Math.ceil(rest / data.itemHeight);
      index = index >= data.itemLength ? data.itemLength - 1 : index;
      const movePosition = this.getCurrentItem(index);
      /*
       * 当touch选中的元素和当前currentName不相等的时候才震动一下
       * 微信震动事件
      */

      if (movePosition.name !== this.currentName) {
        uni.vibrateShort();
      }

      this.setData({
        scrollTop: movePosition.top,
        currentName: movePosition.name,
        isTouches: true
      });
      this.triggerCallback({
        index: index,
        current: movePosition.name
      });
    },

    handlerTouchEnd() {
      this.setData({
        isTouches: false
      });
    },

    setTouchStartVal() {
      const className = '.i-index-fixed';
      const query = uni.createSelectorQuery().in(this);
      query.select(className).boundingClientRect(res => {
        this.setData({
          startTop: res.top
        });
      }).exec();
    }

  }
};
</script>
<style>
@import "./index.css";
</style>