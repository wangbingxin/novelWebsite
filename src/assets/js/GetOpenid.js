import { getCookie, setCookie } from './common'

let userAgent=navigator.userAgent.toLowerCase(),
	requestCount=getCookie('requestCount') || 0,
	isLogin=getCookie('signature') && getCookie('user_id') && getCookie('user_uuid'),
	// wechat_code='wxf6c9f0c9696b8bdb_openid'
	wechat_code='wxd07ffaf197cbb1d4_openid'

if(isLogin){  // 判断是否登录
	if(userAgent.indexOf("micromessenger")!=-1){  // 判断是否在微信环境下
	    if(!getCookie(wechat_code)){  // 判断是否存在openid
	    	if(requestCount<3){
	    		requestCount++
	    		setCookie('requestCount',requestCount,60*5,process.env.BASE_DOMAIN,"/")
	    		setCookie("openid_callback_url",location.href,3000,process.env.BASE_DOMAIN,"/")
	    		location.href=`//passport.${process.env.BASE_DOMAIN}/v2.0/wx/silent_login/pay_openid_status`
	    	}
	    }
	}
}
