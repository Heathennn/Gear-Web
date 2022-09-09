import { POST } from '../utils/request'

type commonResponse = Promise<any>
/**
 *根据fieldCodes(主键)获取warn_log_config表的配置信息
 * @param data
 */
export const getWarnLogConfigListByFieldCodes = (data: object): commonResponse => {
    return POST('/toolWarn/getWarnLogConfigListByFieldCodes', data)
}

/**
 * 更新warn_log_config表的配置信息
 * @param data { fieldCodes: [] }
 */
export const updateWarnLogConfigList = (data: object): commonResponse => {
    return POST('/toolWarn/updateWarnLogConfigList', data)
}


/**
 * 获取报警通知用户配置信息
 * @param data
 */
export const getWarnLogAlarmUserList = (data: object): commonResponse => {
    return POST('/toolWarn/getWarnLogAlarmUserList', data)
}

/**
 * 新增/修改/停启用报警通知用户配置信
 * @param data
 */
 export const editWarnLogAlarmUser = (data: object): commonResponse => {
    return POST('/toolWarn/editWarnLogAlarmUser', data)
}

/**
 * 获取报警通知用户关键字配置信息
 * @param data
 */
 export const getWarnLogAlarmKeywordUserList = (data: object): commonResponse => {
    return POST('/toolWarn/getWarnLogAlarmKeywordUserList', data)
}

/**
 * 新增/修改/停启用报警通知用户关键字配置信息
 * @param data
 */
 export const editWarnLogAlarmKeywordUser = (data: object): commonResponse => {
    return POST('/toolWarn/editWarnLogAlarmKeywordUser', data)
}

/**
 * 获取自动化测试服务器列表配置信息
 * @param data
 */
export const getWarnLogAutoTestPlatformList = (data: object): commonResponse => {
    return POST('/toolWarn/getWarnLogAutoTestPlatformList', data)
}

/**
 * 停启用自动化测试服务器，停用时即不校验此服务器的自动化测试结果
 * @param data
 */
export const enableWarnLogAutoTestPlatform = (data: object): commonResponse => {
    return POST('/toolWarn/enableWarnLogAutoTestPlatform', data)
}