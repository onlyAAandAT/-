import { reqGetSearchInfo } from '@/api'

//search模块小仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList

    }
};
const actions = {
    async getSearchList({ commit }, params = {}) {
        //reqGetSearchInfo需要传入一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
//由于仓库中的数据层数较大，因此用getters对仓库中数据进行简化
const getters = {
    goodsList(state) {//传入的是当前仓库的state
        //这样写是有问题的，因为下面的语句是建立在searchList有东西的情况下，没有排除它是undefined的情况
        //给个或让他遍历空数组不至于遍历undefined
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    attrsList(state){
        return state.searchList.attrsList;
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}