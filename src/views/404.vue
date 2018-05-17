<template>
	<div class="no-find">
		<main-header title="页面未找到"></main-header>
		<div class="view">
			<img src="../imgs/404.jpg">
			<p>
				<router-link to="/">首页</router-link>
				<router-link to="/bookshelf">书架</router-link>
			</p>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	@import '../assets/style/vars.sass';
	.no-find{
		.view{
			margin-top: .9rem;
			img{ width: 7.5rem; }
			p{
				margin-top: .1rem;
				a{
					display: inline-block;
					padding: .2rem 1.1rem;
					border-radius: .05rem;
					background-color: $red;
					color: #fff;
					margin: 0 .4rem;
					border: solid .04rem $red;
					&:last-child{
						background-color: #fff;
						color: $red;
						border: solid .04rem $red;
					}
				}
			}
		}
	}
</style>
<script>
	import MainHeader from "../components/header.vue";
	export default{
		components:{
			MainHeader
		},
		methods:{
			goHome(){
				this.$router.push({path:"/"});
			}
		}
	}
</script>