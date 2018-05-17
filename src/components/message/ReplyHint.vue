<template>
	<div class="reply-hint">
		<div class="content" v-show="noNote">暂无回复</div>
		<div class="content" v-for="item in messageList" @click="goReply(item.path,item.comment_id)">
			<div class="msg-item"><span>{{item.user_name}}</span>回复<a>@{{item.up_user_name}}</a>：{{item.content}}</div>
			<p>{{getLocalTime(item.insert_time)}}</p>
		</div>
	</div>
</template>
<script>
	import { getMessage, cancelReplyMessage } from '../../api/api'
	import { getLocalTime } from '../../assets/js/common.js'
	export default{
		data(){
			return {
				noNote:false,
				messageList:[]
			}
		},
		mounted(){
			this.getMessageList();
		},
		methods:{
			getLocalTime:getLocalTime,
			getMessageList(){
				getMessage().then(res=>{
					if(res.code === 200){
						if(res.data){
							if(res.data.comment_msg){
								this.messageList=res.data.comment_msg
							}else{
								this.noNote=true
							}
						}else{
							this.noNote=true
						}
					}
				})
			},
			goReply(path,commentid){
				var topComment=path.split('-')[0];
				cancelReplyMessage({
					comment_ids:commentid
				})
				this.$router.push(`/commentinfo/${topComment}`)
			}
		}
	}
</script>
<style>
	.reply-hint .msg-item{ line-height: .4rem; }
	.reply-hint .content{
		padding-top: .2rem;
		margin-bottom: .02rem;
	}
	.reply-hint .msg-item span{ color: #58b7ff; }
	.reply-hint .msg-item a{ color: #ff6b8a; }
	.reply-hint p{ color: #b3b3b3; text-align: right; margin-top: .1rem; }
</style>