//home模块的小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
const state = {
    //服务器返回数组，因此这里也谢数组
    categoryList: [],
    bannerList: [],
    floorList:[]
};
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        //坏东西改了接口数据，这里做一下切片，有几个没被改的但越界也进行切片
        state.categoryList = categoryList.slice(0, 15);
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("GETCATEGORYLIST", result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    //获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data)
        }
    }
};
//计算属性
const getters = {

};
export default {
    state,
    actions,
    mutations,
    getters
}