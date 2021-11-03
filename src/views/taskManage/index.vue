<template>
  <div class="lg-container">
    <el-row id='gl-top-content' :gutter="20" style="height: 100%">
      <el-col :xl="isExtend ? 0 : 6" :lg="isExtend ? 0 : 7" :md="isExtend ? 0 : 9" :sm="isExtend ? 0 : 12" :xs="isExtend ? 0 : 10" class="lg-left-panel">
          <el-scrollbar wrap-style="overflow-x: hidden!important;" class="lg-left-scrollbar">
            <div class="top-content">
              <div style="text-align: left;padding: 10px 10px 10px 10px;">
                <div style="display: flex;align-items: center;">
                  <img src="../../assets/images/lg/save_ac.png" width="20px" height="20px">
                  <span class="lg-title">历史任务</span>
                  <div  style="flex-grow: 2;"></div>
                  <el-date-picker type="month" v-model="formData.field102" format="yyyy-MM" value-format="yyyy-MM"
                                  placeholder="请选择月份" clearable></el-date-picker>
                </div>
                <el-divider></el-divider>
                <div style="padding: 10px 15px 0px 15px;">
                  <el-table :data="fileList" @cell-dblclick="cellDblClick" height="300px" :show-header="false" :row-style="{height: '40px'}" :cell-style="{padding: '0'}" fit highlight-current-row style="width: 100%;">
                    <el-table-column align="left" prop="name" min-width="100px" label="文件名称"></el-table-column>
                    <el-table-column align="center"  width="105px">
                      <template>
                        <el-button-group class="gl-view-button">
                          <el-button
                            size="mini"
                            plain>查看详情</el-button>
                        </el-button-group>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
            <div class="bottom-content">
              <div style="text-align: left;padding: 10px 10px 10px 10px;">
                <div style="display: flex;align-items: center;">
                  <img src="../../assets/images/lg/save_ac.png" width="20px" height="20px">
                  <span class="lg-title">任务详情</span>
                </div>
                <el-divider></el-divider>
                <div style="padding: 10px 15px 0px 15px;">
                  <el-descriptions :column="1" style="border-radius: 5px;">
                    <el-descriptions-item label="任务名">{{ description.taskName }}</el-descriptions-item>
                    <el-descriptions-item label="负责人">{{ description.principal }}</el-descriptions-item>
                    <el-descriptions-item label="工作组数量">{{ description.groupNum }}</el-descriptions-item>
                    <el-descriptions-item label="无人机数量">{{ description.droneNum }}</el-descriptions-item>
                    <el-descriptions-item label="电池数量">{{ description.batteryNum }}</el-descriptions-item>
                    <el-descriptions-item label="区域巡检总耗时">{{ description.inspectionTime }}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </div>
            </div>
          </el-scrollbar>
      </el-col>
      <el-col :xl="isExtend ? 24 : 18" :lg="isExtend ? 24 : 17" :md="isExtend ? 24 : 15" :sm="isExtend ? 24 : 12" :xs="isExtend ? 24 : 14" class="lg-right-panel">
        <MapView :h-bar="false" :retract-icon="false" :extend="true" :is-planning="false" style="height: 100%;width: 100%;border: 2px solid #f4f4f4; border-radius: 5px;overflow: hidden;"></MapView>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MapView from '@/components/MapView'
export default {
  name: 'TaskManagement',
  components: {
    MapView
  },
  data () {
    return {
      fileList: [
        {
          name: '历史任务1'
        },
        {
          name: '历史任务2'
        },
        {
          name: '历史任务3'
        },
        {
          name: '历史任务4'
        },
        {
          name: '历史任务5'
        },
        {
          name: '历史任务6'
        },
        {
          name: '历史任务7'
        },
        {
          name: '历史任务8'
        },
        {
          name: '历史任务9'
        },
        {
          name: '历史任务10'
        }
      ],
      formData: {
        field102: '2021-09'
      },
      description: {
        taskName: '历史任务',
        principal: '某某某',
        groupNum: '6',
        droneNum: '20',
        batteryNum: '15',
        inspectionTime: '8h'
      }
    }
  },
  computed: {
    isExtend () {
      return this.$store.getters.manage.extend
    }
  },
  methods: {
    cellDblClick (row, column, cell, event) {
      if (column.label === '文件名称') {
        console.log(row.name)
        console.log(column)
        this.description.taskName = row.name
      }
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
    .lg-right-panel {
      height: 100%;
      display: flex;
      flex-direction: column;
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
        }
        .bottom-content {
          flex-grow: 2;
          font-family: "微软雅黑";
          margin-top: calc(4.5%);
          border-radius: 5px;
          background-color: #ffffff;
          .el-divider--horizontal {
            margin: 10px 0;
          }
        }
        .lg-title {
          margin-left: 10px;
          font-family: "微软雅黑";
          font-size: 18px;
          font-weight: bold;
          color: #1d848b;
        }
      }
    }
  }
  .gl-view-button {
    .el-button {
      color: #1d848b;
      font-weight: bold;
      background-color: rgba(29, 132, 139, 0.30);
    }
  }
</style>
