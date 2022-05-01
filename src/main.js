import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
Vue.config.productionTip = false
//全局组件引入-三级联动
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//全局引入轮播图的css样式，因为网页中的轮播图的样式都一样
import 'swiper/css/swiper.css'

//引入mockServe.js
import '@/mock/mockServe';

// 统一接收api文件夹里的全部请求函数
// 统一引入
import * as API from '@/api'
import {MessageBox} from 'element-ui'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import ran from '@/assets/ran.gif'
// 引入表单校验插件
import "@/plugins/validate"
// 自定义插件测试
// import myPlugins from '@/plugins/myPlugins'
// Vue.use(myPlugins,{
//   name:'upper'
// })
Vue.use(VueLazyload,{loading:ran})
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

new Vue({
  router,
  store,
  render: h => h(App),
  //全局时间总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 所有的组件都能够使用这个API
    Vue.prototype.$API = API;
    // 消息弹窗遮罩
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    
  }
  //注册路由
}).$mount('#app')
