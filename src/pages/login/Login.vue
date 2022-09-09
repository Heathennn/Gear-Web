<template>
  <div class="login-page-container">
    <div class="login-box">
      <div class="title">登录</div>
      <a-form v-bind="formItemLayout">
          <a-form-item
            label="用户名:"
            ><a-input type="text" v-model:value="form.userAccount"
          /></a-form-item>
          <a-form-item
            label="密码:"
            ><a-input type="password" v-model:value="form.password"
          /></a-form-item>

          <a-form-item v-bind="formItemFooterLayout">
              <a-button @click="login" type="primary" class="login-btn">登录</a-button>
          </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLogin } from "./useLogin";
import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    const { form, login } = useLogin();
    const formItemLayout = {
      labelCol: { span: 6},
      wrapperCol: { span: 22 }
    };
    const formItemFooterLayout = {
      labelCol: { span: 6},
      wrapperCol: { span: 22, offset: 7 }
    };
    return {
      form,
      login,
      formItemLayout,
      formItemFooterLayout
    };
  },
});
</script>

<style lang="less">
.login-page-container {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  background-image: url('../../assets/login-bg.png');
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 500px;
    padding: 20px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    .title {
      font-size: 22px;
      text-align: center;
      margin-bottom: 10px;
    }

    .login-btn {
      width: 200px;
    }
  }
}
</style>
