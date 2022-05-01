//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
import { setToken } from '@/utils/token'
//路由插件
Vue.use(VueRouter)
//引入路由组件 组件引入搬迁到router.js中

//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push和replace方法
//location:告诉原来的push方法，往何处跳转（传递哪些参数）
//resolve：成功回调
//reject：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call||apply的区别：相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数：call传参用逗号隔开，apply用数组传参
        originPush.call(this, location, resolve, reject)//传入this将函数的上下文由window调用变成VueRouter类的实例调用
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve || reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
const router = new VueRouter({
    //配置路由,一定要写成routes，表一个个路由，向外暴露的才是路由器router
    //键值一致，省略值
    routes,
    scrollBehavior(to, from, saveePosition) {
        return { y: 0 };
    }
})
// 全局守卫：全局前置守卫（在路由跳转前进行判断）
router.beforeEach(async (to, from, next) => {

    let token = store.state.user.token; // 用户未登录一定不会有token
    let name = store.state.user.userInfo.name; // userInfo至少是空对象，也为真，因此要看里面有没有key

    if (token) {
        // 有token，用户已经登录，此时不能去
        if (to.path == '/login' || to.path == '/register') {
            next('/home');
        } else {
            // 登录后不是去login，（home|search|detail|shipcart）
            // 如果用户名也有
            if (name) {
                next();
            } else {
                // 没有用户信息
                // 获取用户信息首页展示
                // 获取用户信息从Home路由拿到此处，使得每次切换路由都可以判断是否有用户信息
                try {
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // token失效了，getUserInfo不能获取信息
                    // 清除TOKEN
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 下方是未登录的全局守卫
        // 不能去交易相关，支付相关，个人中心
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            // 把未登录的时候想去而没去成的信息存储在路由当中
            next("/login?redirect="+toPath);
        }
        next();
    }
})


export default router