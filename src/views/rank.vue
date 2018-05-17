<style scoped lang="scss">
  @import '../assets/style/vars.sass';
  .rank{
    .container{
      h1{
        .button{
          float: right;
          a {
            background-color: $lightwhite;
            font-size: .26rem; color: $dark;
            font-weight: normal;
            margin-left: .2rem;
            padding: .05rem .1rem;
            border-radius: .08rem;
          }
          .active {
            background-color: $green;
            color: #fff;
          }
          .active-nv{
            background-color: $red;
            color: #fff;
          }
        }
      }
    }
  }
  .rank .tabs a{ margin: 0 .4rem; }
  .rank .content{ height: 2.4rem; padding: .2rem .25rem; }
  .rank .content a{ display: block; }
  .rank .content .img{ float: left; width: 1.8rem; }
  .rank .content .img img{ width: 1.8rem; height: 2.4rem; }
  .rank .content .info{ float: left; width: 4.9rem; margin-left: .3rem; position: relative; }
  .rank .content .info h2{ font-size: .3rem; }
  .rank .content .info h3{ font-size: .26rem; color: #999; margin-top: .26rem; }
  .rank .content .info p{ color: #666; font-size: .26rem; margin-top: .4rem; }
  .rank .content .info i{ position: absolute; color: #fff; background: url(../imgs/index/after.png) no-repeat center; background-size: .5rem; width: .8rem; height: 1.2rem; top: 0; right: 0; text-align: center; line-height: 1.1rem; }
  .rank .content .info .top{ background: url(../imgs/index/before.png) no-repeat center; background-size: .5rem; line-height: 1.1rem; }
</style>
<template>
  <div class="rank">
    <main-header v-if="!isApp"></main-header>
    <m-tabs :items="tabs" @change-item="select_rank" style="margin-top: 1.52rem;"></m-tabs>
    <div class="container">
      <h1>
        排行榜
        <div class="button">
          <a v-for="(item,key) in timeBtns" :class="{active:timeClass==key && !u_sex, 'active-nv':timeClass==key && u_sex}" @click="select_time(key)">{{item}}</a>
        </div>
      </h1>
      <div class="content" v-for="(item,key) in rankList">
        <router-link :to="{name:'book',params:{book_id:item.book_id}}">
          <div class="img">
            <img :src="item.banner"></div>
          <div class="info">
            <h2>{{item.book_name}}</h2>
            <h3>
              作者: {{item.author_name}}&nbsp;{{item.book_end_status?'已完结':'连载中'}}
            </h3>
            <h3>字数:{{item.book_word_count}}</h3>
            <p>
              <span :style="{color: sex_color}">最新</span>
              {{item.last_chapter_name}}
            </p> <i :class="{top:key<3}">{{key+1}}</i>
          </div>
        </router-link>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
	import MainHeader from "../components/index/header.vue";
	import MainFooter from "../components/footer.vue";
  import { getClickRank, getSubscribeRank, getNewRank } from '../api/api'
	export default{
		data(){
			return{
        tabs:["点击榜","订阅榜","新书榜"],
				timeBtns:["周","月","总"],
				rankClass:1,
				timeClass:2,
				rankList:[],
				days:'',
        isApp
			}
		},
		components:{
			MainHeader,
			MainFooter
		},
    computed:{
      ...Vuex.mapGetters(['u_sex', 'sex_color'])
    },
		mounted(){
			this.getClickRank()
		},
    watch:{
      u_sex(val){
        this.getClickRank()
      }
    },
		methods:{
      getClickRank(){
        getClickRank({
          days: this.days,
          sex: this.u_sex?1:0
        }).then(res=>{ this.rankList=res.data })
      },
      getSubscribeRank(){
        getSubscribeRank({
          days: this.days,
          sex: this.u_sex?1:0
        }).then(res=>{ this.rankList=res.data })
      },
      getNewRank(){
        getNewRank({
          days: this.days,
          sex: this.u_sex?1:0
        }).then(res=>{ this.rankList=res.data })
      },
			select_rank(key){
        this.rankClass=key
				if(key==1){ this.getClickRank() }
				if(key==2){ this.getSubscribeRank() }
				if(key==3){ this.getNewRank() }
			},
			select_time(key){
				this.timeClass=key
				if(key==0){ this.days=7; }
				if(key==1){ this.days=30; }
				if(key==2){ this.days=''; }
        if(this.rankClass==1){ this.getClickRank() }
        if(this.rankClass==2){ this.getSubscribeRank() }
        if(this.rankClass==3){ this.getNewRank() }
			}
		}
	}
</script>
