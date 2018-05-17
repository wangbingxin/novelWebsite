<template>
  <div class="buy-ticket">
    <main-header title="购买套餐"></main-header>
    <div class="tickets">
      <div class="ticket">
        <div class="ticket-box ticket-1">
          <div class="left">
            <i class="fa fa-user"></i>
          </div>
          <div class="right">
            <span>粉丝套餐</span> 2个月抢先观看
          </div>
          <a @click="goPay('2',49)">49元<br>点击购买</a>
        </div>
        <div class="bottom">
          1. 赠送价值16元的书币可用于购买阅路小说网所有小说<br>
          2. 加入QQ书籍讨论群
        </div>
      </div>
      <div class="ticket">
        <div class="ticket-box ticket-2">
          <div class="left">
            <i class="fa fa-flag"></i>
          </div>
          <div class="right">
            <span>追更必备</span> 6个月抢先观看
          </div>
          <a @click="goPay('2',99)">99元<br>点击购买</a>
        </div>
        <div class="bottom">
          1. 赠送价值40元的书币可用于购买阅路小说网所有小说<br>
          2. 加入QQ书籍讨论群<br>
          3. 加入定制微信书友群
        </div>
      </div>
      <div class="ticket">
        <div class="ticket-box ticket-3">
          <div class="left">
            <i class="fa fa-heart"></i>
          </div>
          <div class="right">
            <span>铁粉专属</span> 12个月抢先观看
          </div>
          <a @click="goPay('2',199)">199元<br>点击购买</a>
        </div>
        <div class="bottom">
          1. 赠送价值100元的书币可用于购买阅路小说网所有小说<br>
          3. 加入QQ书籍讨论群<br>
          4. 加入定制微信书友群<br>
          5. 加入作者所在私人群
        </div>
      </div>
      <div class="ticket">
        <div class="ticket-box ticket-4">
          <div class="left">
            <i class="fa fa-star"></i>
          </div>
          <div class="right">
            <span>至尊所选</span> 12个月抢先观看
          </div>
          <a @click="goPay('2',399)">399元<br>点击购买</a>
        </div>
        <div class="bottom">
          1. 赠送价值100元的书币可用于购买阅路小说网所有小说<br>
          2. 加入QQ书籍讨论群<br>
          3. 加入定制微信书友群<br>
          4. 加入作者所在私人群<br>
          5. 实体书出版扉页致谢<br>
          6. 坦克亲笔签名书一本
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from '../../components/header.vue'
import MainFooter from '../../components/footer.vue'
import { params } from '../../params'
export default {
  data () {
    return {
      
    }
  },
  components:{
    MainHeader,
    MainFooter
  },
  methods:{
    goPay(id,money){
      location.href=`//trade.${params.domain}/v1.0/index?money=${money*100}&giving_coin=0&user_coin=0&application_id=1&application_activity_id=${id}&application_order_id=0&book_id=${this.$route.query.book_id}&chapter_id=${this.$route.query.chapter_id}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../assets/style/vars.sass';
  .buy-ticket{
    .tickets{
      min-height: 7rem;
    }
    .ticket{
      width: 7rem;
      margin: .2rem auto;
      font-size: .24rem;
      color: #fff;
      overflow: hidden;
      border-bottom: dashed .02rem $line;
      padding-bottom: .15rem;
      .ticket-box{
        overflow: hidden;
        border-radius: .1rem;
        position: relative;
        .left{
          float: left;
          width: .5rem;
          font-size: .55rem;
          text-align: center;
          margin-left: .2rem;
          margin-top: .12rem;
        }
        .right{
          float: left;
          width: 4.7rem;
          font-size: .26rem;
          padding: .2rem;
          margin-top: .05rem;
          span{
            font-size: .36rem;
          }
        }
        a{
          float: left;
          width: 1.2rem;
          
          height: .88rem;
          color: #fff;
          text-align: center;
          padding-top: .18rem;
          
        }
      }
      .ticket-1{
        background-color: $green;
        a{
          background-color: #089c51;
          box-shadow: inset .1rem 0 .2rem 0 #078b49;
        }
      }
      .ticket-2{
        background-color: $orange;
        a{
          background-color: #ed9811;
          box-shadow: inset .1rem 0 .2rem 0 #df8e10;
        }
      }
      .ticket-3{
        background-color: $blue;
        a{
          background-color: #2e9cf9;
          box-shadow: inset .1rem 0 .2rem 0 #2690e9;
        }
      }
      .ticket-4{
        background-color: $red;
        a{
          background-color: #f65858;
          box-shadow: inset .1rem 0 .2rem 0 #e64949;
        }
      }
      .bottom{
        padding: .1rem;
        padding-bottom: 0;
        color: $gray;
      }
    }
  }
</style>
