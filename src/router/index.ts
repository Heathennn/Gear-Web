import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import {
    MailOutlined
} from '@ant-design/icons-vue';
interface RouteMata {
    title: string,
    icon: any
}
interface RouteItem {
    path: string,
    name: string,
    component: any,
    redirect?: string,
    hidden?: boolean,
    meta: RouteMata,
    children?: Array<any>
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/photoSplicer',
            component: () => import('pages/home/index.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/photoSplicer',
            name: 'photoSplicer',
            component: () => import('pages/canvas/photoSplicer/index.vue'),
            meta: {
                title: '图片拼接器'
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('pages/404.vue'),
            meta: {
                title: '404'
            }
        },
    ]
})

export default router