<template>
<view :id="name" class="i-class i-collapse-item">
    <view class="i-collapse-item-title-wrap" @tap="trigger">
        <i-icon size="16" type="enter" :i-class="showContent ? 'i-collapse-item-arrow-show' : 'i-collapse-item-arrow'"></i-icon>
        <text class="i-collapse-item-title i-class-title">{{title}}</text>
    </view>
    <view :class="'i-collapse-item-content ' + showContent + '  i-class-content'">
        <slot name="content"></slot>
    </view>
</view>
</template>

<script>
import iIcon from "../icon/index";

export default {
  data() {
    return {
      showContent: '',
      accordion: false
    };
  },

  components: {
    iIcon
  },
  props: {
    title: String,
    name: String
  },
  externalClasses: ['i-class-content', 'i-class-title', 'i-class'],
  relations: {
    '../collapse/index': {
      type: 'parent',
      linked: function (target) {
        const options = {
          accordion: target.data.accordion
        };

        if (target.data.name === this.name) {
          options.showContent = 'i-collapse-item-show-content';
        }

        this.setData(options);
      }
    }
  },
  options: {
    multipleSlots: true
  },
  methods: {
    trigger(e) {
      const data = this;

      if (data.accordion) {
        this.$emit('collapse', {
          name: data.name
        }, {
          composed: true,
          bubbles: true
        });
      } else {
        this.setData({
          showContent: data.showContent ? '' : 'i-collapse-item-show-content'
        });
      }
    }

  }
};
</script>
<style>
@import "./index.css";
</style>