<template>
<view class="i-class i-grid-label"><slot></slot></view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {},
  externalClasses: ['i-class'],
  relations: {
    '../grid-item/index': {
      type: 'parent'
    }
  },
  methods: {}
};
</script>
<style>
@import "./index.css";
</style>