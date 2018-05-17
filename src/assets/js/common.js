/**
 * 页面自适应
 */
window.onresize = function() {
    if (document.documentElement.clientWidth <= 750) {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
    } else {
        document.documentElement.style.fontSize = 750 / 7.5 + "px";
    }
};

if (document.documentElement.clientWidth <= 750) {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
} else {
    document.documentElement.style.fontSize = 750 / 7.5 + "px";
}

/**
 * 去除字符串两端空格
 */
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 设置cookie
 */
function setCookie(name, value, expireSecond, domain, path) {
    var exdate = new Date();
    var temptime = exdate.getTime() + expireSecond * 1000;
    exdate.setTime(temptime);
    document.cookie = name + "=" + encodeURIComponent(value) +
        ";expires=" + exdate.toUTCString() + ";path=" + path + ";domain=" + domain + ";";
}

/**
 * 获得cookie
 */
function getCookie(name) {
    if (document.cookie.length > 0) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return decodeURIComponent(arr[2].trim());
        }
    }
    return null;
}

/**
 * 清除cookie
 */
function delCookie(name, domain, path) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=" + path + ";domain=" + domain + ";";
}

/**
 * 获得url参数
 */
function getParam(name) {
    if (location.search.length > 0) {
        var arr = location.search.match(new RegExp("(^\\?|&)" + name + "=([^&]*)(&|$)"));
        if (arr != null) {
            return arr[2].trim();
        }
    }
    return null;
}

/**
 * 信息提示
 */
function showMsg(str) {
    var oDiv = document.createElement("div"),
        oSpan = document.createElement("span");
    oDiv.className = "showMsg";
    oSpan.innerHTML = str;
    oDiv.appendChild(oSpan);
    document.body.appendChild(oDiv);
    setInterval(function() {
        oDiv.style.opacity = "0";
    }, 2000);
    setTimeout(function() {
        document.body.removeChild(oDiv);
    }, 2500);
}

/**
 * 转换时间格式
 */
Date.prototype.Format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**
 * 转换时间戳
 */
function getLocalTime(nS) {
    if(nS){
        return new Date(parseInt(nS) * 1000).Format("yyyy-MM-dd hh:mm:ss")
    }else{
        return ''
    }
}

/**
 * 确认框框
 */
function Confirm(html,sureFunc,cancelFunc,confirm,cancel){
    var htmlMask=document.createElement("div"),
        htmlDialog=document.createElement("div"),
        dialogText=document.createElement("p"),
        dialogBtn=document.createElement("div"),
        yesBtn=document.createElement("a"),
        noBtn=document.createElement("a");
    htmlMask.style.cssText=`position: fixed; width: 7.5rem; top: 0; left: 0; background-color: #000; opacity: .3; z-index: 2;`;
    htmlMask.style.height=document.documentElement.clientHeight+"px";
    htmlDialog.style.cssText="position: fixed; top: 4rem; left: 1rem; width: 5.5rem; background-color: #fff; border-radius: .05rem; overflow: hidden; z-index: 3;";
    dialogText.style.cssText="margin: .4rem; line-height: .42rem; text-align: justify;";
    dialogText.innerHTML=html;
    yesBtn.innerText=confirm || "确定";
    noBtn.innerText=cancel || "取消";
    yesBtn.style.cssText="float: left; width: 2.75rem; background-color: #ff6060; padding: .2rem 0; text-align: center; color: #fff;";
    noBtn.style.cssText="float: right; width: 2.75rem; background-color: #ccc; padding: .2rem 0; text-align: center; color: #fff;";
    dialogBtn.appendChild(yesBtn);
    dialogBtn.appendChild(noBtn);
    htmlDialog.appendChild(dialogText);
    htmlDialog.appendChild(dialogBtn);
    document.body.appendChild(htmlMask);
    document.body.appendChild(htmlDialog);
    yesBtn.addEventListener("click",sureFunc);
    yesBtn.addEventListener("click",function(){
        document.body.removeChild(htmlMask);
        document.body.removeChild(htmlDialog);
    });
    noBtn.addEventListener("click",cancelFunc);
    noBtn.addEventListener("click",function(){
        document.body.removeChild(htmlMask);
        document.body.removeChild(htmlDialog);
    });
}

export {
    getParam,
    setCookie,
    getCookie,
    delCookie,
    getLocalTime,
    showMsg,
    Confirm
};