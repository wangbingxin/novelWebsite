<template>
	<div class="user-reply">
		<div class="loading" v-show="isLoading">正在加载，请稍等...</div>
		<div class="content no-notes" v-show="noNotes">
			你还没有回复过别人哦！
		</div>
		<div class="content" v-for="item in replyList">
			<router-link :to="'/book/'+item.book_id">
				<h2><img :src="item.user_avatar"> <span>{{item.user_name}}</span><i>{{item.insert_date}}</i></h2>
				<div class="text">回复<span>@{{item.up_user_name}}</span>：{{item.content}}</div>
				<div class="reply">
					<span>{{item.up_user_name}}</span>：{{item.up_content}}
				</div>
			</router-link>
		</div>
		<div class="more" @click="showMore" v-show="total>replyList.length">点击加载更多</div>
	</div>
</template>
<script>
	import { getBookComment } from '../../api/api'
	import { getLocalTime } from '../../assets/js/common'
	export default{
		data(){
			return {
				replyList:[],
				page:1,
				pageSize:10,
				noNotes:false,
				total:0,
				isLoading:true
			}
		},
		mounted(){
			this.getReplyList();
		},
		methods:{
			getLocalTime:getLocalTime,
			getReplyList(){
				getBookComment({
					page:this.page,
					page_size:this.pageSize
				}).then(res=>{
					var replyArr=res.data.reply.data || []
					this.total=res.data.reply.total
					!replyArr.length&&!this.replyList.length?this.noNotes=true:false
					this.replyList=this.replyList.concat(replyArr)
					this.isLoading=false
				})
			},
			showMore(){
				this.page++
				this.getReplyList()
			}
		}
	}
</script>
<style lang="scss">
	@import '../../assets/style/vars.sass';
	.user-reply h2{ height: .5rem; line-height: .5rem; }
	.user-reply h2 img{ float: left; width: .5rem; height: .5rem; border-radius: .3rem; }
	.user-reply h2 span{ float: left; margin-left: .1rem; }
	.user-reply h2 i{ width: 2.5rem; float: right; font-size: .24rem; color: $gray; }
	.user-reply .content{
		padding-top: .2rem;
		margin-bottom: .02rem;
	}
	.user-reply .text{ margin-top: .2rem; }
	.user-reply .text span { color: $red; }
	.user-reply .reply{ margin-top: .1rem; background-color: $lightwhite; padding: .2rem; border-radius: .05rem; }
	.user-reply .reply span{ color: $red; }
</style>