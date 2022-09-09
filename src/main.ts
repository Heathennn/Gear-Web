import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'assets/reset.less'
import 'assets/common.less'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
const app = createApp(App)
const isProd = import.meta.env.PROD
if ( !isProd ) {
    console.log('开发环境')
    // setupProdMockServer();
}
app.use(router);
// app.config.productionTip = false;
app.use(Antd)
app.mount('#app')