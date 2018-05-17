<template>
	<div class="m-img-list container">
		<h1>{{title}}</h1>
        <div class="content">
            <div class="img" v-for="item in data">
                <router-link :to="{name:'book',params:{book_id:item.book_id}}">
                    <img v-lazy="item.book_url">
                    <span>{{item.book_name.length>7?item.book_name.slice(0,6)+'...':item.book_name}}</span>
                </router-link>
            </div>
        </div>
	</div>
</template>
<script>
	export default{
		name: 'm-img-list',
		props:{
			title: '',
			data:[]
		},
		data(){
			return {}
		},
		install(Vue){
			Vue.component(this.name, this)
		}
	}
</script>
<style lang="scss" scoped>
	@import '../assets/style/vars.sass';
	.m-img-list{
		.content{
			overflow: hidden;
			padding: 0;
			padding-bottom: .3rem;
			margin-top: -.3rem;
			.img{
				float:left;
				width: 2rem;
				margin: 0 .25rem;
				margin-top: .3rem;
				white-space: nowrap;
				img{
					width: 2rem;
					height: 2.67rem;
					border-radius: .08rem;
				}
				span{
					display: inline-block;
        			margin-top: .2rem;
				}
			}
		}
	}
</style>