import 'whatwg-fetch';
import 'babel-polyfill'
import size from "lodash/size"

const Hearders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const TIMEOUT = 10000

const Fetch = (url, param = {}, type = 'GET', isAutoAlert = true, headers = Hearders, repType = "json") => {
    if(process.env.NODE_ENV === 'development'){
        url = '/mock' + url + '.json'
        type = 'get'
    }
    return new Promise((reslove, reject) => {
        Promise.race([timeout(TIMEOUT), sendMsg(url, param, type, headers, repType, isAutoAlert = true)]).then(data=>{
            reslove(data);
        }, error=>{
            if(error.timeout){
                window.$toast('请求超时，请重试')
                console.log("timeout......");
            }
            reject(error)
        });
    })
}

// 超时控制
const timeout = ms => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject({timeout: true})
        }, ms);
    })
}

const sendMsg = (url, param = {}, type = 'GET', headers = Hearders, repType = "json", isAutoAlert = true) =>{
    type = type.toUpperCase();
    if(size(param) > 0){
        param = {data: param}
        if(type === "GET"){
            url += "?" + toExcString(param)
        }
    }

    return new Promise((resolve, reject) =>{
        fetch(url, {
            method: type,
            headers: headers,
            credentials: 'include',
            body: (type === "GET" ? undefined : repType == "json" ? JSON.stringify(param) : param)
        }).then((res) => {
            return res.json()
        }).then(data=>{
            if(data.code == 200){
                resolve(data.data)
            }else{
                if(data.msg && isAutoAlert){
                    window.$toast(data.msg).then(()=>{})
                }
                reject(data);
            }
        }).catch(e => {
            console.error("fetch: "+JSON.stringify(e));
            reject(e);
        })
    })
}

const toExcString = function (array, type = {
    ":": "=",
    ",": "&"
}) {

    let result = "";
    for (var temp in array) {
        if(array[temp] instanceof Object){
            result += temp + '=' + encodeURI(JSON.stringify(array[temp])) + "&"
        }else{
            result += temp + '=' + encodeURI(array[temp]) + "&"
        }
    }
    return result.substring(-1, result.length - 1);
}

export default Fetch;