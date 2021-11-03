<template>
    <el-menu style="border: none;"
             :collapse="isCollapse"
             :collapse-transition="false"
             :default-active="$route.path"
             class="el-menu-vertical"
             background-color="#272a36"
             text-color="#e7e7e7"
             active-text-color="#ffffff"
             unique-opened
             router
    >
      <el-menu-item index="/management">
        <i class="el-icon-s-home iconColor"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-data iconColor"></i>
          <span style="font-size: 14px;">航迹规划</span>
        </template>
        <el-menu-item index="/program">
          <i class="el-icon-s-promotion iconColor"></i>
          <span slot="title">航迹计算</span>
        </el-menu-item>
        <el-menu-item index="/arrangement">
          <i class="el-icon-s-promotion iconColor"></i>
          <span slot="title">任务安排</span>
        </el-menu-item>
      </el-submenu>
<!--      <el-menu-item index="/program">-->
<!--        <i class="el-icon-s-promotion iconColor"></i>-->
<!--        <span slot="title">航迹规划</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/user">
        <i class="el-icon-s-tools iconColor"></i>
        <span slot="title">系统管理</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
    }
  },
  computed: {
    isCollapse () {
      return this.$store.getters.sidebar.opened
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  li.el-menu-item.is-active {
    background-color: #1d848b !important;
  }
  li.el-menu-item {
    font-size: 14px;
  }
  .iconColor {
    color: #ffffff;
    margin-right: 10px;
    font-size: 24px;
  }
  .icon-pointer {
    content: "";
    width: 9px;
    height: 9px;
    margin-right: 8px;
    display: inline-block;
    border-radius: 50%;
    transition: background-color .2s;
    z-index: 99999;
    background-color: #ffffff;
  }
</style>
