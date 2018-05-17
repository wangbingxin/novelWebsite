<template>
	<div class="container base-info">
		<div class="info-container">
			<img :src="infoData.book_cover_url" class="bg-img">
			<div class="info-box">
				<div class="img">
					<img :src="infoData.book_cover_url">
				</div>
				<div class="info">
					<h2>{{infoData.book_name}}</h2>
			        <p>作者：{{infoData.author_name}}</p>
			        <p>分类：{{infoData.book_category}}</p>
			        <p>{{infoData.book_word_count>10000?Math.round(infoData.book_word_count/10000)+'万':infoData.book_word_count}}字 | {{statData.book_collect_count}}次收藏 | {{statData.book_click_count}}次点击</p>
			        <p v-if="infoData.selling_model==1">原价：<i style="text-decoration: line-through;">19.9</i>元 <span>活动价：{{infoData.selling_price/100}}元</span><a @click="buyFullBook">购买</a></p>
				</div>
			</div>
		</div>
		<div class="read-btn">
			<router-link :to="{name:'read',params:{book_id:infoData.book_id,chapter_id:infoData.read_chapter_id}}" class="read"><i></i>{{infoData.read_status?'继续阅读':'立即阅读'}}</router-link>
			<a class="plus" @click="saveBook"><i></i>{{infoData.in_bookshelf?'移出书架':'加入书架'}}</a>
		</div>
		<div class="content summary">
			<template v-if="infoData.book_summary&&infoData.book_summary.length<70">
				{{infoData.book_summary}}
			</template>
			<template v-else>
				<template v-if="moreSummary">
					{{shortSummary}}...<a class="kai" @click="moreSummary=false"></a>
				</template>
				<template v-else>
					{{infoData.book_summary}}<a class="shou" @click="moreSummary=true"></a>
				</template>
			</template>
		</div>
		<div class="content category">
			<router-link :to="{name:'read',params:{book_id:infoData.book_id || '',chapter_id:infoData.last_chapter_id}}" class="last">
        		<span class="new" :style="{backgroundColor: sex_color}">新</span>{{infoData.last_chapter_name}}<i v-if="infoData.book_is_vip">vip</i><span class="time">{{getLocalTime(infoData.last_update_time).substr(0,16)}}</span>
			</router-link>
			<router-link :to="{name:'catalog',params:{book_id:infoData.book_id}}" class="list">目录 共{{infoData.book_chapter_total}}章<span>{{infoData.book_end_status?"已完结 >":"连载中 >"}}</span></router-link>
		</div>
		<div class="content vote">
			<div class="ticket" @click="monthButton">
				<div class="btn"></div>
				<div class="text">月票<br><span>{{statData.month_ticket}}</span></div>
			</div>
			<div class="ticket" @click="recommendButton">
				<div class="btn"><i class="fa fa-thumbs-o-up"></i></div>
				<div class="text">推荐票<br><span>{{statData.recommend_ticket}}</span></div>
			</div>
		</div>
		<div class="mask" v-if="mask" @click="monthBox=recommendBox=mask=false"></div>
		<div class="show-box" :style="{bottom:monthBox?'0':'-3.8rem'}">
			<h2>月票</h2>
			<template v-if="userMonth">
				<div class="option">
					<span v-for="item in monthTicket" :style="{backgroundColor:item==currentMonth?'#58B7FF':'#b3b3b3'}" @click="currentMonth=item">{{item?item+'张':'全部'}}</span>
				</div>
				<p>你当前还有<i>{{userMonth}}</i>张月票</p>
				<div class="btn"><a @click="giveMonthTicket">确定</a></div>
			</template>
			<template v-else>
				<div class="no-ticket">你没有月票哦！>_<||</div>
				<p><router-link to="/level">如何获取月票？</router-link></p>
			</template>
		</div>
		<div class="show-box" :style="{bottom:recommendBox?'0':'-3.8rem'}">
			<h2>推荐票</h2>
			<template v-if="userRecommend">
				<div class="option">
					<span v-for="item in recommendTicket" :style="{backgroundColor:item==currentRecommend?'#58B7FF':'#b3b3b3'}" @click="currentRecommend=item">{{item?item+'张':'全部'}}</span>
				</div>
				<p>你当前还有<i>{{userRecommend}}</i>张推荐票</p>
				<div class="btn"><a @click="giveRecommendTicket">确定</a></div>
			</template>
			<template v-else>
				<div class="no-ticket">今天没有推荐票了！>_<||</div>
				<p><router-link to="/level">如何获取推荐票？</router-link></p>
			</template>
		</div>
	</div>
</template>
<style lang="scss">
	@import '../../assets/style/vars.sass';
	.base-info{
		margin-top: 0;
		.info-container{
			width: 7.5rem;
			height: 2.8rem;
			background-size: 100%;
			position: relative;
			overflow: hidden;
			background-color: #fff;
			margin-top: .9rem;
			.bg-img{
				position: absolute;
			    left:0;
			    top:0;
			    width: 7.5rem;
			    opacity: .3;
			    filter: blur(.1rem);
			}
			.info-box{
				position: absolute;
				width: 7.1rem;
				left: .2rem;
				top: .2rem;
				z-index: 3;
			}
			.img{
				float: left;
				width: 1.8rem;
				img{
					width: 1.8rem;
					height: 2.4rem;
					border-radius: .08rem;
				}
			}
			.info{
				float: left;
				margin-left: .3rem;
				h2{
					font-weight: bold;
					margin-bottom: .15rem;
					text-shadow: 0 0 .02rem #fff;
				}
				p{
					height: .47rem;
					line-height: .47rem;
					text-shadow: 0 0 .02rem #fff;
					span{
						color: $red;
						margin-left: .1rem;
					}
					a{
						display: inline-block;
						border: solid .02rem $red;
						color: $red;
						border-radius: .05rem;
						padding: 0 .15rem;
						height: .37rem;
						line-height: .37rem;
						margin-left: .15rem;
					}
				}
			}
		}
		.read-btn{
			padding: 0 .2rem;
			font-size: 0;
			background-color: #fff;
			a{
				display: inline-block;
				width: 3.55rem;
				font-size: .26rem;
				text-align: center;
				padding: .25rem 0;
				border-bottom: solid .02rem $line;
				i{
					width: .3rem;
					height: .3rem;
					display: inline-block;
					margin-right: .1rem;
					position: relative;
				}
			}
			.read{
				i{
					background: url(../../imgs/read.png) no-repeat center;
					background-size: .3rem;
					top: .06rem;
				}
			}
			.plus{
				i{
					background: url(../../imgs/plus.png) no-repeat center;
					background-size: .28rem;
					top: .05rem;
				}
			}
		}
		.summary{
			font-size: .24rem;
			color: $darkgray;
			line-height: .5rem;
			padding-top: .2rem;
			a{
				display: inline-block;
				width: .15rem;
				height: .15rem;
				border-left: solid .02rem $darkgray;
				border-bottom: solid .02rem $darkgray;
				position: relative;
			}
			.kai{
				transform: rotate(-45deg);
				top: -.05rem;
				left: .2rem;
			}
			.shou{
				transform: rotate(135deg);
				top: .05rem;
				left: .2rem;
			}
		}
		.category{
			margin-top: .2rem;
			padding-bottom: 0;
			a{
				display: block;
				padding: .3rem 0;
			}
			.last{
				border-bottom: solid .02rem $line;
				.new{
					display: inline-block;
					padding: 0 .1rem;
					color: #fff;
					margin-right: .1rem;
					border-radius: .05rem;
					font-size: .22rem;
					position: relative;
					top: -.05rem;
				}
				i{
					color: $red;
				}
				.time{
					float: right;
					color: $gray;
					font-size: .24rem;
				}
			}
			.list{
				span{
					float: right;
				}
			}
		}
		.vote{
			margin-top: .2rem;
			overflow: hidden;
			padding-top: .3rem;
			padding-bottom: .3rem;
			.ticket{
				float: left;
				width: 3.5rem;
				height: 1rem;
				.btn{
					float: left;
					width: 1rem;
					height: 1rem;
					background-color: $orange;
					margin-left: .5rem;
					color: #fff;
					font-size: .5rem;
					text-align: center;
					line-height: 1rem;
					border-radius: .5rem;
				}
				&:first-child{
					.btn{
						background-image: url(../../imgs/ticket.png);
						background-repeat: no-repeat;
						background-size: .45rem;
						background-position: center;
						background-color: #f86d18;
					}
				}
				.text{
					float: left;
					width: 1.5rem;
					text-align: center;
					font-size: .34rem;
					margin-top: .15rem;
					span{
						font-size: .28rem;
						color: $gray;
					}
				}
			}
		}
	}
	.base-info .show-box{ position: fixed; width: 7.1rem; padding: .2rem; background-color: #fff; z-index: 100; transition: bottom ease-in 200ms; }
	.base-info .show-box h2{ text-align: center; }
	.base-info .show-box .option{ margin-top: .3rem; }
	.base-info .show-box span{ display: inline-block; font-size: .28rem; padding: .15rem .33rem; background-color: #b3b3b3; color: #fff; border-radius: .05rem; margin: 0 .14rem; }
	.base-info .show-box p{ margin-top: .4rem; color: $gray; text-align: right; }
	.base-info .show-box p i{ color: $red; }
	.base-info .show-box p a{ color: #58B7FF; }
	.base-info .show-box .btn{ text-align: center; margin-top: .3rem; }
	.base-info .show-box .btn a{ display: inline-block; font-size: .3rem; padding: .2rem 1rem; background-color: $red; color: #fff; }
	.base-info .show-box .no-ticket{ margin-top: .4rem; text-align: center; font-size: .4rem; }
</style>
<script>
	import { getLocalTime, showMsg, setCookie, Confirm, getCookie } from "../../assets/js/common";
	import { getBookInfo, getStatData, addSaveBook, delSaveBook, giveMonthTicket, giveRecommendTicket, getUserInfo, buyFullBook } from '../../api/api'
	export default{
		data(){
			return {
				infoData:{},
				statData:{},
				shortSummary:'',
				moreSummary:false,
				monthBox:false,
				recommendBox:false,
				mask:false,
				monthTicket:[1,2,3,4,0],
				recommendTicket:[1,2,3,4,0],
				currentMonth:1,
				currentRecommend:1,
				userMonth:0,
				userRecommend:0,
				isLogin:getCookie("signature")&&getCookie("user_id")&&getCookie("user_uuid")
			}
		},
		computed:{
			...Vuex.mapGetters(['sex_color'])
		},
		mounted(){
			this.getStatData()
			this.getBookInfo()
			this.getUserTicket()
		},
		methods:{
			getLocalTime:getLocalTime,
			// 获取书籍详情
			getBookInfo(){
				getBookInfo({
					book_id: this.$route.params.book_id
				}).then(res=>{
					if(res.code === 200){
						this.infoData = res.data

	                    this.infoData.last_chapter_name=res.data.last_chapter_name.length>16?res.data.last_chapter_name.substr(0,15)+'...':res.data.last_chapter_name

	                    this.shortSummary=this.infoData.book_summary.substr(0,65)
	                    this.moreSummary=this.infoData.book_summary.length>70?true:false
					}else if(res.code === 201){
						this.$router.push('/notsell')
					}
				})
			},
			// 统计数据
			getStatData(){
				getStatData({
              	  book_id: this.$route.params.book_id
                }).then(res=>{
              	  	this.statData = res.data
                })
			},
			// 获取用户票数
			getUserTicket(){
				if(this.isLogin){
					getUserInfo().then(res=>{
						this.userMonth=res.user_monthly_ticket
						this.userRecommend=res.user_recommend_ticket
					})
				}
			},
			// 加入书架
			saveBook(){
				if(!this.infoData.in_bookshelf){
					addSaveBook({
						book_id: this.$route.params.book_id
					}).then(res=>{
						this.infoData.in_bookshelf=1
		            	showMsg("成功加入书架！")
					})
				}else{
					delSaveBook({
						book_id: this.$route.params.book_id
					}).then(res=>{
						this.infoData.in_bookshelf=0
		            	showMsg("成功移出书架！")
					})
				}
			},
			// 投月票
			giveMonthTicket(){
				if(this.currentMonth){
					giveMonthTicket({
						book_id:this.infoData.book_id,
						count:this.currentMonth
					}).then(res=>{
						if(res.code === 200){
							showMsg(`成功投出${this.userMonth}张月票`)
							this.statData.month_ticket+=this.userMonth
							this.userMonth=0
							this.monthBox=this.mask=false
						}else if(res.code === 201){
							showMsg('你的月票不足！')
						}
					})
				}else{
					giveMonthTicket({
						book_id:this.infoData.book_id,
						count:this.userMonth
					}).then(res=>{
						if(res.code === 200){
							showMsg(`成功投出${this.userMonth}张月票`)
							this.statData.month_ticket+=this.userMonth
							this.userMonth=0
							this.monthBox=this.mask=false
						}else if(res.code === 201){
							showMsg('你的月票不足！')
						}
					})
				}
			},
			// 投推荐票
			giveRecommendTicket(){
				if(this.currentRecommend){
					giveRecommendTicket({
						book_id:this.infoData.book_id,
						count:this.currentRecommend
					}).then(res=>{
						if(res.code === 200){
							showMsg(`成功投出${this.currentRecommend}张推荐票`)
							this.statData.recommend_ticket+=this.currentRecommend
							this.userRecommend-=this.currentRecommend
							this.recommendBox=this.mask=false
						}else if(res.code === 201){
							showMsg('你的推荐票不足！')
						}
					})
				}else{
					giveRecommendTicket({
						book_id:this.infoData.book_id,
						count:this.userRecommend
					}).then(res=>{
						if(res.code === 200){
							showMsg(`成功投出${this.currentRecommend}张推荐票`)
							this.statData.recommend_ticket+=this.currentRecommend
							this.userRecommend-=this.currentRecommend
							this.recommendBox=this.mask=false
						}else if(res.code === 201){
							showMsg('你的推荐票不足！')
						}
					})
				}
			},
			// 全本购买
			buyFullBook(){
				let _this=this
				Confirm(`确认购买，将从您账户中扣除${_this.infoData.selling_price}书币!`,function(){
					buyFullBook({
						book_id: _this.$route.params.book_id,
						book_price: _this.infoData.selling_price
					}).then(res=>{
						if(res.code === 200){
							showMsg('购买成功！')
						}else if(res.code === 201){
							showMsg('您已购买过该本书！')
						}else if(res.code === 1){
							Confirm("余额不足,前往充值？",function(){
		            			setCookie("pay_callback",decodeURIComponent(location.href),60*30,process.env.BASE_DOMAIN,"/");
								window.location.href=`//trade.${process.env.BASE_DOMAIN}/v1.0/index`
		            		})
						}else if(res.code === 2){
							setCookie("pay_callback",decodeURIComponent(location.href),60*30,process.env.BASE_DOMAIN,"/")
							location.href=`//trade.${process.env.BASE_DOMAIN}/v1.0/index?money=${_this.infoData.selling_price}&application_id=3&book_id=${_this.$route.params.book_id}`
						}
					})
				})
			},
			// 点击月票按钮
			monthButton(){
				if(this.isLogin){
					this.mask=this.monthBox=true
				}else{
					this.goLogin()
				}
			},
			// 点击推荐票按钮
			recommendButton(){
				if(this.isLogin){
					this.mask=this.recommendBox=true
				}else{
					this.goLogin()
				}
			},
			// 登录
			goLogin(){
				setCookie("login_callback_url",location.href,300,process.env.BASE_DOMAIN,"/")
				this.$router.push('/login')
			}
		}
	}
</script>
