<template>
<view class="i-class i-steps">
    <slot></slot>
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
      type: Number,
      default: -1
    },
    status: {
      type: String,
      //wait、process、finish、error
      default: ''
    },
    direction: {
      type: String,
      //value has horizontal or vertical 
      default: 'horizontal'
    }
  },
  watch: {
    current: '_updateDataChange'
  },
  externalClasses: ['i-class'],
  relations: {
    '../step/index': {
      type: 'child',

      linked() {
        this.updateDataChangeFun();
      },

      linkChanged() {
        this.updateDataChangeFun();
      },

      unlinked() {
        this.updateDataChangeFun();
      }

    }
  },
  methods: {
    updateDataChangeFun() {
      let steps = this.getRelationNodes('../step/index');
      const len = steps.length;

      if (len > 0) {
        steps.forEach((step, index) => {
          step.updateDataChange({
            len: len,
            index: index,
            current: this.current,
            direction: this.direction
          });
        });
      }
    }

  }
};
</script>
<style>
@import "./index.css";
</style>