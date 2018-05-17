<template>
	<div class="catalog">
		<main-header title="目录"></main-header>
		<div class="page">
			<div class="current-page" @click="pageList">
				第{{params.page}}页(共{{pageTotal}}页)<i class="fa fa-angle-right"></i>
			</div>
			<div class="page-list" v-show="showPage">
				<p v-for="n in pageTotal" @click="getChapterListByPage(n)">第{{n}}页</p>
			</div>
		</div>
		<ul class="container">
			<li v-for="item in listItem">
				<router-link :to="{name:'read',params:{book_id:$route.params.book_id,chapter_id:item.chapter_id}}">
					<span class="name">{{item.chapter_name}}</span>
					<span class="vip" v-show="item.chapter_is_vip"></span>
					<span class="first" v-show="item.chapter_first_show">抢先</span>
					<span class="read" v-show="item.chapter_read_status">已读</span>
				</router-link>
			</li>
		</ul>
		<div class="more" @click="get_more" v-show="params.page<pageTotal">加载更多</div>
	</div>
</template>
<style lang="scss">
	@import '../assets/style/vars.sass';
	.catalog .page .current-page{ padding: .2rem; border-bottom: solid .03rem $lightwhite; background-color: #fff; margin-top: .9rem; }
	.catalog .page .current-page i{ float: right; font-size: .4rem; color: $gray; }
	.catalog .page .page-list p{ padding: .1rem .4rem; margin-top: .02rem; background-color: #fff; }
	.catalog li a{ display: block; height: .7rem; border-top: solid $lightwhite .03rem; padding-left: .4rem; background-color: #fff; }
	.catalog li a span.name{ float: left; line-height: .7rem; }
	.catalog li a span.read{ float: right; background-color: $orange; color: #fff; font-size: .22rem; padding: .05rem .15rem; }
	.catalog li a span.vip{ float: left; width: .36rem; height: .36rem; margin-left: .1rem; margin-top: .16rem; background: url(../imgs/vip_light.png) no-repeat center; background-size: .36rem;  }
	.catalog li a span.first{ float: left; background-color: $green; color: #fff; font-size: .24rem; border-radius: .05rem; height: .36rem; line-height: .36rem; padding: 0 .1rem; margin-top: .15rem; margin-left: .1rem; }
	.catalog .more{ text-align: center; padding: .2rem; margin-top: .02rem; }
</style>
<script>
	import MainHeader from "../components/header.vue"
	import { getBookCatalog } from '../api/api'
	export default{
		data(){
			return{
				listItem:[],
				showMore:true,
				showPage:false,
				params:{
					book_id: this.$route.params.book_id,
					page: 1,
					page_size: 20
				},
				pageTotal:0
			}
		},
		components:{
			MainHeader
		},
		mounted(){
			this.getBookCatalog();
		},
		methods:{
			getBookCatalog(){
				getBookCatalog(this.params).then(res=>{
					if(res.code === 200){
						this.listItem=[...this.listItem,...res.data.chapter_list]
						this.pageTotal=res.data.total_page
					}
				})
			},
			get_more(){
				this.params.page++
				this.getBookCatalog()
			},
			pageList(){
				this.showPage=!this.showPage
			},
			getChapterListByPage(val){
				this.params.page=val
				this.listItem=[]
				this.showPage=false
				this.getBookCatalog()
			}
		}
	}
</script>
