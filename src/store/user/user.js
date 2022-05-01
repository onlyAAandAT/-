import { reqGetCode } from "@/api"
import { reqUserRegister } from "@/api";
import { reqUserLogin } from "@/api";
import { reqUserInfo } from "@/api";
import { reqLogout } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
// 登录与注册共用一个小仓库
const state = {
    code: "",
    token: getToken(),
    userInfo: {},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state){
        // 仓库内用户信息清空
        state.token = "";
        state.userInfo = {};
        // 本地存储清空
        removeToken();
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 只是返回了验证码，但现实是后台将验证码发送到手机上，为了省钱
        let result = await reqGetCode(phone)
        // 以下代码正常来说不需要，但这里省钱要写
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        console.log(result)
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录业务 token
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            // 服务器下发token，用户的唯一标识
            // 用户相关的信息通过token向服务器获取
            commit("USERLOGIN", result.data.token)
            // 用户获取到了token，表示登录成功，持久化存储token
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // token获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({commit}) {
        // 只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout();
        if (result.code == 200) {
            // 请求成功了，可以继续对state的内容进行操作，对state的操作交给mutations
            commit("CLEAR");
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}