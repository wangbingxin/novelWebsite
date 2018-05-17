<template>
	<div class="account">
		<main-header title="财务记录"></main-header>
		<m-tabs :items="tabs" :default="$route.name" @change-item="switchTab1" style="margin-top: .9rem;"></m-tabs>
		<div class="container">
			<router-view></router-view>
		</div>
		<main-footer></main-footer>
	</div>
</template>
<style>
	.account .container{
		margin-top: 0;
	}
	.account .tabs a{ padding: .1rem .25rem; margin: 0 .1rem; }
</style>
<script>
	import MainHeader from "../components/header.vue";
	import MainFooter from "../components/footer.vue";
	export default{
		data(){
			return {
				tabs:[
					{
						label: '充值记录',
						value: 'recharge'
					},
					{
						label: '消费记录',
						value: 'consume'
					},
					{
						label: '购买记录',
						value: 'purchase'
					},
					{
						label: '打赏记录',
						value: 'reward'
					}
				],
				activeClass:1
			}
		},
		mounted(){
			if(this.$route.path.indexOf('consume')!=-1) this.activeClass=2
			if(this.$route.path.indexOf('purchase')!=-1) this.activeClass=3
			if(this.$route.path.indexOf('reward')!=-1) this.activeClass=4
		},
		components:{
			MainHeader,
			MainFooter,
		},
		methods:{
			switchTab(index){
				this.activeClass=index;
			},
			switchTab1(val){
				this.$router.replace({ name:val })
			}
		}
	}
</script>