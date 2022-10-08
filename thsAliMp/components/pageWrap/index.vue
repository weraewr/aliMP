<template>
<view :class="'pageWrap ' + (isX ? 'pageIphoneX' : '')">
  <slot></slot>
</view>
</template>

<script>
const app = getApp().globalData;

export default {
  data() {
    return {
      isX: false
    };
  },

  components: {},
  props: {},
  beforeMount: function () {
    if (getApp().globalData.isX) {
      this.setData({
        isX: true
      });
    }
  },
  methods: {}
};
</script>
<style>
@import "./index.css";
</style>