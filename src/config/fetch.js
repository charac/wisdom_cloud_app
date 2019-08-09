import Vue from 'vue';
import { Notify } from 'vant';
import store from '@/store/'
import axiosRequest from 'axios';
import qs from "qs";
axiosRequest.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axiosRequest.create({
	timeout: 10000,
	responseType: "json",
	withCredentials: true, // 是否允许带cookie这些
	headers: {
		"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
	}
});
Vue.prototype.$ajax = axiosRequest;

//POST传参序列化(添加请求拦截器)
axiosRequest.interceptors.request.use(config => {
	store.commit('SET_LOADING_STATUS', true);  // 打开loading
	config.method === 'post'
		? config.data = qs.stringify({...config.data}, { indices: false })
		: config.params = {...config.params};
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	// 若是有做鉴权token , 就给头部带上token window.localStorage.getItem
	// if (localStorage.token) {
	//   config.headers.Authorization = localStorage.token;
	// }
	return config;
}, error => {
	console.log(error)
	store.commit('SET_LOADING_STATUS', false)
	return Promise.reject(error);
}
	
);

//返回状态判断(添加响应拦截器)
axiosRequest.interceptors.response.use(
	res => {
		store.commit('SET_LOADING_STATUS', false);
		if (res.status == 200 && res.data.status == 200) {
			return res.data;
		} else {
			let codeString = { //所有错误
				"201": res.data.msg,
				"400": "参数错误，请联系管理员",
				"500": "服务器错误，请联系管理员",
			};
			let errorMsg = (res && codeString[String(res.data.status)]);
			Notify({
				message: errorMsg,
				duration: 1000,
				// background: '#1989fa'
			})
			return res.data;
		}
	},
	error => {
		store.commit('SET_LOADING_STATUS', false)
		console.log(error);
		return Promise.reject(error)
	} 
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
*/

export function fetch(url, data) {
	//alert(url);
	return new Promise((resolve, reject) => {
		console.log('get调用接口地址====>',url)
		axiosRequest.get(url).then(response => {
			resolve(response);
		}).catch(err => {
			reject(err)
		})
	})
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data){
	console.log('post调用接口地址====>',url)
	return new Promise((resolve,reject) => {
		axiosRequest.post(url,data).then(response => {
			resolve(response);
		},err => {
			reject(err)
		})
	})
}


