<template>
	<div class="bookshelf">
		<header>
			<div class="left"><a @click="$router.back()"></a></div>
			<div class="center" :style="{'margin-left':!isApp ? 0 : '.9rem'}">
				我的书架
			</div>
			<div class="right">
				<router-link to="/" class="home"></router-link>
			</div>
		</header>
		<m-tabs :items="tabs" @change-item="switchTab" style="margin-top: .9rem;"></m-tabs>
		<!-- <div class="button">
			<div class="switch-tab">
				<router-link to="/bookshelf" :class="{'active':activeClass==1}">
					<span @click="switchTab(1)">最近阅读</span>
				</router-link>
				<router-link to="/bookshelf/save" :class="{'active':activeClass==2 }">
					<span @click="switchTab(2)">我的书架</span>
				</router-link>
			</div>
		</div> -->
		<div class="container">
			<router-view></router-view>
		</div>
		<main-footer v-if="!isApp"></main-footer>
	</div>
</template>
<style lang="scss">
	@import '../assets/style/vars.sass';
	.bookshelf{
		.button{
			background-color: #fff;
			padding: .3rem 0;
		}
		.switch-tab{
			width: 3.24rem;
			height: .6rem;
			background-color: #f7f7f7;
			border-radius: .3rem;
			margin: .15rem auto;
			a{
				float: left;
				width: 1.62rem;
				height: .6rem;
				line-height: .6rem;
				font-size: .24rem;
				color: #999;
				text-align: center;
			}
			.active{
				color: #fff;
				background-color: $red;
				border-radius: .3rem;
			}
		}
	}
	.bookshelf .container{ min-height: 8rem; }
	.bookshelf .content{ overflow: hidden; position: relative;

		
	 }
</style>
<script>
	import MainHeader from "../components/header.vue";
	import MainFooter from "../components/footer.vue";
	export default{
		data(){
			return{
				tabs:[
					{
						label: '最近阅读',
						value: 'recent'
					},
					{
						label: '我的书架',
						value: 'save'
					}
				],
				activeClass:1,
				isApp
			}
		},
		components:{
			MainHeader,
			MainFooter
		},
		watch:{
			'$route.path':'currentTab'
		},
		mounted(){
			this.currentTab()
		},
		methods:{
			currentTab(){
				if(this.$route.path.indexOf('save')!=-1){
					this.activeClass=2
				}else{
					this.activeClass=1
				}
			},
			switchTab(val){
				this.$router.replace({ name: val })
			}
		}
	}
</script>