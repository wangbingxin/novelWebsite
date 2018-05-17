<template>
	<div class="recharge">
		<div class="tabs">
			<a :class="{active:activeClass==0}" @click="switchTab(0)">全部记录</a>
			<a :class="{active:activeClass==1}" @click="switchTab(1)">成功记录</a>
		</div>
		<div class="no-notes" v-show="noNotes">暂无充值记录</div>
		<div class="content" v-for="item in recharge">
			<span>{{item.pay_money}}元({{item.read_coin}}书币)</span><span>{{item.pay_name}}</span><span :style="{color:item.pay_flag ? '#00a65a':'#dd4b39'}">{{payFlag(item.pay_flag)}}</span><span class="time">{{getLocalTime(item.insert_time)}}</span>
		</div>
		<div class="more" @click="showMore" v-show="page<pageTotal">加载更多</div>   
	</div>
</template>
<style lang="scss">
	@import '../../assets/style/vars.sass';
	.recharge{ min-height: 7rem; }
	.recharge .tabs{ margin-bottom: 0; }
	.recharge .tabs a{ margin: 0 .5rem;}
	.recharge .tabs a.active{ background-color: $blue; }
	.recharge .content{ margin-bottom: .02rem; }
	.recharge .content span{ display: inline-block; margin-right: .15rem; }
	.recharge .content .time{ width: 7.1rem; margin-top: .2rem; color: $gray; text-align: right;}
</style>
<script>
	import {getLocalTime} from "../../assets/js/common"
	import { getRechargeRecord } from '../../api/api'
	export default{
		data(){
			return{
				recharge:[],
				page:1,
				pageSize:10,
				activeClass:0,
				pay_flag:0,
				pageTotal:0,
				noNotes:false
			}
		},
		mounted(){
			this.getRechargeList();
		},
		methods:{
			payFlag(val){
				return val?"充值成功":"充值失败";
			},
			getLocalTime:getLocalTime,
			getRechargeList(){
				getRechargeRecord({
					page: this.page,
					page_size:this.pageSize,
					pay_flag:this.pay_flag
				}).then(res=>{
					var recharge=res.data.pay_record
            		this.noNotes=res.data.total?false:true
            		this.recharge=this.recharge.concat(recharge)
            		this.pageTotal=res.data.total_page
				})
			},
			showMore(){
				this.page++;
				this.getRechargeList();
			},
			switchTab(index){
				this.activeClass=index;
				index==0?this.pay_flag=0:'';
				index==1?this.pay_flag=3:'';
				this.recharge=[];
				this.page=1;
				this.getRechargeList();
			}
		}
	}
</script>