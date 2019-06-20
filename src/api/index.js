import axios from 'axios'
import qs from 'qs'
import {Base64} from '@/util/base64.js'

let baseURL = '';//开发路由前缀
let redirectUrl = '';
let Authorization = '';//维持会话关系的设定
let loginUrl = '';
let uploadUrl = 'http://10.1.15.106:8445';
let validUrl = 'http://10.1.15.106:8102';
const env = process.env.NODE_ENV;
// window.globelApi2 = 'http://10.1.15.106:8445'//test环境
// window.globelApi2 = 'http://192.168.4.16:25089'//建波
//  window.globelApi2 = 'http://192.168.4.16:25083'//冬菜

//根据不同的环境打包不同的接口
switch (env) {
    case 'development':
        baseURL = 'http://10.1.15.106:8445/';
        break;
    case 'test':
        baseURL = 'http://10.1.15.106:8445/';
        break;
    case 'production':
        break;
}

const goLogin = (redirectUrl) => {
    localStorage.clear();
    if (env == 'development') {
        // window.VueApp.$router.push({
        //     name: 'login'
        // })
    } else {
        window.location.href = loginUrl + '?redirectUrl=' + redirectUrl;
    }
};

if (localStorage.getItem('token')) {
    let token = JSON.parse(localStorage.getItem('token'));
    Authorization = token.tokenType + ' ' + token.value;
}else{
    goLogin(redirectUrl);
}

let timeout = 10000;
let instance = axios.create({
    baseURL: baseURL,
    timeout: timeout
});

/*
*
* 请求的预处理 by wzd
* */
instance.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        // let token = JSON.parse(localStorage.getItem('token'));
        // Authorization = token.tokenType + ' ' + token.value;
    } else {
        //todo 跳转到登录界面
        goLogin(redirectUrl);
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Authorization'] = Authorization;
    return config;
}, (error) => {
    return Promise.reject(error);
});

/*
*
* 返回的预处理 by wzd
* */
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

const formDataRequest = (url, params, methods = 'post') => {
    let formData = new FormData();
    Object.keys(params).forEach(target => {
        if (typeof params[target] !== 'string') {
            formData.append(target, JSON.stringify(params[target]));
        } else {
            formData.append(target, params[target]);
        }

    })
    return new Promise((resolve, reject) => {
        instance({
            url: url,
            method: methods,
            data: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
};

/*
*
* 封装axios实例，对错误统一处理，返回成功的promise对象 by wzd
* */
const fetch = (url, params, methods = 'post') => {
    //对所有的请求进行页码的改动，新框架 by wzd
    if (params !== undefined && params.offset !== undefined && params.limit !== undefined) {
        params.offset = (params.offset - 1) * params.limit
    }
    return new Promise((resolve, reject) => {
        if (methods == 'get') {
            url = url + '?' + qs.stringify(params)
        }
        instance[methods](url, params).then(res => {
            switch (res.code) {
                case '-1':
                case '0000001':
                case '000002':
                case '010500':
                case '010002':
                case '020000':
                case '030001':
                    // window.VueApp.$Message({
                    //     type: 'error',
                    //     message: res.mesg
                    // })
                    break;
                case '040001':
                    // console.error('sorry,user is not login');
                    break;
                default:
                    resolve(res)
                    break;
            }

        }).catch(err => {
            // console.log(err)
            reject(err);
        })
    })
};

export default {
    /**
     *登陆接口
     * params:{
     *    username:string,
     *    password:string,
     *    grant_type:number,
     *    client_id:number,
     *    client_secret:number
     * }
     * 登陆也的数据后端不解析json数据，用formdata by  wzd
     * **/
    login(params) {
        let formData = new FormData();
        formData.append('username', params.username);
        formData.append('password', params.password);
        formData.append('grant_type', params.grant_type);
        // formData.append('client_id', params.client_id)
        // formData.append('client_secret', params.client_secret)
        Authorization = 'Basic ' + Base64.encode('hlet-system-center:123456');
        return new Promise((resolve, reject) => {
            instance({
                url: baseURL + "auth/oauth/token",
                method: 'post',
                data: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }).then(res => {
                /*
                * 变量保存token，减少每次访问localstorage的消耗
                * */
                Authorization = res.tokenType + ' ' + res.value;
                /*
                * 存localstorage，方便刷新界面的时候获取到token
                * */
                localStorage.setItem('token', JSON.stringify(res));
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    },
    goLogin() {
        goLogin();
    },
    /*
        * 获取用户信息
        * by  wulei
    * */
    getUser() {
        return fetch('/system/manage/user/getUser', {}, 'get')
    },
    /*
        * 获取系统和菜单权限
        * by  wulei
    */
    getPermissions(sid){
        return fetch('/system/manage/user/getPermissions',{sid:sid},'get')
    },
    /*
        * 获取系统
        * by  wulei
    */
    getSystems(){
        return fetch('/system/manage/user/getSystems','','get')
    },
    // 文件上传
    upload(params) {
        return fetch(`${uploadUrl}/dfs/open/files/upload`, params)
    },
    // 修改头像
    resetAvatar(params) {
        return formDataRequest('/system/manage/user/resetAvatar', params)
    },
    // 修改密码
    resetPwd(params) {
        return formDataRequest('/system/manage/user/resetPwd', params)
    },
    // 获取验证码
    getVerfyCode(params) {
        return formDataRequest(`${validUrl}/mc-client/sms/template/smsService/sendVerifiCode`, params)
    },
    // 校验验证码
    reseverifiCodetPwd(params) {
        return formDataRequest(`${validUrl}/mc-client/sms/template/smsService/verifiCode`, params)
    }
}
