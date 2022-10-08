<template>
<view :class="'i-class i-col ' + ( span ? 'i-col-span-' + span : '' ) + ' ' + ( offset ? 'i-col-offset-' + offset : '' )"><slot></slot></view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    span: {
      default: 0,
      type: Number
    },
    offset: {
      default: 0,
      type: Number
    }
  },
  externalClasses: ['i-class'],
  relations: {
    '../row/index': {
      type: 'parent'
    }
  },
  methods: {}
};
</script>
<style>
@import "./index.css";
</style>