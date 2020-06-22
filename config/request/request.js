/**
 * POST 请求
 * wjw
 * @param {*} url  请求 url
 * @param {*} parameters 请求参数
 */
import uniRequest from '@/node_modules/uni-request/index.js';


// 请求拦截
uniRequest.interceptors.request.use(config => {
	// 赋值token
	config.headers.token = uni.getStorageSync('user') ?  JSON.parse(uni.getStorageSync('user')).userToken : new Date().getTime()

	// 防止缓存，GET请求默认带_t参数
	if (config.method === 'get') {
		config.params = {
		  ...config.params,
		  ...{ '_t': new Date().getTime() }
		}
	}
	return config;
},err => {
	return Promise.reject(err);
});

// 响应拦截
uniRequest.interceptors.response.use((response) => {
	if (response.data.code === 'MP1001') {
		uni.showToast({
			title: '账号密码错误!',
			icon: 'none',
			duration: 2000
		});
		return Promise.reject(response.data.msg)
	}
	
	if (response.data.code === 'MA1101' && response.data.status == 'FAIL') {
		uni.showToast({
			title: '登陆过期',
			icon: 'none',
			duration: 2000
		});
		uni.redirectTo({
			url: '/pages/login/login'
		})
		return Promise.reject(response.data.msg)
	}
	return Promise.resolve(response.data);
}, (err) => {
	console.log(err)
	if (err && err.response) {
		switch (err.response.status) {
		  case 301: err.message = '请求的数据具有新的位置且更改是永久的'; break
		  case 302: err.message = '请求的数据临时具有不同 URI'; break
		  case 304: err.message = '未按预期修改文档'; break
		  case 305: err.message = '必须通过代理来访问请求的资源'; break
		  case 400: err.message = '请求中有语法问题，或不能满足请求'; break
		  case 402: err.message = '所使用的模块需要付费使用'; break
		  case 403: err.message = '当前操作没有权限'; break
		  case 404: err.message = '服务器找不到给定的资源'; break
		  case 407: err.message = '客户机首先必须使用代理认证自身'; break
		  case 415: err.message = '请求类型不支持，服务器拒绝服务'; break
		  case 417: err.message = '未绑定登录账号，请使用密码登录后绑定'; break
		  case 426: err.message = '用户名不存在或密码错误'; break
		  case 429: err.message = '请求过于频繁'; break
		  case 500: err.message = '服务器内部错误，无法完成请求'; break
		  case 501: err.message = '服务不支持请求'; break
		  case 502: err.message = '网络错误，服务器接收到上上游服务器无效响应'; break
		  case 503: err.message = '服务器无法处理请求'; break
		  case 504: err.message = '网络请求超时'; break
		  default: err.message = '服务器遇到不可预知的情况'; break
		}
	} else {
		err.message = '连接服务器失败!'
	}
	uni.showToast({
		title: err.message,
		icon: 'none',
		duration: 2000
	});
	return Promise.reject(err);
});

export default uniRequest;