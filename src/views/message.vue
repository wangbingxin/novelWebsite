<template>
  <div class="message-page">
    <main-header title="我的消息"></main-header>
    <m-tabs :items="tabs" @change-item="toggleTab" style="margin-top: .9rem;"></m-tabs>
    <div class="message container">
      <component :is="currentView" keep-alive data="123"></component>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<style>
  .message-page .message{ min-height: 7rem; }
  .message-page .tabs a{ margin: 0 .5rem; }
</style>
<script>
    import MainHeader from '../components/header.vue'
    import MainFooter from '../components/footer.vue'
    import ReplyHint from '../components/message/ReplyHint.vue'
    import SystemMsg from '../components/message/SystemMsg.vue'
    import { getNewMessageList } from '../api/api'
    export default{
      data(){
        return {
          tabs:[
            {
              label: '回复提醒',
              value: 'hint'
            },
            {
              label: '系统消息',
              value: 'msg'
            }
          ],
          messageList:[],
          currentView:'hint',
          noNote:false
        }
      },
  		components:{
    		MainHeader,
        MainFooter,
        'hint': ReplyHint,
        'msg': SystemMsg
    	},
      mounted(){
      },
      methods:{
        toggleTab(val){
          this.currentView=val;
        }
      }
  	}
</script>
