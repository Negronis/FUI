<template>
  <component :is="tagName" :class="classBtn">
    <span v-if="showSlot">
      <slot></slot>
    </span>
  </component>
</template>

<script>
import mixinsLink  from '../Mixin/link.js';
console.log(mixinsLink)
export default {
  name: "FButton",
  mixins:[mixinsLink],
  data() {
    return {};
  }, 
  computed: {
    showSlot() {
        return !!this.$slots.default
    },
    // 判定是否有:to属性 - router标签
    isHref() {
      let { to } = this; 
      return !!to;
    },
    // 如果存在to则渲染a标签，否则渲染button
    tagName() {
      let { isHref } = this;  
      return isHref ? "a" : "button";
    },
    classBtn(){
      return "";
    }
  }
};
</script>

<style>
</style>