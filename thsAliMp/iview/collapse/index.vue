<template>
<view class="i-class i-collapse" @collapse="clickfn">
  <slot></slot>
</view>
</template>

<script>

export default {
  data() {
    return {
      showContent: ""
    };
  },

  components: {},
  props: {
    name: String,
    accordion: Boolean
  },
  externalClasses: ['i-class'],
  relations: {
    '../collapse-item/index': {
      type: 'child'
    }
  },
  methods: {
    clickfn(e) {
      const params = e.detail;
      const allList = this.getRelationNodes('../collapse-item/index');
      allList.forEach(item => {
        if (params.name === item.data.name) {
          item.setData({
            showContent: 'i-collapse-item-show-content'
          });
        } else {
          item.setData({
            showContent: ''
          });
        }
      });
    }

  }
};
</script>
