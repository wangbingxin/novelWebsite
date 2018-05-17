<template>
    <div class="login-container">
        <main-header title="登录" v-if="!isApp"></main-header>
        <div class="login">
            <div class="login-title"><span><a>快捷登录</a></span></div>
            <div class="login-box">
                <a class="weixin" @click="go_login('login_wechat_wap')"><i class="fa fa-wechat"></i>微信登录</a>
                <a class="qq" @click="go_login('login_qq')"><i class="fa fa-qq"></i>QQ登录</a>
                <a class="weibo" @click="go_login('login_sina')"><i class="fa fa-weibo"></i>微博登录</a>
            </div>
        </div>
        <main-footer v-if="!isApp"></main-footer>
    </div>
</template>
<style lang="scss" scoped>
    @import '../assets/style/vars.sass';
    .login-container{ 
        background-color: $lightwhite;
        .login{
            min-height: 8rem;
        }
        .login:before{
            content: '';
            display: table;
        }
        .login-title{
            text-align: center;
            margin-top: .5rem;
            span{
                display: inline-block;
                width: 2rem;
                height: .04rem;
                line-height: .04rem;
                background-color: $gray;
                a{
                    display: inline-block;
                    height: .5rem;
                    padding: 0 .2rem;
                    color: $darkgray;
                    background-color: $lightwhite;
                }
            }
        }
        .login-box{
            width: 6rem;
            border: solid .02rem $line;
            margin: .5rem auto;
            padding: .4rem .3rem .2rem .3rem;
            border-radius: .1rem;
            background-color: #fff;
            overflow: hidden;
            a{
                float: left;
                width: 1.2rem;
                text-align: center;
                margin: 0 .4rem;
                line-height: .8rem;
                i{
                    width: 1.1rem;
                    height: 1.1rem;
                    font-size: .53rem;
                    text-align: center;
                    line-height: 1.1rem;
                    border-radius: .6rem;
                    color: #fff;
                }
                &:nth-child(1){
                    i{
                        background-color: $green;
                    }
                }
                &:nth-child(2){
                    i{
                        background-color: $orange;
                    }
                }
                &:nth-child(3){
                    i{
                        background-color: $red;
                         font-size: .58rem;
                    }
                }
            }
        } 
    }
</style>
<script>
    import MainHeader from "../components/header.vue"
    import MainFooter from "../components/footer.vue"
    import { getLoginLinks } from '../api/api'
    export default{
        data(){
            return {
                LoginLinks:{},
                isApp
            }
        },
        components:{
            MainHeader,
            MainFooter
        },
        mounted(){
            getLoginLinks().then(res=>{
                this.LoginLinks=res
            })
        },
        methods:{
            go_login(method){
                window.location.href=this.LoginLinks[method]
            }
        }
    }
</script>
