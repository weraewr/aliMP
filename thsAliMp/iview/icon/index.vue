<template>
<view :class="'i-class i-icon ' + ( type === '' ? '' : 'i-icon-' +  type ) + ' ' + custom" :style="'font-size: ' + size + 'px; ' + ( color ? 'color:' + color : '' )"></view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    type: {
      type: String,
      default: ''
    },
    custom: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 14
    },
    color: {
      type: String,
      default: ''
    }
  },
  externalClasses: ['i-class'],
  methods: {}
};
</script>
<style>
@import "./index.css";
</style>