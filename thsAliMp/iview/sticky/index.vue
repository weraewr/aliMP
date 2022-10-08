<template>
<view class="i-sticky i-class">
    <slot></slot>
</view>
</template>

<script>

export default {
  data() {
    return {
      timer: null,
      itemLength: 0
    };
  },

  components: {},
  props: {
    scrollTop: {
      type: Number
    }
  },
  watch: {
    scrollTop: function (val) {
      this.updateScrollTopChangeFun();
    }
  },
  externalClasses: ['i-class'],
  relations: {
    '../sticky-item/index': {
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
    updateScrollTopChangeFun() {
      const stickies = this.getRelationNodes('../sticky-item/index');

      if (stickies.length > 0) {
        stickies.forEach(item => {
          if (item) {
            item.updateScrollTopChange(this.scrollTop);
          }
        });
      }
    },

    updateDataChangeFun() {
      const stickies = this.getRelationNodes('../sticky-item/index');

      if (stickies.length > 0) {
        if (this.timer) {
          clearTimeout(this.timer);
          this.setData({
            timer: null
          });
        }

        this.timer = setTimeout(() => {
          stickies.forEach((item, index) => {
            if (item) {
              item.updateDataChange(index);
            }
          });
        }, 0);
        this.setData({
          timer: this.timer
        });
      }
    }

  }
};
</script>
