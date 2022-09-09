<template>
    <div class="menu-container">
        <div class="logo">模板</div>
        <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            :theme="theme"
        >
            <template v-for="menu in routes">
                <a-menu-item :key="menu.name" v-if="(!menu.children || !menu.children.length) && !menu.hidden" @click="handleClick(menu)">
                    <template #icon v-if="menu.meta.icon">
                        <Component :is="menu.meta.icon"></Component>
                    </template>
                    {{ menu.meta.title }}
                </a-menu-item>
                <a-sub-menu :key="menu.name" v-else-if="!menu.hidden">
                    <template #icon v-if="menu.meta.icon">
                        <AppstoreOutlined />
                    </template>
                    <!--  二级菜单的名称才可以用template #title, 可点击的不需要-->
                    <template #title>{{ menu.meta.title }}</template>
                    <a-menu-item :key="secondMenu.name" v-for="secondMenu in menu.children" @click="handleClick(secondMenu)">
                        <template #icon v-if="secondMenu.meta.icon">
                            <AppstoreOutlined />
                        </template>
                        {{ secondMenu.meta.title }}
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>
    </div>
</template>
<script lang="ts">
import { routes } from '../../router/index'
import { useRouter, RouterLink } from "vue-router";
import {ref, h, defineComponent, reactive, toRefs} from 'vue'
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
    components: {
        MailOutlined,
        CalendarOutlined,
        AppstoreOutlined,
        SettingOutlined
    },
    setup() {
        const router = useRouter();
        const state = reactive({
            theme: 'dark',
            selectedKeys: ['1'],
            openKeys: []
        })
        const handleClick = (menu) => {
            router.push({path: menu.name})
        };
        return {
            routes,
            ...toRefs(state),
            handleClick
        }
    }
})

</script>
<style lang="less" scoped>
.menu-container {
    .logo {
        height: 60px;
        color: #f1f1f1;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
    }
    ul {
        width: 100%;
        height: 100%;
        li {
            cursor: pointer;
        }
    }
}
</style>