<template>
  <el-container style="overflow-y: hidden;overflow-x: hidden;">
    <el-header>
      <img src="../assets/images/lg/LOGO.svg" height="40px" style="margin-left: 10px"/>
      <div class="lg-title-item">
        <span>网格化巡检航迹规划平台</span>
      </div>
      <div style="flex-grow: 2"></div>
      <img class="lg-right-item" src="../assets/images/sub1/6.png">
      <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      <i class="el-icon-caret-bottom lg-caret-bottom" @click="handleAvatarClick"></i>
      <div class="lg-info-popup">
        <div class=" lg-info-popup-item" :style="{ '--visibility': isShowPopup ? 'visible' : 'hidden' }">
          <div class="lg-info-popup-body">
            <span @click="handlePersonInfo"><i class="el-icon-s-custom"></i> 个人信息</span>
            <el-divider></el-divider>
            <span><i class="el-icon-table-lamp"></i> 退出登录</span>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <layout/>
      <el-container style="flex-direction: column;">
        <HistoryComponent/>
        <el-container id="lg-main-content" style="flex-direction: column;">
          <el-main style="height: 0;flex-grow: 20;">
            <router-view></router-view>
          </el-main>
        </el-container>
        <el-footer>
          <span style="color: #ffffff;text-align: center;line-height: 40px">版权所有：国网江苏省电力公司</span>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// import MapView from '@/components/MapView'
import Layout from '@/views/layout'
import HistoryComponent from '@/views/layout/historyComponent/history'
// import BatchUpload from '@/components/Upload/BatchUpload'
// import TrajectoryPlanning from '@/views/planning/index'
export default {
  name: 'Home',
  components: {
    Layout,
    // MapView,
    HistoryComponent
    // BatchUpload
    // TrajectoryPlanning
  },
  data () {
    return {
      activeName: 'first',
      isShowPopup: false
    }
  },
  created () {
  },
  methods: {
    handleAvatarClick () {
      // console.log('This is handleAvatarClick!')
      // this.$router.push({ path: '/person' })
      this.isShowPopup = !this.isShowPopup
    },
    handlePersonInfo () {
      this.$router.push({ path: '/person' })
    }
  }
}
</script>

<style scoped lang="scss">
  .el-container {
    width: 100%;
    height: 100%;
    .el-header {
      display: flex;
      flex-display: row;
      align-items: center;
      height: 70px !important;
      background-color: #f0f0f0;
      text-align: center;
      .lg-title-item {
        font-size: 30px;
        font-weight: bold;
        color: #1d848b;
        margin-left: 28px;
        line-height: 70px;
      }
      .lg-right-item {
        margin-right: 15px;
      }
    }
    .el-main {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #E9EEF3;
      text-align: center;
      padding: 0px !important;
      .gl-main-content {
        position: relative;
      }
    }
    .el-aside {
      text-align: left;
    }
    .el-footer {
      height: 40px !important;
      text-align: center;
      line-height: 40px;
      background-color: #1d848b;
    }
    .lg-caret-bottom {
      margin-top: 30px;
    }
    .lg-info-popup {
      position: relative;
      display: inline-block;
      cursor: pointer;
      font-size: 14px;
      .lg-info-popup-item {
        visibility: var(--visibility);
        width: 120px;
        background-color: #ffffff;
        text-align: left;
        padding: 5px 0px;
        border-radius: 5px;
        box-shadow: 0px 0px 6px 1px #b1afaf;

        /* 定位 */
        position: absolute;
        z-index: 10001;
        top: 40px;
        left: 100%;
        margin: 0px 10px 0px -110px;
        .lg-info-popup-body {
          /* 布局 */
          display: flex;
          flex-direction: column;
          padding-left: 10px;
          padding-right: 10px;
        }
        .el-divider--horizontal {
          margin: 6px 0;
          background-color: #E4E7ED;
          height: 2px;
        }
      }
      .lg-info-popup-item::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 62%;
        margin-left: -6px;
        border-width: 6px;
        border-style: solid;
        border-color: transparent transparent #ffffff transparent;
      }
    }
  }
</style>
