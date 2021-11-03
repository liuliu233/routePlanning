<template>
  <div style="width: 100%;height: 100%">
    <div id="map" class="map">
      <div class="lg-v-bar">
        <div @click="handleClickVBarItem(0)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../assets/images/lg/yx_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../assets/images/lg/yx_ac.png') + ') center no-repeat' }"></div>
        <div v-show="layerGroup" class="lg-popup">
          <div @click="handleClickVBarItem(1)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../assets/images/lg/pingmian_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../assets/images/lg/pingmian_ac.png') + ') center no-repeat'}"></div>
          <div class="lg-popup-item lg-task-tree" :style="{ '--visibility': isImgGroup ? 'visible' : 'hidden' }">
            <div style="color: #ffffff;font-size: 18px;font-weight: bold;text-align: left;">任务列表</div>
            <el-scrollbar wrap-style="overflow-x: hidden!important;" style="height: 250px;top: 10px;border-image:linear-gradient(to right,#000718,#23b7cb) 5 5!important;">
              <el-tree :data="taskData" :props="defaultProps" :highlight-current=true @node-click="handleNodeClick" style="background-color: #1d848b;color: #ffffff"></el-tree>
            </el-scrollbar>
          </div>
        </div>
        <div @click="handleClickVBarItem(2)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../assets/images/lg/zoomin_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../assets/images/lg/zoomin_ac.png') + ') center no-repeat'}"></div>
        <div @click="handleClickVBarItem(3)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../assets/images/lg/zoomout_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../assets/images/lg/zoomout_ac.png') + ') center no-repeat'}"></div>
        <div v-show="extend" @click="handleClickVBarItem(4)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../assets/images/lg/extend_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../assets/images/lg/extend_ac.png') + ') center no-repeat'}"></div>
        <div v-show="taskArrange" @click="handleClickVBarItem(5)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../assets/images/lg/resource1_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../assets/images/lg/resource1.png') + ') center no-repeat'}"></div>
        <div v-show="navigation" @click="handleClickVBarItem(6)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../assets/images/lg/routePlan_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../assets/images/lg/routePlan_ac.png') + ') center no-repeat'}"></div>
      </div>
      <div class="lg-h-bar" v-show="hBar">
        <img @click="handleClickHBarItem(1)" class="lg-h-bar-item" :src="hBarItem === 'hBarItem1' ? require('../assets/images/lg/select_ac.png') : require('../assets/images/lg/select_h.png')">
        <img @click="handleClickHBarItem(2)" class="lg-h-bar-item" :src="hBarItem === 'hBarItem2' ? require('../assets/images/lg/polygon_ac.png') : require('../assets/images/lg/polygon_h.png')">
        <img @click="handleClickHBarItem(3)" class="lg-h-bar-item" :src="hBarItem === 'hBarItem3' ? require('../assets/images/lg/round_ac.png') : require('../assets/images/lg/round_h.png')">
        <img @click="handleClickHBarItem(4)" class="lg-h-bar-item" :src="hBarItem === 'hBarItem4' ? require('../assets/images/lg/edit_ac.png') : require('../assets/images/lg/edit_h.png')">
        <img @click="handleClickHBarItem(5)" class="lg-h-bar-item" :src="hBarItem === 'hBarItem5' ? require('../assets/images/lg/clear_ac.png') : require('../assets/images/lg/clear_h.png')">
        <img @click="handleClickHBarItem(6)" class="lg-h-bar-item" :src="hBarItem === 'hBarItem6' ? require('../assets/images/lg/save_ac.png') : require('../assets/images/lg/save_h.png')">
      </div>
      <div v-show="retractIcon" class="lg-retract-icon" @click="handleRetractRightPanel">
        <div id="gl-retract-icon" v-show="isRPanel"><i class="el-icon-arrow-right lg-icon"></i></div>
        <div id="gl-retract-icon-recovery" v-show="!isRPanel"><i class="el-icon-arrow-left lg-icon"></i></div>
      </div>
    </div>
    <div ref="popup" class="ol-popup">
      <div ref="popupCont" style="text-align: center;">
        <el-descriptions :column="1" size="medium" border>
          <el-descriptions-item label="杆塔数量" :label-style="{ 'background': '#E1F3D8' }" :content-style="{ 'background': '#FDE2E2' }">{{ popupContent }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <el-dialog
      title="巡检区域设置"
      :visible.sync="dialogVisible"
      width="20%"
      class="lg-dialog"
      :before-close="handleClose">
      <el-form label-position="left" align="center" ref="userForm" :model="regionInfo">
        <el-form-item label="巡检区域名" label-width="100px" prop="username">
          <el-input v-model="regionInfo.regionName"></el-input>
        </el-form-item>
        <el-form-item label="输电杆塔数量" label-width="100px" prop="username">
          <el-input disabled="disabled" v-model="regionInfo.tranNum"></el-input>
        </el-form-item>
        <el-form-item label="配电杆塔数量" label-width="100px" prop="username">
          <el-input disabled="disabled" v-model="regionInfo.distNum"></el-input>
        </el-form-item>
        <el-form-item label="杆塔总数量" label-width="100px" prop="username">
          <el-input disabled="disabled" v-model="regionInfo.channelNum"></el-input>
        </el-form-item>
        <el-form-item label="设置时间" label-width="100px" prop="username">
          <el-input disabled="disabled" v-model="regionInfo.timeSet"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" style="background: #1d848b" type="primary" @click="handleSaveRegionInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import View from 'ol/View'
// eslint-disable-next-line no-unused-vars
import { Circle as CircleStyle, Text as TextStyle, Fill, Stroke, Style, Icon } from 'ol/style'
import { Draw, Modify, Select } from 'ol/interaction'
import { defaults } from 'ol/control'
import { get } from 'ol/proj'
import WKT from 'ol/format/WKT'
import Overlay from 'ol/Overlay'
import { singleClick } from 'ol/events/condition'
import * as olExtent from 'ol/extent'
import { getArea } from 'ol/sphere'
// eslint-disable-next-line no-unused-vars
import { Point, LineString, Circle } from 'ol/geom'
import Polygon, { fromCircle } from 'ol/geom/Polygon'
// eslint-disable-next-line no-unused-vars
import GeoJSON from 'ol/format/GeoJSON'
import axios from 'axios'
// import MultiPoint from 'ol/geom/MultiPoint'
// import LineString from 'ol/geom/LineString'
// eslint-disable-next-line no-unused-vars
import { bbox } from 'ol/loadingstrategy'
// eslint-disable-next-line no-unused-vars
import Feature from 'ol/Feature'
import { getVectorContext } from 'ol/render'
// eslint-disable-next-line no-unused-vars
import turf from 'turf'
// eslint-disable-next-line no-unused-vars
import Qs from 'qs'

let map = null
let isImageMap = true
const source = new VectorSource()
const format = new WKT()
let editLayer = null
let draw, select, modify, modifySelect
let overlay = null
// 航迹规划结果可视化图层
let routeLayer = null
// 输配电杆塔图层
let towerLayer = null
// 起降点图层
let takeOffLayer = null
// 任务规划图层
let taskPlanOutlineLayer = null
let taskPlanPointLayer = null
let taskPlanLayer = null
// 历史任务可视化图层
let taskLayer = null
// 行政区划图层
let divisionsLayer = null
// 无人机网格化巡检单元
let gridUnitLayer = null
// 路线规划图层（中，底，上）
let routePlanLayer = null
let routePlanLayer2 = null
let routePlanLayer3 = null
// 规划结果可视化
let inspectSelect = null
// 无人机网格化巡检单元可视化
let gridUnitSelect = null

const colorBar = []
let globalStyle = true

export default {
  name: 'MapView',
  props: {
    content: {
      defaults: 'routeCompute',
      type: String
    },
    hBar: {
      defaults: false,
      type: Boolean
    },
    retractIcon: {
      defaults: false,
      type: Boolean
    },
    extend: {
      defaults: false,
      type: Boolean
    },
    layerGroup: {
      type: Boolean,
      defaults: false
    },
    taskArrange: {
      type: Boolean,
      defaults: false
    },
    navigation: {
      type: Boolean,
      defaults: false
    },
    isPlanning: {
      type: Boolean,
      defaults: true
    }
  },
  mounted () {
    this.popup = this.$refs.popup
    this.initMap()
    this.initAdminDivisions()
    this.initGridUnits()
    this.observer()
  },
  data () {
    return {
      isImgGroup: false,
      hBarItem: '',
      popupContent: '未知',
      dialogVisible: false,
      regionInfo: {
        regionName: '',
        tranNum: '',
        distNum: '',
        channelNum: '',
        timeSet: '',
        regionData: []
      },
      taskData: [{
        label: '第一天',
        children: []
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 运动轨迹开关
      animating: false,
      animatingId: -1,
      // 当前时间
      lastTime: null,
      // 运行速度
      speed: null,
      // 虚拟距离
      distance: 0,
      // 实际距离
      realDistance: 0,
      routePlanStyles: {
        startMarker: new Style({
          image: new Icon({
            anchor: [0.5, 135],
            anchorOrigin: 'top-right',
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            offset: [0, 10],
            scale: 0.25,
            src: require('../assets/images/lg/startPoint.png')
          })
        }),
        throughMarker: new Style({
          image: new Icon({
            anchor: [0.5, 135],
            anchorOrigin: 'top-right',
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            offset: [0, 10],
            scale: 0.25,
            src: require('../assets/images/lg/throughPoint.png')
          })
        }),
        endMarker: new Style({
          image: new Icon({
            anchor: [0.5, 135],
            anchorOrigin: 'top-right',
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            offset: [0, 10],
            scale: 0.25,
            src: require('../assets/images/lg/endPoint.png')
          })
        })
      },
      // 当前选中的tree节点
      currentFeatures: {
        id: -1,
        geometry: [],
        lineStyle: null,
        pointStyle: null
      },
      // 是否执行路径规划
      blRoutePlan: false
    }
  },
  computed: {
    isRPanel () {
      return this.$store.getters.planning.rightPanel
    }
  },
  watch: {
  },
  methods: {
    initMap () {
      for (let i = 0; i < 120; i++) {
        let hex = Math.floor(Math.random() * 16777216).toString(16)
        while (hex < 6) {
          hex = '0' + hex
        }
        colorBar.push('#' + hex)
      }

      overlay = new Overlay({
        element: this.popup,
        autoPan: false,
        autoPaneAnimation: {
          duration: 10
        }
      })
      map = new Map({
        layers: [
          new TileLayer({
            name: 'tileLayer',
            title: '天地图',
            source: new XYZ({
              // 高德影像图：http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}
              url: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
              wrapX: false
            }),
            projection: get('EPSG:4326')
          })
          // ,
          // new TileLayer({
          //   name: 'tileMark',
          //   title: '标注图层',
          //   source: new XYZ({
          //     url: 'http://t3.tianditu.com/DataServer?T=cva_w&tk=f9073387fa813aada14286a99166bb2c&x={x}&y={y}&l={z}',
          //     wrapX: false
          //   }),
          //   projection: get('EPSG:4326')
          // })
        ],
        overlays: [overlay],
        target: 'map',
        controls: defaults({
          attribution: false,
          zoom: false
        }),
        view: new View({
          center: [119.9779123, 33.0785188],
          projection: get('EPSG:4326'),
          zoom: 9,
          minZoom: 2,
          maxZoom: 20
        })
      })
      editLayer = new VectorLayer({
        name: 'Editlayer',
        source: source,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
            color: '#1d848b',
            width: 2
          })
        })
      })
      map.addLayer(editLayer)
      modifySelect = new Select({
        multi: false,
        condition: singleClick,
        layers: [editLayer]
      })
      select = new Select({
        multi: false,
        condition: singleClick,
        layers: [editLayer]
      })
      select.on('select', this.selectPopupEvent)
      // 兴化市行政区划
      gridUnitLayer = new VectorLayer({
        name: 'GridUnitLayer',
        source: new VectorSource(),
        style: new Style({
          stroke: new Stroke({
            color: '#7bb1f3',
            width: 3
          }),
          fill: new Fill({
            color: 'rgba(128,128,252,0)'
          })
        })
      })
      // 兴化市行政区划
      divisionsLayer = new VectorLayer({
        name: 'DivisionsLayer',
        source: new VectorSource(),
        style: function (feature) {
          // const divisionName = feature.get('name')
          return new Style({
            stroke: new Stroke({
              color: '#7bb1f3',
              width: 1
            }),
            fill: new Fill({
              color: 'rgba(124,197,246,0.05)'
            })
            // text: new TextStyle({
            //   textAlign: 'center',
            //   textBaseline: 'bottom',
            //   offsetY: 0,
            //   font: 'bold 12px 微软雅黑',
            //   text: divisionName,
            //   fill: new Fill({
            //     color: '#f3f6f6'
            //   })
            // })
          })
        }
      })
      map.addLayer(divisionsLayer)
      map.addLayer(gridUnitLayer)
      gridUnitSelect = new Select({
        multi: false,
        condition: singleClick,
        layers: [gridUnitLayer]
      })
      gridUnitSelect.on('select', this.selectGridUnitEvent)
      // 航迹图层
      routeLayer = new VectorLayer({
        name: 'RouteLayer',
        source: new VectorSource()
      })
      inspectSelect = new Select({
        multi: false,
        condition: singleClick,
        layers: [routeLayer],
        style: new Style({
          stroke: new Stroke({
            color: '#059bf6',
            width: 3
          })
        })
      })
      map.addInteraction(inspectSelect)
      map.addLayer(routeLayer)
      // 杆塔图层
      towerLayer = new VectorLayer({
        name: 'TowerLayer',
        source: new VectorSource(),
        style: function (feature) {
          return new Style({
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({ color: '#8b1d1d' })
            }),
            text: new TextStyle({
              textAlign: 'center',
              textBaseline: 'bottom',
              offsetY: -10,
              font: 'bold 12px 微软雅黑',
              text: '杆塔信息',
              fill: new Fill({
                color: '#1d848b'
              })
            })
          })
        },
        minZoom: 17
      })
      map.addLayer(towerLayer)
      // 起降点图层
      takeOffLayer = new VectorLayer({
        name: 'TowerLayer',
        source: new VectorSource(),
        style: this.styleTaskArr,
        minZoom: 15
      })
      map.addLayer(takeOffLayer)
      // 任务规划图层
      taskPlanOutlineLayer = new VectorLayer({
        name: 'TowerLayer',
        source: new VectorSource(),
        style: new Style({
          stroke: new Stroke({
            color: '#034d52',
            width: 2
          })
        }),
        maxZoom: 13
      })
      taskPlanPointLayer = new VectorLayer({
        name: 'TowerLayer',
        source: new VectorSource(),
        style: this.styleTaskPlan,
        minZoom: 13
      })
      taskPlanLayer = new VectorLayer({
        name: 'TowerLayer',
        source: new VectorSource(),
        style: this.styleTaskPlan,
        minZoom: 13
      })
      map.addLayer(taskPlanOutlineLayer)
      map.addLayer(taskPlanPointLayer)
      map.addLayer(taskPlanLayer)
      // 历史任务图层
      taskLayer = new VectorLayer({
        name: 'TaskLayer',
        style: new Style({
          stroke: new Stroke({
            color: '#1d848b',
            width: 2
          })
        })
      })
      map.addLayer(taskLayer)
      // 路径规划图层（底层）
      routePlanLayer2 = new VectorLayer({
        name: 'RoutePlanLayer2',
        source: new VectorSource(),
        style: new Style({
          stroke: new Stroke({
            color: '#ffffff',
            width: 10
          })
        })
      })
      // map.addLayer(routePlanLayer2)
      // 路径规划图层（中层）
      routePlanLayer = new VectorLayer({
        name: 'RoutePlanLayer',
        source: new VectorSource(),
        style: this.styleRoutePlan
      })
      // map.addLayer(routePlanLayer)
      // 路径规划图层（上层）
      routePlanLayer3 = new VectorLayer({
        name: 'RoutePlanLayer3',
        source: new VectorSource(),
        style: this.styleRoutePlan3
      })
      // map.addLayer(routePlanLayer3)
      map.on('moveend', this.handleMoveEnd)
    },
    initAdminDivisions () {
      axios.get('divisions.json').then(res => {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
          const polygonData = JSON.parse(data[i].area_points)
          const divisionName = data[i].area_name
          const divisionId = data[i].area_id

          const feature = new Feature({
            geometry: new Polygon([polygonData]),
            id: divisionId,
            name: divisionName
          })
          divisionsLayer.getSource().addFeature(feature)
        }
      }).catch(error => console.log(error))
    },
    initGridUnits () {
      axios.get('gridunits.json').then(res => {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
          const gridUnitData = JSON.parse(data[i].grid_points)
          const gridUnitId = data[i].grid_unit
          const feature = new Feature({
            geometry: new Polygon(gridUnitData),
            id: gridUnitId
          })
          gridUnitLayer.getSource().addFeature(feature)
        }
      }).catch(error => console.log(error))
    },
    // 常规style风格函数
    styleFunction (feature, resolution) {
      const styles = []
      // const lineColor = colorBar[feature.values_.group]
      const lineColor = '#4cf6f8'
      const geometryArr = feature.getGeometry().getGeometries()
      for (let g = 0, len = geometryArr.length; g < len; g++) {
        if (geometryArr[g].getType() !== 'LineString') {
          if (geometryArr[g].getType() === 'MultiPoint') {
            // styles.push(
            //   new Style({
            //     geometry: geometryArr[g],
            //     image: new CircleStyle({
            //       radius: 2,
            //       fill: new Fill({ color: '#1d848b' })
            //     })
            //   })
            // )
          }
          if (geometryArr[g].getType() === 'Point') {
            // styles.push(
            //   new Style({
            //     geometry: geometryArr[g],
            //     image: new CircleStyle({
            //       radius: 5,
            //       fill: new Fill({ color: '#f50b0b' })
            //     })
            //   })
            // )
          }
        } else {
          // const length = geometryArr[g].getLength()
          // const step = 50
          // const geoStep = step * resolution
          // const arrowNum = Math.floor(length / geoStep)
          // const rotations = []
          // const distances = [0]
          // geometryArr[g].forEachSegment(function (start, end) {
          //   const dx = end[0] - start[0]
          //   const dy = end[1] - start[1]
          //   const rotation = Math.atan2(dy, dx)
          //   distances.unshift(Math.sqrt(dx ** 2 + dy ** 2) + distances[0])
          //   rotations.push(rotation)
          //   // 利用之前计算得到的线段矢量信息，生成对应的点样式塞入默认样式中
          //   // 从而绘制内部箭头
          //   for (let i = 1; i < arrowNum - 1; ++i) {
          //     const arrowCoord = geometryArr[g].getCoordinateAt(i * 1.0 / arrowNum)
          //     const d = i * geoStep
          //     const grid = distances.findIndex(x => x <= d)
          //
          //     styles.push(
          //       new Style({
          //         geometry: new Point(arrowCoord),
          //         image: new Icon({
          //           src: require('../assets/arrow-icon2.png'),
          //           anchor: [0.5, 0.5],
          //           rotateWithView: true,
          //           rotation: -rotations[distances.length - grid - 1],
          //           scale: 0.045
          //         })
          //       })
          //     )
          //   }
          // })
          styles.push(
            // linestring
            new Style({
              geometry: geometryArr[g],
              stroke: new Stroke({
                color: lineColor,
                width: 1
              })
            })
          )
        }
      }
      return styles
    },
    // 任务分配：style风格函数
    styleTaskArr (feature, resolution) {
      const styles = []
      const lineColor = '#059e41'
      const geometryArr = feature.getGeometry().getGeometries()
      for (let g = 0, len = geometryArr.length; g < len; g++) {
        if (geometryArr[g].getType() !== 'LineString') {
          if (geometryArr[g].getType() === 'MultiPoint') {
            styles.push(
              new Style({
                geometry: geometryArr[g],
                // image: new CircleStyle({
                //   radius: 5,
                //   fill: new Fill({ color: '#8b1d1d' })
                // }),
                image: new Icon({
                  src: require('../assets/images/lg/people.png'),
                  anchor: [0.5, 0.5],
                  rotateWithView: true,
                  scale: 0.145
                })
              })
            )
          }
          if (geometryArr[g].getType() === 'Point') {
            console.log('This is point!')
            styles.push(
              new Style({
                geometry: geometryArr[g],
                image: new Icon({
                  src: require('../assets/images/lg/people.png'),
                  anchor: [0.5, 0.5],
                  rotateWithView: true,
                  scale: 0.145
                })
              })
            )
          }
        } else {
          const length = geometryArr[g].getLength()
          const step = 60
          const geoStep = step * resolution
          const arrowNum = Math.floor(length / geoStep)
          const rotations = []
          const distances = [0]
          geometryArr[g].forEachSegment(function (start, end) {
            const dx = end[0] - start[0]
            const dy = end[1] - start[1]
            const rotation = Math.atan2(dy, dx)
            distances.unshift(Math.sqrt(dx ** 2 + dy ** 2) + distances[0])
            rotations.push(rotation)
            // 利用之前计算得到的线段矢量信息，生成对应的点样式塞入默认样式中
            // 从而绘制内部箭头
            for (let i = 1; i < arrowNum - 1; ++i) {
              const arrowCoord = geometryArr[g].getCoordinateAt(i * 1.0 / arrowNum)
              const d = i * geoStep
              const grid = distances.findIndex(x => x <= d)

              styles.push(
                new Style({
                  geometry: new Point(arrowCoord),
                  image: new Icon({
                    src: require('../assets/arrow-icon2.png'),
                    anchor: [0.5, 0.5],
                    rotateWithView: true,
                    rotation: -rotations[distances.length - grid - 1],
                    scale: 0.045
                  })
                })
              )
            }
          })
          styles.push(
            // linestring
            new Style({
              geometry: geometryArr[g],
              stroke: new Stroke({
                color: lineColor,
                width: 7
              })
            })
          )
        }
      }
      return styles
    },
    // 任务规划：style风格函数
    styleTaskPlan (feature, resolution) {
      const styles = []
      const lineColor = '#059e41'
      const geometryArr = feature.getGeometry().getGeometries()
      for (let g = 0, len = geometryArr.length; g < len; g++) {
        if (geometryArr[g].getType() !== 'LineString') {
          if (geometryArr[g].getType() === 'MultiPoint') {
            styles.push(
              new Style({
                geometry: geometryArr[g],
                image: new Icon({
                  src: require('../assets/images/lg/people2.png'),
                  anchor: [0.5, 0.5],
                  rotateWithView: true,
                  anchorOrigin: 'bottom-left',
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                  offset: [0, 0],
                  scale: 0.15
                })
              })
            )
          }
        } else {
          const length = geometryArr[g].getLength()
          const step = 60
          const geoStep = step * resolution
          const arrowNum = Math.floor(length / geoStep)
          const rotations = []
          const distances = [0]
          geometryArr[g].forEachSegment(function (start, end) {
            const dx = end[0] - start[0]
            const dy = end[1] - start[1]
            const rotation = Math.atan2(dy, dx)
            distances.unshift(Math.sqrt(dx ** 2 + dy ** 2) + distances[0])
            rotations.push(rotation)
            // 利用之前计算得到的线段矢量信息，生成对应的点样式塞入默认样式中
            // 从而绘制内部箭头
            for (let i = 1; i < arrowNum - 1; ++i) {
              const arrowCoord = geometryArr[g].getCoordinateAt(i * 1.0 / arrowNum)
              const d = i * geoStep
              const grid = distances.findIndex(x => x <= d)

              styles.push(
                new Style({
                  geometry: new Point(arrowCoord),
                  image: new Icon({
                    src: require('../assets/arrow-icon2.png'),
                    anchor: [0.5, 0.5],
                    rotateWithView: true,
                    rotation: -rotations[distances.length - grid - 1],
                    scale: 0.045
                  })
                })
              )
            }
          })
          styles.push(
            // linestring
            new Style({
              geometry: geometryArr[g],
              stroke: new Stroke({
                color: lineColor,
                width: 7
              })
            })
          )
        }
      }
      return styles
    },
    // 路径规划
    styleRoutePlan (feature, resolution) {
      const status = feature.get('status')

      let _color = '#07cdf6'
      if (status === '拥堵') _color = '#e20000'
      else if (status === '缓行') _color = '#ff7324'
      else if (status === '畅通') _color = '#00b514'

      return new Style({
        geometry: feature.getGeometry(),
        stroke: new Stroke({
          color: _color,
          width: 7
        })
      })
    },
    styleRoutePlan3 (feature, resolution) {
      const styles = []
      const geometry = feature.getGeometry()
      const length = geometry.getLength()
      const step = 50
      const geoStep = step * resolution
      const arrowNum = Math.floor(length / geoStep)
      const rotations = []
      const distances = [0]
      geometry.forEachSegment(function (start, end) {
        const dx = end[0] - start[0]
        const dy = end[1] - start[1]
        const rotation = Math.atan2(dy, dx)
        distances.unshift(Math.sqrt(dx ** 2 + dy ** 2) + distances[0])
        rotations.push(rotation)
        // 利用之前计算得到的线段矢量信息，生成对应的点样式塞入默认样式中
        // 从而绘制内部箭头
        for (let i = 1; i < arrowNum - 1; ++i) {
          const arrowCoord = geometry.getCoordinateAt(i * 1.0 / arrowNum)
          const d = i * geoStep
          const grid = distances.findIndex(x => x <= d)
          console.log(arrowCoord)

          styles.push(
            new Style({
              geometry: new Point(arrowCoord),
              image: new Icon({
                src: require('../assets/arrow-icon2.png'),
                anchor: [0.5, 0.5],
                rotateWithView: true,
                rotation: -rotations[distances.length - grid - 1],
                scale: 0.045
              })
            })
          )
        }
      })
      return styles
    },
    handleMoveEnd (e) {
    },
    selectPopupEvent (e) {
      const features = e.target.getFeatures().getArray()
      if (features.length > 0) {
        const feature = features[0]
        const center = olExtent.getCenter(feature.getGeometry().getExtent())
        this.popupContent = '1380'
        overlay.setPosition(center)
      } else {
        overlay.setPosition(undefined)
      }
    },
    selectGridUnitEvent (e) {
      const features = e.target.getFeatures().getArray()
      if (features.length > 0) {
        const feature = features[0]
        this.$emit('handleSelectRegion', {
          region: feature.get('id'),
          regionData: JSON.stringify(format.writeFeature(feature))
        })
      }
    },
    startDraw (e) {
      if (source.getFeatures().length > 0) {
        this.$confirm('已选择巡检区域')
        draw.removeLastPoint()
      }
    },
    // 监听宽度变化更新地图，否则地图侧边会留下空白区域
    observer () {
      // 选择需要观察变动的节点
      const targetNode = document.getElementById('gl-aside-bar')
      // 观察器的配置（需要观察什么变动）
      const config = { attributeFilter: ['style', 'class'] }
      // 当观察到变动时执行的回调函数
      const callback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            switch (mutation.attributeName) {
              case 'style':
                map.updateSize()
                // console.log('The ' + mutation.attributeName + ' attribute was modified.')
                break
              case 'class':
                map.updateSize()
                // console.log('The ' + mutation.attributeName + ' attribute was modified.')
                break
              default:
                break
            }
          }
        }
      }
      // 创建一个观察器实例并传入回调函数
      const observer = new MutationObserver(callback)
      // 以上述配置开始目标节点
      observer.observe(targetNode, config)
      if (this.isPlanning) {
        const resPanelNode = document.getElementById('gl-planning-panel')
        observer.observe(resPanelNode, config)
      }
    },
    handleClickVBarItem (index) {
      switch (index) {
        case 0:
          if (!isImageMap) {
            map.getLayers().item(0).setSource(new XYZ({
              url: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
              wrapX: false
            }))
          } else {
            map.getLayers().item(0).setSource(new XYZ({
              url: 'http://webrd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
              wrapX: false
            }))
          }
          isImageMap = !isImageMap
          break
        case 1:
          if (globalStyle) {
            globalStyle = false
          }

          this.isImgGroup = !this.isImgGroup
          break
        case 2:
          map.getView().setZoom(map.getView().getZoom() + 0.5)
          break
        case 3:
          map.getView().setZoom(map.getView().getZoom() - 0.5)
          break
        case 4:
          if (this.isPlanning) {
            this.$store.dispatch('app/toggleExtendP')
          } else {
            this.$store.dispatch('app/toggleExtendM')
          }
          break
        case 5:
          break
        case 6:
          this.blRoutePlan = !this.blRoutePlan
          if (this.blRoutePlan) {
            map.addLayer(routePlanLayer2)
            map.addLayer(routePlanLayer)
            map.addLayer(routePlanLayer3)
            if (this.currentFeatures.geometry.length > 0) {
              this.multiRoutePlan(this.currentFeatures.geometry)
            }
          } else {
            // map.addLayer(taskPlanOutlineLayer)
            // map.addLayer(taskPlanPointLayer)
            // map.addLayer(taskPlanLayer)
            routePlanLayer3.getSource().clear()
            routePlanLayer.getSource().clear()
            routePlanLayer2.getSource().clear()
            map.removeLayer(routePlanLayer3)
            map.removeLayer(routePlanLayer)
            map.removeLayer(routePlanLayer2)
          }
          break
        default:
          break
      }
    },
    handleCheckBoxChange (val) {
      let index = null
      routeLayer.getSource().getFeatures().forEach(item => {
        index = Math.ceil((item.values_.group + 1) / 10)
        if (val.indexOf(index) !== -1) {
          item.setStyle(this.styleFunction(item))
        } else {
          item.setStyle(null)
        }
      })
    },
    handleClickHBarItem (index) {
      switch (index) {
        case 1:
          this.hBarItem = 'hBarItem1'
          this.clearInteraction()
          map.addInteraction(select)
          break
        case 2:
          if (source.getFeatures().length > 0) {
            this.$confirm('已选择巡检区域')
          } else {
            this.hBarItem = 'hBarItem2'
            this.clearInteraction()
            draw = new Draw({
              source: source,
              type: 'Polygon'
            })
            draw.on('drawstart', this.startDraw)
            map.addInteraction(draw)
          }
          break
        case 3:
          this.hBarItem = 'hBarItem3'
          this.clearInteraction()
          draw = new Draw({
            source: source,
            type: 'Circle'
          })
          draw.on('drawstart', this.startDraw)
          map.addInteraction(draw)
          break
        case 4:
          this.hBarItem = 'hBarItem4'
          this.clearInteraction()
          map.addInteraction(modifySelect)
          modify = new Modify({
            features: modifySelect.getFeatures()
          })
          map.addInteraction(modify)
          break
        case 5:
          this.hBarItem = 'hBarItem5'
          this.clearInteraction()
          editLayer.getSource().clear()
          break
        case 6:
          this.hBarItem = 'hBarItem6'
          this.clearInteraction()
          // eslint-disable-next-line no-case-declarations
          const feature = source.getFeatures()[0]
          // eslint-disable-next-line no-case-declarations
          let polygonStr
          if (feature) {
            if (feature.getGeometry() instanceof Polygon) {
              polygonStr = JSON.stringify(format.writeFeature(feature))
            } else if (feature.getGeometry() instanceof Circle) {
              polygonStr = JSON.stringify(format.writeGeometry(fromCircle(feature.getGeometry())))
            }

            axios.post('http://192.168.1.104:8838/provider/dataManage/tower/PolygonSearch', polygonStr).then(res => {
              const region = res.data
              this.regionInfo.tranNum = region.tranNum
              this.regionInfo.distNum = region.distrbNum
              this.regionInfo.channelNum = region.totalNum
              this.regionInfo.timeSet = region.timeSet
              this.regionInfo.regionData = polygonStr
            })

            // 是否显示巡检区域信息对话框
            this.dialogVisible = true
          } else {
            this.$confirm('未选择巡检区域！')
            // axios.post('http://192.168.202.76:8736/provider/dataManage/tower/PolygonSearch', 'POLYGON((119.640 33.222,119.640 32.943,119.967 32.943,119.967 33.222,119.640 33.222))'
            // )
            //   .then(response => (
            //     console.log(response))
            //   )
          }
          break
        default:
          break
      }
    },
    clearInteraction () {
      overlay.setPosition(undefined)
      map.removeInteraction(draw)
      select.getFeatures().clear()
      map.removeInteraction(select)
      modifySelect.getFeatures().clear()
      map.removeInteraction(modifySelect)
      map.removeInteraction(modify)
    },
    formatArea (geom) {
      const area = getArea(geom)
      let output
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>'
      } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>'
      }
      return output
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 可视化规划航迹
    visualizePlannedRoute () {
      routeLayer.getSource().clear()
      takeOffLayer.getSource().clear()
      towerLayer.getSource().clear()
      const routeSource = new VectorSource({
        format: new GeoJSON()
      })
      const takeOffSource = new VectorSource({
        format: new GeoJSON()
      })
      const towerSource = new VectorSource({
        format: new GeoJSON()
      })

      const loading = this.$loading({
        lock: true, // lock的修改符--默认是false
        text: 'Loading', // 显示在加载图标下方的加载文案
        spinner: 'el-icon-loading', // 自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.7)', // 遮罩层颜色
        target: document.querySelector('#table')// loadin覆盖的dom元素节点
      })

      axios.get('20211102130353018.json').then(res => {
        const routes = routeSource.getFormat().readFeatures(res.data[0])
        for (let i = 0; i < routes.length; i++) {
          if (globalStyle) {
            routes[i].setStyle(this.styleFunction(routes[i]))
          }
          routeSource.addFeature(routes[i])
        }
        this.animate(routes[0].getGeometry().getGeometries()[0].getCoordinates()[0],
          13,
          500)
        const towerPoints = towerSource.getFormat().readFeatures(res.data[1])
        towerSource.addFeatures(towerPoints)
        const takeOffPoints = takeOffSource.getFormat().readFeatures(res.data[2])
        takeOffSource.addFeatures(takeOffPoints)

        for (let i = 0; i < routes.length; i++) {
          this.taskData[0].children.push({
            id: (routes[i].values_.taskID),
            label: '工作人员 ' + (routes[i].values_.taskID)
          })
        }

        // 成功回调函数停止加载
        // 延时器
        setTimeout(() => {
          loading.close()
        }, 2000)
      }).catch(error => console.log(error))
      routeLayer.setSource(routeSource)
      takeOffLayer.setSource(takeOffSource)
      towerLayer.setSource(towerSource)
    },
    // 可视化历史任务
    visualizeHistoryTask () {},
    // 视角定点跳转
    animate (center, zoom, duration) {
      map.getView().animate({
        center: center
      }, {
        zoom: zoom
      }, {
        duration: duration
      })
    },
    // 保存巡检区域信息
    handleSaveRegionInfo () {
      this.dialogVisible = false
      this.$emit('handleUpdateDescriptions', {
        region: this.regionInfo.regionName,
        tranNum: this.regionInfo.tranNum,
        distNum: this.regionInfo.distNum,
        channelNum: this.regionInfo.channelNum,
        timeSet: this.regionInfo.timeSet
      })
      this.$emit('handleSelectRegion', {
        region: this.regionInfo.regionName,
        regionData: this.regionInfo.regionData
      })
    },
    // 右侧面板隐藏功能
    handleRetractRightPanel () {
      this.$store.dispatch('app/retractRightPanel')
      // axios.get('http://192.168.202.182:8736/algorithm/testApi/hello', {
      //   headers: {
      //     Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZ2oiLCJzY29wZSI6WyJhbGwiXSwiZXhwIjoxNjM0MDc0MjQ2LCJhdXRob3JpdGllcyI6WyJVU0VSIl0sImp0aSI6IjQ3Y2U1MzhiLWJiNjgtNDY1OS04YzM0LWZmZWUyMjQzZTg0ZiIsInVzZXJpbmZvIjoie1wiaWRcIjozLFwidXNlcmNvZGVcIjpcIlwifSIsImNsaWVudF9pZCI6ImFsZ29yaXRobS1jbGllbnQifQ.GiAtFf1d3krq8DLh2oed6UsYCKFR4RTjbnQ0xZ3VpOV-1xe0auWLVrZjB2nBqKSCfK_tvv_PpHlGNYvAv26fCJg_8VQ8P4DJZU8Fsqcz8gaFe_HmWKmGQa7x1gyEq8L_4qWmostVxY0AJyGWPtH6JrRezvw6YdfwhNeKlqc8EJjs9Q3G8xaY7XAcfzaiW2Gd-lXKMuD2r5GhC54Q5huvMNXaCg9ievDpCRRbnIl2Z3rkXL-xZ2HWLspx29mKqoDRU2QnvRYT9qXA_T-X4X-ZIZSqr6EGURsQp3MLVhjbKywLkQ6l9pSVFdLOI0V5PkdtdQrbgUJHof9MZwUpm4NTSA'
      //   }
      // })
      //   .then(response => (
      //     console.log(response))
      //   )
      // const start = new Point([119.952999, 33.087222])
      // const end = new Point([119.95184, 33.069466])
      // const startMarker = new Feature({
      //   geometry: start
      // })
      // startMarker.setStyle(this.routePlanStyles.startMarker)
      // const endMarker = new Feature({
      //   geometry: end
      // })
      // endMarker.setStyle(this.routePlanStyles.endMarker)
      // this.routePlan('119.952999,33.087222', '119.95184,33.069466')
      // routePlanLayer.getSource().addFeature(startMarker)
      // routePlanLayer.getSource().addFeature(endMarker)
    },
    // 可视化任务安排结果
    visualizeTaskArrangement () {
      taskPlanOutlineLayer.getSource().clear()
      taskPlanPointLayer.getSource().clear()
      taskPlanLayer.getSource().clear()
      const taskPlanOutlineSource = new VectorSource({
        format: new GeoJSON()
      })
      const taskPlanPointSource = new VectorSource({
        format: new GeoJSON()
      })
      const taskPlanSource = new VectorSource({
        format: new GeoJSON()
      })
      axios.get('10311535.json', {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        const taskPlanOutline = taskPlanOutlineSource.getFormat().readFeatures(res.data[2])
        taskPlanOutlineSource.addFeatures(taskPlanOutline)
        const taskPlanPoints = taskPlanPointSource.getFormat().readFeatures(res.data[1])
        taskPlanPointSource.addFeatures(taskPlanPoints)
        const taskPlan = taskPlanSource.getFormat().readFeatures(res.data[0])
        for (let i = 0; i < taskPlan.length; i++) {
          this.taskData[0].children.push({
            id: taskPlan[i].values_.taskID,
            label: '工作人员 ' + taskPlan[i].values_.taskID
          })
        }
        // console.log(taskPlan[1].values_.taskID)
        // console.log(this.taskData)
        taskPlanSource.addFeatures(taskPlan)
        const extent = taskPlanPoints[0].getGeometry().getGeometries()[0].getExtent()
        map.getView().animate({
          center: [(extent[0] + extent[2]) / 2.0, (extent[1] + extent[3]) / 2.0]
        }, {
          zoom: 12
        }, {
          duration: 500
        })
      }).catch(error => console.log(error))
      taskPlanOutlineLayer.setSource(taskPlanOutlineSource)
      taskPlanPointLayer.setSource(taskPlanPointSource)
      taskPlanLayer.setSource(taskPlanSource)
    },
    // tree事件
    handleNodeClick (data) {
      if (!data.children) {
        if (this.content === 'taskPlan') {
          const lineFeature = this.getFeatureById(taskPlanLayer, data.id)
          const pointFeature = this.getFeatureById(taskPlanPointLayer, data.id)
          if (lineFeature && pointFeature) {
            if (this.currentFeatures.id > -1) {
              this.getFeatureById(taskPlanLayer, this.currentFeatures.id).setStyle(this.currentFeatures.lineStyle)
              this.getFeatureById(taskPlanPointLayer, this.currentFeatures.id).setStyle(this.currentFeatures.pointStyle)
            }
            this.currentFeatures.id = data.id
            this.currentFeatures.geometry = [].concat(pointFeature.getGeometry().getGeometries()[0].getCoordinates())
            console.log(this.currentFeatures.geometry)
            this.currentFeatures.lineStyle = lineFeature.getStyle()
            this.currentFeatures.pointStyle = pointFeature.getStyle()

            lineFeature.setStyle(new Style({
              stroke: new Stroke({
                color: '#fa0505',
                width: 5
              })
            }))
            const extent = lineFeature.getGeometry().getGeometries()[0].getExtent()
            map.getView().animate({
              center: [(extent[0] + extent[2]) / 2.0, (extent[1] + extent[3]) / 2.0]
            }, {
              zoom: 14
            }, {
              duration: 500
            })
          } else {
            console.log('Can not find feature by this id --- ' + data.id)
          }
        } else if (this.content === 'routeCompute') {
          if (this.animating) {
            this.stopAnimation()
          } else {
            const lineFeature = this.getFeatureById(routeLayer, data.id)
            if (this.currentFeatures.id > -1) {
              this.getFeatureById(routeLayer, this.currentFeatures.id).setStyle(this.currentFeatures.lineStyle)
            }
            this.currentFeatures.id = data.id
            console.log(this.currentFeatures.geometry)
            this.currentFeatures.lineStyle = lineFeature.getStyle()

            lineFeature.setStyle(new Style({
              stroke: new Stroke({
                color: '#fa0505',
                width: 5
              })
            }))
            const extent = lineFeature.getGeometry().getGeometries()[0].getExtent()
            map.getView().animate({
              center: [(extent[0] + extent[2]) / 2.0, (extent[1] + extent[3]) / 2.0]
            }, {
              zoom: 15
            }, {
              duration: 500
            })
            this.startAnimation(0)
          }
        }
      } else {
        if (this.currentFeatures.id > -1) {
          this.getFeatureById(routeLayer, this.currentFeatures.id).setStyle(this.currentFeatures.lineStyle)
          this.currentFeatures.id = -1
          this.currentFeatures.geometry = []
          this.currentFeatures.lineStyle = null
          this.currentFeatures.pointStyle = null
        }
      }
    },
    // 根据id获取图层layer上对应的feature
    getFeatureById (layer, id) {
      const features = layer.getSource().getFeatures()
      for (let i = 0; i < features.length; i++) {
        const feature = features[i]
        if (feature.values_.taskID === id) {
          return feature
        }
      }
      return null
    },
    // 轨迹移动
    moveFeature (event) {
      const vectorContext = getVectorContext(event)
      const frameState = event.frameState
      const elapsedTime = frameState.time - this.lastTime
      this.realDistance = this.realDistance + this.speed * elapsedTime
      this.lastTime = frameState.time
      if (routeLayer.getSource().getFeatures().length) {
        if (this.animating && this.animatingId !== -1) {
          let length = 0
          let totalLength = 0
          const geometries = routeLayer.getSource().getFeatures()[this.animatingId].getGeometry().getGeometries()
          for (let i = 0; i < geometries.length; i++) {
            const g = geometries[i]
            const geom = g.clone().transform('EPSG:4326', 'EPSG:3857')
            length = length + geom.getLength()
          }
          for (let i = 0; i < geometries.length; i++) {
            const g = geometries[i]
            const geom = g.clone().transform('EPSG:4326', 'EPSG:3857')
            this.realDistance = (this.realDistance - length) > 0 ? (this.realDistance - length) : this.realDistance
            if (this.realDistance >= totalLength && this.realDistance < (totalLength + geom.getLength())) {
              const geometry = geometries[i]
              const lastPoint = geometry.getCoordinateAt(
                this.distance > 1 ? this.distance - 1 : this.distance
              )
              this.distance = (this.distance + (this.speed * elapsedTime) / geom.getLength()) % 2
              const currentCoordinate = geometry.getCoordinateAt(
                this.distance > 1 ? this.distance - 1 : this.distance
              )
              const dx = currentCoordinate[0] - lastPoint[0]
              const dy = currentCoordinate[1] - lastPoint[1]
              let rotation = Math.atan(dx / dy)
              rotation = dy < 0 ? rotation : (Math.PI + rotation)

              const pos = new Point(currentCoordinate)
              console.log(pos)
              const myImage = new Image(200, 200)
              myImage.src = require('../assets/images/lg/drone.png')
              vectorContext.setStyle(new Style({
                image: new Icon({
                  img: myImage,
                  imgSize: [200, 200],
                  scale: 0.1,
                  rotation: rotation
                })
              }))
              vectorContext.drawGeometry(pos)
            }
            totalLength = totalLength + geom.getLength()
          }
        }
      } else {
        console.log()
      }
      map.render()
    },
    // 开始动画
    startAnimation (featureId) {
      if (this.animating) {
        this.stopAnimation()
      } else {
        this.animatingId = featureId
        this.animating = true
        this.speed = 0.3
        this.lastTime = Date.now()
        routeLayer.on('postrender', this.moveFeature)
        map.render()
      }
    },
    // 停止动画
    stopAnimation () {
      this.animatingId = -1
      this.animating = false
      this.distance = 0
      this.realDistance = 0
      routeLayer.un('postrender', this.moveFeature)
    },
    // 路径规划[起点，终点]
    routePlan (start, end) {
      // map.getView().animate({
      //   center: [119.95184, 33.069466]
      // }, {
      //   zoom: 13
      // }, {
      //   duration: 500
      // })
      axios.get('https://restapi.amap.com/v3/direction/driving', {
        params: {
          origin: start,
          destination: end,
          extensions: 'all',
          key: this.$store.getters.amapKey
        }
      }).then(res => {
        console.log(res.data)
        const routes = res.data.route.paths[0]
        const steps = routes.steps
        const totalLineData = []
        for (let i = 0; i < steps.length; i++) {
          const route = steps[i]
          const path = route.tmcs
          for (let k = 0; k < path.length; k++) {
            const routePath = path[k]
            const distance = routePath.distance
            const polyline = routePath.polyline.toString().split(';')
            const status = routePath.status
            const polylineData = []
            for (let j = 0; j < polyline.length; j++) {
              // 将字符串拆成数组
              const realData = polyline[j].split(',')
              const coordinate = [parseFloat(realData[0]), parseFloat(realData[1])]
              polylineData.push(coordinate)
              totalLineData.push(coordinate)
            }
            const attribute = {
              distance: distance
            }
            const geometry = new LineString(polylineData)
            const feature = new Feature({
              geometry: geometry,
              attr: attribute,
              status: status
            })
            routePlanLayer2.getSource().addFeature(feature)
            routePlanLayer.getSource().addFeature(feature)
          }
        }
        const geom = new LineString(totalLineData)
        const feat = new Feature({
          geometry: geom
        })
        routePlanLayer3.getSource().addFeature(feat)
      }).catch(error => console.log(error))
    },
    // 路径规划[起点，终点]
    multiRoutePlan (points) {
      const startPoint = new Point([points[0][0], points[0][1]])
      const endPoint = new Point([points[points.length - 1][0], points[points.length - 1][1]])
      const startMarker = new Feature({
        geometry: startPoint
      })
      startMarker.setStyle(this.routePlanStyles.startMarker)
      routePlanLayer.getSource().addFeature(startMarker)
      const endMarker = new Feature({
        geometry: endPoint
      })
      endMarker.setStyle(this.routePlanStyles.endMarker)
      routePlanLayer.getSource().addFeature(endMarker)
      let start = points[0][0].toString() + ',' + points[0][1].toString()
      for (let i = 1; i < points.length; i++) {
        const end = points[i][0].toString() + ',' + points[i][1].toString()
        if (i < points.length - 1) {
          const throughPoint = new Point([points[i][0], points[i][1]])
          const throughMarker = new Feature({
            geometry: throughPoint
          })
          throughMarker.setStyle(this.routePlanStyles.throughMarker)
          routePlanLayer.getSource().addFeature(throughMarker)
        }
        this.routePlan(start, end)
        start = end
      }
    },
    // 无人机网格化巡检单元
    selectGridUnit (bl) {
      if (bl) {
        map.addInteraction(gridUnitSelect)
      } else {
        gridUnitSelect.getFeatures().clear()
        map.removeInteraction(gridUnitSelect)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .map {
    position: relative;
    width: 100%;
    height: calc(100% - 0px);
    .lg-v-bar {
      position: absolute;
      top: 10px;
      right: 25px;
      z-index: 99999;
      /* 左侧显示 */
      .lg-v-bar-item {
        width: 30px;
        height: 30px;
        cursor: pointer;
        border: 1px solid #cccccc;
        border-radius: 4px;
        margin-top: 8px;
        opacity: 0.9;
        background: var(--background);
        background-size: 25px 25px;
        box-shadow: 0px 0px 6px 1px #b1afaf;
      }
      .lg-v-bar-item:hover {
        background: var(--backgroundHover);
        background-size: 25px 25px;
      }
    }
    .lg-popup {
      position: relative;
      display: inline-block;
      .lg-popup-item {
        visibility: var(--visibility);
        width: 240px;
        height: 300px;
        background-color: #1d848b!important;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        box-shadow: 0px 0px 6px 1px #b1afaf;
        opacity: 0.85;
        overflow: hidden;

        padding: 10px;

        /* 定位 */
        position: absolute;
        z-index: 1;
        top: 15px;
        right: 105%;
      }
    }
    .lg-h-bar {
      position: absolute;
      left: 25px;
      top: 25px;
      padding-left: 6px;
      padding-right: 6px;
      z-index: 1005;
      height: 40px;
      background-color: #ffffff;
      text-align: center;
      border: 1px solid #cccccc;
      border-radius: 5px;
      box-shadow: 0px 0px 6px 1px #b1afaf;
      .lg-h-bar-item {
        float: left;
        width: 25px;
        height: 25px;
        margin: 7.5px 6px;
        cursor: pointer;
        opacity: 0.8;
      }
    }
    /* Information popup */
    .ol-popup {
      position: absolute;
      background-color: white;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #cccccc;
      bottom: 12px;
      left: -50px;
      min-width: 150px;
    }
    .ol-popup:after, .ol-popup:before {
      top: 100%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }
    .ol-popup:after {
      border-top-color: white;
      border-width: 10px;
      left: 48px;
      margin-left: -10px;
    }
    .ol-popup:before {
      border-top-color: #cccccc;
      border-width: 11px;
      left: 48px;
      margin-left: -11px;
    }
    .lg-retract-icon {
      visibility: hidden;
      width: 40px;
      height: 40px;
      cursor: pointer;
      text-align: center;
      background-color: #ffffff;
      line-height: 50px;
      border-radius: 42px;
      opacity: 0.5;

      /* 定位 */
      position: absolute;
      z-index: 99999;
      top: 50%;
      right: 5px;
      .lg-icon {
        font-size: 25px;
        font-weight: bolder;
        color: #1d848b;
      }
    }
    .lg-retract-icon:hover {
      background-color: #868686;
      .lg-icon {
        background-color: #868686;
        color: #FFFFFF;
      }
    }
  }
  .map:hover .lg-retract-icon {
    visibility: visible;
  }
</style>
