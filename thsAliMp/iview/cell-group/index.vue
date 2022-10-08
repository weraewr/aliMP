<template>
<view class="i-class i-cell-group">
    <slot></slot>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {},
  externalClasses: ['i-class'],
  relations: {
    '../cell/index': {
      type: 'child',

      linked() {
        this.updateIsLastCellFun();
      },

      linkChanged() {
        this.updateIsLastCellFun();
      },

      unlinked() {
        this.updateIsLastCellFun();
      }

    }
  },
  methods: {
    updateIsLastCellFun() {
      let cells = this.getRelationNodes('../cell/index');
      const len = cells.length;

      if (len > 0) {
        let lastIndex = len - 1;
        cells.forEach((cell, index) => {
          cell.updateIsLastCell(index === lastIndex);
        });
      }
    }

  }
};
</script>
