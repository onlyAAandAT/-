import { reqCartList } from "@/api"
import { reqDeleteCartById } from "@/api"
import { reqUpdateCheckedById } from "@/api"
const state = {
    cartList: [],
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车中的某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 修改购物车中某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        // 只是告诉服务器用户点击了勾选按钮，不会有其他什么数据传输
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'))
        }

    },
    // 删除购物车中全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {  //context就是这个仓库
        // 第一个参数，一般叫context就是仓库
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : '';
            // 派发的deleteCheckedById返回一个promise，每次删除一个都会返回一个promise，需要所有promise都能够成功，才能表示全部删除
            // 使用promise.all([a,b,c,···]) 数组中元素是promise对象，全部成功才能够返回成功
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state },isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    // 返回的数据较为负责，简化一下
    cartList(state) {
        // 返回至少是个对象
        return state.cartList[0] || {}
    },

}
export default {
    state,
    mutations,
    actions,
    getters
}