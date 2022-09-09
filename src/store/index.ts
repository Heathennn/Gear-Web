import { createGlobalState, useStorage } from '@vueuse/core'
import {CacheKeyMap} from "../config/common";
// 创建全局的state 所有相同类别的数据,会存在一个key里
export const useLocalStorageState = createGlobalState(
    () => useStorage(
        'vue-use-locale-storage',
        {
            [CacheKeyMap.USER]: '',
            [CacheKeyMap.USER_TOKEN]: ''
        },
        localStorage)
)

// 分别存储
// export const user = useStorage(CacheKeyMap.USER, '', localStorage)
// export const userToken = useStorage(CacheKeyMap.USER_TOKEN, '', localStorage)
//
// export const LocalStorageState = {
//     user,
//     userToken
// }