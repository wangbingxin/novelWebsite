<template>
	<footer>
		<div class="nav" v-if="!isApp">
			<router-link to="/">首页</router-link>
			<router-link to="/library">书库</router-link>
			<router-link to="/rank">排行榜</router-link>
			<router-link to="/search">搜索</router-link>
			<a :href="`//trade.${domain}/v1.0/index`">充值</a>
		</div>
		<div class="context">
			<template v-if="moduleQrcode">
				<img v-lazy="moduleQrcode.code_url">
			</template>
			<p>
				<i class="fa fa-qq"></i>&nbsp;&nbsp;客服QQ：1828314267
			</p>
			<p>
				<i class="fa fa-phone"></i>&nbsp;&nbsp;客服热线：010-58773126
			</p>
			<p>京ICP备16043940号-3</p>
			<p>北京太和凯旋信息技术有限公司</p>
		</div>
	</footer>
</template>
<script>
	export default{
		data(){
			return{
				domain:process.env.BASE_DOMAIN,
				isApp
			}
		},
		computed:{
			...Vuex.mapState(['moduleQrcode']),
	        ...Vuex.mapGetters(['u_sex'])
	    },
	    mounted(){
	    	this.getQrcode()
	    },
	    watch:{
	    	u_sex(val){
	    		this.getQrcode()
	    	}
	    },
	    methods:{
	    	...Vuex.mapActions(['getQrcode'])
	    }
	}
</script>
<style lang="scss" scoped>
	@import '../assets/style/vars.sass';
	footer{
		margin-top: .2rem;
		background-color: #fff;
		padding: .3rem .2rem;
		color: $gray;
		.nav{
			text-align: center;
			font-size: 0;
			a{
				display: inline-block;
				height: .25rem;
				line-height: .25rem;
				font-size: .28rem;
				padding: 0 .25rem;
				border-right: solid .02rem $gray;
				&:last-child{
					border-right: none;
				}
			}
		}
		.context{
			height: 2rem;
			margin-top: .3rem;
			img{
				float: left;
				width: 2rem;
				margin-left: .4rem;
			}
			p{
				float: left;
				width: 4.2rem;
				height: .48rem;
				line-height: .6rem;
				margin-left: .3rem;
			}
		}
	}
</style>