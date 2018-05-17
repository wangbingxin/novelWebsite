<template>
	<div class="m-tabs">
		<div class="tab" v-for="(item,index) in tabItem">
			<span @click="currentItem(item.value)" :class="{current: currentIndex == item.value && !u_sex, 'current-nv': currentIndex == item.value && u_sex}">{{item.label}}</span>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'm-tabs',
		props: {
			items: {
				type: Array,
				default(){
					return []
				}
			},
			default: {
				default(){
					return (this.items[0] && this.items[0].value) || 1
				}
			}
		},
		computed:{
			...Vuex.mapGetters(['u_sex', 'sex_color'])
		},
		data(){
			return {
				currentIndex: this.default,
				tabItem: this.generateTab()
			}
		},
		methods:{
			currentItem(val){
				if(this.currentIndex !== val){
					this.currentIndex = val
					this.$emit('change-item', val)
				}
			},
			generateTab(){
				return this.items.map((item,index)=>{
					if(typeof item === 'string'){
						return {
							label: item,
							value: index+1
						}
					}else{
						return item
					}
				})
			}
		},
		install(Vue) {
		    Vue.component(this.name, this);
		}
	}
</script>
<style lang="scss" scoped>
	@import '../assets/style/vars.sass';
	.m-tabs{
		padding: .2rem 0;
		background-color: #fff;
		text-align: center;
		font-size: 0;
		.tab{
			display: inline-block;
			margin-left: .02rem;
		}
		span{
			display: table-cell;
			padding: 0 .3rem;
			height: .7rem;
			vertical-align: middle;
			background-color: $lightwhite;
			border-radius: .04rem;
			font-size: .28rem;
		}
		.current{
			background-color: $green;
			color: #fff;
		}
		.current-nv{
			background-color: $red;
			color: #fff;
		}
	}
</style>