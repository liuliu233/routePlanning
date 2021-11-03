<template>
  <div class="lg-container">
    <el-row :gutter="20" style="height: 100%">
      <el-col id="gl-planning-panel" :xl="isExtend ? 0 : 6" :lg="isExtend ? 0 : 8" :md="isExtend ? 0 : 12" :sm="24" :xs="24" class="lg-left-panel">
        <el-scrollbar wrap-style="overflow-x: hidden!important;" class="lg-left-scrollbar">
          <div class="top-content">
            <div style="text-align: left;padding: 0px 10px 10px 10px;">
              <el-tabs id="lg-planning-tab" v-model="activeName">
                <el-tab-pane label="新建任务" name="新建任务">
                  <span slot="label" class="lg-tab-item__title">
                    <img src="../../assets/images/lg/new.png" width="20px" height="20px" style="margin-right: 3px;">
                    新建任务
                  </span>
                  <el-form class="lg-planning__form" ref="elForm" v-model="formData" size="medium" label-width="80px">
                    <el-form-item label="任务名称" prop="taskName">
                      <el-input v-model="formData.taskName"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" prop="principal">
                      <el-input v-model="formData.principal"></el-input>
                    </el-form-item>
                    <el-form-item label="巡检区域" prop="region">
                      <div style="display: flex;align-items: center;">
                        <el-select v-model="formData.region" @focus="selectFocus" placeholder="请选择巡检区域" style="flex-grow: 5;">
                          <el-option
                            v-for="item in regionSelect"
                            :label="item.label"
                            :value="item.id"
                            :key="item.value"
                          ></el-option>
                        </el-select>
                        <el-tooltip effect="dark" content="导入巡检区域" placement="bottom" style="font-size: 14px;">
                          <img src="../../assets/images/lg/import2.png" width="24px" height="24px" style="margin: 0px 0px 0px 10px;" @click="handleImportTrackData">
                        </el-tooltip>
                        <el-tooltip effect="dark" content="选择网格单元" placement="top" style="font-size: 14px;">
                          <img src="../../assets/images/lg/select2.png" width="24px" height="24px" style="margin: 0px 0px 0px 10px;" @click="handleSelectGridUnit">
                        </el-tooltip>
                        <el-tooltip effect="dark" content="新建巡检区域" placement="right" style="font-size: 14px;">
                          <img src="../../assets/images/lg/new3.png" width="24px" height="24px" style="margin: 0px 10px;" @click="addRegion">
                        </el-tooltip>
                      </div>
                    </el-form-item>
                    <el-form-item label="巡检模式" class="lg-planning-radio-group">
                      <el-radio-group v-model="formData.model">
                        <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24" style="padding-left: 0px!important;">
                          <el-radio label="固定起降点"></el-radio>
                        </el-col>
                        <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                          <el-radio label="非固定起降点"></el-radio>
                        </el-col>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="最优目标">
                      <el-checkbox-group class="lg-planning-checkbox-group" v-model="formData.target">
                        <el-row style="margin-bottom: 0px!important;">
                          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24" >
                            <el-checkbox label="最小巡检时间" name="target" style="font-size: 14px!important;"></el-checkbox>
                          </el-col>
                          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24" >
                            <el-checkbox label="最大照片数量" name="target" style="font-size: 14px!important;"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row style="margin-bottom: 0px!important;">
                          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                            <el-checkbox label="人员安排最少" name="target" style="font-size: 14px!important;"></el-checkbox>
                          </el-col>
                          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
                            <el-checkbox label="无人机数最少" name="target" style="font-size: 14px!important;"></el-checkbox>
                          </el-col>
                        </el-row>
                      </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                      <div style="display: flex;justify-content: flex-end;">
                        <el-button style="background-color: #1d848b;color: #ffffff" @click="createTask">开 始</el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="配置参数" name="配置参数">
                  <span slot="label" class="lg-tab-item__title">
                    <img src="../../assets/images/lg/peizhi.png" width="20px" height="20px" style="margin-right: 3px;">
                    配置参数
                  </span>
                  <el-form class="lg-planning__form" ref="elForm" v-model="formData" size="medium" label-width="200px">
                    <el-form-item label="可提供人员数量(人)">
                      <el-input v-model="formData.personNum" placeholder="请输入单行文本单行文本"></el-input>
                    </el-form-item>
                    <el-form-item label="可提供无人机数量(架)">
                      <el-input v-model="formData.planeNum" placeholder="请输入单行文本单行文本"></el-input>
                    </el-form-item>
                    <el-form-item label="无人机配备电池数量(块/架)">
                      <el-input v-model="formData.batteryNum" placeholder="请输入单行文本单行文本"></el-input>
                    </el-form-item>
                    <el-form-item label="无人机电池续航时长(分钟)">
                      <el-input v-model="formData.batteryLife" placeholder="请输入单行文本单行文本"></el-input>
                    </el-form-item>
                    <el-form-item label="无人机垂直飞行速度(米/秒)">
                      <el-input v-model="formData.speedV" placeholder="请输入单行文本单行文本"></el-input>
                    </el-form-item>
                    <el-form-item label="无人机水平飞行速度(米/秒)">
                      <el-input v-model="formData.speedH" placeholder="请输入单行文本单行文本"></el-input>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="导入数据" name="导入数据">
                  <span slot="label" class="lg-tab-item__title">
                    <img src="../../assets/images/lg/data.png" width="20px" height="20px" style="margin-right: 3px;">
                    导入数据
                  </span>
                  <ImportData/>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="bottom-content">
            <div style="text-align: left;padding: 10px 10px 10px 10px;">
              <div style="display: flex;align-items: center;">
                <img src="../../assets/images/lg/detail.png" width="20px" height="20px">
                <span class="lg-title">巡检区域信息描述</span>
              </div>
              <el-divider></el-divider>
              <div style="padding: 10px 15px 0px 15px;">
                <el-descriptions :column="1" style="border-radius: 5px;color: #606266;">
                  <el-descriptions-item label="巡检区域名">{{ description.region }}</el-descriptions-item>
                  <el-descriptions-item label="输电杆塔数量">{{ description.tranNum }}</el-descriptions-item>
                  <el-descriptions-item label="配电杆塔数量">{{ description.distNum }}</el-descriptions-item>
                  <el-descriptions-item label="杆塔总数量">{{ description.channelNum }}</el-descriptions-item>
                  <el-descriptions-item label="设置时间">{{ description.timeSet }}</el-descriptions-item>
                </el-descriptions>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-col>
      <el-col :xl="isExtend ? 24 : isRPanel ? 12 : 18" :lg="isExtend ? 24 : isRPanel ? 10 : 16" :md="isExtend ? 24 : isRPanel ? 12 : 12" class="lg-middle-panel">
        <MapView ref="mapview" :content="'routeCompute'" :h-bar="showHBar" :retract-icon="true" :extend="true" :layer-group="true" :is-planning="true" style="height: 100%;border: 0px solid #f4f4f4; border-radius: 5px;overflow: hidden;"
                 @handleUpdateDescriptions="updateDescriptions"
                 @handleSelectRegion="setSelectRegion"></MapView>
      </el-col>
      <el-col :xl="isExtend ? 0 : isRPanel ? 6 : 0" :lg="isExtend ? 0 : isRPanel ? 6 : 0" :md="isExtend ? 0 : isRPanel ? 12 : 0" :sm="24" :xs="24" class="lg-right-panel">
        <el-scrollbar wrap-style="overflow-x: hidden!important;" class="lg-left-scrollbar">
          <div class="top-content">
            <div style="text-align: left;padding: 10px 10px 10px 10px;">
              <div style="display: flex;align-items: center;">
                <img src="../../assets/images/lg/resource1.png" width="20px" height="20px">
                <span class="lg-title">资源配置</span>
                <div style="flex-grow: 2;"></div>
                <img src="../../assets/images/lg/edit.png" width="20px" height="20px" style="margin-right: 10px;" @click="handleAdjustResource">
              </div>
              <el-divider></el-divider>
              <div style="padding: 10px 15px 0px 15px;">
                <el-table :data="fileList" height="300px" :show-header="true" :row-style="{height: '40px'}" :cell-style="{padding: '0'}" fit highlight-current-row style="width: 100%;">
                  <el-table-column align="left" prop="groupId" min-width="80px" label="组别"></el-table-column>
                  <el-table-column align="left" prop="drones" min-width="80px" label="无人机数"></el-table-column>
                  <el-table-column align="left" prop="batteries" min-width="80px" label="电池数"></el-table-column>
                  <el-table-column align="left" prop="days" min-width="80px" label="天数"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
    <el-dialog
      title="巡检区域设置"
      :visible.sync="adjustResDialog"
      width="20%"
      class="lg-dialog"
      :before-close="handleAdjustResourceClose">
      <el-form label-position="left" align="center" ref="userForm" size="medium" label-width="160px" :model="adjustResInfo">
        <el-form-item label="临时人员数量(人)">
          <el-input v-model="adjustResInfo.personNum" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="临时无人机数量(架)">
          <el-input v-model="adjustResInfo.planeNum" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="临时电池总数量(块)">
          <el-input v-model="adjustResInfo.batteryNum" placeholder="请输入数量"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" style="background: #1d848b" type="primary" @click="updateTaskInfo">更 新</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MapView from '@/components/MapView'
import ImportData from '@/views/planning/importdata'
import axios from 'axios'
export default {
  name: 'TaskPlanning',
  components: {
    MapView,
    ImportData
  },
  data () {
    return {
      fileList: [
        {
          groupId: '1',
          drones: '1',
          batteries: '1',
          days: '1'
        },
        {
          groupId: '2',
          drones: '2',
          batteries: '2',
          days: '2'
        },
        {
          groupId: '3',
          drones: '3',
          batteries: '3',
          days: '3'
        },
        {
          groupId: '4',
          drones: '4',
          batteries: '4',
          days: '4'
        },
        {
          groupId: '5',
          drones: '5',
          batteries: '5',
          days: '5'
        },
        {
          groupId: '6',
          drones: '6',
          batteries: '6',
          days: '6'
        },
        {
          groupId: '7',
          drones: '7',
          batteries: '7',
          days: '7'
        },
        {
          groupId: '8',
          drones: '8',
          batteries: '8',
          days: '8'
        },
        {
          groupId: '9',
          drones: '9',
          batteries: '9',
          days: '9'
        },
        {
          groupId: '10',
          drones: '10',
          batteries: '10',
          days: '10'
        }
      ],
      formData: {
        taskName: '',
        principal: '',
        model: '固定起降点',
        region: '',
        regionData: [],
        target: ['最小巡检时间'],
        personNum: 14,
        planeNum: 14,
        batteryNum: 15,
        batteryLife: 20,
        speedV: 3,
        speedH: 5
      },
      regionSelect: [],
      activeName: '新建任务',
      showHBar: false,
      description: {
        region: '',
        tranNum: '',
        distNum: '',
        channelNum: '',
        timeSet: ''
      },
      adjustResDialog: false,
      adjustResInfo: {
        personNum: 14,
        planeNum: 14,
        batteryNum: 15
      },
      blSelectGridUnit: false
    }
  },
  computed: {
    isExtend () {
      return this.$store.getters.planning.extend
    },
    isRPanel () {
      return this.$store.getters.planning.rightPanel
    }
  },
  created: function () {
  },
  methods: {
    createTask () {
      // eslint-disable-next-line no-unused-vars
      this.$refs.mapview.visualizePlannedRoute()
      // this.$refs.mapview.animate([120.09096831702661, 33.04075157629398], 13, 500)
    },
    // 更新
    updateDescriptions (data) {
      this.description.region = data.region
      this.description.tranNum = data.tranNum
      this.description.distNum = data.distNum
      this.description.channelNum = data.channelNum
      this.description.timeSet = data.timeSet
    },
    // 算法结束后微调对话框关闭函数
    handleAdjustResource () {
      this.adjustResDialog = true
    },
    // 算法结束后微调对话框
    updateTaskInfo () {
      this.adjustResDialog = false
    },
    // 算法结束后微调对话框关闭函数
    handleAdjustResourceClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 导入航迹数据
    handleImportTrackData () {
      // axios.get('http://localhost:8738/testApi/hello').then(response => (console.log(response.data))).catch(error => console.log(error))
      axios({
        method: 'get',
        url: 'http://localhost:8736/algorithm/testApi/hello',
        responseType: 'json',
        headers: { Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZ2oiLCJzY29wZSI6WyJhbGwiXSwiZXhwIjoxNjMzNzI2OTkxLCJhdXRob3JpdGllcyI6WyJVU0VSIl0sImp0aSI6ImIzZTllMTMxLTRiZDctNGVlOC04NTYzLTdlMWNiNmM4OTQ3NCIsInVzZXJpbmZvIjoie1wiaWRcIjozLFwidXNlcmNvZGVcIjpcIlwifSIsImNsaWVudF9pZCI6ImFsZ29yaXRobS1jbGllbnQifQ.TVFC9v8LAtd-XWFapmXWbvZoaLL5RLxQkT_YnaKfPT495tWPLAsCKSLJsH3KQU4hFkX4W5GucY-30Q36iyCoLIs0zY7HJcNdY2z0bb0CCNkXQ4YQfueLoeCPmZATfQKw957YHCzUi3lCNEAybuv-eOy0Mgx9_EVvVk9B4cLnQjoIJURyrhBtIK5xB9ygAC29seWdvUI76_rdPFBxVuDHL_1GVlLPNOV0aYwW9_E9_TOzGhE2IZbceJJexL3vaIWIjLebidmFIUgDQ02dU46pDFvBZYus9fx6suUmVlqQbIsC8b7N5dXMq3Ny52fWVI2jC9bmMoQ0klGulm18OWkkHg' }
      }).then(res => {
        console.log(res)
      })
    },
    // 选择巡检网格单元
    handleSelectGridUnit () {
      if (!this.blSelectGridUnit) {
        this.$refs.mapview.selectGridUnit(true)
        this.blSelectGridUnit = true
      } else {
        this.$refs.mapview.selectGridUnit(false)
        this.blSelectGridUnit = false
      }
    },
    // 创建巡检区域
    addRegion () {
      this.showHBar = !this.showHBar
    },
    // 点击select框时被触发的方法
    selectFocus () {
      axios.get('regionSelect.json', {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        const data = res.data
        this.regionSelect = [].concat(data)
      })
    },
    // 设置当前巡检区域
    setSelectRegion (data) {
      this.formData.region = data.region
      this.formData.regionData = data.regionData
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
    .lg-right-panel {
      height: 100%;
      .lg-left-scrollbar {
        height: 100%;
        .top-content {
          height: 100%;
          font-family: "微软雅黑";
          border-radius: 5px;
          background-color: #ffffff;
          .el-divider--horizontal {
            margin: 6px 0;
            background-color: #E4E7ED;
            height: 2px;
          }
          .lg-tab-item__title {
            font-size: 18px;
            font-family: "微软雅黑";
            font-weight: bold;
            color: #1d848b;
            display: flex;
            align-items: center;
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
