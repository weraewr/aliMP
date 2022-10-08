<template>
<view :class="'i-class i-cell i-input ' + ( error ? 'i-input-error' : '' ) + ' ' + ( mode === 'wrapped' ? 'i-input-wrapped' : '' )">
    <view v-if="title" class="i-cell-hd i-input-title">{{ title }}</view>
    <textarea v-if="type === 'textarea'" auto-height :disabled="disabled" :focus="autofocus" :value="value" :placeholder="placeholder" :maxlength="maxlength" :class="'i-input-input i-cell-bd ' + ( right ? 'i-input-input-right' : '' )" placeholder-class="i-input-placeholder" @input="handleInputChange" @focus="handleInputFocus" @blur="handleInputBlur"></textarea>
    <input v-else :type="type" :disabled="disabled" :focus="autofocus" :value="value" :placeholder="placeholder" :maxlength="maxlength" :class="'i-input-input i-cell-bd ' + ( right ? 'i-input-input-right' : '' )" placeholder-class="i-input-placeholder" @input="handleInputChange" @focus="handleInputFocus" @blur="handleInputBlur"></input>
</view>
</template>

<script>

export default {
  data() {
    return {
      value: ""
    };
  },

  components: {},
  props: {
    title: {
      type: String
    },
    // text || textarea || password || number
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'normal'
    },
    right: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number
    }
  },
  mixins: ['wx://form-field'],
  externalClasses: ['i-class'],
  methods: {
    handleInputChange(event) {
      const {
        detail = {}
      } = event;
      const {
        value = ''
      } = detail;
      this.setData({
        value
      });
      this.$emit('change', event);
    },

    handleInputFocus(event) {
      this.$emit('focus', event);
    },

    handleInputBlur(event) {
      this.$emit('blur', event);
    }

  }
};
</script>
<style>
@import "./index.css";
</style>