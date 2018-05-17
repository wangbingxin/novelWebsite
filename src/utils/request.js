import router from '../router'
import qs from 'qs'

import {
	setCookie,
	showMsg
} from '../assets/js/common'

const request = axios.create({
	baseURL: 'https://wh.' + process.env.BASE_DOMAIN,
	withCredentials: true,
	timeout: 5000
})

request.interceptors.request.use(config => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data)
	}
	return config
})

request.interceptors.response.use(res => {
	let code = res.data.code,
		data = res.data
	switch (code) {
		case 401: // 用户未登录
			setCookie("login_callback_url", location.href, 300, process.env.BASE_DOMAIN, "/")
			router.push('/login')
			return false;
		case 403: // 参数错误
			showMsg('参数错误')
			break
		case 404: // 资源不存在
			router.push('/notfound')
			break
		case 405: // 数据异常
			showMsg('数据异常')
			break
		case 200: // 成功获取数据
			data.data = data.data instanceof Array ? (data.data.length ? data.data : null) : data.data
			return data
		default: // 特殊状态码单独判断
			return data
	}
})

export default request