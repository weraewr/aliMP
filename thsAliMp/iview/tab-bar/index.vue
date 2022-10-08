<template>
<view :class="'i-class i-tab-bar ' + ( fixed ? 'i-tab-bar-fixed' : '' )">
    <slot></slot>
    <view class="i-tab-bar-list">
        <view class="i-tab-bar-layer" v-for="(item, index) in list" :key="index" :data-key="item.key" @tap="handleClickItem" :style="'width: ' + ( 100 / list.length ) + '%'"></view>
    </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      list: []
    };
  },

  components: {},
  props: {
    current: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    current: 'changeCurrent'
  },
  externalClasses: ['i-class'],
  relations: {
    '../tab-bar-item/index': {
      type: 'child',

      linked() {
        this.changeCurrent();
      },

      linkChanged() {
        this.changeCurrent();
      },

      unlinked() {
        this.changeCurrent();
      }

    }
  },
  methods: {
    changeCurrent(val = this.current) {
      let items = this.getRelationNodes('../tab-bar-item/index');
      const len = items.length;

      if (len > 0) {
        const list = [];
        items.forEach(item => {
          item.changeCurrent(item.data.key === val);
          item.changeCurrentColor(this.color);
          list.push({
            key: item.data.key
          });
        });
        this.setData({
          list: list
        });
      }
    },

    emitEvent(key) {
      this.$emit('change', {
        key
      });
    },

    handleClickItem(e) {
      const key = e.currentTarget.dataset.key;
      this.emitEvent(key);
    }

  }
};
</script>
<style>
@import "./index.css";
</style>