<template>
  <div>
    <main-header title="我的回复"></main-header>
    <m-tabs :items="tabs" @change-item="toggleTab" style="margin-top: .9rem;"></m-tabs>
    <div class="container book-reply">
      <component :is="currentView" keep-alive></component>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<style lang="scss" scoped>
  @import '../assets/style/vars.sass';
  .book-reply{
    min-height: 7rem;
    .tabs{
      a{
        margin: 0 1rem;
      }
    }
  }
</style>
<script>
    import MainHeader from "../components/header.vue"
    import MainFooter from "../components/footer.vue"
    import ToMe from "../components/myreply/ToMe.vue"
    import ToOther from "../components/myreply/ToOther.vue"
    export default{
      data(){
        return {
          tabs:[
            {
              label: '@我',
              value: 'tome'
            },
            {
              label: '@他',
              value: 'tohe'
            }
          ],
          currentView:"tome"
        }
      },
      components:{
        MainHeader,
        MainFooter,
        "tome":ToMe,
        "tohe":ToOther
      },
      methods:{
        toggleTab(val){
          this.currentView=val;
        }
      }
    }
</script>