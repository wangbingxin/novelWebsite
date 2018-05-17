<template>
	<div>
		<main-header title="我的订阅"></main-header>
		<div class="subscribe container">
			<div class="no-notes" v-show="noNotes">亲，你还没有订阅过的书！</div>
			<div class="content" v-for="(item,key) in subscribeList">
				<router-link :to="{name:'book',params:{book_id:item.book_id}}">
					<div class="img">
						<img :src="item.book_url">
					</div>
					<div class="info">
						<h2>{{item.book_name}}</h2>
						<p>更新至{{item.last_chapter}}</p>
					</div>
				</router-link>
				<i @click="delRecord(key)">取消自动订阅</i>
			</div>
		</div>
		<main-footer></main-footer>
	</div>
</template>
<style lang="scss" scoped>
	@import '../assets/style/vars.sass';
	.subscribe{ min-height: 7rem; margin-top: .9rem; }
	.subscribe .content{ overflow: hidden; position: relative; padding-top: .2rem; margin-bottom: .02rem; }
	.subscribe .content .img{ float: left; width: 1.2rem; }
	.subscribe .content .img img{ width: 1.2rem; height: 1.6rem; }
	.subscribe .content .info{ float: left; width: 5.7rem; margin-left: .2rem; }
	.subscribe .content h2{ font-size: .32rem; }
	.subscribe .content p{ margin-top: .2rem; color: $gray; }
	.subscribe .content i{ position: absolute; top: 1.2rem; right: .2rem; border-radius: .08rem; color: $gray; }
</style>
<script>
	import MainHeader from "../components/header.vue";
	import MainFooter from "../components/footer.vue";
	import { getSubscribeBook, handleSubscribe } from '../api/api'
	export default{
		data(){
			return{
				subscribeList:null,
				noNotes:false
			}
		},
		components:{
			MainHeader,
			MainFooter
		},
		mounted(){
			this.getSubscribeList();
		},
		methods:{
			getSubscribeList(){
				getSubscribeBook().then(res=>{
					if(res.data){
						this.subscribeList=res.data
						this.noNotes=res.data.length>0?false:true
					}else{
						this.noNotes=true
					}
				})
			},
			delRecord(index){
				var delRecord=this.subscribeList[index]
				this.subscribeList.splice(index,1)
				handleSubscribe({
					book_id:delRecord.book_id,
					flag:0
				})
			}
		}
	}
</script>