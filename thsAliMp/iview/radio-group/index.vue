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
      type: String,
      default: ''
    }
  },
  watch: {
    current: 'changeCurrent'
  },
  externalClasses: ['i-class'],
  relations: {
    '../radio/index': {
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
      let items = this.getRelationNodes('../radio/index');
      const len = items.length;

      if (len > 0) {
        items.forEach(item => {
          item.changeCurrent(val === item.data.value);
        });
      }
    },

    emitEvent(current) {
      this.$emit('change', current);
    }

  }
};
</script>
