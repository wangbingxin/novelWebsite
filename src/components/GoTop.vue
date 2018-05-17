<template>
	<div class="go-top" v-if="isShow" @click="goTop"><i class="fa fa-arrow-up"></i></div>
</template>
<script>
	export default{
		data(){
			return {
				isShow:false
			}
		},
		mounted(){
			var _this=this
			window.onscroll=function(){
				if(document.body.scrollTop>300){
					_this.isShow=true
				}else {
					_this.isShow=false
				}
			}
		},
		methods:{
			goTop(){
				document.body.scrollTop=0
			}
		}
	}
</script>
<style>
	.go-top{
		position: fixed;
		width: .8rem;
		height: .8rem;
		background-color: rgb(0,0,0);
		bottom: .8rem;
		right: .4rem;
		font-size: .4rem;
		line-height: .8rem;
		text-align: center;
		border-radius: .4rem;
		color: #fff;
		opacity: .4;
	}
</style>