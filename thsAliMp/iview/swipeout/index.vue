<template>
<view class="i-swipeout-wrap i-class">
    <view class="i-swipeout-item" @touchstart="handlerTouchstart" @touchmove="handlerTouchmove" @touchend="handlerTouchend" :style="parse.setPosition(position)">
        <view class="i-swipeout-content">
            <slot name="content"></slot>
        </view>
        <view class="i-swipeout-button-right-group" v-if="actions.length > 0" catchtouchend="loop">
            <view class="i-swipeout-button-right-item" v-for="(item, index) in actions" :key="index" :style="parse.setStyle(item) + ';width:' + item.width + 'px;'" :data-index="index" @tap="handlerButton">
                <i-icon v-if="item.icon" :type="item.icon" :size="item.fontsize" :color="item.color">
                </i-icon>{{item.name}}</view>
        </view>
        <view class="i-swipeout-button-right-group" catchtouchend="loop" @tap="handlerParentButton" v-if="actions.length === 0" :style="'width:' + operateWidth + 'px;right:-' + operateWidth + 'px;'">
            <slot name="button"></slot>
        </view>
    </view>
</view>
</template>

<script module="parse" lang="wxs" src="./parse.wxs"></script>

<script>
/*
* touch事件判断方式
* https://github.com/madrobby/zepto/blob/master/src/touch.js#files
*/
function swipeDirection(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
}
import iCell from "../cell/index";
import iIcon from "../icon/index";

export default {
  data() {
    return {
      //touch start position
      tStart: {
        pageX: 0,
        pageY: 0
      },
      //限制滑动距离
      limitMove: 0,
      //element move position
      position: {
        pageX: 0,
        pageY: 0
      }
    };
  },

  components: {
    iCell,
    iIcon
  },
  props: {
    actions: {
      default: () => [],
      type: Array
    },
    unclosable: {
      default: false,
      type: Boolean
    },
    toggle: {
      default: false,
      type: Boolean
    },
    operateWidth: {
      type: Number,
      default: 160
    }
  },
  watch: {
    actions: {
      handler: '_updateButtonSize',
      deep: true
    },
    toggle: 'closeButtonGroup'
  },
  externalClasses: ['i-class'],
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true
  },

  mounted() {
    this.updateButtonSizeFun();
  },

  methods: {
    //阻止事件冒泡
    loop() {},

    updateButtonSizeFun() {
      const actions = this.actions;

      if (actions.length > 0) {
        const query = uni.createSelectorQuery().in(this);
        let limitMovePosition = 0;
        actions.forEach(item => {
          limitMovePosition += item.width || 0;
        });
        this.limitMove = limitMovePosition;
        /*
            * 动态获取每个传进值的按钮尺寸不能正确获取，在安卓上少了6px
            * 暂时实现需要在actions里面传递宽度
            * 需要后期调研
        */
        //query.selectAll('.i-swipeout-button-right-item').boundingClientRect((rects)=>{
        //     if( rects ){
        //         console.log(rects,1111111)
        //         rects.forEach(item => {
        //             limitMovePosition += item.width;
        //         });
        //         this.data.limitMove = limitMovePosition;
        //         console.log(limitMovePosition,111111111)
        //     }
        // }).exec()
      } else {
        this.limitMove = this.operateWidth;
      }
    },

    handlerTouchstart(event) {
      const touches = event.touches ? event.touches[0] : {};
      const tStart = this.tStart;

      if (touches) {
        for (let i in tStart) {
          if (touches[i]) {
            tStart[i] = touches[i];
          }
        }
      }
    },

    swipper(touches) {
      const data = this;
      const start = data.tStart;
      const spacing = {
        pageX: touches.pageX - start.pageX,
        pageY: touches.pageY - start.pageY
      };

      if (data.limitMove < Math.abs(spacing.pageX)) {
        spacing.pageX = -data.limitMove;
      }

      this.setData({
        'position': spacing
      });
    },

    handlerTouchmove(event) {
      const start = this.tStart;
      const touches = event.touches ? event.touches[0] : {};

      if (touches) {
        const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY);

        if (direction === 'Left') {
          this.swipper(touches);
        }
      }
    },

    handlerTouchend(event) {
      const start = this.tStart;
      const touches = event.changedTouches ? event.changedTouches[0] : {};

      if (touches) {
        const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY);
        const spacing = {
          pageX: touches.pageX - start.pageX,
          pageY: touches.pageY - start.pageY
        };

        if (Math.abs(spacing.pageX) >= 40 && direction === "Left") {
          spacing.pageX = spacing.pageX < 0 ? -this.limitMove : this.limitMove;
        } else {
          spacing.pageX = 0;
        }

        this.setData({
          'position': spacing
        });
      }
    },

    handlerButton(event) {
      if (!this.unclosable) {
        this.closeButtonGroup();
      }

      const dataset = event.currentTarget.dataset;
      this.$emit('change', {
        index: dataset.index
      });
    },

    closeButtonGroup() {
      this.setData({
        'position': {
          pageX: 0,
          pageY: 0
        }
      });
    },

    //控制自定义组件
    handlerParentButton(event) {
      if (!this.unclosable) {
        this.closeButtonGroup();
      }
    }

  }
};
</script>
<style>
@import "./index.css";
</style>