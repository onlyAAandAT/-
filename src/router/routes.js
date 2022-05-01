//路由配置的信息
// import Home from '@/pages/Home/index.vue'
// import Search from '@/pages/Search/index.vue'
// import Register from '@/pages/Register/index.vue'
// import Login from '@/pages/Login/index.vue'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'
// 采用了路由懒加载，可以不在开头引入
export default [
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/detail/:skuid',
        component: ()=>import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: '/search/:keyword',
        name: 'search',
        component: ()=>import('@/pages/Search'),
        meta: { show: true },
        //路由组件能不能传递props数据？
        //在$attrs上显示
        //布尔值写法，在对应的路由组件中同样使用props:['xxx']接收，只能接收params参数
        // props:true,//只能传递params参数
        //对象写法：额外给路由组件传递props参数
        // props:{a:1,b:2}
        //函数写法：可以把params参数和query参数通过props传递给路由组件
        // props:($route)=>{
        //     return {keyword:$route.params.keyword,k:$route.query.k}
        // }
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: { show: false }
    },
    {
        path: '/addcarsuccess',
        name: 'addcarsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/trade',
        name: 'trade',
        component: ()=>import('@/pages/Trade'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // trade只能从购物车shopcart来，从shopcart来，放行，否则原地跳转
            if (from.path == "/shopcart") {
                next();
            } else {
                next(false); // 不做跳转，从哪来，回哪去
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: ()=>import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            // pay只能从购物车trade来，从trade来，放行，否则原地跳转
            if (from.path == "/trade") {
                next();
            } else {
                next(false); // 不做跳转，从哪来，回哪去
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: ()=>import('@/pages/paysuccess'),
        meta: { show: true }
    },
    {
        path: '/center',
        name: 'center',
        component: ()=>import('@/pages/center'),
        // 二级路由
        children: [
            {
                path: 'myorder',
                component: ()=>import('@/pages/center/myorder'),
            },
            {
                path: 'grouporder',
                component: ()=>import('@/pages/center/grouporder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ],
        meta: { show: true }
    },
    {
        //重定向，项目跑起来后，访问/，立马定向到首页
        path: '*',
        redirect: '/home'
    }
]