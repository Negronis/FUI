<template>
	<div>
		<h3>按钮组</h3>
		<div>
			<FButton to='/func'>你好</FButton>
			<FButton shape='circle'>你好</FButton>
			<FButton type='error' shape='circle'>你好</FButton>
			<FButton type='primary' @click="test">你好</FButton>
			<FButton type='warning' size='large' shape='circle'>你好</FButton>
			<FButton type='success' size='small' shape='circle'>你好</FButton>
			<FButton @click='test' :disabled="true" type='error' size='percent' shape='circle'>你好</FButton> 
		</div> 
	</div>
</template>

<script>
	export default{
		methods:{
			test(){
				alert('测试按钮');
			}
		}
	}
</script>
<style>
</style>
