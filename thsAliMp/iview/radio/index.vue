<template>
<view class="i-class i-radio" @tap.stop="radioChange">
    <i-cell i-class="i-radio-cell">
        <label>
            <radio :value="value" :checked="checked" :color="checked?color:''" :disabled="disabled" :class="'i-radio-radio ' + positionCls"></radio>
            <view class="i-radio-title">{{value}}</view>
        </label>
    </i-cell>
</view>
</template>

<script>
const prefixCls = 'i-radio';
import iCell from "../cell/index";

export default {
  data() {
    return {
      checked: true,
      positionCls: `${prefixCls}-radio-left`
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
    '../radio-group/index': {
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

    radioChange() {
      if (this.disabled) return;
      const item = {
        current: !this.checked,
        value: this.value
      };
      const parent = this.getRelationNodes('../radio-group/index')[0];
      parent ? parent.emitEvent(item) : this.$emit('change', item);
    },

    setPosition() {
      this.setData({
        positionCls: this.position.indexOf('left') !== -1 ? `${prefixCls}-radio-left` : `${prefixCls}-radio-right`
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>