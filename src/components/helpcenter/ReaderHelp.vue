<template>
  <div class="reader-help">
    <ul>
      <li>
        <a>充值:</a>
        <ul>
          <li class="content" @click="show(0)" :class="{active:activeClass==0}">
            <div class="rh-title">
              <span>1.如何给账户充值？</span>
            </div>
            <div class="rh-content">
              页导航栏点击【充值】按钮，或者进入个人中心页面点击【充值】。
            </div>
          </li>
          <li class="content" @click="show(1)" :class="{active:activeClass==1}">
            <div class="rh-title">
              <span>2.充值后不到账怎么办？</span>
            </div>
            <div class="rh-content">
              未到账可能是以下原因造成的：<br>（1）由于充值人数较多，所以充值通道拥挤，充值成功速度就会稍慢；<br>（2）数据提交上去之后，系统要对数据进行核对才可以给出成功或者失败的结果。<br>如果30分钟内没有到账，请立即联系本站客服。<br>客服电话：010-58773126(09:00-17:30)<br>客服QQ：1828314267
            </div>
          </li>
          <li class="content" @click="show(2)" :class="{active:activeClass==2}">
            <div class="rh-title">
              <span>3.充值后账户余额数量没变？</span>
            </div>
            <div class="rh-content">
              （1）刷新当前页面；<br>（2）退出后重新登录；<br>（3）如果以上2种方法无效，那么可能没有充值成功，请联系本站客服。<br>客服电话：010-58773126<br>客服QQ：1828314267。
            </div>
          </li>
          <li class="content" @click="show(3)" :class="{active:activeClass==3}">
            <div class="rh-title">
              <span>4.如何查看我的充值记录？</span>
            </div>
            <div class="rh-content">
              个人中心页面，点击【财务记录】，便会看到您的充值记录。
            </div>
          </li>
        </ul>
      </li>
      <li>
        <a>订阅:</a>
        <ul>
          <li class="content" @click="show(4)" :class="{active:activeClass==4}">
            <div class="rh-title">
              <span>1.为什么我无法阅读VIP章节？</span>
            </div>
            <div class="rh-content">
              VIP章节需要订阅后才能阅读。充值后，选择您要看的VIP章节并按提示支付阅路小说网币，随后即可阅读。
            </div>
          </li>
          <li class="content" @click="show(5)" :class="{active:activeClass==5}">
            <div class="rh-title">
              <span>2.VIP书籍怎么收费的？</span>
            </div>
            <div class="rh-content">
              本站VIP内容按照300字1个阅路小说网币进行收费,即每300字您需要支付0.01元,越高等级的VIP订阅折扣越大。
            </div>
          </li>
          <li class="content" @click="show(6)" :class="{active:activeClass==6}">
            <div class="rh-title">
              <span>3.充值后就能免费阅读VIP章节？</span>
            </div>
            <div class="rh-content">
              不是。VIP章节需要您订阅后才能阅读，且按照300字1阅路小说网币进行计费。
            </div>
          </li>
          <li class="content" @click="show(7)" :class="{active:activeClass==7}">
            <div class="rh-title">
              <span>4.购买的VIP章节无法阅读？</span>
            </div>
            <div class="rh-content">
              您可能遇到了系统问题，请联系本站客服解决。客服电话：010-58773126，客服QQ：1828314267。
            </div>
          </li>
          <li class="content" @click="show(8)" :class="{active:activeClass==8}">
            <div class="rh-title">
              <span>5.VIP阅读需要重新付费吗？</span>
            </div>
            <div class="rh-content">
              不需要。已经购买的VIP章节您可以随时免费阅读。
            </div>
          </li>
          <li class="content" @click="show(9)" :class="{active:activeClass==9}">
            <div class="rh-title">
              <span>6.如何查看我的订阅记录？</span>
            </div>
            <div class="rh-content">
              登录之后，进入个人中心页面，点击【财务记录】，便会看到您的消费记录。
            </div>
          </li>
        </ul>
      </li>
      <li>
        <a>月票:</a>
        <ul>
          <li class="content" @click="show(10)" :class="{active:activeClass==10}">
            <div class="rh-title">
              <span>1.什么是月票？</span>
            </div>
            <div class="rh-content">
              月票是VIP会员用户专有的票种，用来评选阅路小说网签约作品。月票的数量可以在个人中心页面查看。
            </div>
          </li>
          <li class="content" @click="show(11)" :class="{active:activeClass==11}">
            <div class="rh-title">
              <span>2.如何获得月票？</span>
            </div>
            <div class="rh-content">
              目前获得月票的方式有以下两种：<br>（1）VIP会员通过订阅章节消费，达到指定标准后根据VIP等级赠送月票；<br>（2）VIP会员单次打赏作品1000阅路小说网币，即获得1张消费月票，无上限。<br>注：本月获得的消费月票将于下一个月增加到用户账户中。
            </div>
          </li>
          <li class="content" @click="show(12)" :class="{active:activeClass==12}">
            <div class="rh-title">
              <span>3.月票使用规则</span>
            </div>
            <div class="rh-content">
              （1）只能对阅路小说网网已签约的作品投月票；<br>（2）投月票时可选择需要投的票数进行投票，目前VIP会员对单本作品每月最多可投2张月票；<br>（3）所有月票（包含保底和消费月票）一律当月有效，过期作废，不可以延期使用。
            </div>
          </li>
          <li class="content" @click="show(13)" :class="{active:activeClass==13}">
            <div class="rh-title">
              <span>4.如何投月票？</span>
            </div>
            <div class="rh-content">
              进入书籍详情页面，在作品动态栏点击【投月票】按钮，为您喜欢的作品投上一票。
            </div>
          </li>
        </ul>
      </li>
      <li>
        <a>书券:</a>
        <ul>
          <li class="content" @click="show(14)" :class="{active:activeClass==14}">
            <div class="rh-title">
              <span>1、什么是书券？</span>
            </div>
            <div class="rh-content">
              答：书券是阅路小说网网新增的一种虚拟币，与阅路小说网币等值，可用于VIP章节订阅。
            </div>
          </li>
          <li class="content" @click="show(15)" :class="{active:activeClass==15}">
            <div class="rh-title">
              <span>2、书券的使用范围</span>
            </div>
            <div class="rh-content">
              答：书券在阅路小说网全站通用（包括阅路小说网网、Wap站和手机客户端），但受以下使用限制：<br>（1）书券仅能用于章节订阅，不支持作品打赏等消费功能；<br>（2）使用书券订阅将无法获得订阅月票；<br>（3）使用书券购买VIP章节，将不会获得会员积分。
            </div>
          </li>
          <li class="content" @click="show(16)" :class="{active:activeClass==16}">
            <div class="rh-title">
              <span>3、如何获得书券？</span>
            </div>
            <div class="rh-content">
              答：目前，阅路小说网网用户可以通过以下途径来获得书券：<br>（1）VIP会员升级赠送书券
              <br>（2）根据上月的阅路小说网币消费额度，下一月返还书券
              <br>计算公式：本月返还书券数额s=上月阅路币消费额度m*5%
              <br>注：消费包括订阅和打赏。
              <br>（3）每月签到奖励书券
              <br>累计签到满7天，奖励20书券；累计签到满15天，奖励30书券；累计签到一个月，奖励50书券。
              <br>（4）成为阅路小说网网签约作者，赠送5000书券
              <br>（5）参加特定活动获得书券
              <br>阅路小说网网会定期举行各种内容丰富的活动，只要参加这些活动，就有机会获得丰厚的书券奖励。
            </div>
          </li>
          <li class="content" @click="show(17)" :class="{active:activeClass==17}">
            <div class="rh-title">
              <span>4、书券的使用方法</span>
            </div>
            <div class="rh-content">
              答：书券仅可用于VIP章节订阅，规则如下：
              <br>（1）订阅前10章VIP章节，默认优先使用书券抵扣支付，若书券余额不足，则差额用阅路币补齐；
              <br>（2）前10章以外的VIP章节，在订阅时，阅路币和书券按照一定比例扣除；若书券余额不足，则用阅路币购买。
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<style>
.reader-help a {
    font-size: .34rem;
    font-weight: bold;
    padding: .2rem;
    display: block;
}
.reader-help .rh-title {
  line-height:.6rem;
}
.reader-help .rh-content {
  max-height: 0;
  line-height:.5rem;
  overflow: hidden;
  padding: 0 .2rem;
  background: #f4f4f4;
  border-radius: .1rem;
}
.reader-help .content .rh-content{
  transition: max-height 300ms ease;
}
.reader-help .active .rh-content{
  max-height: 4rem;
}
</style>
<script>
export default{
    data(){
      return{
        activeClass:0
      }
    },
    methods:{
      show(key){
        this.activeClass=key==this.activeClass?-1:key;
      }
    }
  }
</script>
