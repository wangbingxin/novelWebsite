<template>
	<div class="m-msg">
		<div>{{text}}</div>
	</div>
</template>
<script>
	export default{
		name: 'm-msg',
		props: {
			text:{
				type:String,
				default(){
					return ''
				}
			},
			type:{
				type:String,
				default(){
					return 'info'
				}
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		install(Vue) {
		    Vue.component(this.name, this);
		}
	}
</script>
<style lang="scss" scoped>
	@import '../assets/style/vars.sass';
	.m-msg{
		
	}
</style>