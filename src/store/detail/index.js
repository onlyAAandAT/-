import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// 生成随机字符串作为游客id，生成后不会改变
import { getUUID } from "@/utils/uuid_token"
const state = {
    goodInfo: {},
    // 游客的临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
}
const actions = {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuId) {//skuId获取id，commit
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回的结果
        // 加入购物车后（发请求后），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他数据，只是返回200，表示操作成功
        // 前台不用存储任何数据，只需知道请求是否成功
        // 请求的状态结果在仓库，但是要对其判断需要在组件进行
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 当前的函数如果执行，因为使用了async，返回了promise对象，返回决定了成功或者失败
        // return Promise.reject(new Error('faile'))
        if (result.code == 200) {
            return "OK"
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    // 路径导航简化的数据
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    // 产品信息的简化数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}