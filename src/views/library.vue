<template>
	<div class="library">
		<main-header v-if="!isApp"></main-header>
		<div class="conditions container">
			<h1>筛选条件</h1>
			<div class="items">
				<div class="item">
					<span>频道：</span>
					<p>
						<a v-for="item in bookChannel" :class="{active:selectedChannel == item.category_id && !u_sex,'active-nv':selectedChannel == item.category_id && u_sex}" @click="switchChannel(item.category_id)">{{item.category_name}}</a>
					</p>
				</div>
				<div class="item">
					<span>作品分类：</span>
					<p>
						<a :class="{active:selectedSecond==selectedChannel && !u_sex,'active-nv':selectedSecond==selectedChannel && u_sex}" @click="switchSecond(selectedChannel)">不限</a>
						<a v-for="item in secondCategory" :class="{active:selectedSecond==item.category_id && !u_sex,'active-nv':selectedSecond==item.category_id && u_sex}" @click="switchSecond(item.category_id)">{{item.category_name}}</a>
					</p>
					<p v-if="!(selectedSecond==1||selectedSecond==2||selectedSecond==3)" class="third-category">
						<a v-for="item in thirdCategory" :class="{active:selectedThird==item.category_id && !u_sex, 'active-nv':selectedThird==item.category_id && u_sex}" @click="switchThird(item.category_id)">{{item.category_name}}</a>
					</p>
				</div>
				<div class="item">
					<span>是否完结：</span>
					<p>
						<a :class="{active:selectedstatus==2 && !u_sex, 'active-nv':selectedstatus==2 && u_sex}" @click="switchStatus(2)">不限</a>
						<a :class="{active:selectedstatus==0}" @click="switchStatus(0)">连载中</a>
						<a :class="{active:selectedstatus==1 && !u_sex, 'active-nv':selectedstatus==1 && u_sex}" @click="switchStatus(1)">已完结</a>
					</p>
				</div>
				<div class="item">
					<span>排序方式：</span>
					<p>
						<a v-for="item in sortMethods" :class="{active:selectedSort==item.sort_id && !u_sex, 'active-nv':selectedSort==item.sort_id && u_sex}" @click="switchSort(item.sort_id)">{{item.sort_name}}</a>
					</p>
				</div>
			</div>
		</div>
		<div class="container book-container">
			<div class="no-notes" v-show="noNotes">亲，没有相关书籍哦！— ^_^</div>
			<div class="book-list">
				<router-link :to="{name:'book',params:{book_id:item.book_id}}" v-for="(item,index) in bookList" :key="index">
					<div class="img">
						<img v-lazy="item.banner"></div>
					<div class="info">
						<h2>{{item.book_name}}</h2>
						<p>
							{{item.author_name}} | {{item.book_category}} | {{item.book_end_status?"已完结":"连载中"}}
						</p>
						<p>
							<span :style="{color: sex_color}">最新&nbsp;</span>
							{{item.last_chapter_name}}&nbsp; <i v-if="item.book_is_vip"></i>
						</p>
					</div>
				</router-link>
			</div>
			<div class="more" @click="showMore" v-show="isMore">点击加载更多</div>
		</div>
		<main-footer></main-footer>
		<go-top></go-top>
	</div>
</template>
<style lang="scss" scoped>
  @import '../assets/style/vars.sass';
  .library{
    .conditions{
      margin-top: 1.52rem;
    }
    .book-container{
      width: 7rem;
      padding: .1rem .25rem;
      background-color: #fff;
      margin-top: .2rem;
      .book-list{
        a{
        	display: block;
        	overflow: hidden;
        	padding: .2rem 0;
        	border-bottom: solid .02rem $line;
        	&:last-child{
        		border-bottom: none;
        	}
        }
        .img{
          float: left;
          width: 1.5rem;
          height: 2rem;
          img{
            width: 1.5rem;
            height: 2rem;
          }
        }
        .info{
          float: left;
          width: 5.3rem;
          margin-left: .2rem;
          position: relative;
          h2{
          	font-weight: bold;
          }
          p{
            font-size: .26rem;
            color: #666;
            margin-top: .35rem;
            i{
              display: inline-block;
              width: .3rem;
              height: .3rem;
              background: url(../imgs/vip_light.png);
              background-size: .3rem;
              position: relative;
              top: .06rem;
            }
          }
        }
      }
    }
  }
  .library .conditions .items{ overflow: hidden; background-color: #fff; padding-bottom: .3rem; margin-top: -.25rem;}
  .library .conditions .item{ overflow: hidden; padding: .05rem .2rem; }
  .library .conditions .item span{ float: left; width: 1.2rem; font-size: .24rem; line-height: .5rem; margin-top: .2rem; }
  .library .conditions .item p{ float: left; width: 5.9rem; }
  .library .conditions .item p a{ float: left; width: 1.2rem; margin-right: .23rem; color: #999; line-height: .5rem; font-size: .24rem; border: solid .01rem #999; border-radius: .3rem; margin-top: .2rem; text-align: center; }
  .library .conditions .item p .active{ color: $green; border-color: $green; }
  .library .conditions .item p .active-nv{ color: $red; border-color: $red; }
  .library .conditions .item .third-category{ width: 6.7rem; background-color: #f2f2f2; padding: .2rem; padding-top: 0; margin-top: .1rem; border-radius: .1rem; }
  .library .no-notes{ background-color: #fff; padding: .2rem 0; text-align: center; }
</style>
<script>
	import MainHeader from "../components/index/header.vue";
	import MainFooter from "../components/footer.vue";
	import GoTop from '../components/GoTop.vue';
	import { getCategory, getLibrary } from '../api/api'
	export default{
		data(){
			return{
				bookChannel:null,
				selectedChannel:2,
				secondCategory:null,
				selectedSecond:0,
				thirdCategory:null,
				selectedThird:0,
				selectedType:2,
				selectedstatus:2,
				selectedSort:"update_time",
				publishType:[
					{
						type_id:3,
						type_name:"不限"
					},
					{
						type_id:18,
						type_name:"短篇阅读"
					},
					{
						type_id:19,
						type_name:"经典名著"
					},
					{
						type_id:21,
						type_name:"现代文学"
					},
					{
						type_id:20,
						type_name:"其它出版"
					}
				],
				sortMethods:[
					{
						sort_id:"update_time",
						sort_name:"更新时间"
					},
					{
						sort_id:"book_click",
						sort_name:"点击量"
					},
					{
						sort_id:"user_collection",
						sort_name:"收藏量"
					},
					{
						sort_id:"book_word_count",
						sort_name:"字数"
					}
				],
				noNotes:false,
				bookList:[],
				page:1,
				pageSize:15,
				isMore:true,
				isApp
			}
		},
		components:{
			MainHeader,
			MainFooter,
			GoTop
		},
		computed:{
			...Vuex.mapGetters(['u_sex', 'sex_color'])
		},
		mounted(){
			this.selectedSecond=this.selectedChannel;
			this.getBookChannel();
			this.getBookList();
			this.getSecondCategory();
		},
		methods:{
			getBookChannel(){
				getCategory().then(res=>{
					this.bookChannel=res.data
				})
			},
			getSecondCategory(){
				getCategory({
					category_id:this.selectedChannel
				}).then(res=>{
					this.secondCategory=res.data
				})
			},
			getThirdCategory(){
				getCategory({
					category_id:this.selectedSecond
				}).then(res=>{
					this.thirdCategory=res.data
				})
			},
			getBookList(){
				getLibrary({
					book_type:this.selectedType,
					book_end_status:this.selectedstatus,
					order_by:this.selectedSort,
					page_size:this.pageSize,
					page:this.page
				}).then(res=>{
					var bookArr=res.data.search_result;
            		bookArr.length<this.pageSize?this.isMore=false:this.isMore=true
            		!bookArr.length&&!this.bookList.length?this.noNotes=true:this.noNotes=false
            		this.bookList=this.bookList.concat(bookArr)
				})
			},
			showMore(){
				this.page++;
				this.getBookList();
			},
			switchChannel(val){
				this.selectedChannel=this.selectedType=this.selectedSecond=val;
				this.bookList=[];
				this.page=1;
				this.getSecondCategory();
				this.getBookList();
			},
			switchSecond(val){
				this.selectedSecond=this.selectedType=val;
				this.bookList=[];
				this.page=1;
				this.getThirdCategory();
				this.getBookList();
				console.log(this.selectedType)
			},
			switchThird(val){
				this.selectedThird=this.selectedType=val;
				this.bookList=[];
				this.page=1;
				this.getBookList();
				console.log(this.selectedType)
			},
			switchStatus(val){
				this.selectedstatus=val;
				this.bookList=[];
				this.page=1;
				this.getBookList();
			},
			switchSort(val){
				this.selectedSort=val;
				this.bookList=[];
				this.page=1;
				this.getBookList();
			}
		}
	}
</script>