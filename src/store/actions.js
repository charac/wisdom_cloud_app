import * as types from './mutations_types'

export default {
	// 当前所选公司
	set_componey: ({commit}, data) => {
		commit(types.SET_COMPONEY, data)
	},
	// 当前搜索后的公司列表
	set_search_list: ({commit}, data) => {
		commit(types.SET_SEARCH_LIST, data)
	},
	// 当前搜索条件
	set_cur_term: ({commit}, data) => {
		commit(types.SET_CUR_TERM, data)
	},
	// 当前搜索政策及补贴的条件
	set_cur_indust: ({commit}, data) => {
		commit(types.SET_CUR_INDUST, data)
	},
	// 政策详情
	set_subsidy_detail: ({commit}, data) => {
		commit(types.SET_SUBSIDY_DETAIL, data)
	},

}
