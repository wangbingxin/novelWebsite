<template>
	<div class="recent-reading">
		<div class="loading" v-show="isLoading">正在加载，请稍等...</div>
		<div class="toolbar" v-show="!noNotes && !isLoading">
			<div class="left">共{{total}}本</div>
			<div class="right"><a @click="isHandle=!isHandle">{{isHandle?'完成':'管理'}}</a></div>
		</div>
		<div class="no-notes" v-show="noNotes">亲，你还没有阅读记录哦！— ^_^</div>
		<div class="content" v-for="(item,key) in readRecord">
			<router-link :to="{name:'read',params:{book_id:item.book_id,chapter_id:item.chapter_id}}">
				<div class="img">
					<img :src="item.book_url"></div>
				<div class="info">
					<h2>{{item.book_name}}</h2>
					<p>更新至{{item.last_chapter}}</p>
					<p>
						已阅读至{{item.chapter_serial_number}} {{item.chapter_name}}
					</p>
					
				</div>
			</router-link>
			<span @click="delRecord(key)" v-show="isHandle"><i class="fa fa-trash-o"></i><br>删除</span>
		</div>
		<div class="more" @click="showMore" v-show="total>readRecord.length">点击加载更多</div>
	</div>
</template>
<script>
	import { setCookie } from '../../assets/js/common'
	import { getRecentRead, delRecentRead } from '../../api/api'
	export default{
		data(){
			return{
				noNotes:false,
				readRecord:[],
				page:1,
				pageSize:20,
				total:0,
				isHandle:false,
				isLoading:true
			}
		},
		mounted(){
			this.getReadList();
		},
		methods:{
			getReadList(){
				getRecentRead({
					page: this.page,
					page_size:this.pageSize
				}).then(res=>{
					if(res.code === 200){
						var readArr=res.data.read_record
	            		!readArr.length&&!this.readRecord.length?this.noNotes=true:false
	            		this.readRecord=this.readRecord.concat(readArr)
	            		this.isLoading=false
	            		this.total=res.data.total
					}
				})
			},
			delRecord(index){
				var delRecord=this.readRecord[index]
				delRecentRead({
					book_id:delRecord.book_id
				}).then(res=>{
					if(res.code === 200){
						this.readRecord.splice(index,1)
						this.total--
						if(!this.total){
							this.noNotes=true
						}
					}
				})
			},
			showMore(){
				this.page++
				this.getReadList()
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../assets/style/vars.sass';
	.recent-reading{
		.toolbar{
			height: .44rem;
			padding: .3rem .2rem;
			margin-top: .2rem;
			background-color: #fff;
			.left{
				float: left;
				width: 2rem;
				line-height: .44rem;
				font-weight: bold;
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
		.content{
			padding-bottom: .3rem;
			a{
				display: block;
			}
			.img{
				float: left;
				width: 1.2rem;
				img{
					width: 1.2rem;
					height: 1.6rem;
				}
			}
			.info{
				float: left;
				width: 5.7rem;
				margin-left: .2rem;
				h2{
					font-size: .3rem;
				}
				p{
					margin-top: .2rem;
					color: $gray;
				}
			}
			span{
				position: absolute;
				width: .8rem;
				right: .2rem;
				top: .4rem;
				text-align: center;
				font-size: .24rem;
				color: $red;
				i{
					font-size: .32rem;
				}
			}
		}
	}
</style>