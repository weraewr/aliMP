<template>
<view :class="'i-class i-drawer ' + ( visible ? 'i-drawer-show' : '' ) + ' ' + ( 'i-drawer-' + mode )">
    <view v-if="mask" class="i-drawer-mask" @tap="handleMaskClick"></view>
    <view class="i-drawer-container">
        <slot></slot>
    </view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'left' // left right

    }
  },
  externalClasses: ['i-class'],
  methods: {
    handleMaskClick() {
      if (!this.maskClosable) {
        return;
      }

      this.$emit('close', {});
    }

  }
};
</script>
<style>
@import "./index.css";
</style>