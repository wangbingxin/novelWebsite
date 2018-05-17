<template>
	<div class="sign-page">
		<main-header title="签到记录" v-if="!isApp"></main-header>
		<div class="sign-container">
			<div class="sign-record">
				<template v-if="isSign">
					<div class="sign-success">
						签到成功，奖励5书币
						<img :src="moduleQrcode && moduleQrcode.code_url">
						长按二维码关注，下次签到更方便
					</div>
				</template>
				<template v-else>
					<div class="sign-btn" :style="{backgroundColor: sex_color}" @click="goSign">
						点击签到
					</div>
				</template>
				<p>{{month}} | 累计签到<span :style="{color: sex_color}">{{signDays}}</span>天</p>
				<div class="sign-date">
					<a class="prev"><i class="fa fa-angle-left" v-show="month!='2017-01'" @click="switchMonth('-1')"></i></a>
					<div class="date"><span v-for="item in signRecord" :class="{signed:item.sign && !u_sex, 'signed-nv':item.sign && u_sex}">{{item.day}}</span></div>
					<a class="next"><i class="fa fa-angle-right" v-show="month!=current" @click="switchMonth('1')"></i></a>
				</div>
			</div>
			<div class="strategy">
				<fieldset>
					<legend>签到攻略</legend>
					<p>1. 签到一天获得5个书币</p>
					<p>2. 每月累计签到10天，即可获得一张月票，全勤三张<router-link to="/level" :style="{color: sex_color}">《月票使用细则》</router-link></p>
					<p>3. 签到当月有效，次月清零，签到次数越多，奖励越丰厚</p>
				</fieldset>
			</div>
		</div>
		<div class="mask" v-show="isShow"></div>
		<div class="sign-hint" v-show="isShow">
			<h1 :style="{color: sex_color}">恭喜你，签到成功！</h1>
			<h2>获得<b :style="{color: sex_color}">5</b> 书币</h2>
			<p><a @click="isShow=false" :style="{backgroundColor: sex_color}">我知道啦</a></p>
		</div>
	</div>
</template>
<script>
	import MainHeader from '../components/header.vue'
	import { setCookie } from '../assets/js/common'
	import { checkSign, getSignRecord } from '../api/api'
	export default{
		data(){
			return {
				signRecord:[],
				signDays:0,
				month:'',
				current:'',
                isSign:false,
                isShow:false,
				isApp,
			}
		},
		components:{
			MainHeader
		},
		mounted(){
			this.checkSign()
			this.getSignRecord()
		},
		computed:{
			...Vuex.mapState(['moduleQrcode']),
	        ...Vuex.mapGetters(['u_sex','sex_color'])
	    },
		methods:{
			...Vuex.mapActions(['getQrcode']),
            checkSign(){
                checkSign({
                    sign_status:1
                }).then(res=>{
                	if(res.code === 201){
                		this.isSign=true
                        this.getQrcode()
                	}
                })
            },
            goSign(){
                checkSign().then(res=>{
                	if(res.code === 200){
                		this.getSignRecord()
	                    this.getQrcode()
	                    this.isSign=true
	                    this.isShow=true
                	}
                }) 
            },
			getSignRecord(){
				getSignRecord().then(res=>{
					this.signRecord=res.data.sign_record
					this.signDays=res.data.sign_days
					this.month=this.current=res.data.month
				})
			},
			switchMonth(val){
				getSignRecord({
					month: this.month,
					month_status: val
				}).then(res=>{
					this.signRecord=res.data.sign_record
					this.signDays=res.data.sign_days
					this.month=res.data.month
				})
			}
		}
	}
</script>
<style lang="scss">
	@import '../assets/style/vars.sass';
	.sign-page .sign-container{ padding: .2rem; margin-top: .9rem; }
	.sign-page .sign-container .sign-success{
		text-align: center;
		img{
			width: 3.5rem;
			height: 3.5rem;
			margin: .2rem auto;
		}
	}
	.sign-page .sign-container .sign-btn{ width: 1.7rem; height: 1.7rem; line-height: 1.7rem; margin: .5rem auto; border-radius: 1rem; text-align: center; color: #fff; font-size: .3rem; }
	.sign-page .sign-container .sign-record p{ text-align: center; margin-top: .2rem; }
	.sign-page .sign-container .sign-record p span{ font-weight: bold; font-size: .36rem; }
	.sign-page .strategy{ font-size: .28rem; }
	.sign-page fieldset{ border-bottom: none; border-left: none; border-right: none; text-align: center; margin-top: .3rem; }
	.sign-page fieldset p{ text-align: left; margin-top: .1rem; }
	.sign-page .sign-record .sign-date{ overflow: hidden; margin-top: .2rem; }
	.sign-page .sign-record .sign-date .date{ float: left; width: 6rem; }
	.sign-page .sign-record .sign-date span{ float: left; width: .7rem; height: .7rem; background-color: $lightwhite; color: $gray; margin: .15rem; text-align: center; line-height: .75rem; border-radius: .1rem; }
	.sign-page .sign-record .sign-date .signed{ background-color: $green; color: #fff; }
	.sign-page .sign-record .sign-date .signed-nv{ background-color: $red; color: #fff; }
	.sign-page .sign-record .sign-date a{ float: left; width: .55rem; height: .8rem; line-height: .8rem; text-align: center; margin-top: 2rem; font-size: .6rem; color: #999; }
	.sign-page .sign-record .sign-date .next{ text-align: right; }
	.sign-page .sign-hint{ position: absolute; width: 4.5rem; height: 5rem; background-color: #fff; top: 2.5rem; left: 1.5rem; border-radius: .1rem; z-index: 100; }
	.sign-page .sign-hint h1{ text-align: center; margin-top: 1rem; font-size: .4rem; }
	.sign-page .sign-hint h2{ text-align: center; margin-top: .5rem; }
	.sign-page .sign-hint h2 b{ font-size: .45rem; font-style: italic; position: relative; top: .08rem; }
	.sign-page .sign-hint p{ text-align: center; margin-top: 1rem; }
	.sign-page .sign-hint p a{ display: inline-block; color: #fff; padding: .1rem .2rem; border-radius: .1rem; font-style: .28rem; }
</style>