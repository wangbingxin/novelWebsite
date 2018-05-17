<template>
    <div class="container book-recommend">
        <h1>{{title}}</h1>
        <div class="content items">
            <div class="item-list">
                <ul>
                    <li v-for="(item,key) in data">
                        <router-link v-if="!key" :to="{name:'book',params:{book_id:item.book_id}}">
                            <div class="top-item">
                                <div class="item-img">
                                    <img v-lazy="item.book_url">
                                </div>
                                <h2>{{item.book_name}}</h2>
                                <div class="item-info">
                                    <p>[{{item.book_end_status ? '已完结' : '连载中'}}]：{{item.book_short_intro | overflow}}</p>
                                    <div class="base-info"><span>{{item.author_name}}</span> <a>{{item.book_word_count>10000?Math.round(item.book_word_count/10000)+'万':item.book_word_count}}字</a><a>{{item.book_category}}</a></div>
                                </div>
                            </div>
                        </router-link>
                        <router-link v-else :to="{name:'book',params:{book_id:item.book_id}}" :style="{color: key==3 ? sex_color : ''}" >
                            {{item.book_short_intro}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import '../../assets/style/vars.sass';
    .book-recommend .item-list ul li{
        padding: .25rem 0;
        border-bottom: solid .02rem $line;
    }
    .book-recommend .item-list ul li:first-child{
        border-bottom: none;
        padding-top: 0;
        a{
            padding: 0;
        }
    }
    .book-recommend .item-list ul li:last-child{
        border-bottom: none;
        padding-bottom: .1rem;
    }
    .book-recommend .item-list ul li a{
        display: block;
        padding: 0 .1rem;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .book-recommend .item-list .top-item{ overflow: hidden; }
    .book-recommend .item-list .top-item .item-img{ float: left; width: 1.8rem; }
    .book-recommend .item-list .top-item img{ width: 1.8rem; height: 2.4rem; border-radius: .08rem; }
    .book-recommend .item-list .top-item .item-info{ float: left; width: 5rem; margin-left: .3rem; color: $darkgray; font-size: .26rem; line-height: .43rem; margin-top: .1rem; white-space:normal; text-align: justify; }
    .book-recommend .item-list .top-item .base-info{
        overflow: hidden;
        margin-top: .2rem;
        span{
            float: left;
            color: $gray;
        }
        a{
            float: right;
            color: #bbb;
            border: solid .02rem #bbb;
            margin-left: .2rem;
            padding: 0 .1rem;
            border-radius: .05rem;
        }
    }
    .book-recommend .item-list .top-item h2{ float: left; margin-left: .3rem; font-weight: bold; }
</style>
<script>
    export default{
        props:{
            title: '',
            data: []
        },
        data(){
            return {
                listBook:{},
            }
        },
        computed:{
          ...Vuex.mapGetters(['sex_color'])
        },
        filters:{
            overflow(val){
                if(val){
                    return val.length>50?val.substr(0,48)+'...':val
                }
            }
        }
    }
</script>
