<template>
<view class="i-class i-row"><slot></slot></view>
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
    '../col/index': {
      type: 'child'
    }
  },
  methods: {}
};
</script>
<style>
@import "./index.css";
</style>