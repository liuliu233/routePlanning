<template>
    <el-tabs v-model='activeIndex' type="card" closable @tab-remove="removeTab" @tab-click="handleClick" style="flex-grow: 2">
      <el-tab-pane id="tab_home" label="首页" key="首页" name="management">
              <span slot="label" style="color: #ffffff;">
                <img class="lg-first-page" src="../../../assets/images/lg/lg-home.png" width="20px" height="20px">
              </span>
      </el-tab-pane>
      <el-tab-pane v-for="item in openTab"
                   :key="item.name"
                   :name="item.route">
      <span slot="label" :style="{ color: activeIndex === item.route ? '#ffffff' : '#ffffff' }">
        <i class="dot" :style="{ backgroundColor: activeIndex === item.route ? '#009789' : '#ffffff' }"></i>
        {{ item.name }}
      </span>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  name: 'HistoryComponent',
  data () {
    return {
    }
  },
  mounted () {
    if (this.$route.path !== '/' && this.$route.path !== '/management') {
      // this.$store.dispatch('app/add_tabs', { route: '/management', name: '首页' })
      this.$store.dispatch('app/add_tabs', { route: this.formatRoute(this.$route.path), name: this.$route.name })
      this.$store.dispatch('app/set_active_index', this.formatRoute(this.$route.path))
    } else {
      // this.$store.dispatch('app/add_tabs', { route: '/management', name: '首页' })
      this.$store.dispatch('app/set_active_index', this.formatRoute('/management'))
    }
  },
  computed: {
    openTab () {
      return this.$store.getters.tabs.openTab
    },
    activeIndex: {
      get () {
        return this.$store.getters.tabs.activeIndex
      },
      set (val) {
        this.$store.dispatch('app/set_active_index', val)
      }
    }
  },
  watch: {
    '$route' (to, from) {
      let flag = false
      for (const item of this.openTab) {
        if (item.name === to.name) {
          this.$store.dispatch('app/set_active_index', this.formatRoute(to.path))
          flag = true
          break
        }
      }
      if (!flag) {
        if (to.path !== '/management') {
          this.$store.dispatch('app/add_tabs', { route: this.formatRoute(to.path), name: to.name })
        }
        this.$store.dispatch('app/set_active_index', this.formatRoute(to.path))
      }
    }
  },
  methods: {
    handleClick (tab) {
      this.$router.push({ path: '/' + this.activeIndex })
    },
    removeTab (target) {
      if (target === this.formatRoute('/') || target === this.formatRoute('/management')) {
      } else {
        this.$store.dispatch('app/delete_tabs', target)
        if (this.activeIndex === target) {
          if (this.openTab) {
            if (this.openTab.length >= 1) {
              this.$store.dispatch('app/set_active_index', this.openTab[this.openTab.length - 1].route)
              this.$router.push({ path: '/' + this.activeIndex })
            }
            if (this.openTab.length === 0) {
              console.log(this.openTab.length)
              this.$store.dispatch('app/set_active_index', this.formatRoute('/management'))
              this.$router.push({ path: '/management' })
            }
          }
        }
      }
    },
    formatRoute (route) {
      return route.substr(1)
    }
  }
}
</script>

<style scoped lang="scss">
  .el-tabs__item .dot {
    content: "";
    width: 9px;
    height: 9px;
    margin-right: 8px;
    display: inline-block;
    border-radius: 50%;
    transition: background-color .2s;
  }
  .el-tabs__item .lg-first-page {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    top: 5px;
  }
</style>
