<template>
<view>
<scroll-view v-if="scroll" scroll-x="true" :class="'i-class i-tabs i-tabs-scroll ' + ( fixed ? 'i-tabs-fixed' : '' )"><slot></slot></scroll-view>
<view v-else :class="'i-class i-tabs ' + ( fixed ? 'i-tabs-fixed' : '' )"><slot></slot></view>
</view>
</template>

<script>

export default {
  data() {
    return {};
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
    scroll: {
      type: Boolean,
      default: false
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
    '../tab/index': {
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
      let items = this.getRelationNodes('../tab/index');
      const len = items.length;

      if (len > 0) {
        items.forEach(item => {
          item.changeScroll(this.scroll);
          item.changeCurrent(item.data.key === val);
          item.changeCurrentColor(this.color);
        });
      }
    },

    emitEvent(key) {
      this.$emit('change', {
        key
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>