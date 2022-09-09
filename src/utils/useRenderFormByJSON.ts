import { h } from 'vue'
import { Input } from 'ant-design-vue'
export const useRenderFormByJSON = (jsonStr):any => {
    let data;
    try {
        data = JSON.parse(jsonStr);
    } catch(err) {
        data = null;
    }
    // 解析失败的直接渲染textarea
    if (!data) {
        return Input
    }
}