<template>
  <div class="help-center">
    <main-header title="帮助中心"></main-header>
    <div class="container" style="margin-top: .9rem;">
      <div class="tabs">
        <!-- <div @click="set_active(0)"> -->
          <router-link to="/helpcenter" :class="{active:activeIndex==0}" @click="set_active(0)">常见问题</router-link>
        <!-- </div>
        <div @click="set_active(1)"> -->
          <router-link to="/helpcenter/readerhelp" :class="{active:activeIndex==1}" @click="set_active(1)">读者帮助</router-link>
        <!-- </div> -->
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
	.help-center .tabs a{ margin: 0 .5rem; }
</style>
<script>
	import MainHeader from "../components/header.vue";
	export default{
	  data() {
	    return{
        activeIndex:0
	    }
	  },
		components:{
			"main-header":MainHeader
		},
		methods:{
      set_active:function(i){
        this.activeIndex = i;
      }
		}
	}

</script>
