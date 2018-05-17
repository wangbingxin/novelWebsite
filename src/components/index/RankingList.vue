<template>
    <div class="container ranking-list">
        <h1>排行榜
            <div class="button">
                <a v-for="(item,key) in btns" :style="{color: activeClass==key ? sex_color : ''}" @click="change_rank(key)"><span>{{item}}</span></a>
            </div>
        </h1>
        <div class="content">
            <dl v-for="(item,index) in rankData.slice(0,10)" :class="{top:index<3}">
                <router-link :to="'/book/'+item.book_id">
                    <span :class="{top:index<3}">{{index+1}}</span>{{item.book_name}}<i>{{item.count}}</i>
                </router-link>
            </dl>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '../../assets/style/vars.sass';
    .ranking-list{
        .button{
            float: right;
            a{
                display: inline-block;
                font-weight: normal;
                margin: 0 .15rem;
            }
            .active{
                color: $red;
            }
            .active-b{
                color: $green;
            }
        }
        .content{
            padding-bottom: .1rem;
        }
        dl{
            border-bottom: solid .02rem $line;
            &:first-child{
                margin-top: -.1rem;
            }
            &:last-child{
                border-bottom: none;
            }
            a{
                display: block;
                height: .8rem;
                line-height: .8rem;
                span{
                    display: inline-block;
                    vertical-align: middle;
                    background-color: #bec5cf;
                    width: .43rem;
                    height: .38rem;
                    margin-right: .35rem;
                    line-height: .38rem;
                    text-align: center;
                    color: #fff;
                    border-radius: .3rem;
                    font-size: .24rem;
                    background: url(../../imgs/rank_num.png) no-repeat center center;
                    background-size: .36rem .36rem;
                }
                .top{
                    background: url(../../imgs/rank_top.png) no-repeat center center;
                    background-size: .43rem .38rem;
                    line-height: .33rem;
                }
                i{
                    float: right;
                    color: $gray;
                }
            }
        }
    }
</style>
<script>
    import { getClickRank, getSubscribeRank, getNewRank } from '../../api/api'
    export default{
        data(){
            return {
                btns:["点击榜","订阅榜","新书榜"],
                activeClass:0,
                rankData:[]
            }
        },
        mounted(){
            setTimeout(()=>{
                this.get_click_rank()
            },2000)
            
        },
        computed:{
          ...Vuex.mapGetters(['u_sex', 'sex_color'])
        },
        watch:{
            u_sex(){
                this.get_click_rank()
                this.get_subscibe_rank()
                this.get_new_rank()
            }
        },
        methods:{
            change_rank(key){
                this.activeClass=key;
                switch(key){
                    case 0: this.get_click_rank(); break;
                    case 1: this.get_subscibe_rank(); break;
                    case 2: this.get_new_rank(); break;
                }
            },
            get_click_rank(){
                getClickRank({
                    sex:this.u_sex?1:0
                }).then(res=>{ this.rankData=res.data })
            },
            get_new_rank(){
                getSubscribeRank({
                    sex:this.u_sex?1:0
                }).then(res=>{ this.rankData=res.data })
            },
            get_subscibe_rank(){
                getNewRank({
                    sex:this.u_sex?1:0
                }).then(res=>{ this.rankData=res.data })
            }
        }
    }
</script>
