<template>
  <div class="lg_container">
    <div class="lg_content">
      <div style="padding: 10px 20px;text-align: right;">
        <el-button style="background-color: #1d848b;color: #ffffff;font-size: 14px;" size="small" type="primary" icon="el-icon-plus" @click="addUser">新增用户</el-button>
      </div>
      <el-table :data="tableData" :show-header="true" :row-style="{height: '50px'}" :cell-style="{padding: '0'}" border style="width: 100%;">
        <el-table-column align="center" label="头像" min-width="50">
          <template slot-scope="scope">
            <div style="display: flex;align-items: center;justify-content: center;">
              <el-avatar size="small" :src="scope.row.headerImg"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="uuid" min-width="250" prop="uuid" />
        <el-table-column align="center" label="用户名" min-width="150" prop="userName" />
        <el-table-column align="center" label="昵称" min-width="150" prop="nickName" />
        <el-table-column align="center" label="用户角色" min-width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.authority"
                       placeholder="请选择"
                       clearable
                       :style="{width: '100%'}">
              <el-option :key="1" label="管理员" value="管理员"></el-option>
              <el-option :key="2" label="普通用户" value="普通用户"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center"  width="150px">
          <template>
            <el-button-group class="gl-view-button">
              <el-button
                size="mini"
                type="danger"
                >删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 40px;width: 100%;">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :style="{float:'right',padding:'20px'}"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>

    <el-dialog
      title="巡检区域设置"
      :visible.sync="addUserDialog"
      width="20%"
      class="lg-dialog"
      :before-close="handleClose">
      <el-form label-position="left" ref="userForm" :model="userInfo">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="username">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="别名" label-width="80px" prop="username">
          <el-input v-model="userInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="头像" label-width="80px">
          <div style="display:inline-block" @click="openHeaderChange">
            <img v-if="userInfo.headerImg" class="header-img-box" :src="userInfo.headerImg">
            <div v-else class="header-img-box">从媒体库选择</div>
          </div>
        </el-form-item>
        <el-form-item label="用户角色" label-width="80px" prop="authorityId">
          <el-select v-model="userInfo.authority"
                     placeholder="请选择"
                     clearable
                     :style="{width: '100%'}">
            <el-option :key="1" label="管理员" value="管理员"></el-option>
            <el-option :key="2" label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addUserDialog = false">取 消</el-button>
        <el-button size="mini" style="background: #1d848b" type="primary" @click="addUserDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      tableData: [
        {
          headerImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          uuid: '1',
          userName: '1',
          nickName: '1',
          authority: '普通用户'
        },
        {
          headerImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          uuid: '2',
          userName: '2',
          nickName: '2',
          authority: '普通用户'
        },
        {
          headerImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          uuid: '2',
          userName: '2',
          nickName: '2',
          authority: '普通用户'
        }
      ],
      page: 1,
      pageSize: 10,
      total: 30,
      addUserDialog: false,
      userInfo: {
        username: '',
        password: '',
        nickName: '',
        headerImg: '',
        authority: ''
      }
    }
  },
  methods: {
    addUser () {
      this.addUserDialog = true
    },
    handleClose () {},
    handleCurrentChange () {},
    handleSizeChange () {},
    openHeaderChange () {}
  }
}
</script>

<style scoped lang="scss">
  .lg_container {
    margin: 20px;
    background-color: #ffffff;
    .lg_content {
      padding: 20px;
      background-color: #ffffff;
    }
  }
</style>
