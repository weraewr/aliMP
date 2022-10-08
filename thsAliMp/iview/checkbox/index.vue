<template>
<view class="i-class i-checkbox" @tap.stop="checkboxChange">
    <i-cell i-class="i-checkbox-cell">
        <label>
            <radio :value="value" :checked="checked" :color="checked?color:''" :disabled="disabled" :class="'i-checkbox-radio ' + positionCls"></radio>
            <view class="i-checkbox-title">{{value}}</view>
        </label>
    </i-cell>
</view>
</template>

<script>
const prefixCls = 'i-checkbox';
import iCell from "../cell/index";

export default {
  data() {
    return {
      checked: true,
      positionCls: `${prefixCls}-checkbox-left`
    };
  },

  components: {
    iCell
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    position: {
      type: String,
      default: 'left'
    }
  },
  watch: {
    position: 'setPosition'
  },
  externalClasses: ['i-class'],
  relations: {
    '../checkbox-group/index': {
      type: 'parent'
    }
  },

  beforeMount() {
    this.setPosition();
  },

  methods: {
    changeCurrent(current) {
      this.setData({
        checked: current
      });
    },

    checkboxChange() {
      if (this.disabled) return;
      const item = {
        current: !this.checked,
        value: this.value
      };
      const parent = this.getRelationNodes('../checkbox-group/index')[0];
      parent ? parent.emitEvent(item) : this.$emit('change', item);
    },

    setPosition() {
      this.setData({
        positionCls: this.position.indexOf('left') !== -1 ? `${prefixCls}-checkbox-left` : `${prefixCls}-checkbox-right`
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>