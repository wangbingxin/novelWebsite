<template>
	<div class="comment-tab">
		<div class="loading" v-show="isLoading">正在加载，请稍等...</div>
		<div class="no-comment" v-show="noNotes">
			还没有评论哦，赶紧来抢沙发吧！
		</div>
		<div class="comment-list">
			<div class="comment-item" v-for="(item,key) in commentList">
				<div class="user-info">
					<span class="avatar"><img :src="item.user_avatar"></span>
					<span class="name"><i>{{item.user_name}}</i></span>
					<span class="level">
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
					</span>
					<span class="grade" :style="{backgroundColor:level(item.fans_level)}">{{item.fans_level_name}}</span>
					<b class="top" v-show="item.top==1?true:false">置顶</b>
					<b class="best" v-show="item.add_digest==1?true:false">精</b>
				</div>
				<div class="comment-info">
					<div class="text">
						<router-link :to="'/commentinfo/'+item.id">{{item.content}}</router-link>
					</div>
					<p>
						<template v-if="item.reply_count">
							{{getLocalTime(item.insert_time)}} · <router-link :to="'/commentinfo/'+item.id">查看{{item.reply_count}}条回复>></router-link>
						</template>
						<template v-else>
							{{getLocalTime(item.insert_time)}}
						</template>
						<a class="icon to-reply" @click.stop="showReplyBox(key)"></a>
					</p>
					<div class="comment-box reply-box" :class="{'show-box':show_reply_box==key}">
						<div class="reply-input">
							<textarea cols="28" rows="3" :placeholder="'回复@'+item.user_name" v-model="replyContent"></textarea>
						</div>
						<div class="comment-btn"><a @click="submitReply(item.path)" :style="{backgroundColor:sex_color}">回复</a></div>
					</div>
					<template v-if="item.reply_count">
						<div class="top-reply">
							<p v-for="_item in item.reply_list.slice(0,2)"><span>{{_item.user_name}}</span>：{{_item.content.length>33?_item.content.substr(0,30)+'...':_item.content}}</p>
						</div>
					</template>
				</div>
			</div>
		</div>
		<div class="more" @click="showMore" v-show="total>commentList.length">
			<template v-if="!isLoadMore">
				点击加载更多
			</template>
			<template v-else>
				正在加载中，请稍后...
			</template>
		</div>
	</div>
</template>
<style lang="scss">
	@import '../assets/style/vars.sass';
	.comment-tab{
		background-color: #fff;
		padding: .2rem;
		padding-top: 0;
		padding-bottom: .1rem;
		.comment-item{
			border-bottom: solid .02rem $line;
			padding: .2rem 0;
			&:last-child{
				border-bottom: none;
			}
			.user-info{
				height: .5rem;
				span{
					float: left;
				}
				.avatar{
					width: .5rem;
					height: .5rem;
					border-radius: .25rem;
					overflow: hidden;
					img{
						width: .5rem;
						height: .5rem;
					}
				}
				.name{
					margin-left: .1rem;
					i{
						display: table-cell;
						height: .5rem;
						vertical-align: middle;
						color: $gray;
					}
				}
				.level{
					width: .7rem;
					height: .5rem;
					margin-left: .1rem;
					img{
						width: .7rem;
						height: .3rem;
						margin-top: .08rem;
					}
				}
				.grade{
					border-radius: .05rem;
					font-size: .22rem;
					color: #fff;
					padding: 0 .04rem;
					margin-top: .1rem;
					margin-left: .1rem;
				}
				b{
					float: right;
					font-size: .22rem;
					color: #fff;
					border-radius: .05rem;
					padding: .03rem .07rem;
					margin-left: .1rem;
				}
				.top{
					background-color:  $blue;
				}
				.best{
					background-color: $red;
				}
			}
			.comment-info{
				p{
					a{
						color: $orange;
					}
				}
				.top-reply{
					margin-top: .2rem;
					padding: .1rem .2rem; background-color: $lightwhite;
					p{
						color: $dark;
						line-height: .4rem;
						span{
							color: $blue;
						}
					}
				}
				.reply-box{ margin-top: .2rem; }
			}
		}
		.no-comment{
			padding: .2rem;
			padding-top: 1.3rem;
			color: $gray;
			text-align: center;
			background: url(../imgs/sofa1.png) no-repeat center .2rem;
		}
	}
</style>
<script>
	import { getComment, saveComment } from '../api/api'
	import {showMsg,getLocalTime,setCookie} from "../assets/js/common"
	export default{
		data(){
			return{
				commentList:[],
				show_reply_box:-1,   
				replyContent:"",
				page:1,
				pageSize:10,
				noNotes:false,
				isLoading:true,
				total:0,
				isLoadMore:false
			}
		},
		computed:{
	      ...Vuex.mapGetters(['sex_color'])
	    },
		mounted(){
			this.getComment()
		},
		methods:{
			getLocalTime:getLocalTime,
			getComment(){
				getComment({
					book_id: this.$route.params.book_id,
					page: 1,
					page_size: 10
				}).then(res=>{
					if(res.code === 200){
						this.isLoading=false
						if(res.data){
							this.commentList=res.data.comment
							this.total=this.$parent.commentNum=res.data.total
	            			this.isLoadMore=false
						}else{
							this.noNotes=true
						}
					}
				})
			},
			getMoreComment(){
				getComment({
					book_id: this.$route.params.book_id,
					page: this.page,
					page_size: this.pageSize
				}).then(res=>{
					if(res.code === 200){
						if(res.data){
							var commentArr=res.data.comment
	            			this.commentList=this.commentList.concat(commentArr)
	            			this.isLoadMore=false
						}
					}
				})
			},
			showReplyBox(index){
				this.show_reply_box=this.show_reply_box==index?-1:index;
			},
			zanToggle(index){
				this.comment_list[index].is_zan=!this.comment_list[index].is_zan;
			},
			submitReply(path){
				if(this.replyContent.trim()){
					saveComment({
						book_id: this.$route.params.book_id,
						content: this.replyContent,
						path: path+'-'
					}).then(res=>{
						if(res.code === 200){
							window.location.reload();
						}else if(res.code === 201){
							showMsg('您已被禁言，请稍后评论')
						}
					})
				}else{
					showMsg("回复内容不能为空哦！");
				}
			},
			showMore(){
				this.isLoadMore=true
				this.page++
				this.getMoreComment()
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