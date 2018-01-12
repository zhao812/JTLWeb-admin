import router from '../router';

String.prototype.trim = function(){
    return this.replace(/\s/g,"");    
}

export const isRealName = value => {
    if(value){
        let reg=/^[\u4E00-\u9FA5]{2,6}$/;
        // console.log(reg)
        return reg.test(value);
    }

    return false;
}

//是否是身份证
export const isCard = value => {
    value = value.toUpperCase().trim()
    if(value){
        let reg = /^(\d{17}[\d|X])$/;
        return reg.test(value);
    }
    return false
}

//是否是银行卡卡号
export const isBandCard = value => {
    value = value.trim();
    if(value && value.length>=15 && value.length<=20){
        return true
    }

    return false
}

export const cardSeparated = value => {
    value = value.trim();
    let len = value.length, result = '';
    result = value.substring(0, 6);
    result += len > 6 ? ' ' + value.substring(6, 14) : '';
    result += len > 14 ? ' ' + value.substring(14, 18) : '';
    return result
}

export const isMobile = value => {
    value = value.trim();
    if(value){
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
        return reg.test(value);
    }
    return false
}

// 手机号码格式转化为 344 格式 （188 3886 9199）  
export const mobileSeparated = value => {
    let tel = value.trim(), len = tel.length, result="";
    result = tel.substring(0, 3);
    result += len > 3 ? ' ' + tel.substring(3, 7) : '';
    result += len > 7 ? ' ' + tel.substring(7, 11) : '';  
    return result;  
} 

export const isValidCode = value => {
    if(value){
        let reg = /^\d{6}$/;
        return reg.test(value);
    }
    return false
}

export const isEmail = value => {
    if(value){
        let reg = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
        return reg.test(value)
    }
}

/**
 * 判断是否在ios系统中
 */
export const isIos = () => {
    let u = navigator.userAgent;
    // console.log(u)
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * @param {*} url 
 * 跳转路由
 */
export const openWin = url => {
    router.push(url)
}

export const goBack = (step = -1) => {
    router.go(step)
}

/**设置document title */
export const setTitle = title => {
    document.title = title;
}

//获取url中的参数
export const getUrlParams = () => {
    let url = location.hash, arr = url.indexOf("?") >= 0 ? url.split("?")[1].split("&") : []
    var params = {};
    for(var i=0; i<arr.length; i++){
        var data = arr[i].split("=");
        if(data.length == 2){
             params[data[0]] = decodeURIComponent(data[1]);
        }
    }
    return params;
}

export const getCookie = name => {
	let arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	} else{
		return null;
	}
}


/**
 * 从input file 中读取base64
 * @param {*} file 
 */
export const readBase64 = file => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result)
        }
        reader.onerror = () => {
            reject()
        }

        reader.readAsDataURL(file);
    })
}