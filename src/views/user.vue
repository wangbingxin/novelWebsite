<template>
	<div class="user">
		<main-header title="我 的"></main-header>
		<div class="user-info">
			<div class="info-container" v-if="userInfo">
				<div class="user-detail">
					<div class="user-head"><img :src="userInfo.user_avatar"></div>
					<div class="user-name">
						<p class="name">{{userInfo.user_nickname}}
							<template v-if="userInfo.user_level==0">
								<img src="../imgs/level/0.png">
							</template>
							<template v-if="userInfo.user_level==1">
								<img src="../imgs/level/1.png">
							</template>
							<template v-if="userInfo.user_level==2">
								<img src="../imgs/level/2.png">
							</template>
							<template v-if="userInfo.user_level==3">
								<img src="../imgs/level/3.png">
							</template>
							<template v-if="userInfo.user_level==4">
								<img src="../imgs/level/4.png">
							</template>
							<template v-if="userInfo.user_level==5">
								<img src="../imgs/level/5.png">
							</template>
							<template v-if="userInfo.user_level==6">
								<img src="../imgs/level/6.png">
							</template>
							<template v-if="userInfo.user_level==7">
								<img src="../imgs/level/7.png">
							</template>
							<template v-if="userInfo.user_level==8">
								<img src="../imgs/level/8.png">
							</template>
							<template v-if="userInfo.user_level==9">
								<img src="../imgs/level/9.png">
							</template>
						</p>
						<p class="id">ID {{userInfo.user_id}} | 
							<template v-if="userInfo.recent_book_name">
								最近阅读 <router-link :to="'/book/'+userInfo.recent_book_id" :style="{color: sex_color}">《{{userInfo.recent_book_name}}》</router-link>
							</template>
							<template v-else>
								暂无最近阅读
							</template>
						</p>
					</div>
				</div>
				<div class="user-asset">
					<div class="asset-item">
						<span>{{parseInt(userInfo.user_coin || 0)}}</span><br>书币<i></i>
					</div>
					<div class="asset-item">
						<span>{{userInfo.user_recommend_ticket}}</span><br>推荐票<i></i>
					</div>
					<div class="asset-item">
						<span>{{userInfo.user_monthly_ticket}}</span><br>月票
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="content"><span></span><a :href="`//trade.${domain}/v1.0/index`">快速充值<b></b><i class="fa fa-angle-right"></i></a></div>
			<div class="content"><span></span><router-link to="/account" class="noborder">财务记录<i class="fa fa-angle-right"></i></router-link></div>
			<div class="content block"><span></span><router-link to="/bookshelf">我的书架<i class="fa fa-angle-right"></i></router-link></div>
			<div class="content"><span></span><router-link to="/subscribe">我的订阅<i class="fa fa-angle-right"></i></router-link></div>
			<div class="content"><span></span><router-link to="/myreply">我的回复<i class="fa fa-angle-right"></i></router-link></div>
			<div class="content"><span></span><router-link to="/bookcomment" class="noborder">我的书评<i class="fa fa-angle-right"></i></router-link></div>
			<div class="content block"><span></span><router-link to="/level" class="noborder">VIP等级说明<i class="fa fa-angle-right"></i></router-link></div>
			<div class="content block"><span></span><router-link to="/helpcenter" class="noborder">帮助<i class="fa fa-angle-right"></i></router-link></div>
			<div class="content block"><a class="logout" @click="goLogout">退出登录</a></div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	@import '../assets/style/vars.sass';
	.user{
		.user-info{
			background-color: #fff;
			padding-bottom: .3rem;
			height: 2.8rem;
			position: relative;
			overflow: hidden;
			margin-top: .9rem;
			.bg-img{
				position: absolute;
			    left:0;
			    top:0;
			    width: 7.5rem;
			    opacity: .3;
			    filter: blur(.1rem);
			    z-index: 0;
			}
			header{
				background-color: transparent;
			}
			.info-container{
				position: absolute;
				width: 7.5rem;
				left: 0;
				top: 0;
				z-index: 1;
			}
			.user-detail{
				overflow: hidden;
				padding: .3rem;
				.user-head{
					float: left;
					width: 1rem;
					img{
						width: 1rem;
						height: 1rem;
						border-radius: 1rem;
					}
				}
				.user-name{
					float: left;
					width: 5.7rem;
					margin-left: .2rem;
					p{
						height: .5rem;
						line-height: .5rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.name{
						font-weight: bold;
						img{
							display: inline-block;
						    width: .7rem;
						    position: relative;
						    top: .05rem;
						    left: .1rem;
						}
					}
					.id{
						font-size: .26rem;
						color: $gray;
					}
				}
			}
			.user-asset{
				overflow: hidden;
				width: 7.5rem;
				padding: .1rem 0;
				.asset-item{
					float: left;
					width: 2.5rem;
					text-align: center;
					font-size: .24rem;
					color: $gray;
					position: relative;
					span{
						display: inline-block;
						font-size: .32rem;
						font-weight: bold;
						color: $dark;
						margin-bottom: .15rem;
					}
					i{
						position: absolute;
						right: 0;
						top: 50%;
						width: .02rem;
						height: .7rem;
						margin-top: -.35rem;
						background-color: $line;
					}
				}
			}
		}
		.container{
			.content{
				padding: 0 .3rem;
				font-size: 0;
				span{
					display: inline-block;
					width: .4rem;
					height: .4rem;
					margin-right: .3rem;
					background-size: .4rem;
					background-repeat: no-repeat;
					background-position: center;
					position: relative;
					top: .06rem;
				}
				a{
					display: inline-block;
					width: 6.2rem;
					font-size: .28rem;
					height: .9rem;
					line-height: .9rem;
					border-bottom: solid .02rem $line;
					i{
						float: right;
						font-size: .32rem;
						color: $darkgray;
						line-height: .9rem;
						margin-right: .1rem;
					}
					b{
						display: inline-block;
						width: .4rem;
						height: .4rem;
						background: url(../imgs/hot1.png) no-repeat center;
						background-size: .4rem;
						position: relative;
						top: .07rem;
						left: .12rem;
					}
				}
				&:nth-child(1){
					span{
						background-image: url(../imgs/recharge.png);
						top: .08rem;
					}
				}
				&:nth-child(2){
					span{
						background-image: url(../imgs/myaccount.png);
						top: .09rem;
					}
				}
				&:nth-child(3){
					span{
						background-image: url(../imgs/mybookshelf.png);
					}
				}
				&:nth-child(4){
					span{
						background-image: url(../imgs/myorder.png);
						top: .08rem;
					}
				}
				&:nth-child(5){
					span{
						background-image: url(../imgs/myreply.png);
						top: .1rem;
					}
				}
				&:nth-child(6){
					span{
						background-image: url(../imgs/mycomment.png);
						top: .08rem;
					}
				}
				&:nth-child(7){
					span{
						background-image: url(../imgs/level.png);
					}
				}
				&:nth-child(8){
					span{
						background-image: url(../imgs/help.png);
						top: .08rem;
					}
				}
				.noborder{
					border-bottom: none;
				}
				.logout{
					width: 6.9rem;
					text-align: center;
					border-bottom: none;
				}
			}
			.block{
				margin-top: .2rem;
			}
		}
	}
</style>
<script>
	import MainHeader from "../components/header.vue"
	import { getUserInfo, userLogout } from '../api/api'
	export default{
		data(){
			return{
				userInfo:null,
				domain:process.env.BASE_DOMAIN,
				isApp
			}
		},
		components:{
			MainHeader
		},
		computed:{
			...Vuex.mapGetters(['sex_color'])
		},
		mounted(){
            this.getUserInfo()
		},
		methods:{
			getUserInfo(){
				getUserInfo(). then(res=>{
					if(res.code === 200){
						this.userInfo=res.data
					}
				})
			},
			goLogout(){
				userLogout().then(res=>{
					if(res.code === 200){
						this.$router.push({path:"/"})
					}
				})
			}
		}
	}
</script>
