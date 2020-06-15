<template>
	<component :is='tagName' v-bind='tagProps' :class='cardClass'>
		<div :class='headClass' v-if='showHead'>
			<slot name='title'>
				<p v-if='title'>
					<span>{{title}}</span>
				</p>
			</slot>
		</div>
		<div :class='bodyClass'>
			<slot></slot>
		</div>
	</component>
</template>

<script>
	const prefixCls = 'fui-card'
	export default{
		name:"FCard",
		props: {
			title : {
				type:String
			},
			bordered:{
				type:Boolean, 
			},
			disHover:{
				type:Boolean, 
			},
			shadow:{
				type:Boolean
			}
		},
		data(){
			return {
				showHead:true
			}
		},
		mouted(){
			this.showHead = this.title || this.$slots.title !== undefined;
		},
		computed:{
			tagName(){
				return 'div'
			},
			cardClass(){
				return [`${prefixCls}`,
					{
						[`${prefixCls}-bordered`]:this.bordered && !this.shadow,
						[`${prefixCls}-dis-hover`]:this.disHover || this.shadow,
						[`${prefixCls}-shadow`]: this.shadow,
					},
				]
			},
			headClass(){
				return  `${prefixCls}-head`;
			},
			bodyClass(){
				return  `${prefixCls}-body`;
			},
			tagProps(){
				return {};
			}
		}
	}
</script>

<style>
</style>
