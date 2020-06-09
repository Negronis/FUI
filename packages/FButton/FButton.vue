<template>
  <component :is="tagName" :class="classBtn" v-bind='tagProp'>
    <span v-if="showSlot">
      <slot></slot>
    </span>
  </component>
</template>

<script>
import {oneOf} from '../../Util/assist.js'; 
import mixinsLink  from '../Mixin/link.js'; 
const prefixCls = 'fui-btn'
export default {
  name: "FButton",
  mixins:[mixinsLink],
  data() {
    return {};
  }, 
  props:{
	type:{ 
		validator(value){
			return oneOf(value,['primary','warning','default','success','error'])
		},
		default:'default'
	}	
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
      return [
		  `${prefixCls}`,
		  `${prefixCls}-${this.type}`,
	  ]
    },
	tagProp(){
		const {isHref} = this;
		if(isHref){
			const {linkUrl,target} = this;
			return {href:linkUrl ,target}
		}else{
			const {type} = this;
			return {type:type};
		}
	} 
  }
};
</script>

<style>
</style>