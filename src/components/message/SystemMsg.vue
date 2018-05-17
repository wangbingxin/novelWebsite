<template>
	<div class="system-msg">
		<div class="content" v-show="noNote">暂无消息</div>
		<div class="content" v-show="coin">{{coinList.coin_msg}}</div>
		<div class="content" v-show="silent">
			<div>{{silentList.silent_msg}}</div>
			<p>{{getLocalTime(silentList.silent_time)}}</p>
		</div>
	</div>
</template>
<script>
	import { getMessage, cancelSystemMessage } from '../../api/api'
	import { getLocalTime } from '../../assets/js/common.js'
	export default{
		data(){
			return {
				coinList:{},
				silentList:{},
				noNote:false,
				coin:false,
				silent:false,
			}
		},
		mounted(){
			this.getMessageList();
		},
		methods:{
			getLocalTime:getLocalTime,
			getMessageList(){
				getMessage().then(res=>{
					if(res.code === 200){
						if(res.data){
							if(!res.data.user_msg.coin_msg && !res.data.user_msg.silent_msg){
								this.noNote=true
							}else{
								if(res.data.user_msg.coin_msg){
									this.coinList=res.data.user_msg.coin_msg
									this.coin=true
								}
								if(res.data.user_msg.silent_msg){
									this.silentList=res.data.user_msg.silent_msg
									this.silent=true
								}
							}
						}else{
							this.noNote=true
						}
					}
				})
			}
		},
		beforeDestroy(){
			if(this.coin){
				cancelSystemMessage({
					msg_flag: 1
				})
			}
			if(this.silent){
				cancelSystemMessage({
					msg_flag: 2
				})
			}
		}
	}
</script>
<style>
	.system-msg{ line-height: .4rem; }
	.system-msg p{ color: #b3b3b3; text-align: right; }
	.system-msg .content{
		padding-top: .2rem;
		margin-bottom: .02rem;
	}
</style>