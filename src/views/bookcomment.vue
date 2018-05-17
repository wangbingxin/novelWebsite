<template>
  <div class="main">
    <main-header title="书评"></main-header>
    <div class="container book-comment">
      <div class="loading" v-show="isLoading">正在加载，请稍等...</div>
      <div class="content no-notes" v-show="noNotes">
        你还没有写过书评哦！
      </div>
      <div class="content" v-for="item in commentList">
        <router-link :to="'/book/'+item.book_id">
          <h2>{{getLocalTime(item.insert_time)}} 评论 <span>《{{item.book_name}}》</span></h2>
          <p>{{item.content}}</p>
        </router-link>
      </div>
      <div class="more" @click="showMore" v-show="totalPage>page">点击加载更多</div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<style lang="scss">
  @import '../assets/style/vars.sass';
  .book-comment{ margin-top: .9rem; }
  .book-comment h2{ color: $gray; }
  .book-comment h2 span{ color: $red; }
  .book-comment p{ margin-top: .1rem; }
  .book-comment .content{
    padding-top: .2rem;
    margin-bottom: .02rem;
  }
  .main{
    min-height: 100%;
  }
</style>
<script>
    import MainHeader from "../components/header.vue";
    import MainFooter from "../components/footer.vue";
    import { getBookComment } from '../api/api'
    import { getLocalTime } from '../assets/js/common'
    export default{
      data(){
        return {
          commentList:[],
          page:1,
          pageSize:15,
          noNotes:false,
          isLoading:true,
          totalPage:0
        }
      },
      components:{
        MainHeader,
        MainFooter
      },
      mounted(){
        this.getCommentList();
      },
      methods:{
        getLocalTime:getLocalTime,
        getCommentList(){
          getBookComment({
          page:this.page,
          page_size:this.pageSize
        }).then(res=>{
              var commentArr=res.data.comment.data || []
              !commentArr.length&&!this.commentList.length?this.noNotes=true:false
              this.commentList=this.commentList.concat(commentArr)
              this.totalPage=res.data.comment.total_page
              this.isLoading=false
          })
        },
        showMore(){
          this.page++
          this.getCommentList()
        }
      }
    }
</script>