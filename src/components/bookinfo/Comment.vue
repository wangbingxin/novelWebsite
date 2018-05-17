<template>
	<div class="container comment">
		<h1>评论 <span v-if="commentNum">共{{commentNum}}条</span> <i @click="isComment">我要评论</i>
		</h1>
		<div class="comment-box" v-show="is_comment">
			<div class="comment-input">
				<textarea cols="25" rows="3" placeholder="快来吐槽吧..." v-model="commentContent"></textarea>
			</div>
			<div class="comment-btn">
				<a @click="submitComment" :style="{backgroundColor:sex_color }">评论</a>
			</div>
		</div>
		<comment ref="commentList"></comment>
	</div>
</template>
<style lang="scss">
	@import '../../assets/style/vars.sass';
	.comment{
		h1{
			span{
				font-weight: normal;
				font-size: .26rem;
				color: $gray;
				margin-left: .2rem;
			}
			i{
				float: right;
				padding: .07rem .13rem;
				font-weight: normal;
				font-size: .26rem;
				color: $gray;
				border: solid .02rem $gray;
				border-radius: .08rem;
				margin-top: -.07rem;
			}
		}
	}
</style>
<script>
	import { saveComment } from '../../api/api'
	import Comment from "../../components/CommentTab.vue"
	import { showMsg, setCookie } from "../../assets/js/common"
	export default{
		data(){
			return{
				is_comment:sessionStorage.getItem('comment')?true:false,
				commentContent:sessionStorage.getItem('comment')?sessionStorage.getItem('comment'):"",
				showPart:this.$route.query.show,
				commentNum:0
			}
		},
		mounted(){
		},
		components:{
			Comment
		},
		computed:{
	      ...Vuex.mapGetters(['sex_color'])
	    },
		methods:{
			isComment(){
				this.is_comment=!this.is_comment;
			},
			submitComment(){
				if(this.commentContent.trim()){
					saveComment({
						book_id: this.$route.params.book_id,
						content: this.commentContent,
						path: ''
					}).then(res=>{
						if(res.code === 200){
							this.is_comment=false
							this.commentContent=''
							sessionStorage.removeItem('comment')
							this.$refs.commentList.getComment()
						}else if(res.code === 201){
							showMsg('您已被禁言，请稍后评论')
						}
					})
				}else{
					showMsg("不能为空！");
				}
			}
		}
	}
</script>
