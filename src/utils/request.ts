import axios from 'axios';
import { useLocalStorageState } from '../store/index'
import {CacheKeyMap} from "../config/common";
import { message } from 'ant-design-vue'
import router from "../router";
const LocalStorageState = useLocalStorageState();
function getErrorCode(headers) {
    return +(headers.errorCode || headers.errorcode);
}
console.log('BASE_URL:' , import.meta.env.VITE_APP_SERVER_API_HOST)
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_API_HOST as string,
    timeout: 35000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    ({error, config}) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        let errorCode = getErrorCode(response.headers);
        let errorMsg = decodeURIComponent(response.headers.errorDesc || response.headers.errordesc || "登录超时");
        if (!!errorCode) {
            if (errorCode === 244813136873) {
                router.push({ path: '/login', replace: true})
            }

            // message
            // window.toast.showErrorMsg(errorMsg || "");
            message.error(errorMsg)
        }

        if(!!errorCode) {
            return Promise.reject({
                errorCode: errorCode,
                errorMsg: errorMsg.replace(/ipfs/g, "文件服务器")
            });
        }

        return response.data
    },
    (error) => {
        if(axios.isCancel(error)) {
            // 返回一个pendding的Promise
            return new Promise(resolve => {});
        }

        let response = error.response || {};
        let config = error.config || {};
        if(!response.headers) {
            response.headers = {};
        }
        let errorCode = getErrorCode(response.headers);
        let errorMsg = decodeURIComponent(response.headers.errorDesc || response.headers.errordesc || "")  || `请求服务${response.status || '超时'}-${config.url || ""}`;
        error.errorMsg = errorMsg;
        // message
        message.error(errorMsg)
        return Promise.reject(error);
    });

function checkStatus(response) {
    return response
}

const request = async (config) => {
    if (!config.headers) {
        config.headers = {};
    }
    // 设置token
    config.headers["token"] = LocalStorageState.value[CacheKeyMap.USER_TOKEN]

    return service.request(config).then(checkStatus).catch(e => {
        e.config = config;
        return Promise.reject(e);
    });
}

export const GET = (url, data, config) => {
    const CONF = {
        url,
        method: 'get',
        params: data,
    }
    return request({...CONF, ...config})
}

export const POST = (url, data, config={}) => {
    const CONF = {
        url,
        method: 'post',
        data,
    }

    return request({...CONF, ...config})
}

export const PUT = (url, data, config) => {
    const CONF = {
        url,
        method: 'put',
        data,
    }
    return request({...CONF, ...config})
}

export const DELETE = (url, data, config) => {
    const CONF = {
        url,
        method: 'delete',
        data,
    }
    return request({...CONF, ...config})
}