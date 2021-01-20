<template>
  <div class="login">
    <el-form :model="form" label-width="100px" class="demo-dynamic" :rules="rules" ref="form">
      <el-form-item
        prop="loginName"
        label="用户名"
      >
        <el-input v-model="form.loginName" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input placeholder="请输入密码" v-model="form.password" show-password style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item
        prop="captcha"
        label="验证码"
      >
        <el-input v-model="form.captcha" style="width: 70px;"></el-input>
        <div style="position: relative;display: inline-block;width: 80px;height: 23px;">
          <img :src="captcha" style="position: absolute;top: 3px;left: 0px;">
        </div>
        <el-button @click.prevent="refreshCaptcha">刷新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginFunc">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { staffCaptcha,login } from '@/assets/api/login';
import config from "@/assets/js/config.js";
export default {
  name: "Login",
  data() {
    return {
      form:{
        loginName:'',
        password:'',
        captcha:'',
      },
      httpUrl:config.API_CONFIG + "/sys/staff/captcha",
      captcha:'',
      rules: {
        loginName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    loginFunc() {
      login(this.form).then((res) => {
        this.$router.push({
          path: "/views/home/home",
          name: "Home",
        });
      })
    },
    // 获取验证码
    getcaptcha(){
      this.captcha = this.httpUrl;
    },
    refreshCaptcha(){
      let timestamp = Date.parse(new Date());
      this.captcha = this.httpUrl + '?_t=' + timestamp/1000;
    },
  },
  mounted() {
    this.getcaptcha();
  },
};
</script>

<style scoped lang="scss">
  .el-form-item {
    margin-bottom: 22px;
  }
  .login{
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    /*background: url('@/assets/img/homebackground.jpg');*/
  }
</style>
