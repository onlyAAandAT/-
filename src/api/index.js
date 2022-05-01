//当前模块：API进行统一管理
import requests from './request';
import mockRequests from './mockRequest'
//获取三级联动数据，从文档中查找：
//请求地址：/api/product/getBaseCategoryList
//请求方式：GET
//请求参数类型：全无
// export const reqCategoryList = ()=>{
//     //发请求，发请求记得要保存返回的结果并且返回
//     //axios发请求返回的结果是Promise对象
//     return requests({
//         url:'/product/getBaseCategoryList',//不用重复写/api，requests已经带上了
//         methods:'get',
//     })
// }
//简写：
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//获取banner（Home首页轮播图的接口）
export const reqGetBannerList = () => mockRequests({ url: '/banner' })

//获取floor数据(已经写在mock里了)
export const reqFloorList = () => mockRequests({ url: '/floor' })

//获取Search数据 地址/api/search 请求方式：POST !!!携带参数!!!
//当前获取搜索模块数据的接口，需要给服务器传递一个默认参数，至少是个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

//获取产品的详情信息的接口
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get', data: skuId })

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表数据接口
// URL:/api/cart/cartList method:get
export const reqCartList = () => requests({url:'/cart/cartList' ,method:'get'})

// 删除购物车内产品的接口
// URL:/api/cart/deleteCart/{skuId}   method:DELETE
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'}) 

// 切换购物车中商品选中状态
// URL:/api/cart/checkCart/{skuId}/{isChecked} method:GET
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'GET'})

// 注册验证码发送请求
// URL:/api/user/passport/sendCode/{phone} method:get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`})

// 用户注册信息发送请求
// URL:/api/user/passport/register method:post    phone code password
export const reqUserRegister = (data) => requests({url:"/user/passport/register",data:data,method:"post"})

// 用户登录
// URL:/api/user/passport/login   method:POST     phone password
export const reqUserLogin = (data)=>requests({url:"/user/passport/login",data:data,method:"post"})

// 获取用户的信息，携带token像服务器获取用户信息
// URL:/api/user/passport/auth/getUserInfo
export const reqUserInfo = ()=>requests({url:"/user/passport/auth/getUserInfo",method:"get"})

// 退出登录
// URL:/api/user/passport/logout
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:"get"})

// 获取用户地址信息
// URL:/api/user/userAddress/auth/findUserAddressList method:get
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取商品清单
// URL:/api/order/auth/trade method:get
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})

// 提交订单
// URL:/api/order/auth/submitOrder?tradeNo={tradeNo} method:post
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 订单号获取支付信息
// URL:/api/payment/weixin/createNative/{orderId} method:get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取订单支付情况
// URL:/api/payment/weixin/queryPayStatus/{orderId} method:get
export const reqPayStatus = (orderId) =>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心我的订单列表
// URL:/api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})




