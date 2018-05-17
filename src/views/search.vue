<template>
  <div class="search-page">
    <main-header></main-header>
    <div class="search-box">
      <div class="search">
        <input v-model="keyword" placeholder="请输入书名，书号或作者名">
      </div>
      <a @click="searchBook" :style="{backgroundColor:sex_color}">搜索</a>
    </div>
    <div class="search-result" v-if="!isShowRecommend">
      <div class="search-item" v-for="item in searchResult">
        <router-link :to="{name:'book',params:{book_id:item.book_id}}">
          <div class="img">
            <img :src="item.book_cover">
          </div>
          <div class="info">
            <h1>{{item.book_name}}</h1>
            <h2>作者：{{item.author_name}} <span>{{item.book_end_status?'已完结':'连载中'}}</span></h2>
            <h2>字数：{{item.book_word_count}}</h2>
            <p><span :style="{color: sex_color}">最新</span> {{item.last_chapter_name}}</p>
          </div>
        </router-link>
      </div>
      <!-- <div class="more" @click="showMore" v-show="isMore">点击加载更多</div> -->
      <div class="no-notes" v-show="!searchResult.length && !isShowRecommend">亲，没有搜索到相关内容哦！— ^_^</div>
    </div>
    <m-img-list title="作品推荐" :data="moduleSearch" v-if="isShowRecommend"></m-img-list>
  </div>
</template>
<script>
  import MainHeader from "../components/index/header.vue";
  import { getSearchBook } from '../api/api'
  export default{
    data(){
      return {
        keyword:'',
        searchResult:[],
        channel_tab:localStorage.getItem('channel_tab'),
        isShowRecommend:true,
        isMore:false,
        bookRecommend:[]
      }
    },
    components:{
      MainHeader
    },
    computed:{
      ...Vuex.mapState(['moduleSearch']),
      ...Vuex.mapGetters(['u_sex', 'sex_color'])
    },
    mounted(){
      if(!this.moduleSearch){
        this.getModuleSearch()
      }
    },
    watch:{
      u_sex(val){
        this.getModuleSearch()
      }
    },
    methods:{
      ...Vuex.mapActions(['getModuleSearch']),
      searchBook(){
        if(this.keyword){
          getSearchBook({
            keyword:this.keyword
          }).then(res=>{
            this.searchResult=res.data.search_result
            this.isShowRecommend=false
          })
        }else{
          this.isShowRecommend=true
        }
      }
      // showMore(){}
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/style/vars.sass';
  .search-page{
    .search-box{
      padding: .3rem .2rem;
      background-color: #fff;
      overflow: hidden;
      margin-top: 1.52rem;
      .search{
        float: left;
        width: 4.8rem;
        height: .6rem;
        border: solid .02rem #b3b3b3;
        border-radius: .08rem;
        padding-left: .7rem;
        background: url(../imgs/search.png) no-repeat .2rem center;
        background-size: .35rem;
        input{
          width: 4.5rem;
          line-height: .6rem;
          background: none;
        }
      }
      a{
        float: left;
        width: 1.35rem;
        height: .64rem;
        line-height: .64rem;
        text-align: center;
        color: #fff;
        border-radius: .08rem;
        margin-left: .2rem;
        font-size: .28rem;
      }
    }
    .search-result{
      padding: .3rem .25rem;
      background-color: #fff;
      margin-top: .2rem;
      .search-item{
        height: 2rem;
        margin-top: .4rem;
        &:first-child{
          margin-top: 0;
        }
        a{
          display: block;
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
        width: 5.2rem;
        margin-left: .3rem;
        h1{
          font-size: .32rem;
        }
        h2{
          font-size: .26rem;
          color: #999;
          margin-top: .1rem;
          span{
            display: inline-block;
            margin-left: .3rem;
          }
        }
        p{
          font-size: .26rem;
          color: #666;
          margin-top:.3rem;
        }
      }
    }
  }
</style>
