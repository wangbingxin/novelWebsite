<template>
	<div class="last-recommend">
		<main-header title="书籍推荐"></main-header>
		<div class="no-chapter"><img src="../imgs/nomore.png"></div>
		<m-img-list title="猜你喜欢" :data="moduleSearch"></m-img-list>
		<main-footer></main-footer>
	</div>
</template>
<style>
	.no-chapter{ padding: .2rem 0; margin-top: .9rem; }
	.no-chapter img{ width: 7rem; }
	.book-recommend .content{ overflow: hidden; padding: .2rem 0; }
    .book-recommend .content .img{ float:left; width:2rem; height: 3.3rem; overflow:hidden; margin: 0 .25rem; text-align: center; margin-top: .05rem; line-height: .5rem; white-space:nowrap; text-overflow:ellipsis; }
    .book-recommend .content .img img{ width:2rem; height: 2.67rem; }
</style>
<script>
	import MainHeader from "../components/header.vue"
	import MainFooter from "../components/footer.vue"
	export default{
		data(){
			return{
			}
		},
		components:{
			MainHeader,
			MainFooter
		},
		computed:{
	      ...Vuex.mapState(['moduleSearch']),
	      ...Vuex.mapGetters(['u_sex', 'sex_color'])
	    },
		mounted(){
			if(!this.moduleSearch){
		        this.getModuleSearch()
		    }
		},
	    watch:{
	      u_sex(val){
	        this.getModuleSearch()
	      }
	    },
		methods:{
			...Vuex.mapActions(['getModuleSearch'])
		}
	}
</script>