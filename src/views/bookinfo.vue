<template>
	<div>
		<main-header title="详 情" v-if="!isApp"></main-header>
		<base-info></base-info>
		<fans-ranking></fans-ranking>
		<comment></comment>
		<main-footer></main-footer>
		<go-top></go-top>
	</div>
</template>
<script>
	import MainHeader from "../components/header.vue";
	import MainFooter from "../components/footer.vue";
	import BaseInfo from "../components/bookinfo/BaseInfo.vue";
	import FansRanking from "../components/bookinfo/FansRanking.vue";
	import FansReward from "../components/bookinfo/FansReward.vue";
	import Comment from "../components/bookinfo/Comment.vue";
	import GoTop from '../components/GoTop.vue';

	export default{
		data(){
			return {
				title:"",
				isApp,
				userlikeList:[]
			}
		},
		components:{
			MainHeader,
			MainFooter,
			BaseInfo,
			FansRanking,
			FansReward,
			Comment,
			GoTop
		}
	}
</script>
