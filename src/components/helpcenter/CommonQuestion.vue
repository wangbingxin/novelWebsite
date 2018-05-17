<template>
  <div class="common-question">
    <ul>
      <li class="content" @click="show(0)" :class="{active:activeClass==0}">
        <div class="cq-title">
          <span>1、阅路小说网手机站账号可以通用吗？</span>
        </div>
        <div class="cq-content">
        可以。阅路小说网主站和手机站已经实现了账户互通。如果您已在主站注册账号，则无需在手机站再次注册，充值、订阅、收藏完完本?
        </div>
      </li>
      <li class="content" @click="show(1)" :class="{active:activeClass==1}">
        <div class="cq-title">
          <span>2、忘记密码怎么办？</span>
        </div>
        <div class="cq-content">
          在登录界面点击【忘记密码？】，之后将跳转至找回密码页面。目前提供通过注册邮箱找回密码的服务。
        </div>
      </li>
      <li class="content" @click="show(2)" :class="{active:activeClass==2}">
        <div class="cq-title">
          <span>3、如何修改密码？</span>
        </div>
        <div class="cq-content">
          登录后，在网站首页点击您的昵称进入个人中心，之后进入账户页面，便会看到修改密码的选项。
        </div>
      </li>
      <li class="content" @click="show(3)" :class="{active:activeClass==3}">
        <div class="cq-title">
          <span>4、如何查看我收藏的书籍？</span>
        </div>
        <div class="cq-content">
          登录后，点击网站首页右上角的阅读历史图标，点击【进入书架】按钮。或者进入个人中心页面，点击【书架】，查看您的收藏。
        </div>
      </li>
      <li class="content" @click="show(4)" :class="{active:activeClass==4}">
        <div class="cq-title">
          <span>5、在手机上如何充值？</span>
        </div>
        <div class="cq-content">
          阅路小说网手机站目前开通了手机短信充值功能，步骤如下：<br>（1）在首页导航中点击“充值”；<br>（2）选择充值手机类型；<br>（3）选择充值金额；<br>（4）输入充值手机号，点击“提交”。<br>更多快捷充值服务敬请期待。
        </div>
      </li>
      <li class="content" @click="show(5)" :class="{active:activeClass==5}">
        <div class="cq-title">
          <span>6、充值后账户余额数量没变？</span>
        </div>
        <div class="cq-content">
          解决办法：<br>（1）刷新当前页面；<br>（2）退出后重新登录；<br>（3）如果以上2种方法无效，那么可能没有充值成功，请联系本站客服。客服电话：010-58773126(09:00-17:30)，客服QQ：1828314267。
        </div>
      </li>
      <li class="content" @click="show(6)" :class="{active:activeClass==6}">
        <div class="cq-title">
          <span>7、如何查看财务记录？</span>
        </div>
        <div class="cq-content">
          登录后，进入个人中心页面，点击【财务记录】，查看您的充值记录和消费记录。
        </div>
      </li>
      <li class="content" @click="show(7)" :class="{active:activeClass==7}">
        <div class="cq-title">
          <span>8、为什么我无法阅读VIP章节？</span>
        </div>
        <div class="cq-content">
          VIP章节需要订阅后才能阅读。充值后，选择您要看的VIP章节并按提示支付阅路小说网币，随后即可阅读。
        </div>
      </li>
      <li class="content" @click="show(8)" :class="{active:activeClass==8}">
        <div class="cq-title">
          <span>9、为什么要升级成VIP会员？</span></div>
        <div class="cq-content">
          成为VIP会员后，您将享有如下特权：<br>（1）订阅VIP章节；<br>（2）给您喜欢的作品投月票；<br>（3）拥有VIP会员专属图标；<br>（4）其他特权：会员积分加速；订阅折扣；每日推荐票赠送。
        </div>
      </li>
      <li class="content" @click="show(9)" :class="{active:activeClass==9}">
        <div class="cq-title">
          <span>10、如何成为VIP会员？</span></div>
        <div class="cq-content">
          通过累积VIP成长值来提升VIP用户等级，每充值1元可获得100点VIP成长值。成长值满100点，即可升级为VIP1级会员。
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
.common-question .cq-title {
  line-height:.6rem;
}
.common-question .cq-content {
  max-height: 0;
  line-height:.5rem;
  overflow: hidden;
  padding: 0 .2rem;
  background: #f4f4f4;
  border-radius: .1rem;
}
.common-question .content .cq-content{
  transition: max-height 300ms ease;
}
.common-question .active .cq-content{
  max-height: 3rem;
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
