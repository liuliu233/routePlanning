<template>
  <div id="map" class="map">
    <div class="lg-v-bar">
      <div @click="handleClickVBarItem(0)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../../assets/images/lg/yx_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../../assets/images/lg/yx_ac.png') + ') center no-repeat' }"></div>
      <div class="lg-popup">
        <div @click="handleClickVBarItem(1)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../../assets/images/lg/pingmian_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../../assets/images/lg/pingmian_ac.png') + ') center no-repeat'}"></div>
        <div class="lg-popup-item" :style="{ '--visibility': isImgGroup ? 'visible' : 'hidden' }">
          <el-checkbox-group v-model="checked" @change="handleCheckBoxChange">
            <el-checkbox class="lg-checkbox" label="备选项1"></el-checkbox>
            <el-checkbox class="lg-checkbox" label="备选项2"></el-checkbox>
            <el-checkbox class="lg-checkbox" label="备选项3"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div @click="handleClickVBarItem(2)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../../assets/images/lg/zoomin_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../../assets/images/lg/zoomin_ac.png') + ') center no-repeat'}"></div>
      <div @click="handleClickVBarItem(3)" class="lg-v-bar-item" :style="{ '--background': '#ffffff url(' + require('../../assets/images/lg/zoomout_h.png') + ') center no-repeat',
        '--backgroundHover': '#ffffff url(' + require('../../assets/images/lg/zoomout_ac.png') + ') center no-repeat'}"></div>
    </div>
  </div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import View from 'ol/View'
import { Fill, Stroke, Style } from 'ol/style'
import { Select } from 'ol/interaction'
import { defaults } from 'ol/control'
import { get } from 'ol/proj'

let map = null
let isImageMap = false
const source = new VectorSource()
let trackLayer = null
// eslint-disable-next-line no-unused-vars
let select

export default {
  name: 'TrackVisualization',
  mounted () {
    this.initMap()
    this.observer()
  },
  data () {
    return {
      isImgGroup: false,
      hBarItem: '',
      checked: ['备选项1', '备选项2', '备选项3']
    }
  },
  computed: {
  },
  methods: {
    initMap () {
      map = new Map({
        layers: [
          new TileLayer({
            id: 'tileLayer',
            title: '天地图',
            layerName: 'baseMap',
            source: new XYZ({
              url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=f9073387fa813aada14286a99166bb2c',
              wrapX: false
            }),
            projection: get('EPSG:4326')
          }),
          new TileLayer({
            id: 'tileMark',
            title: '标注图层',
            layerName: 'baseMap',
            source: new XYZ({
              url: 'http://t3.tianditu.com/DataServer?T=cva_w&tk=f9073387fa813aada14286a99166bb2c&x={x}&y={y}&l={z}',
              wrapX: false
            }),
            projection: get('EPSG:4326')
          })
        ],
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
          maxZoom: 18
        })
      })
      trackLayer = new VectorLayer({
        name: 'Tracklayer',
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
      map.addLayer(trackLayer)
      select = new Select({
        multi: false
      })
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
    },
    handleClickVBarItem (index) {
      switch (index) {
        case 0:
          if (!isImageMap) {
            map.getLayers().item(0).setSource(new XYZ({
              url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=f9073387fa813aada14286a99166bb2c',
              wrapX: false
            }))
            map.getLayers().item(1).setSource(new XYZ({
              url: 'http://t4.tianditu.com/DataServer?T=cva_w&tk=f9073387fa813aada14286a99166bb2c&x={x}&y={y}&l={z}',
              wrapX: false
            }))
          } else {
            map.getLayers().item(0).setSource(new XYZ({
              url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=f9073387fa813aada14286a99166bb2c',
              wrapX: false
            }))
            map.getLayers().item(1).setSource(new XYZ({
              url: 'http://t3.tianditu.com/DataServer?T=cva_w&tk=f9073387fa813aada14286a99166bb2c&x={x}&y={y}&l={z}',
              wrapX: false
            }))
          }
          isImageMap = !isImageMap
          break
        case 1:
          this.isImgGroup = !this.isImgGroup
          break
        case 2:
          map.getView().setZoom(map.getView().getZoom() + 0.5)
          break
        case 3:
          map.getView().setZoom(map.getView().getZoom() - 0.5)
          break
        default:
          break
      }
    },
    handleCheckBoxChange (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
  .map {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
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
        margin-top: 15px;
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
        width: 120px;
        background-color: #ffffff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        box-shadow: 0px 0px 6px 1px #b1afaf;
        opacity: 0.75;

        /* 定位 */
        position: absolute;
        z-index: 1;
        top: 15px;
        right: 105%;
        .el-checkbox:last-of-type {
          margin-right: 15px;
        }
        .el-checkbox {
          margin-right: 15px;
        }
        .lg-checkbox {
          margin-top: 6px;
        }
      }
    }
  }
</style>
