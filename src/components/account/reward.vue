<template>
	<div class="reward">
		<div class="no-notes" v-show="noNotes">暂无打赏记录</div>
		<div class="content" v-for="item in rewardList">
			<span class="article">{{item.book_name}}</span><span class="gold">{{item.reward_coin}}书币</span><span class="time">{{getLocalTime(item.reward_time).substr(0,10)}}</span>
		</div>
		<div class="more" @click="showMore" v-show="page<pageTotal">加载更多</div>
	</div>
</template>
<style lang="scss">
	@import '../../assets/style/vars.sass';
	.reward{ min-height: 7rem; }
	.reward .content{ overflow: hidden; padding-top: .2rem; margin-bottom: .02rem; }
	.reward span{ float: left; }
	.reward .article{ width: 3.9rem; }
	.reward .gold{ width: 1.5rem; color: $blue; }
	.reward .time{ width: 1.7rem; color: $gray; }
</style>
<script>
	import {getLocalTime} from "../../assets/js/common"
	import { getRewardRecord } from '../../api/api'
	export default{
		data(){
			return{
				rewardList:[],
				page:1,
				pageSize:10,
				noNotes:false,
				pageTotal:0
			}
		},
		mounted(){
			this.getRewardList();
		},
		methods:{
			getLocalTime:getLocalTime,
			getRewardList(){
				getRewardRecord().then(res=>{
					var reward=res.data.reward_list
            		!reward.length&&!this.rewardList.length?this.noNotes=true:false
            		this.rewardList=this.rewardList.concat(reward)
            		this.pageTotal=res.data.total_page
				})
			},
			showMore(){
				this.page++;
				this.getRewardList();
			}
		}
	}
</script>