/**
 * 初始数据库
 */
import { getStore, getStoreForJson } from '@/config/utils'
export default {
    // 页面切换loading
	isLoading: false,
	// 当前所选公司
	curComponey: getStore('curComponey') || '',
	// 当前搜索公司列表
	curSearchList: getStore('curSearchList') || [], 
	// 当前公司及手机号（搜索条件）
	curConditions: getStoreForJson('curConditions') || {},
	// 当前搜索产业和补贴的（搜索条件）
	curIndustry: getStoreForJson('curIndustry') || {},
	// 政策补贴详情
	subsidy_detail: getStore('subsidy_detail') || []
}