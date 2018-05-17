<template>
	<div class="level-page">
		<main-header title="等级说明"></main-header>
		<div class="content">
			<h1>1.什么是推荐票、月票</h1>
			<p>推荐票是阅路小说书友推荐的，投推荐票也就说明自己对本书喜欢。推荐票数量可在个人中心内查看。</p>
			<p>月票是阅路小说体现作家人气的方式，需要来自忠诚粉丝的支持。每月月票榜排名前10的作品，将获得高额奖金鼓励。</p>
			<h1>2.如何获得票？</h1>
			<p>推荐票是系统根据你的VIP等级，送出相应的推荐票。推荐票数=VIP等级*2，新注册用户送一张推荐票。</p>
			<p>月票是系统根据你的VIP等级，送出相应的月票。月票数=VIP等级*1。</p>
			<table border="0">
				<tr>
					<th>VIP等级</th>
					<th>VIP获取方式</th>
					<th>每日推荐票</th>
					<th>每月月票</th>
				</tr>
				<tr>
					<td><img src="../imgs/level/0.png"></td>
					<td>登录注册用户</td>
					<td>1张</td>
					<td>无</td>
				</tr>
				<tr>
					<td><img src="../imgs/level/1.png"></td>
					<td>0<充值<=50</td>
					<td>2张</td>
					<td>1张</td>
				</tr>
				<tr>
					<td><img src="../imgs/level/2.png"></td>
					<td>50<充值<=100</td>
					<td>4张</td>
					<td>2张</td>
				</tr>
				<tr>
					<td><img src="../imgs/level/3.png"></td>
					<td>100<充值<=200</td>
					<td>6张</td>
					<td>3张</td>
				</tr>
				<tr>
					<td><img src="../imgs/level/4.png"></td>
					<td>200<充值<=500</td>
					<td>8张</td>
					<td>4张</td>
				</tr>
				<tr>
					<td><img src="../imgs/level/5.png"></td>
					<td>500<充值<=1000</td>
					<td>10张</td>
					<td>5张</td>
				</tr>
				<tr>
					<td><img src="../imgs/level/6.png"></td>
					<td>1000<充值<=2000</td>
					<td>12张</td>
					<td>6张</td>
				</tr>
				<tr>
					<td><img src="../imgs/level/7.png"></td>
					<td>2000<充值<=5000</td>
					<td>14张</td>
					<td>7张</td>
				</tr>
				<tr>
					<td><img src="../imgs/level/8.png"></td>
					<td>5000<充值<=10000</td>
					<td>16张</td>
					<td>8张</td>
				</tr>
				<tr>
					<td><img src="../imgs/level/9.png"></td>
					<td>充值>10000</td>
					<td>18张</td>
					<td>9张</td>
				</tr>
			</table>
			<p><span>*</span> 粉丝花费100书币可获得一张推荐票，可以累加，无上限。</p>
			<p><span>*</span> 粉丝花费1000书币可获得一张月票，可以累加，无上限。</p>
			<h1>3.使用注意</h1>
			<p>推荐票当日有效，次日清零。在书籍详情页，有推荐票窗口。</p>
			<p>月票当月有效，次月清零。在书籍详情页，有月票窗口。</p>
		</div>
	</div>
</template>
<script>
	import MainHeader from '../components/header.vue'
	export default{
		components:{
			MainHeader
		}
	}
</script>
<style>
	.level-page .content{ padding: .2rem; background-color: #fff; margin-top: .9rem; }
	.level-page h1{ font-weight: bold; margin-bottom: .2rem; }
	.level-page p{ text-indent: .6rem; line-height: .44rem; margin-bottom: .2rem; text-align: justify; }
	.level-page p span{ color: #ff6b8a; }
	.level-page table{ width: 100%; margin-bottom: .2rem; }
	.level-page table th{ font-size: .3rem; text-align: center; }
	.level-page table td{ font-size: .3rem; text-align: center; padding: .1rem 0; }
	.level-page table img{ width: .8rem; display: inline-block; }
</style>