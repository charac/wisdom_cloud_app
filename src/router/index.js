import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import { setTitle } from '@/config/utils'
import { getStore } from '@/config/utils'
/**默认页面 */  
const Page = r => require.ensure([], () => r(require('@layout/page.vue')), 'page')
/** 首页 */ 
const Home = r => require.ensure([], () => r(require('@views/Home/Home.vue')), 'Home')
/** 选择公司 */
const selectCompony = r => require.ensure([], () => r(require('@views/selectCompony/selectCompony.vue')), 'selectCompony')
/** 确认行业产业 */
const confirmIndustry = r => require.ensure([], () => r(require('@views/confirmIndustry/confirmIndustry.vue')), 'confirmIndustry')
/** 政策匹配 */
const policyMatch = r => require.ensure([], () => r(require('@views/policyMatch/policyMatch.vue')), 'policyMatch')
/** 人才补贴详情 */
const subsidyDetail = r => require.ensure([], () => r(require('@views/subsidyDetail/subsidyDetail.vue')), 'subsidyDetail')

Vue.use(Router)

const routes =  [{
		path: '/',
		redirect: '/page'
	},
	{
		path: '/page',
		name: 'page',
		meta: {
			title: '招商智慧云'
		},
		component: Page,
		children: [
			{
				path: '',
                redirect: '/page/Home'
            },
            {
                path: 'Home',
                name: 'Home',
                meta: {
                    title: '智慧投顾'
                },
                component: Home
            },
            {
                path: 'selectCompony',
                name: 'selectCompony',
                meta: {
                    title: '选择公司'
                },
                component: selectCompony
            },
            {
                path: 'confirmIndustry',
                name: 'confirmIndustry',
                meta: {
                    title: '确认行业产业'
                },
                component: confirmIndustry
            },
            {
                path: 'policyMatch',
                name: 'policyMatch',
                meta: {
                    title: '政策匹配'
                },
                component: policyMatch
            },
            {
                path: 'subsidyDetail',
                name: 'subsidyDetail',
                meta: {
                    title: '人才补贴详情'   
                },
                component: subsidyDetail
            },
		]
}]

const router = new Router({
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
	// 设置标题
    console.log(to)
    setTitle(to.meta.title);
    // store.commit('SET_UPDATE_TITLE', to.meta.title)
    store.commit('SET_LOADING_STATUS', true);
    if (to.matched.some(r => r.meta.requireAuth)) {
        // let token = window.localStorage.getItem('token')
        // if (token) {
        //     next()
        // } else {
            // next({
                // path: `${baseUrl}/weixinLogin?`,
                // query: { redirect: to.fullPath }
            // })
        // }
    } else {
        next()
    }
})

router.afterEach(function(to) {
    setTimeout(() => {
        store.commit('SET_LOADING_STATUS', false)
    }, 800)
})

export default router
