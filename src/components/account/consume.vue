<template>
	<div class="consume">
		<div class="no-notes" v-show="noNotes">暂无消费记录</div>
		<div class="content" v-for="item in consumeList">
			<div>
				<span class="article">{{item.book_name}}</span>
				<span class="chapter">{{item.chapter_serial_number+":"+item.chapter_name}}</span>
			</div>
			<div>
				<span class="gold">{{item.chapter_price}}书币</span>
				<span class="time">{{getLocalTime(item.chapter_buy_time)}}</span>
			</div>
		</div>
		<div class="more" @click="showMore" v-show="page<pageTotal">加载更多</div>
	</div>
</template>
<style lang="scss">
	@import '../../assets/style/vars.sass';
	.consume{ min-height: 7rem; }
	.consume .content{ padding-top: .2rem; margin-bottom: .02rem; }
	.consume .content div{ overflow: hidden; }
	.consume .article,.consume .gold{ float: left; width: 3rem; }
	.consume .chapter,.consume .time{ float: right; width: 4.1rem; }
	.consume .chapter{ width: 4.1rem; text-align: right; }
	.consume .gold{ color: $blue; margin-top: .1rem; }
	.consume .time{ text-align: right; color: $gray; margin-top: .1rem; }
</style>
<script>
	import {getLocalTime} from "../../assets/js/common"
	import { getConsumeRecord } from '../../api/api'
	export default{
		data(){
			return {
				consumeList:[],
				page:1,
				pageSize:10,
				noNotes:false,
				pageTotal:0
			}
		},
		mounted(){
			this.getConsumeList();
		},
		methods:{
			getLocalTime:getLocalTime,
			getConsumeList(){
				getConsumeRecord({
					page:this.page,
					page_size:this.pageSize
				}).then(res=>{
					var consumeArr=res.data.buy_chapter_record
            		this.noNotes=res.data.total?false:true
            		this.consumeList=this.consumeList.concat(consumeArr)
            		this.pageTotal=res.data.total_page
				})
			},
			showMore(){
				this.page++;
				this.getConsumeList();
			}
		}
	}
</script>