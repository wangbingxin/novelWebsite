<template>
	<div class="reader" :style="{backgroundColor: dayNight?'#333':'#f6f6f6',color:dayNight?'#999':'#333'}">
		<div :class="{header:dayNight}">
			<router-link to="/">首页</router-link>
			|
			<router-link :to="'/book/'+bookInfo.book_id">书页</router-link>
			|
			<router-link to="/user">个人中心</router-link>
			|
			<template v-if="!bookInfo.in_bookshelf">
				<a @click="saveBook">加入书架</a>
			</template>
			<template v-else>
				<router-link to="/bookshelf/save">进入书架</router-link>
			</template>
		</div>
		<template v-if="!bookInfo.in_bookshelf">
			<div class="add-book" v-if="!bookInfo.in_bookshelf"> <i class="fa fa-bookmark add-btn" @click="saveBook"></i>
				<div class="add-tip" v-if="isRemind">
					加入书架 <i class="fa fa-close" @click="closeSaveRemind"></i>
					<span></span>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="add-book">
				<i class="fa fa-bookmark add-btn" @click="$router.push('/bookshelf/save')"></i>
				<div class="add-tip" v-if="isRemind">
					进入书架
					<i class="fa fa-close" @click="closeSaveRemind"></i>
					<span></span>
				</div>
			</div>
		</template>
		<div v-if="!isVIP">
			<div class="book-title">
				<h1>{{chapterContent.chapter_name}}</h1>
				<div class="publish-time">
					<div class="time">发布：{{getLocalTime(chapterContent.chapter_published_time)}}</div>
					<div class="setting">
						<a @click="day_night" :style="{backgroundImage:dayNight==0?'url('+dayImg+')':'url('+nightImg+')'}"></a>
						<a @click="font_reduce"></a>
						<a @click="font_plus"></a>
					</div>
				</div>
			</div>
			<div class="book-content" v-html="labelp(chapterContent.chapter_content)" :style="{fontSize:fontSize/100+'rem',lineHeight:lineHeight/100+'rem'}"></div>
			<div class="author_word" v-if="hasAuthorWord && !isFirstLook">
				<h1>作者有话说：</h1>
				<p>{{chapterContent.chapter_author_word}}</p>
			</div>
			<div class="fans-preview" v-if="isFirstLook">
				<h1>
					本章节为
					<span :style="{color: sex_color}">粉丝专享</span>
					章节
				</h1>
				<h2>你暂无阅读权限</h2>
				<p>
					你在
					<span :style="{color: sex_color}">{{firstLookTime}}</span>
					后可以阅读
				</p>
				<div class="button" @click="goBuyTicket" :style="{backgroundColor: sex_color}">立即获得粉丝专享特权</div>
			</div>
			<div class="container relative-recommend" v-if="chapterContent.chapter_is_vip">
				<h1>热门推荐</h1>
				<p v-for="item in moduleChapter">
					{{item.book_summary.length>19?item.book_summary.substr(0,17)+'...':item.book_summary}}
					<a :href="item.url" :style="{color: sex_color}">点击这里</a>
				</p>
			</div>
			<div class="control-btns" v-show="!isShowQrcode">
				<div class="prev">
					<span @click="getPrevNextChapter(0)">上一章</span>
				</div>
				<div class="list">
					<span @click="$router.push('/catalog/'+book_id)">目录</span>
				</div>
				<div class="next">
					<span @click="getPrevNextChapter(1)">下一章</span>
				</div>
			</div>
			<div class="qrcode" v-if="isShowQrcode">
				<h1>由于字数限制，只更新到这里，后续精彩内容关注下方微信号继续阅读！！！</h1>
				<img :src="qrcodeImgUrl">
				<p>长按上图识别二维码关注</p>
			</div>
			<div class="to-read-book" v-if="chapterContent.chapter_is_vip">
				<h1>如何追书？</h1>
				<p>
					方式一：打开微信搜索“
					<template v-if="bookInfo.sex==1">阅路小说网</template>
					<template v-else>鲜软文学</template>
					”公众号，点击公众号继续阅读。
				</p>
				<p>
					方式二：【直接访问】将
					<a :href="'//m.'+domain" :style="{color: sex_color}">“m.yueloo.com.cn”</a>
					添加到手机浏览器的收藏夹，直接打开
					<a :href="'//m.'+domain" :style="{color: sex_color}">“m.yueloo.com.cn”</a>
					，并搜索本书书号“
					<a :style="{color: sex_color}">{{bookInfo.book_id}}</a>
					”
				</p>
				<p>
					方式三：【百度搜索】在百度中搜索：阅路小说，点击链接进入，再搜索本书书号“
					<a :style="{color: sex_color}">{{bookInfo.book_id}}</a>
					”
				</p>
			</div>
		</div>
		<div class="vip-chapter" v-if="isVIP==1">
			<h1>订阅VIP章节</h1>
			<p>
				书名：
				<span :style="{color: sex_color}">{{chapterInfo.book_name}}</span>
			</p>
			<p>
				章节名：
				<span :style="{color: sex_color}">{{chapterInfo.chapter_name}}</span>
			</p>
			<p>
				章节字数：
				<span :style="{color: sex_color}">{{chapterInfo.chapter_size}}</span>
				字
			</p>
			<p>
				本章价格：
				<span :style="{color: sex_color}">{{chapterInfo.selling_price}}</span>
				书币
			</p>
			<p>
				当前余额：
				<span :style="{color: sex_color}">{{chapterInfo.user_coin}}</span>
				书币
			</p>
			<h2>
				<label>
					自动订阅
					<input type="checkbox" checked class="order"></label>
			</h2>
			<h3>开通自动订阅，阅读更流畅</h3>
			<template v-if="hintType==1">
				<a @click="buyChapter" :style="{backgroundColor: sex_color}">确认购买</a>
			</template>
			<template v-if="hintType==2">
				<a @click="goRecharge" :style="{backgroundColor: sex_color}">您的余额不足，前去充值</a>
			</template>
			<div class="hint">
				<h1>提示</h1>
				<p>1. 购买章节将不会重复购买；</p>
				<p>2. 自动订阅后，当您阅读到本书付费章节时将直接购买不再提示。</p>
			</div>
		</div>
		<div class="vip-chapter" v-if="isVIP==2">
			<h1>全本购买</h1>
			<p>
				书名：
				<span :style="{color: sex_color}">{{chapterInfo.book_name}}</span>
			</p>
			<p>
				全本价格：
				<span :style="{color: sex_color}">￥{{chapterInfo.selling_price/100}}</span>
				(
				<span>{{chapterInfo.selling_price}}</span>
				书币)
			</p>
			<p>
				当前余额：
				<span :style="{color: sex_color}">{{chapterInfo.user_coin}}</span>
				书币
			</p>
			<template v-if="hintType==1">
				<a @click="buyFullBook" :style="{backgroundColor: sex_color}">全本购买</a>
			</template>
			<template v-if="hintType==2">
				<a @click="userType" :style="{backgroundColor: sex_color}">您的余额不足，前去购买</a>
			</template>
			<div class="hint">
				<h1>提示</h1>
				<p>1. 全本购买的书将不会重复购买；</p>
				<p>2. 自动订阅后，当您阅读到本书付费章节时将直接购买不再提示。</p>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import '../assets/style/vars.sass';
	.reader{
		padding: .25rem;
		.header{
			a{
				color: $gray
			}
		}
		.add-book{
			position: absolute;
			width: 1.6rem;
			right: .2rem;
			top: 0;
			.add-btn{
				color: $red;
				font-size: .6rem;
				margin-left: .95rem;
			}
			.add-tip{
				text-align: center;
				background-color: $darkgray;
				padding: .12rem 0;
				font-size: .24rem;
				color: $lightwhite;
				border-radius: .05rem;
				position: relative;
				margin-top: .1rem;
				i{
					font-size: .28rem;
					margin-left: .1rem;
				}
				span{
					position: absolute;
					top: -.06rem;
					right: .35rem;
					width: .16rem;
					height: .16rem;
					background-color: $darkgray;
					transform: rotate(45deg);
				}
			}
		}
		.book-title{
			margin-top: .4rem;
			h1{
				font-size: .4rem;
			}
			.publish-time{
				height: .46rem;
				margin-top: .2rem;
				.time{
					float: left;
					width: 4rem;
					line-height: .46rem;
					color: $gray;
				}
				.setting{
					float: right;
					width: 2.2rem;
					a{
						float: left;
						width: .42rem;
						height: .42rem;
						margin-left: .25rem;
						&:nth-child(1){
							background: url(../imgs/day.png) no-repeat center;
							background-size: .42rem;
						}
						&:nth-child(2){
							background: url(../imgs/font_reduce.png) no-repeat center;
							background-size: .42rem;
						}
						&:nth-child(3){
							background: url(../imgs/font_plus.png) no-repeat center;
							background-size: .42rem;
						}
					}
				}
			}
		}
		.book-content{
			margin-top: .5rem;
			-moz-user-select:none;
			-webkit-user-select:none;
			user-select:none;
			overflow: hidden;
			p{
				text-indent: .7rem;
				margin-top: .3rem;
				text-align: justify;
			}
		}
		.author_word{
			margin-top: .3rem;
			background-color: $lightwhite;
			border-radius: .05rem;
			h1{
				font-size: .3rem;
			}
			p{
				font-size: .3rem;
				text-indent: .5rem;
				line-height: .38rem;
				margin-top: .1rem;
				text-align: justify;
			}
		}
		.fans-preview{
			margin-top: .5rem;
			text-align: center;
			h1{
				font-size: .34rem;
				font-weight: bold;
			}
			h2{
				color: $gray;
				margin-top: .2rem;
			}
			p{
				color: $gray;
				margin-top: .2rem;
			}
			.button{
				color: #fff;
				width: 4.2rem;
				padding: .25rem 0;
				margin: 0 auto;
				margin-top: .3rem;
				border-radius: .05rem;
			}
		}
		.relative-recommend{
			width: 7rem;
			margin-top: .5rem;
			h1{
				background-color: transparent;
				padding-left: 0;
				padding-bottom: .1rem;
			}
			p{
				font-size: .3rem;
				padding: .15rem;
				border-bottom: dashed .02rem $line;
			}
		}
		.control-btns{
			height: .88rem;
			margin-top: .5rem;
			div{
				float: left;
				
			}
			span{
				display: table-cell;
				width: 1.98rem;
				height: .8rem;
				text-align: center;
				vertical-align: middle;
				border: solid .02rem #909090;
				border-radius: .05rem;
				box-sizing: border-box;
			}
			.prev{
				margin-right: .5rem;
				
			}
			.list{
				margin-right: .5rem;
			}
		}
		.qrcode{
			text-align: center;
			margin-top: .8rem;
			h1{
				font-size: .34rem;
				color: $orange;
			}
			img{
				width: 3rem;
				height: 3rem;
				margin: .2rem auto;
			}
			p{
				color: $red;
			}
		}
		.to-read-book{
			margin-top: .8rem;
			h1{
				font-weight: bold;
			}
			p{
				line-height: .38rem;
				margin-top: .15rem;
				color: $darkgray;
				text-align: justify;
			}
		}
		.vip-chapter{
			margin-top: .5rem;
			h1{
				font-weight: bold;
				margin-bottom: .2rem;
			}
			h2{
				text-align: center;
				margin-top: .1rem;
			}
			h3{
				text-align: center;
				font-size: .26rem;
				color: $orange;
				margin-top: .1rem;
			}
			p{
				text-indent: .2rem;
				line-height: .5rem;
			}
			a{
				display: block;
				width: 4rem;
				height: .8rem;
				line-height: .8rem;
				font-size: .3rem;
				text-align: center;
				color: #fff;
				margin: .3rem auto;
				border-radius: .05rem;
			}
			.hint p{
				color: $gray;
				line-height: .4rem;
				margin-bottom: .1rem;
			}
		}
	}
</style>
<script>
	import { getLocalTime, showMsg, setCookie, getCookie, delCookie, Confirm } from "../assets/js/common"
	import { saveChapterClick, getSideChapter, buyFullBook, getChapterContent, buyChapter, getUserType, saveReadRecord, saveBookClick, handleSubscribe, addSaveBook, getBookInfo } from '../api/api'
	import dayImg from '../imgs/day.png'
	import nightImg from '../imgs/night.png'
	export default{
		data(){
			return {
				chapterContent:{},  // 章节内容
				dayNight:parseInt(localStorage.getItem('dayNight')) || 0,  // 用户是否设置过昼夜模式
				fontSize:parseInt(localStorage.getItem('fontSize')) || 34,
				lineHeight:parseInt(localStorage.getItem('lineHeight')) || 52,
				book_id:this.$route.params.book_id,
				bookInfo:{
					in_bookshelf:1
				},
				isVIP:0,
				hintType:1,
				chapterInfo:{},
				isLogin:getCookie("signature")&&getCookie("user_id")&&getCookie("user_uuid"),  // 判断用户是否登录
				hasAuthorWord:false,  // 是否有作者的话
				isRemind:true,  // 是否提醒加入书架
				isFirstLook:false,  // 是否是抢先看章节
				firstLookTime:null,  // 抢先看倒计时
				domain:process.env.BASE_DOMAIN,
				dayImg:dayImg,
				nightImg:nightImg,
				qrcodeImgUrl:'',
				isShowQrcode:false
			}
		},
		watch:{
			'$route.params.chapter_id':'getChapterContent',
			u_sex(){
                this.getModuleChapter()
            }
		},
		computed:{
			...Vuex.mapState(['moduleChapter']),
	        ...Vuex.mapGetters(['u_sex','sex_color'])
	    },
		mounted(){
			// 判断该本书是否收藏提醒
			if(localStorage.getItem(`${this.book_id}`)){
				this.isRemind=false
			}
			this.getBookInfo()
			this.getChapterContent()
			if(!this.moduleChapter){
				this.getModuleChapter()
			}
		},
		methods:{
			...Vuex.mapActions(['getModuleChapter']),
			...Vuex.mapMutations(['toGirl', 'toBoy']),
			getLocalTime,
		    loopJsonp(){
		    	let apiUrl = `https://${location.hostname}/yun/get_qrcode`,
		    		imgUrl = ''
		    		
                this.$http.jsonp(apiUrl).then(res=>{
                    if(res.data.code === 200){
                    	if(res.data.data.user_login_status){
	                    	if(res.data.data.force_subscribe_status != 1 && res.data.data.app_id){

	                    		var userId = res.data.data.user_login_status ? res.data.data.user_id : ''

	                    		imgUrl = `//oauth.${process.env.BASE_DOMAIN}/component/official_account/get_qrcode?book_id=${this.book_id}&current_chapter_id=${getCookie('yun_force_subscribe_chapter_id')}&yun_distribution_channel_id=${getCookie('yun_distribution_channel_id')}&yun_send_order_id=${getCookie('yun_send_order_id')}&official_account_appid=${res.data.data.app_id}&user_id=${userId}`

	                    		this.isShowQrcode = true
	                       		this.qrcodeImgUrl = imgUrl

	                    	}else{

	                    		this.isShowQrcode = false
	                    		sessionStorage.setItem('force_subscribe_status',1)
	                    		
	                    	}
	                    }else{
	                    	this.goLogin()
	                    }
                    }
                })
			},
			isScanToFocus(){
				let userAgent=navigator.userAgent.toLowerCase()
				
				// 是否是推广链接
				if(getCookie('yun_distribution_channel_id') && getCookie('yun_send_order_id')){
					// 判断是否在微信环境下
					if(userAgent.indexOf("micromessenger") != -1){
						// 是否关注过公众号
						if(!sessionStorage.getItem('force_subscribe_status')){
							// 该章节是否出现二维码 
							if(getCookie('yun_force_subscribe_book_id') == this.book_id && this.chapterContent.chapter_serial_number >= getCookie('yun_force_subscribe_chapter_order_number') && !sessionStorage.getItem('force_subscribe_status')){
								// 判断是否关注
								this.loopJsonp()
							}
						}
					}
				}else{
					delCookie('distribution_channel_id',process.env.BASE_DOMAIN,"/")
					delCookie('send_order_id',process.env.BASE_DOMAIN,"/")
				}
			},
			// 获取章节内容
			getChapterContent(){
				getChapterContent({
					book_id: this.book_id,
					chapter_id: this.$route.params.chapter_id
				}).then(res=>{
					let statusCode=res.code
					switch (statusCode) {
						case 0:
							// 章节不存在
							this.$router.push('/notfound')
							break;
						case 1:
							// 书籍已下架
							this.$router.push('/notsell')
							break;
						case 2:
							// 用户未登录
							this.goLogin()
							break;
						case 3:
							// 购买全本书籍
							this.chapterInfo.book_name=res.data.book_name
							this.chapterInfo.chapter_name=res.data.chapter_name
							this.chapterInfo.chapter_size=res.data.chapter_word_count
							this.chapterInfo.user_coin=res.data.user_coin+res.data.giving_coin
							this.chapterInfo.selling_price=res.data.selling_price
							this.isVIP=2
							this.hintType=1
							break;
						case 4:
							// 购买章节
							this.chapterInfo.book_name=res.data.book_name
							this.chapterInfo.chapter_name=res.data.chapter_name
							this.chapterInfo.chapter_size=res.data.chapter_word_count
							this.chapterInfo.user_coin=res.data.user_coin+res.data.giving_coin
							this.chapterInfo.selling_price=res.data.selling_price
							this.isVIP=1
							this.hintType=1
							break;
						case 5:
							// 购买全本书籍，余额不足
							this.chapterInfo.book_name=res.data.book_name
							this.chapterInfo.chapter_name=res.data.chapter_name
							this.chapterInfo.chapter_size=res.data.chapter_word_count
							this.chapterInfo.user_coin=res.data.user_coin+res.data.giving_coin
							this.chapterInfo.selling_price=res.data.selling_price
							this.isVIP=2
							this.hintType=2
							break;
						case 6:
							// 购买章节，余额不足
							this.chapterInfo.book_name=res.data.book_name
							this.chapterInfo.chapter_name=res.data.chapter_name
							this.chapterInfo.chapter_size=res.data.chapter_word_count
							this.chapterInfo.user_coin=res.data.user_coin+res.data.giving_coin
							this.chapterInfo.selling_price=res.data.selling_price
							this.isVIP=1
							this.hintType=2
							break;
						case 7:
							// 抢先看
							this.isFirstLook=true
							this.chapterContent=res.data
							this.firstLookTime=this.getTime(this.chapterContent.chapter_published_time)
							let _this=this
							setInterval(()=>{
								_this.firstLookTime=_this.getTime(_this.chapterContent.chapter_published_time)
							},1000)
							break;
						case 200:
							// 获取内容成功
							this.chapterContent=res.data

							this.isScanToFocus()

							// 获取新章节回到顶部
							document.documentElement.scrollTop = document.body.scrollTop = 0

							// 判断该章节是否有作者的话
							this.hasAuthorWord = res.data.chapter_author_word.trim() != ''

							this.save_book_click()  // 记录书籍的点击量
							this.save_chapter_click()  // 记录章节的点击量
							this.isLogin && this.save_read_record()  // 记录用户的阅读记录

							break;
					}
				})
			},
			// 获取上下章内容
			getPrevNextChapter(val){
				getSideChapter({
					book_id: this.book_id,
					chapter_id: this.$route.params.chapter_id
				}).then(res=>{
					if(res.code === 200){
						var prev=res.data.prev.chapter_id
						var next=res.data.next.chapter_id
						if(val){
							if(next){
								this.$router.push({name:'read',params:{book_id:this.book_id,chapter_id:next}})  //  更新路由参数
							}else{
								this.$router.push('/lastchapter')
							}
						}else{
							if(prev){
								this.$router.push({name:'read',params:{book_id:this.book_id,chapter_id:prev}})  //  更新路由参数
							}else{
								showMsg("已经是第一章啦！")
							}
						}
					}
				})
			},
        	save_read_record(){
        		saveReadRecord({
        			book_id: this.book_id,
        			chapter_id: this.$route.params.chapter_id
        		})
        	},
        	save_book_click(){
        		saveBookClick({
        			book_id: this.book_id
        		})
        	},
        	save_chapter_click(){
        		saveChapterClick({
        			book_id: this.book_id,
        			chapter_id: this.$route.params.chapter_id
        		})
        	},
        	// 购买章节
        	user_consume(){
        		buyChapter({
        			book_id:this.book_id,
        			chapter_id:this.$route.params.chapter_id,
        			chapter_price:this.chapterInfo.selling_price
        		}).then(res=>{
        			if(res.code === 200){
        				this.getChapterContent()
        			}
        		})
        	},
        	// 购买全本
        	buyFullBook(){
        		buyFullBook({
        			book_id:this.book_id,
        			book_price:this.chapterInfo.selling_price
        		}).then(res=>{
        			if(res.code === 200){
        				this.getChapterContent()
        				this.isVIP=0
        			}
        		})
        	},
			day_night(){
				this.dayNight=this.dayNight?0:1
				localStorage.setItem('dayNight',this.dayNight)
			},
			font_plus(){
				this.fontSize=this.fontSize>=49?49:this.fontSize+3
				this.lineHeight=this.lineHeight>=67?67:this.lineHeight+3
				localStorage.setItem('fontSize',this.fontSize)
				localStorage.setItem('lineHeight',this.lineHeight)
			},
			font_reduce(){
				this.fontSize=this.fontSize<=25?25:this.fontSize-3
				this.lineHeight=this.lineHeight<=43?43:this.lineHeight-3
				localStorage.setItem('fontSize',this.fontSize)
				localStorage.setItem('lineHeight',this.lineHeight)
			},
			saveBook(){
				addSaveBook({
					book_id: this.$route.params.book_id
				}).then(res=>{
					if(res.code === 200){
						showMsg("成功加入书架！")
	            		this.bookInfo.in_bookshelf=1
					}else if(res.code === 400){
						showMsg("该书已经加入过书架了！")
					}
				})
			},
			getBookInfo(){
				getBookInfo({
					book_id: this.$route.params.book_id
				}).then(res=>{
					if(res.code === 200){
						this.bookInfo=res.data
	                	this.bookInfo.sex=res.data.category_path.split('-')[0]
	                	if(this.bookInfo.sex==1){
	                		this.toBoy()
	                	}else if(this.bookInfo.sex==2){
	                		this.toGirl()
	                	}
					}
				})
			},
			labelp(str){
				if(str){
					return "<p>"+str.replace(/\r\n/g,"</p><p>")+"</p>"
				}
			},
			buyChapter(){
				this.user_consume();
				if(document.querySelector(".order").checked){
					handleSubscribe({
						book_id: this.book_id,
						flag: 1
					})
				};
				this.isVIP=0
			},
			goLogin(){
				setCookie("login_callback_url",location.href,300,process.env.BASE_DOMAIN,"/")
				this.$router.push('/login')
			},
			goRecharge(){
				setCookie("pay_callback",decodeURIComponent(location.href),60*30,process.env.BASE_DOMAIN,"/")
				window.location.href=`//trade.${process.env.BASE_DOMAIN}/v1.0/index`
			},
			closeSaveRemind(){
				this.isRemind=false
				localStorage.setItem(`${this.book_id}`,1)
			},
			// 倒计时计算
		    getTime(time){
		      let timeDistance=time-Date.parse(new Date())/1000

		      if(timeDistance>0 && timeDistance<=60){
		        return `${timeDistance}秒`
		      }else if(timeDistance>60 && timeDistance<60*60){
		        return `${parseInt(timeDistance/60)}分${timeDistance%60}秒`
		      }else if(timeDistance>60*60 && timeDistance<24*60*60){
		        return `${parseInt(timeDistance/60/60)}时${parseInt((timeDistance%3600)/60)}分${timeDistance%3600%60}秒`
		      }else if(timeDistance>24*60*60){
		        return `${parseInt(timeDistance/60/60/24)}天${parseInt(timeDistance%(24*3600)/60/60)}时${parseInt(timeDistance%(24*3600)%3600/60)}分${timeDistance%(24*3600)%3600%60}秒`
		      }else if(timeDistance<0){
		        return false;
		      }
		    },
		    // 判断用户是否是新用户，用于判断全本购买余额不足，用户跳转的地址
		    userType(){
		    	getUserType().then(res=>{
		    		if(res.code === 2){
		    			setCookie("pay_callback",decodeURIComponent(location.href),60*30,process.env.BASE_DOMAIN,"/")

		    			location.href=`//trade.${process.env.BASE_DOMAIN}/v1.0/index?money=${this.chapterInfo.selling_price}&giving_coin=0&user_coin=0&application_id=3&application_activity_id=0&application_order_id=0&book_id=${this.book_id}&chapter_id=${this.$route.params.chapter_id}`
		    		}else if(res.code === 1){
		    			this.goRecharge()
		    		}
		    	})
		    },
		    // 购买抢先看券
		    goBuyTicket(){
		    	setCookie("pay_callback",decodeURIComponent(location.href),60*30,process.env.BASE_DOMAIN,"/")
		    	this.$router.push({
		    		path: `/${this.book_id}`,
		    		query: {
		    			book_id: this.book_id,
		    			chapter_id: this.$route.params.chapter_id
		    		}
		    	})
		    }
		}
	}
</script>