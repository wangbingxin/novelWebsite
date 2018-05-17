<template>
	<div class="not-sell">
		<main-header title="书已下架"></main-header>
		<div class="view">
			<img src="../imgs/notsell.jpg">
			<h3>访问首页阅读更多好书</h3>
			<p>
				<router-link to="/">首页</router-link>
				<router-link to="/bookshelf">书架</router-link>
			</p>
		</div>
	</div>
</template>
<style lang="scss">
	@import '../assets/style/vars.sass';
	.not-sell{
		text-align: center;
		.view{
			margin-top: .9rem;
			img{
				width: 7.5rem;
				margin: 0 auto;
				margin-top: .8rem;
			}
			h3{
				font-size: .28rem;
				color: #999;
				margin-top: .3rem;
			}
			p{
				margin-top: .9rem;
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
		data(){
			return{
				
			}
		},
		components:{
			MainHeader
		}
	}
</script>