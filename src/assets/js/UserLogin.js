import { getCookie } from './common'
let userAgent=navigator.userAgent.toLowerCase(),
	isLogin=getCookie("signature")&&getCookie("user_id")&&getCookie("user_uuid")
if(!isLogin){
	if(userAgent.indexOf("micromessenger")!=-1){
	    if(!getCookie('wxf6c9f0c9696b8bdb_openid_exit')){
	    	location.href='https://'+process.env.BASE_DOMAIN+'/v2.0/wx/silent_login/start?callback_url='+encodeURIComponent(location.href)
	    }
	}
}