<template>
<view class="i-class i-rate" @touchmove="handleTouchMove">
    <input type="text" :name="name" :value="value" class="i-rate-hide-input"></input>
    <view v-for="(item, index) in count" :key="index" :class="'i-rate-star ' + parse.getCurrent( value,index )" :data-index="index" @tap="handleClick">
        <i-icon type="collection_fill" :size="size"></i-icon>
    </view>
    <view class="i-rate-text" v-if="value !== 0"><slot></slot></view>
</view>
</template>

<script module="parse" lang="wxs" src="./parse.wxs"></script>

<script>
import iIcon from "../icon/index";

export default {
  data() {
    return {
      touchesStart: {
        pageX: 0
      }
    };
  },

  components: {
    iIcon
  },
  props: {
    count: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 20
    },
    name: {
      type: String,
      default: ''
    }
  },
  externalClasses: ['i-class'],

  mounted() {
    const className = '.i-rate';
    var query = uni.createSelectorQuery().in(this);
    query.select(className).boundingClientRect(res => {
      this.touchesStart.pageX = res.left || 0;
    }).exec();
  },

  methods: {
    handleClick(e) {
      const data = this;

      if (data.disabled) {
        return;
      }

      const index = e.currentTarget.dataset.index;
      this.$emit('change', {
        index: index + 1
      });
    },

    handleTouchMove(e) {
      const data = this;

      if (data.disabled) {
        return;
      }

      if (!e.changedTouches[0]) {
        return;
      }

      const movePageX = e.changedTouches[0].pageX;
      const space = movePageX - data.touchesStart.pageX;

      if (space <= 0) {
        return;
      }

      let setIndex = Math.ceil(space / data.size);
      setIndex = setIndex > data.count ? data.count : setIndex;
      this.$emit('change', {
        index: setIndex
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>