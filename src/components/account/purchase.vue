<template>
	<div class="purchase">
		<div class="no-notes" v-show="noNotes">暂无购买记录</div>
		<div class="content" v-if="!noNotes" v-for="item in purchaseList">
			<span class="article">{{item.book_name}}</span><span class="gold">{{item.buy_price}}书币</span><span class="time">{{getLocalTime(item.insert_time).substr(0,10)}}</span>
		</div>
		<div class="more" @click="showMore" v-show="page<pageTotal">点击加载更多</div>
	</div>
</template>
<style lang="scss">
	@import '../../assets/style/vars.sass';
	.purchase{ min-height: 7rem; }
	.purchase .content{ overflow: hidden; padding-top: .2rem; margin-top: .02rem; }
	.purchase span{ float: left; }
	.purchase .article{ width: 3.8rem; }
	.purchase .gold{ width: 1.5rem; color: $blue; }
	.purchase .time{ width: 1.8rem; color: $gray; }
</style>
<script>
	import {getLocalTime} from "../../assets/js/common.js"
	import { getPurchaseRecord } from '../../api/api'
	export default{
		data(){
			return{
				purchaseList:[],
				page:1,
				pageSize:15,
				noNotes:false,
				pageTotal:0
			}
		},
		mounted(){
			this.purchaseRecord();
		},
		methods:{
			getLocalTime,
			purchaseRecord(){
				getPurchaseRecord({
					page: this.page,
					page_size: this.pageSize
				}).then(res=>{
						var purchase=res.data.book_list
						this.noNotes=res.data.total?false:true
	            		this.purchaseList=this.purchaseList.concat(purchase)
	            		this.pageTotal=res.data.total_page
				})
			},
			showMore(){
				this.page++;
				this.purchaseRecord();
			}
		}
	}
</script>