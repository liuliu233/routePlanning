<template>
  <div id="login-layout">
    <div class="login-panel">
      <div class="lg-popup">
        <div class="lg-popup-item">
          <img src="../../assets/images/lg/LOGO.svg" height="40px" style="margin-left: 10px"/>
          <div class="lg-title-item">
            <span>网格化巡检航迹规划平台</span>
          </div>
        </div>
        <div class="login-panel-form">
          <div class="login-panel-form-title">
            <p class="login-panel-form-title-p">{{ "用户登录" }}</p>
          </div>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="rules"
            @keyup.enter.native="submitForm"
          >
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名">
                <i slot="suffix" class="el-input__icon el-icon-user"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" :type="lock === 'lock' ? 'password' : 'text'" placeholder="请输入密码">
                <i slot="suffix" :class="'el-input__icon el-icon-' + lock" @click="changeLock"/>
              </el-input>
            </el-form-item>
            <el-form-item style="position: relative">
              <el-input v-model="loginForm.captcha" name="logVerify" placeholder="请输入验证码" style="width: 60%; float: left !important;"/>
              <div class="vPic">
                <img v-if="picPath" :src="picPath" width="153px" height="44px" alt="请输入验证码" @click="loginVerify()">
              </div>
            </el-form-item>
            <div />
            <el-form-item>
              <el-button type="primary" style="width: 100%;background-color: #1d848b; font-weight: bold;" @click="submitForm">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="login-panel-right"/>
    </div>
  </div>
</template>

<script>

// import { captcha } from '@/api/user'

export default {
  name: 'login',
  data () {
    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    return {
      curYear: 0,
      lock: 'lock',
      loginForm: {
        username: 'admin',
        password: '123456',
        captcha: '',
        captchaId: ''
      },
      rules: {
        username: [{ validator: checkUsername, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }]
      },
      logVerify: '',
      picPath: ''
    }
  },
  created () {
    this.loginVerify()
    this.curYear = new Date().getFullYear()
  },
  methods: {
    async submitForm () {
      this.$refs.loginForm.validate(async (v) => {
        if (v) {
          const flag = await this.$store.dispatch('user/login', this.loginForm)
          if (!flag) {
            this.loginVerify()
          }
        } else {}
      })
      sessionStorage.setItem('user', JSON.stringify({ username: 'admin', password: '123456' }))
      // 跳回指定的路由
      await this.$router.push({ path: '/' })
    },
    changeLock () {
      this.lock = this.lock === 'lock' ? 'unlock' : 'lock'
    },
    loginVerify () {
      // this.picPath = 'http://localhost:8737/login/getCaptcha'
      // captcha({}).then((ele) => {
      //   this.picPath = ele.data.picPath
      //   this.loginForm.captchaId = ele.data.captchaId
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/login.scss";
</style>
