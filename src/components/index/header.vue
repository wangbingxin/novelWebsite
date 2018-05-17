<template>
	<div class="header">
		<header>
			<div class="logo">
				<router-link to="/">
					<template v-if="u_sex">
						<img src="../../imgs/logo_nv.png">
					</template>
					<template v-else>
						<img src="../../imgs/logo_nan.png">
					</template>
				</router-link>
			</div>
			<div class="button" :class="{'button-nv':u_sex}">
				<span class="girl" :class="{current:u_sex}" @click="toGirl">女生</span>
				<span class="boy" :class="{current:!u_sex}" @click="toBoy">男生</span>
			</div>
			<div class="user">
				<router-link to="/user" class="uc"></router-link>
				<router-link to="/bookshelf" class="bs"></router-link>
			</div>
		</header>
	    <div class="nav">
	      <router-link v-for="(item,key) in menu" :to="item.path" :key="key"><span :class="{current:$route.path==item.path&&u_sex,'current-b':$route.path==item.path&&!u_sex}">{{item.name}}</span></router-link>
	    </div>
	</div>
</template>

<script>
export default {
  name: 'IndexHeader',
  data () {
    return {
    	menu:[
    		{
    			path: '/',
    			name: '精选'
    		},
    		{
    			path: '/library',
    			name: '书库'
    		},
    		{
    			path: '/rank',
    			name: '排行'
    		},
    		{
    			path: '/search',
    			name: '搜索'
    		}
    	]
    }
  },
  computed:{
    ...Vuex.mapGetters(['u_sex', 'sex_color'])
  },
  methods:{
  	...Vuex.mapMutations(['toGirl', 'toBoy'])
  }
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/vars.sass';
	.header{
		header{
			box-shadow: none;
			.logo{
				float: left;
				width: 1.8rem;
				margin-top: .05rem;
				padding-left: .2rem;
				img{
					width: 1.8rem;
				}
			}
			.button{
				float: left;
				width: 2.64rem;
				height: .58rem;
				border: solid .02rem $green;
				border-radius: .3rem;
				box-sizing: border-box;
				margin-top: .16rem;
				font-size: 0;
				margin-left: .43rem;
				span{
					width: 1.4rem;
					font-size: .24rem;
					text-align: center;
					line-height: .576rem;
					border-radius: .27rem;
					color: $green;
				}
				.girl{
					float: left;
				}
				.boy{
					float: right;
					margin-left: -.21rem;
				}
				.current{
					background-color: $green;
					color: #fff;
				}
			}
			.button-nv{
				border: solid .02rem $red;
				span{
					color: $red;
				}
				.current{
					background-color: $red;
				}
			}
			.user{
				float: right;
				width: 2rem;
				text-align: right;
				a{
					display: inline-block;
					width: .5rem;
					height: .5rem;
					margin-right: .2rem;
					margin-top: .2rem;
				}
				.uc{
					background: url(../../imgs/user.png) no-repeat center;
					background-size: .42rem;
				}
				.bs{
					background: url(../../imgs/bookshelf.png) no-repeat center .08rem;;
					background-size: .42rem;
				}
			}
		}
		.nav{
	        font-size: 0;
	        background-color: #fff;
	        padding-top: .1rem;
	        position: fixed;
	        left: 0;
	        top: .9rem;
	        z-index: 2;
			box-shadow: 0 0 .2rem 0 #d9d9d9;
			height: .54rem;
	        a{
	          display: inline-block;
	          font-size: .28rem;
	          width: 1.5rem;
	          line-height: .5rem;
	          text-align: center;
	          &:nth-child(2),
	          &:nth-child(3){
	            margin: 0 .375rem;
	          }
	          span{
	            display: inline-block;
	            width: .26rem;
	            height: .5rem;
	            white-space: nowrap;
	            text-indent: -.15rem;
	            border-bottom: solid .04rem #fff;
	          }
	          .current{
	            color: $red;
	            border-color: $red;
	          }
	          .current-b{
	            color: $green;
	            border-color: $green;
	          }
	        }
	    }
    }
</style>
