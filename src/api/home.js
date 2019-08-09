// 智慧投顾
import { post, fetch } from '@/config/fetch'
/*****************************   智慧投顾信息   *************************************/

/**
 * 关键字获取企业名称列表
 */
export const queryEntList = (data) => post('/api/v1/query_ent_list', data, 'POST')


/**
 * 根据企业名称和手机号获取企业分类
 */
export const  queryEntDomain = (data) => post('/api/v1/query_ent_domain', data, 'POST')

/**
 * 根据行业中类查询产业
 */
export const  queryEntCdomain = (data) => post('/api/v1/query_ent_cdomain', data, 'POST')

/**
 * 根据产业查询政策和补贴
 */
export const  queryEntPolicy = (data) => post('/api/v1/query_ent_policy', data, 'POST')
