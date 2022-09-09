import { POST } from "../utils/request";

interface loginParams {
    userAccount: string,
    password: string
}

type commonResponse = Promise<any>

export const userLogin = (data:loginParams): commonResponse => {
    return POST('/toolWarn/login', data)
}

export const userLogout = (data): commonResponse => {
    return POST('/toolWarn/quit', data)
}

// 根据token获取用户信息
export const getUserInfoByToken = (data): commonResponse => {
    return POST(`/toolWarn/getUserByToken`, data)
}