<template>
	<div class="index">
		<index-header></index-header>
		<banner></banner>
		<m-img-list title="主编力荐" :data="moduleOne"></m-img-list>
		<list-recommend title="热门畅销" :data="moduleTwo"></list-recommend>
    	<div class="container current-free" v-if="isCurrent">
    		<h1><span>限时免费</span><div class="time" v-if="currentTime">剩余 <i>{{currentTime[0]}}</i>天<i>{{currentTime[1]}}</i>时<i>{{currentTime[2]}}</i>分<i>{{currentTime[3]}}</i>秒</div></h1>
			<div class="content">
				<div class="item" v-for="item in currentList">
					<router-link :to="'/book/'+item.book_id">
						<img :src="'//images.'+domain+'/v1.0/image/book_cover/book_id?book_id='+item.book_id">
						<div class="name">{{item.book_name.length>7?item.book_name.substr(0,6)+'...':item.book_name}}<br>
							<span>免费</span> <i>6币/千字</i></div>
					</router-link>
				</div>
			</div>
    	</div>
		<m-img-list title="短篇推荐" :data="moduleThree"></m-img-list>
		<list-recommend title="新书推荐" :data="moduleFour"></list-recommend>
		<ranking-list></ranking-list>
		<main-footer></main-footer>
		<go-top></go-top>
	</div>
</template>
<script>
	import IndexHeader from "../components/index/header.vue";
	import Banner from "../components/index/Banner.vue";
	import ListRecommend from "../components/index/ListRecommend.vue"
	import RankingList from "../components/index/RankingList.vue"
	import MainFooter from "../components/footer.vue";
	import GoTop from '../components/GoTop.vue';
	import { getFreeBook } from '../api/api'
	import { getLocalTime } from '../assets/js/common'
	export default{
		data(){
			return {
        		isCurrent:false,
        		currentList:null,
        		currentTime:null,
        		domain: process.env.BASE_DOMAIN
			}
		},
		components:{
			IndexHeader,
			Banner,
			ListRecommend,
			RankingList,
			MainFooter,
			GoTop
		},
		computed:{
			...Vuex.mapState(['moduleOne','moduleTwo','moduleThree','moduleFour']),
	        ...Vuex.mapGetters(['u_sex'])
	    },
		mounted(){
			this.getRecommendData()
			this.getFreeTimeBook()
		},
		watch:{
			u_sex(val){
				this.getRecommendData()
			}
		},
		methods:{
			...Vuex.mapActions(['getModuleOne','getModuleTwo','getModuleThree','getModuleFour']),
			getLocalTime,
			getFreeTimeBook(){
				getFreeBook().then(res=>{
					if(res.data){
						if(Date.now()/1000>res.data[0].start_time && Date.now()/1000<res.data[0].end_time){
							this.isCurrent=true
							this.currentList=res.data[0].books
							this.currentTime=this.getTime(res.data[0].end_time)
							setInterval(()=>{
								this.currentTime=this.getTime(res.data[0].end_time)
							},1000)
						}
					}
				})
			},
			// 倒计时计算
		    getTime(time){
		      let timeDistance=time-Date.parse(new Date())/1000
		      if(timeDistance>0 && timeDistance<=60){
		        return [0,0,0,timeDistance]
		      }else if(timeDistance>60 && timeDistance<60*60){
		      	return [0,0,parseInt(timeDistance/60),timeDistance%60]
		      }else if(timeDistance>60*60 && timeDistance<24*60*60){
		      	return [0,parseInt(timeDistance/60/60),parseInt((timeDistance%3600)/60),timeDistance%3600%60]
		      }else if(timeDistance>24*60*60){
		      	return [parseInt(timeDistance/60/60/24),parseInt(timeDistance%(24*3600)/60/60),parseInt(timeDistance%(24*3600)%3600/60),timeDistance%(24*3600)%3600%60]
		      }else if(timeDistance<0){
		        return false;
		      }
		    },
		    // 获取推荐位数据
		    getRecommendData(){
				this.getModuleOne()
				this.getModuleTwo()
				this.getModuleThree()
				this.getModuleFour()
		    }
		}
	}
</script>
<style lang="scss">
	@import '../assets/style/vars.sass';
	.index{
		.current-free{
			h1{
				overflow: hidden;
				.time{
					float: right;
					color: $gray;
					font-weight: normal;
					i{
						display: inline-block;
						width: .36rem;
						height: .38rem;
						line-height: .4rem;
						background: url(../imgs/time_bg.png) no-repeat;
						background-size: .36rem;
						color: #fff;
						text-align: center;
						position: relative;
						top: -.05rem;
					}
				}
			}
			.content{
				overflow: hidden;
				padding: 0;
				padding-bottom: .3rem;
				margin-top: -.3rem;
				.item{
					float:left;
					width: 2rem;
					margin: 0 .15rem;
					margin-top: .2rem;
					padding: .1rem;
					padding-bottom: 0;
					white-space: nowrap;
					a{
						display: block;
					}
					img{
						width: 2rem;
						height: 2.67rem;
						border-radius: .08rem;
					}
					.name{
						margin-top: .2rem;
					}
					span{
						color: $orange;
						font-size: .26rem;
					}
					i{
						color: $gray;
						font-size: .26rem;
						text-decoration: line-through;
					}
				}
			}
		}
	}
</style>
