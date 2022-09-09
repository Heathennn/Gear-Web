import { watch, reactive, toRefs, ref } from 'vue'
import {useRouter} from "vue-router";
import * as UserApis from '../../apis/user'
import { useLocalStorageState} from "../../store";
import {CacheKeyMap} from "../../config/common";

export const useLogin = () => {
    const router = useRouter()
    const LocalStorageState = useLocalStorageState()
    const form = reactive({
        userAccount: 'admin',
        password: 'Abc2022.'
    })
    // Abc2022.

    watch( form, (value) => {
        console.log("form变化", value)
    })

    const login = () => {
        UserApis.userLogin(form).then( res => {
            let useInfo = res.bsToolWarnUser;
            LocalStorageState.value[CacheKeyMap.USER] = JSON.stringify(useInfo)
            LocalStorageState.value[CacheKeyMap.USER_TOKEN] = useInfo.token
            router.push('/')
        })
    }

    return {
        login,
        // 抛出单个属性时需要转换, 解构会导致失去响应式
        // ...toRefs(form),
        // 抛出整个响应式对象 可正常使用
        form
    }
}

