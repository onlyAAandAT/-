<template>
  <div>
    <!-- <h1 v-upper="msg"></h1> -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登陆，注册的时候隐藏 -->
    <!-- 当组件多的时候不好实现，因此选择使用路由元信息mate解决 -->
    <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,Footer
  },
  data() {
    return {
      msg:"asd"
    }
  },
  mounted() {
    //通知仓库发请求，将服务器的东西放到仓库中，一开始就就已经将服务器发来的东西放仓库，TypeNav组件中检查仓库就会发现有东西
    this.$store.dispatch("categoryList");//就是希望能够在一开始就能够发送请求，但不能放在main.js中，因为没有this，main.js不是一个组件，需要放在vc上，因为只有组件实例才有$store实例
    
  },
}
</script>

<style>

</style>
