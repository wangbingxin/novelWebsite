import {getCookie} from "./common.js";

const BrowserType=[
	"Weibo",
    "MicroMessenger",
    "Mobile MQQBrowser"
];
function checkUserAgent(name){
	var userAgent=navigator.userAgent;
	if(userAgent.indexOf(name)!=-1){
		return name;
	}else{
		return 0;
	}
}
function getUserAgent(){
	var len=BrowserType.length;
	for(var i=0;i<len;i++){
		var userAgent=checkUserAgent(BrowserType[i]);
		if(userAgent){
			return userAgent;
		}
	}
	return "Default";
}
/*function SetMicroMessengerPay(obj){
	var PromotionInfo=getCookie("PromotionInfo");
	if(PromotionInfo != null){
		PromotionInfo=decodeURIComponent(PromotionInfo);
		PromotionInfo=JSON.parse(PromotionInfo);
		if(PromotionInfo.IsVerificated == "3"){
			payMethod.push(obj.wechat_pay);
			payMethod.push(obj.ipaynow_wechat);
			return;
		}
	}
	return;
}*/

function setPayMethod(obj){
	var userAgent=getUserAgent();
	var payMethod=[];
	switch(userAgent){
		case "Weibo":
			payMethod.push(obj.alipay_wap);
			payMethod.push(obj.ipaynow_wechat_webview);
			payMethod.push(obj.ipaynow_unionpay);
			break;
		case "MicroMessenger":
			payMethod.push(obj.wechat_pay);
			//payMethod.push(obj.ipaynow_wechat);
			//payMethod.push(obj.wechat_qrcode_pay);
			//payMethod.push(obj.ipaynow_qq);
			//payMethod.push(obj.ipaynow_unionpay);
			break;
		case "Mobile MQQBrowser":
			//payMethod.push(obj.ipaynow_qq);
			payMethod.push(obj.ipaynow_wechat);
			//payMethod.push(obj.ipaynow_unionpay);
			break;
		default:
			payMethod.push(obj.alipay_wap);
			payMethod.push(obj.ipaynow_wechat_webview);
			payMethod.push(obj.ipaynow_qq);
			//payMethod.push(obj.ipaynow_unionpay);
			break;
	}
	return payMethod;
}

export{setPayMethod};
