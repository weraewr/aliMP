<template>
<i-cell-group class="i-class">
    <slot></slot>
</i-cell-group>
</template>

<script>
import iCellGroup from "../cell-group/index";

export default {
  data() {
    return {};
  },

  components: {
    iCellGroup
  },
  props: {
    current: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    current: {
      handler: 'changeCurrent',
      deep: true
    }
  },
  externalClasses: ['i-class'],
  relations: {
    '../checkbox/index': {
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
      let items = this.getRelationNodes('../checkbox/index');
      const len = items.length;

      if (len > 0) {
        items.forEach(item => {
          item.changeCurrent(val.indexOf(item.data.value) !== -1);
        });
      }
    },

    emitEvent(current) {
      this.$emit('change', current);
    }

  }
};
</script>
