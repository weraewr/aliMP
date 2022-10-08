<template>
<view :class="'i-class i-switch ' + parse.setSize(size) + ' ' + parse.setCurrent(value,disabled)" @tap="toggle">
    <input type="text" :name="name" :value="value" class="i-switch-hide-input"></input>
    <view class="i-switch-inner" v-if="value === true">
        <slot name="open"></slot>
    </view>
    <view class="i-switch-inner" v-else>
        <slot name="close"></slot>
    </view>
</view>
</template>

<script module="parse" lang="wxs" src="./parse.wxs"></script>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    //large small default
    size: {
      type: String,
      default: 'default'
    },
    // is or not disable
    disabled: {
      type: Boolean,
      default: false
    },
    // hidden inut name
    name: {
      type: String,
      default: ''
    }
  },
  externalClasses: ['i-class'],
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true
  },
  methods: {
    toggle() {
      if (this.disabled) return;
      const data = this;
      const value = data.value ? false : true;
      this.$emit('change', {
        value: value
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>