//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//start():进度条开始 done():进度条结束
//引入进度条样式
import "nprogress/nprogress.css";
import store from "@/store";
//1：利用axios对象的方法creat，去创建一个axios实例
//2:request就是axios
const requests = axios.create({
    //配置对象
    baseURL:'/api',
    //timeout表示请求超时的时间
    timeout:5000,
});
//请求拦截器：发请求之前，请求拦截器可以检测到，可以再请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里有一个属性很重要，header请求头
    //uuid
    if(store.state.detail.uuid_token){
        // 给请求头添加字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 判断token
    if(store.state.user.token){
        // 在headers请求头中加入键为token的值
        config.headers.token = store.state.user.token;
    }
    //进度条开始动
    nprogress.start();

    return config;
});

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
},(err)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))//终止Promise链
})




//对外暴露
export default requests;