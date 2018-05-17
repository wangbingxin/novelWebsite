<template>
	<div class="container fans-ranking">
		<h1>打赏 <span>共{{fansNumber}}条</span></h1>
		<div class="content">
			<div class="top">
				<div class="item second">
					<div class="crown">2</div>
					<div class="img">
						<img v-if="fansList[1]" :src="fansList[1].user_cover">
					</div>
					<p>{{fansList[1]?fansList[1].user_name:'虚位以待'}}</p>
				</div>
				<div class="item first">
					<div class="crown">1</div>
					<div class="img">
						<img v-if="fansList[0]" :src="fansList[0].user_cover">
					</div>
					<p>{{fansList[0]?fansList[0].user_name:'虚位以待'}}</p>
				</div>
				<div class="item third">
					<div class="crown">3</div>
					<div class="img">
						<img v-if="fansList[2]" :src="fansList[2].user_cover">
					</div>
					<p>{{fansList[2]?fansList[2].user_name:'虚位以待'}}</p>
				</div>
			</div>
			<ul v-if="fansNumber>3">
				<li v-for="(item,key) in fansList.slice(3)">
					<p>{{item.user_name}}</p>
					<a :class="{show:isShow==key}">{{item.reward_coin}}个粉丝值</a>
					<i :style="{backgroundColor:level(item.level)}" @click="isShow=key">{{item.level_name}}</i>
				</li>
			</ul>
			<p class="text" v-show="noNotes">还没人打赏，快来做第一人！</p>
			<div class="button"><span @click="isReward=!isReward" :style="{backgroundColor: sex_color}">打赏本书</span></div>
		</div>
		<div class="mask" v-if="isReward" @click="isReward=!isReward"></div>
		<fans-reward class="reward-author" :style="{bottom:isReward?'0':'-7rem'}"></fans-reward>
	</div>
</template>
<style lang="scss">
	@import '../../assets/style/vars.sass';
	.fans-ranking{
		h1{
			span{
				font-size: .26rem;
				color: $gray;
				font-weight: normal;
				margin-left: .2rem;
			}
		}
		.content{
			.top{
				width: 6rem;
				margin: 0 auto;
				font-size: 0;
				.item{
					display: inline-block;
					margin: 0 .1rem;
					.crown{
						font-size: .24rem;
						color: #fff;
						text-align: center;
					}
					.img{
						margin: 0 auto;
						border-radius: 1rem;
						overflow: hidden;
						background-color: $line;
						background-image: url(../../imgs/sofa.png);
						background-repeat: no-repeat;
						background-position: center;
					}
					p{
						text-align: center;
						font-size: .26rem;
						margin-top: .15rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				.first{
					width: 2rem;
					margin: 0 .2rem;
					.crown{
						width: 2rem;
						height: .54rem;
						line-height: .75rem;
						background: url(../../imgs/first.png) no-repeat center;
						background-size: .75rem;
					}
					.img{
						width: 1.6rem;
						height: 1.6rem;
						border: solid .06rem #f9c41c;
						margin-top: -.03rem;
						background-size: .8rem;
						img{
							width: 1.6rem;
							height: 1.6rem;
						}
					}
				}
				.second{
					width: 1.6rem;
					.crown{
						width: 1.6rem;
						height: .33rem;
						line-height: .44rem;
						background: url(../../imgs/second.png) no-repeat center;
						background-size: .46rem;
					}
					.img{
						width: 1rem;
						height: 1rem;
						border: solid .06rem #c3d0e1;
						margin-top: -.03rem;
						background-size: .5rem;
						img{
							width: 1rem;
							height: 1rem;
						}
					}
				}
				.third{
					width: 1.6rem;
					.crown{
						width: 1.6rem;
						height: .33rem;
						line-height: .44rem;
						background: url(../../imgs/third.png) no-repeat center;
						background-size: .46rem;
					}
					.img{
						width: 1rem;
						height: 1rem;
						border: solid .06rem #fd9884;
						margin-top: -.03rem;
						background-size: .5rem;
						img{
							width: 1rem;
							height: 1rem;
						}
					}
				}
			}
			.text{
				text-align: center;
				color: $gray;
				margin-top: .3rem;
			}
			.button{
				width: 1.8rem;
				height: .6rem;
				color: #fff;
				border-radius: .08rem;
				margin: .5rem auto .1rem auto;
				span{
					display: table-cell;
					width: 1.8rem;
					height: .6rem;
					text-align: center;
					vertical-align: middle;
				}
			}
			li{
				overflow: hidden;
				margin-top: .3rem;
				p{
					float: left;
					width: 5rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-right: .05rem;
				}
				a{
					color: #fff;
					position: absolute;
					font-size: .22rem;
					padding: .04rem .05rem;
					background-color: #424240;
					right: 1.1rem;
					border-radius: .08rem;
					opacity: 0;
				}
				i{
					float: right;
					width: .8rem;
					height: .4rem;
					line-height: .45rem;
					font-size: .26rem;
					text-align: right;
					text-align: center;
					color: #fff;
					border-radius: .05rem;
				}
				.show{
					animation: fade ease 2s;
				}
				@keyframes fade{
					0%{ opacity: 1; }
					70%{ opacity: 1; }
					100%{ opacity: 0; }
				}
			}
		}
		.reward-author{
			position: fixed;
			z-index: 100;
			transition: bottom ease-in 200ms;
		}
	}
</style>
<script>
	import { getFansRank } from '../../api/api'
	import FansReward from "./FansReward.vue"
	export default{
		data(){
			return{
				fansNumber:0,
				fansList:[],
				noNotes:false,
				isShow:-1,
				isReward: false
			}
		},
		components:{
			FansReward
		},
		computed:{
	      ...Vuex.mapGetters(['sex_color'])
	    },
		created(){
			this.$parent.$on("reloadFansRank",()=>{
				this.getRansList();
			})
		},
		mounted(){
			this.getRansList()
		},
		methods:{
			level(level){
				switch(level){
					case 14:
						return '#dfce20';
					case 13:
						return '#e0c521';
					case 12:
						return '#e1bc24';
					case 11:
						return '#e2b326';
					case 10:
						return '#e3aa28';
					case 9:
						return '#e3a029';
					case 8:
						return '#e3962a';
					case 7:
						return '#e48b2a';
					case 6:
						return '#e4802c';
					case 5:
						return '#e5752b';
					case 4:
						return '#e5682b';
					case 3: 
						return '#e55b2a';
					case 2:
						return '#e64c2b';
					case 1:
						return '#e63c2a';
				}
			},
			getRansList(){
				getFansRank({
					book_id:this.$route.params.book_id
				}).then(res=>{
					this.fansNumber=res.data.fans_number
					this.noNotes=res.data.fans_number?false:true
            		this.fansList=res.data.fans_top
				})
			}
		}
	}
</script>
