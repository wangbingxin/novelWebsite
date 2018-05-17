<template>
	<div class="book-save">
		<div class="loading" v-show="isLoading">正在加载，请稍等...</div>
		<div class="toolbar" v-show="!noNotes && !isLoading">
			<div class="left">共{{total}}本</div>
			<div class="right"><a @click="isHandle=!isHandle">{{isHandle?'完成':'管理'}}</a></div>
		</div>
		<div class="no-notes" v-show="noNotes">亲，你还没有收藏记录哦！— ^_^</div>
		<div class="book-box">
			<div class="img" v-for="(item,key) in saveList">
				<router-link :to="{name:'book',params:{book_id:item.book_id}}">
					<img :src="item.book_url">
					<span>{{item.book_name}}</span>
				</router-link>
				<i class="fa fa-trash-o" @click="delRecord(key)" v-show='isHandle'></i>
			</div>
		</div>
	</div>
</template>
<script>
	import { setCookie } from '../../assets/js/common'
	import { getSaveBook, delSaveBook } from '../../api/api'
	export default{
		data(){
			return{
				noNotes:false,
				saveList:[],
				page:1,
				pageSize:10,
				total:0,
				isHandle:false,
				isLoading:true
			}
		},
		mounted(){
			this.getSaveBook();
		},
		methods:{
			getSaveBook(){
				getSaveBook({
					page:this.page,
					page_size:this.pageSize
				}).then(res=>{
					var saveArr=res.data.collection_record;
            		!saveArr.length&&!this.saveList.length?this.noNotes=true:false;
            		this.saveList=this.saveList.concat(saveArr)
            		this.isLoading=false
            		this.total=res.data.total
				})
			},
			delRecord(index){
				var delRecord=this.saveList[index]
				delSaveBook({
					book_id:delRecord.book_id
				}).then(res=>{
					if(res.code === 200){
						this.saveList.splice(index,1)
	            		this.total--
	            		if(!this.total){
	            			this.noNotes=true
	            		}
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../assets/style/vars.sass';
	.book-save{
		.toolbar{
			height: .44rem;
			padding: .3rem .2rem;
			margin-top: .2rem;
			background-color: #fff;
			.left{
				float: left;
				width: 2rem;
				line-height: .44rem;
			}
			.right{
				float: right;
				a{
					width: .8rem;
					height: .4rem;
					font-size: .26rem;
					color: $gray;
				}
			}
		}
		.book-box{
			overflow: hidden;
			background-color: #fff;
			padding-top: .15rem;
			margin-top: -.15rem;
			.img{
				float: left;
				width: 2rem;
				margin: 0 .25rem;
				margin-bottom: .3rem;
				position: relative;
				img{
					width: 2rem;
					height: 2.67rem;
				}
				span{
					display: block;
					margin-top: .1rem;
					overflow: hidden;
					white-space:nowrap;
					text-overflow:ellipsis;
				}
				i{
					position: absolute;
					width: .45rem;
					height: .45rem;
					line-height: .45rem;
					text-align: center;
					right: -.15rem;
					top: -.15rem;
					background-color: $red;
					color: #fff;
					border-radius: .3rem;
				}
			}
		}
	}
</style>