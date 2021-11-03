<template>
  <el-aside id="gl-aside-bar" class="lg-aside" :width="isCollapse ? '64px' : '200px'">
    <div class="lg-collapse-bt">
      <i v-if="isCollapse" class="el-icon-s-unfold lg-unfold" @click="toggleCollapse"></i>
      <i v-else class="el-icon-s-fold lg-fold" @click="toggleCollapse"></i>
    </div>
    <Aside/>
  </el-aside>
</template>

<script>
import Aside from '@/views/layout/asideComponent'
export default {
  name: 'Layout',
  components: {
    Aside
  },
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
    toggleCollapse () {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style scoped lang="scss">
  .lg-aside {
    background-color: #545c64;
    overflow: hidden;
    .lg-collapse-bt {
      width: 100%;
      height: 40px;
      background-color: #224e61;
      text-align: right;
      .lg-fold {
        font-size: 24px;
        text-align: center;
        position: relative;
        top: 8px;
        right: 10px;
        color: #ffffff;
        z-index: 99999;
      }
      .lg-unfold {
        font-size: 24px;
        text-align: center;
        position: relative;
        top: 8px;
        right: 18px;
        color: #ffffff;
        z-index: 99999;
      }
    }
  }
</style>
