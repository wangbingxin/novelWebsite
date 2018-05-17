<template>
  <div class="banner-container">
    <div class="banner swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,key) in moduleImgLoop" >
          <a :href="item.banner_url"><img :src="item.banner"></a>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="user-remind" v-if="isLogin && (newMsg || recentBookId)">
      <div class="remind" :class="{current:loop}">
        <div class="message" v-if="newMsg">
          <span></span>您有新消息啦！<router-link to="/message" :style="{color: sex_color}">点击查看</router-link>
        </div>
        <div class="recent" v-if="recentBookId">
          最近阅读：<router-link :to="'/book/'+recentBookId" :style="{color: sex_color}">{{recentBook}}</router-link>
        </div>
      </div>
      <div class="sign">
      <router-link to="/sign">签到</router-link>
      </div>
    </div>
  </div>
</template>
<style scoped lang='scss'>
    @import '../../assets/style/vars.sass';
    .banner-container{
      background-color: #fff;
      margin-bottom: -.2rem;
      padding-bottom: .1rem;
      margin-top: 1.52rem;
      .banner{
        width: 7.5rem;
        height: 2.7rem;
        a{
          display: block;
          img{
            width: 7.5rem;
            height: 2.7rem;
          }
        }
      }
      .user-remind{
        width: 5.5rem;
        height: .5rem;
        padding: .15rem .25rem;
        margin: 0 auto;
        margin-top: -.45rem;
        background-color: #fff;
        border-radius: .4rem;
        box-shadow: 0 .15rem .5rem 0 #f1f1f1;
        position: relative;
        z-index: 1;
        overflow: hidden;
        .remind{
          float: left;
          width: 4.4rem;
          font-size: .26rem;
          line-height: .5rem;
          margin-top: 0;
          transition: margin-top 800ms;
          .message{
            margin-bottom: .1rem;
          }
          span{
            display: inline-block;
            width: .24rem;
            height: .29rem;
            background: url(../../imgs/message.png) no-repeat center;
            background-size: .24rem;
            vertical-align: middle;
            margin-right: .15rem;
            position: relative;
            top: -.05rem;
          }
        }
        .current{
          margin-top: -.6rem;
        }
        .sign{
          float: right;
          width: 1.1rem;
          border-left: solid .02rem $line;
          box-sizing: border-box;
          text-align: right;
          a{
            display: inline-block;
            padding: .07rem .2rem;
            background-color: $orange;
            color: #fff;
            font-size: .24rem;
            border-bottom: solid .05rem #cc8f00;
            border-radius: .5rem;
          }
        }
      } 
    }
</style>
<script>
  import {setCookie,getCookie} from "../../assets/js/common"
  import { getUserRecent, getMessage } from '../../api/api'

  export default{
    data(){
      return {
          isLogin:getCookie("signature")&&getCookie("user_id")&&getCookie("user_uuid"),
          recentBook:'',
          recentBookId:0,
          newMsg:false,
          loop:false,
          swiper:null,
          isApp
      }
    },
    mounted(){
      this.getImgLoop()
      this.getUserRecent()
      this.getNewMessage()
      setTimeout(()=>{
        this.swiper = new Swiper('.swiper-container', {
          autoplay: true,
          loop: true,
          speed: 800,
          pagination: {
            el: '.swiper-pagination',
          }
        })
      },1000)
      setTimeout(()=>{
        if(this.isLogin && this.newMsg && this.recentBookId){
          setInterval(()=>{
            this.loop=!this.loop
          },3000)
        }
      },1000)
    },
    computed:{
      ...Vuex.mapState(['moduleImgLoop']),
      ...Vuex.mapGetters(['u_sex', 'sex_color'])
    },
    watch:{
      u_sex(){
        this.getImgLoop()

        this.swiper.destroy(false)
        setTimeout(()=>{
          this.swiper = new Swiper('.swiper-container', {
            autoplay: true,
            loop: true,
            speed: 800,
            pagination: {
              el: '.swiper-pagination',
            }
          })
        },1000)
      }
    },
    methods:{
      ...Vuex.mapActions(['getImgLoop']),
      getUserRecent(){
        if(this.isLogin){
          getUserRecent().then(res=>{
            this.recentBookId=res.data.recent_book_id
            this.recentBook=res.data.recent_book_name.length>12?res.data.recent_book_name.substr(0,12)+'...':res.data.recent_book_name
          })
        }
      },
      getNewMessage(){
        if(this.isLogin){
          getMessage().then(res=>{
            if(res.code === 200){
              this.newMsg=res.data ? true : false
            }
          })
        }
      }
    }
  }
</script>
