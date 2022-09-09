<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return {
            zhCN
        }
    }
})
</script>

<template>
    <a-config-provider :locale="zhCN">
            <router-view></router-view>
    </a-config-provider>

</template>

<style lang="less">
#app {
    width: 100%;
    height: 100%;
    .n-config-provider {
        width: 100%;
        height: 100%;
    }
}
</style>
