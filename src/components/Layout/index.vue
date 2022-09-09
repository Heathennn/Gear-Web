<template>
  <a-layout>
    <a-layout-sider
      width="250"
      breakpoint="lg"
      collapsible
      :trigger="null"
      v-model:collapsed="collapsed"
    >
      <Menu></Menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="height: 60px; background: #fff; padding: 0"
        position="absolute"
      >
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="user-info-box">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              {{ userInfo.userName}}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="logout">退出登录</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content content-style="padding: 80px 20px 20px 20px">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
// 此处不能使用setup单文件组件模式,猜测是UI组件库没有使用setup模式
import { defineComponent, ref } from "vue";
import Menu from "../Menu/index.vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { useLocalStorageState } from "../../store";
import { DownOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
interface User {
  userAccount?: string;
  userName?: string;
  userId?: string;
  token?: string;
}
export default defineComponent({
  name: "Layout",
  components: {
    Menu,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
  },
  setup() {
    const collapsed = ref(false);
    const userInfo = ref<User>({});
    const router = useRouter()
    const LocalStorageState = useLocalStorageState();
    const logout = () => {
        LocalStorageState.value.user = '';
        LocalStorageState.value.token = '';
        router.replace('/login')
    }

    if (LocalStorageState.value.user) {
        userInfo.value = JSON.parse(LocalStorageState.value.user);
    } else {
        logout()
    }

    return {
      collapsed,
      LocalStorageState,
      userInfo,
      logout
    };
  },
});
</script>
<style lang="less" scoped>
.trigger {
  margin-left: 10px;
  font-size: 25px;
}

.user-info-box {
  float: right;
  margin-right: 60px;
}
</style>
