<template>
<view class="i-class i-badge">
    <slot></slot>
    <view class="i-badge-dot" v-if="dot"></view>
    <view class="i-badge-count i-class-alone" v-else-if="count !== 0">{{ finalCount }}</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      finalCount: 0
    };
  },

  components: {},
  props: {
    count: {
      type: Number,
      default: 0
    },
    overflowCount: {
      type: Number,
      default: 99
    },
    dot: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    count: 'finalCount'
  },
  externalClasses: ['i-class', 'i-class-alone'],
  methods: {
    finalCountFun() {
      this.setData({
        finalCount: parseInt(this.count) >= parseInt(this.overflowCount) ? `${this.overflowCount}+` : this.count
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>