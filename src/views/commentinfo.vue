<template>
	<div class="comment-info comment-page">
		<main-header title="评论"></main-header>
		<div class="comment">
			<div class="user-comment">
				<div class="user-head">
					<img :src="commentInfo.user_avatar"></div>
				<div class="comment-info">
					<h2>
						<span>{{commentInfo.user_name}}</span>
						<template v-if="commentInfo.user_level==0">
							<img src="../imgs/level/0.png">
						</template>
						<template v-if="commentInfo.user_level==1">
							<img src="../imgs/level/1.png">
						</template>
						<template v-if="commentInfo.user_level==2">
							<img src="../imgs/level/2.png">
						</template>
						<template v-if="commentInfo.user_level==3">
							<img src="../imgs/level/3.png">
						</template>
						<template v-if="commentInfo.user_level==4">
							<img src="../imgs/level/4.png">
						</template>
						<template v-if="commentInfo.user_level==5">
							<img src="../imgs/level/5.png">
						</template>
						<template v-if="commentInfo.user_level==6">
							<img src="../imgs/level/6.png">
						</template>
						<template v-if="commentInfo.user_level==7">
							<img src="../imgs/level/7.png">
						</template>
						<template v-if="commentInfo.user_level==8">
							<img src="../imgs/level/8.png">
						</template>
						<template v-if="commentInfo.user_level==9">
							<img src="../imgs/level/9.png">
						</template>
						<i :style="{backgroundColor:level(commentInfo.fans_level)}">{{commentInfo.fans_level_name}}</i>
					</h2>
					<div class="text">
						{{commentInfo.content}}
					</div>
					<p>
						{{getLocalTime(commentInfo.insert_time)}}
						<a class="icon to-reply" @click="isComment"></a>
					</p>
					
				</div>
				<div class="comment-box" v-show="is_comment">
					<div class="reply-input">
						<textarea cols="28" rows="3" :placeholder="'回复@'+commentInfo.user_name" v-model="replyContent"></textarea>
					</div>
					<div class="comment-btn"><a @click="submitReply($route.params.comment_id,'reply')" :style="{backgroundColor: sex_color}">回复</a></div>
				</div>
			</div>
			<div class="container comment-list">
				<template v-if="commentInfo.reply">
					<h1>全部回复 <a>共{{commentInfo.reply.total}}条</a></h1>
					<div class="content comment-item" v-for="(item,index) in replyList">
						<div class="user-head">
							<img :src="item.user_avatar"></div>
						<div class="comment-info">
							<h2>
								<span>{{item.user_name}}</span>
								<template v-if="item.user_level==0">
									<img src="../imgs/level/0.png">
								</template>
								<template v-if="item.user_level==1">
									<img src="../imgs/level/1.png">
								</template>
								<template v-if="item.user_level==2">
									<img src="../imgs/level/2.png">
								</template>
								<template v-if="item.user_level==3">
									<img src="../imgs/level/3.png">
								</template>
								<template v-if="item.user_level==4">
									<img src="../imgs/level/4.png">
								</template>
								<template v-if="item.user_level==5">
									<img src="../imgs/level/5.png">
								</template>
								<template v-if="item.user_level==6">
									<img src="../imgs/level/6.png">
								</template>
								<template v-if="item.user_level==7">
									<img src="../imgs/level/7.png">
								</template>
								<template v-if="item.user_level==8">
									<img src="../imgs/level/8.png">
								</template>
								<template v-if="item.user_level==9">
									<img src="../imgs/level/9.png">
								</template>
								<i :style="{backgroundColor:level(commentInfo.fans_level)}">{{commentInfo.fans_level_name}}</i>
							</h2>
							<div class="text">回复<i>@{{item.reply_user_name}}</i>：{{item.content}}</div>
							<p>
								{{getLocalTime(item.insert_time)}}
								<a class="icon to-reply" @click="showReplyBox(index)"></a>
							</p>
							<div class="comment-box reply-box" :class="{'show-box':is_reply==index}">
								<div class="reply-input">
									<textarea cols="28" rows="3" v-model="toReplyContent" :placeholder="'回复@'+item.user_name"></textarea>
								</div>
								<div class="comment-btn"><a @click="submitReply(item.path,'toReply')" :style="{backgroundColor: sex_color}">回复</a></div>
							</div>
						</div>
					</div>
					<div class="more" @click="showMore" v-show="isMore">查看更多>></div>
				</template>
				<template v-else>
					<div class="content no-content">
						还没有回复哦，赶紧来抢沙发吧！
					</div>
				</template>
			</div>
		</div>
		<main-footer></main-footer>
	</div>
</template>
<style scoped>
	.comment-info .comment{ min-height: 8rem; margin-top: .9rem; }
	.comment-info .user-comment{ overflow: hidden; padding: .2rem; background-color: #fff; }
	.comment-page .comment-box{ float: left; width: 6.5rem; }
	.comment-info .reply-box{ width: 6.5rem; margin-top: .2rem; }
	.comment-info .comment-box textarea{ width: 6.3rem; }
	.comment-info .text i{ color: #58b7ff; }
	.comment-info .reply p{ color: #808080; }
</style>
<script>
	import MainHeader from "../components/header.vue";
	import MainFooter from "../components/footer.vue";
	import { getReply, saveComment } from '../api/api'
	import { getLocalTime, showMsg, setCookie } from "../assets/js/common"
	export default{
		data(){
			return{
				commentInfo:{},
				replyList:[],
				is_comment:false,
				is_reply:-1,
				page:1,
				pageSize:10,
				replyContent:'',
				toReplyContent:'',
				isMore:true
			}
		},
		components:{
			MainHeader,
			MainFooter
		},
		mounted(){
			this.getCommentInfo()
		},
		computed:{
	      ...Vuex.mapGetters(['sex_color'])
	    },
		methods:{
			getLocalTime:getLocalTime,
			getCommentInfo(){
				getReply({
					comment_id: this.$route.params.comment_id
				}).then(res=>{
					if(res.code === 200){
						this.commentInfo=res.data
						if(res.data.reply){
							this.getReplyList()
						}
					}
				})
			},
			getReplyList(){
				getReply({
					comment_id: this.$route.params.comment_id,
					page: this.page,
					page_size: this.pageSize
				}).then(res=>{
					if(res.code === 200){
						var commentArr=res.data.reply.reply_list
	            		commentArr.length<this.pageSize?this.isMore=false:''
						this.replyList=this.replyList.concat(commentArr)
					}
				})
			},
			submitReply(path,flag){
				if(flag==='reply'){
					if(this.replyContent.trim()){
						saveComment({
							book_id: this.commentInfo.book_id,
							content: this.replyContent,
							path: path+'-'
						}).then(res=>{
							if(res.code === 200){
								window.location.reload();
							}else if(res.code === 201){
								showMsg('您已被禁言，请稍后评论')
							}else if(res.code === 401){
								setCookie("login_callback_url",location.href,300,process.env.BASE_DOMAIN,"/");
	            				this.$router.push('/login');
							}
						})
					}else{
						showMsg("不能为空！");
					}
				}else if(flag==='toReply'){
					if(this.toReplyContent.trim()){
						saveComment({
							book_id: this.commentInfo.book_id,
							content: this.toReplyContent,
							path: path+'-'
						}).then(res=>{
							if(res.code === 200){
								window.location.reload();
							}else if(res.code === 201){
								showMsg('您已被禁言，请稍后评论')
							}else if(res.code === 401){
								setCookie("login_callback_url",location.href,300,process.env.BASE_DOMAIN,"/");
	            				this.$router.push('/login');
							}
						})
					}else{
						showMsg("不能为空！");
					}
				}
			},
			isComment(){
				this.is_comment=!this.is_comment;
			},
			showReplyBox(index){
				this.is_reply=this.is_reply==index?-1:index;
			},
			showMore(){
				this.page++;
				this.getReplyList();
			},
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
			}
		}
	}
</script>