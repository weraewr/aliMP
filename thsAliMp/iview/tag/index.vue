<template>
<view :class="'i-class i-tag ' + parse.getClass(color,type,checked,checkable) + ' ' + (checkable ? '' : 'i-tag-disable')" @tap="tapTag">
    <slot></slot>
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
    //slot name
    name: {
      type: String,
      default: ''
    },
    //can click or not click
    checkable: {
      type: Boolean,
      default: false
    },
    //is current choose
    checked: {
      type: Boolean,
      default: true
    },
    //background and color setting
    color: {
      type: String,
      default: 'default'
    },
    //control fill or not
    type: {
      type: String,
      default: 'dot'
    }
  },
  externalClasses: ['i-class'],
  methods: {
    tapTag() {
      const data = this;

      if (data.checkable) {
        const checked = data.checked ? false : true;
        this.$emit('change', {
          name: data.name || '',
          checked: checked
        });
      }
    }

  }
};
</script>
<style>
@import "./index.css";
</style>