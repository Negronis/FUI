<template>
  <div id="app">
		<FButtonEx></FButtonEx>
		<FCardEx></FCardEx>
  </div>
</template>

<script> 
import FButtonEx from './components/FButton/index.vue';
import FCardEx from './components/FCard/index.vue';
export default { 
	components:{
		FButtonEx,FCardEx
	}
}
</script>

<style lang='less'>
 @import '../style/index.less';
</style>
