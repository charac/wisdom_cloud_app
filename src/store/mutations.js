import * as types from './mutations_types'
import { setStore} from '@/config/utils'
import { util } from '../config/utils';
export default {
    // 设置页面切换loading 
    [types.SET_LOADING_STATUS] (state, status) {
        state.isLoading = status
    },
    // 当前所选公司
    [types.SET_COMPONEY](state,data) {
        state.curComponey = data;
        setStore('curComponey', state.curComponey);
    },
    // 当前模糊搜索后的查询列表
    [types.SET_SEARCH_LIST](state,data) {
        state.curSearchList = data.length>0?util.deepCopy(data):[];
        setStore('curSearchList', state.curSearchList);
    },
    // 当前的搜索条件
    [types.SET_CUR_TERM](state,data) {
        state.curConditions = data;
        setStore('curConditions', state.curConditions)
    },
    // 当前政策及补贴
    [types.SET_CUR_INDUST](state,data) {
        state.curIndustry = data;
        console.log('当前政策条件===>', state.curIndustry)
        setStore('curIndustry', state.curIndustry)
    },
    // 政策详情
    [types.SET_SUBSIDY_DETAIL] (state, data) {
        state.subsidy_detail = data.length>0?util.deepCopy(data):[];
        setStore('subsidy_detail', state.subsidy_detail);
    }
}
