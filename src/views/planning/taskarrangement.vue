<template>
  <div class="lg-container">
    <MapView ref="mapview" :content="'taskPlan'" :h-bar="false" :retract-icon="false" :layer-group="true" :extend="false" :navigation="true" style="height: 100%;border: 0px solid #f4f4f4; border-radius: 5px;overflow: hidden;"></MapView>
<!--    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="background-color: #1d848b;color: #ffffff"></el-tree>-->
  </div>
<!--  -->
</template>

<script>
import MapView from '@/components/MapView'
export default {
  name: 'TaskArrangement',
  components: {
    MapView
  },
  mounted () {
    this.initTaskArr()
  },
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    initTaskArr () {
      this.$refs.mapview.visualizeTaskArrangement()
    }
  }
}
</script>

<style scoped lang="scss">
  .lg-container {
    margin: 20px;
    position: relative;
    height: calc(100% - 40px);
    overflow: hidden;
    .lg-middle-panel {
      height: 100%;
    }
    .lg-left-panel {
      height: 100%;
      .lg-left-scrollbar {
        height: 100%;
        .top-content {
          font-family: "微软雅黑";
          border-radius: 5px;
          background-color: #ffffff;
          .el-divider--horizontal {
            margin: 6px 0;
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
        .bottom-content {
          flex-grow: 5;
          font-family: "微软雅黑";
          margin-top: calc(4.5%);
          border-radius: 5px;
          background-color: #ffffff;
          .el-divider--horizontal {
            margin: 6px 0;
            background-color: #E4E7ED;
            height: 2px;
          }
        }
      }
      .lg-title {
        margin-left: 3px;
        font-family: "微软雅黑";
        font-size: 18px;
        font-weight: bold;
        color: #1d848b;
      }
    }
  }
</style>
