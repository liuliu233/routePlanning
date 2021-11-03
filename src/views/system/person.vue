<template>
  <div class="lg-main">
    <div class="lg-person-panel">
      <el-row :gutter="20">
        <el-col :span="6" style="background-color: #ffffff;">
          <el-card style="margin-bottom:20px;">
            <div slot="header" style="text-align: left;color: #1d848b;font-weight: bold;">
              <span>个人信息</span>
            </div>
            <div>
              <el-avatar :size="100" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              <div style="padding-top: 10px;">
                <div style="font-size: 20px;font-weight: bold;">用户名</div>
                <div style="padding-top: 10px;">用户角色</div>
              </div>
            </div>
            <div style="text-align: left;padding-top: 40px;">
              <i class="el-icon-setting"><span style="margin-left: 10px;">备注</span></i>
              <el-divider></el-divider>
              <div style="color: #777">
                用户信息的简单描述
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18" style="background-color: #ffffff;">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="账号信息" name="account">
                <span slot="label" class="lg-tab-item__title">
                    账号信息
                </span>
                <el-form>
                  <el-form-item label="用户名: ">
                    <el-input v-model.trim="username"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱: ">
                    <el-input v-model.trim="email"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button style="background-color: #1d848b" type="primary" @click="submit">更 新</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>

      <!--    <ChooseImg ref="chooseImg" @enter-img="enterImg" />-->

      <el-dialog :visible.sync="showPassword" title="修改密码" width="360px" @close="clearPassword">
        <el-form ref="modifyPwdForm" :model="pwdModify" :rules="rules" label-width="80px">
          <el-form-item :minlength="6" label="原密码" prop="password">
            <el-input v-model="pwdModify.password" show-password />
          </el-form-item>
          <el-form-item :minlength="6" label="新密码" prop="newPassword">
            <el-input v-model="pwdModify.newPassword" show-password />
          </el-form-item>
          <el-form-item :minlength="6" label="确认密码" prop="confirmPassword">
            <el-input v-model="pwdModify.confirmPassword" show-password />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showPassword=false">取 消</el-button>
          <el-button type="primary" @click="savePassword">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Person',
  data () {
    return {
      path: '',
      activeTab: 'account',
      activeName: 'second',
      showPassword: false,
      pwdModify: {},
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '最少6个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '最少6个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, message: '最少6个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.pwdModify.newPassword) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      username: '某某某',
      email: 'admin@test.com'
    }
  },
  methods: {
    savePassword () {},
    clearPassword () {},
    openChooseImg () {},
    async enterImg (url) {},
    handleClick (tab, event) {},
    submit () {}
  }
}
</script>

<style scoped lang="scss">
  .lg-main {
    position: relative;
    margin: 20px;
    overflow: hidden;
    background-color: #ffffff;
    .lg-person-panel {
      position: relative;
      padding: 20px;
      overflow: hidden;
      .el-divider--horizontal {
        margin: 10px 0;
      }
      .lg-tab-item__title {
        font-size: 18px;
        font-family: "微软雅黑";
        font-weight: bold;
        color: #1d848b;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
