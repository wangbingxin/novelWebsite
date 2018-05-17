<template>
	<header>
		<div class="left"><a @click="back"></a></div>
		<div class="center" v-if="catalog">
			<router-link :to="{name:'catalog',params:{book_id:book_id}}">{{title}}</router-link>
		</div>
		<div class="center" v-else>{{title}}</div>
		<div class="right">
			<router-link to="/bookshelf" class="shelf"></router-link>
			<router-link to="/" class="home"></router-link>
		</div>
	</header>
</template>
<script>
	export default{
		props:["title"],
		data(){
			return {
				catalog:false,
				book_id:this.$route.params.book_id
			}
		},
		mounted(){
			if(this.$route.name=='book'){
				this.catalog=true;
			}
		},
		methods:{
			back(){
				this.$router.back()
			}
		}
	}
</script>