import { getCookie } from './common'
// console.log((("https:" == document.location.protocol) ? "https:" : "http")+'://'+location.host+"/yun/yun_info/index")
if(getCookie('yun_distribution_channel_id')){

	let yun_info_url=(("https:" == document.location.protocol) ? "https" : "http")+'://'+location.host+"/yun/yun_info/index";
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",yun_info_url,true);
	xmlhttp.withCredentials=true;
	xmlhttp.onreadystatechange=function()
	{
	    if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	      // let res=JSON.parse(xmlhttp.responseText);
	     
	    }
	}
	xmlhttp.send();
}

