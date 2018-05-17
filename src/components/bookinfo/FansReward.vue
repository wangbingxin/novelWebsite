<template>
  <div class="container reward">
    <ul class="award">
      <li v-for="(item, index, key) in rewards" :class="{active:selectedGold==item}" @click="select_reward(item, index, key)"><span>{{index}}</span></li>
    </ul>
    <div class='self_up'>
      <span class='round' :style="{backgroundColor: sex_color}"></span>
      <span :style="{color: sex_color}">{{message[message_index]}}</span>
      <div class="cnt_btn">
        <button class="btn" @click="sure_reward">打赏本书：{{rewards_index}}书币</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang='scss'>
  @import '../../assets/style/vars.sass';
  .reward{
    margin-top: 0;
    background-color: #fff;
    .award{
      width: 7rem;
      overflow: hidden;
      margin: 0 auto;
      li{
        float: left;
        width: 1.65rem;
        height: 1.6rem;
        text-align: center;
        border-radius: .1rem;
        font-size: .24rem;
        position: relative;
        margin: .2rem .05rem .45rem .05rem;
      }
    }
  }
  .reward .award li:nth-child(1){ background: url(../../imgs/pay/1.png) no-repeat center bottom .1rem; background-size: 1.2rem; }
  .reward .award li:nth-child(2){ background: url(../../imgs/pay/5.png) no-repeat center bottom .1rem; background-size: 1.2rem; }
  .reward .award li:nth-child(3){ background: url(../../imgs/pay/10.png) no-repeat center bottom .1rem; background-size: 1.2rem; }
  .reward .award li:nth-child(4){ background: url(../../imgs/pay/50.png) no-repeat center bottom .1rem; background-size: 1.2rem; }
  .reward .award li:nth-child(5){ background: url(../../imgs/pay/100.png) no-repeat center bottom .1rem; background-size: 1.2rem; }
  .reward .award li:nth-child(6){ background: url(../../imgs/pay/500.png) no-repeat center bottom .1rem; background-size: 1.2rem; }
  .reward .award li:nth-child(7){ background: url(../../imgs/pay/1000.png) no-repeat center bottom .1rem; background-size: 1.2rem; }
  .reward .award li:nth-child(8){ background: url(../../imgs/pay/10000.png) no-repeat center bottom .1rem; background-size: 1.2rem; }
  .reward .award li.active{
    background-color: #e4f2ff;
  }
  .reward .award li span {
    position: absolute;
    left: 50%;
    margin-left: -.8rem;
    width: 1.6rem;
    bottom: -.5rem;;
    font-size: .26rem;
  }
  .self_up {
    width: 7.1rem;
    color: #ff575a;
    margin-left: 0.24rem;
    margin-top: .3rem;
    padding-bottom: .3rem;
    vertical-align: bottom;
    position: relative;
    .round {
      display: inline-block;
      width: .10rem;
      height: .10rem;
      border-radius: 50%;
    }
    span {
      &:nth-child(2) {
        font-size: .26rem;
      }
    }
  }
  .cnt_btn {
    margin-top: .3rem;
    text-align: center;
    .btn {
      width: 6.1rem;
      height: .84rem;
      border: none;
      border-radius: .08rem;
      font-size: .28rem;
      color: #fff;
      background-color: $red;
    }
  }
</style>
<script>
  import { showMsg, setCookie, Confirm } from "../../assets/js/common"
  import { rewardBook } from '../../api/api'
  export default{
    data(){
      return{
        rewards: {
          '书币': 100,
          '咖啡': 500,
          '鲜花': 1000,
          '美酒': 5000,
          '钻石': 10000,
          '皇冠': 50000,
          '跑车': 100000,
          '别墅': 1000000,
        },
        selectedGold:100,
        message: [
          '这本书太棒了，小书币犒劳一下。',
          '文如咖啡，醇香浓郁暖人心。',
          '读后心花路放，送花希望后续更加精彩。',
          '酒逢知己千杯少，大大写书正合我意！',
          '文如砖石璀璨夺目，光耀四方恒久远！',
          '文冠天下当称王，非此犒赏不足以表吾之意!',
          '天花乱坠，感动涕零，千金跑车，助先生纸墨风流！',
          '心潮澎湃，相见恨晚，百万别墅，亦难表吾之喜爱！',
        ],
        // 信息索引
        message_index: 0,
        // 书币
        rewards_index: 100
      }
    },
    computed:{
      ...Vuex.mapGetters(['sex_color'])
    },
    methods:{
      select_reward(reward, index, key){
        this.message_index = key
        this.rewards_index = reward
        this.selectedGold=reward;
      },
      sure_reward(){
        var data={}
        data.book_id=this.$route.params.book_id
        data.consume_type="reward"
        data.coin=this.selectedGold
        data.content=this.message[this.message_index]
        let _this=this
        rewardBook({
          book_id:this.$route.params.book_id,
          consume_type:"reward",
          coin:this.selectedGold,
          content:this.message[this.message_index]
        }).then(res=>{
          if(res.code === 200){
            showMsg("成功打赏"+_this.selectedGold+"币");
            this.$parent.$emit("reloadFansRank");
            this.$parent.isReward=false
          }else if(res.code === 201){
            showMsg('打赏失败啦!')
            this.$parent.isReward=false
          }else if(res.code === 412){
            this.$parent.isReward=false
            Confirm("余额不足,前往充值？",function(){
              setCookie("pay_callback",decodeURIComponent(location.href),60*30,process.env.BASE_DOMAIN,"/")
              location.href=`//trade.${process.env.BASE_DOMAIN}/v1.0/index`
            })
          }
        })
      }
    }
  }
</script>
