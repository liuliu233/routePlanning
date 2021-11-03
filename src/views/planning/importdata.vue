<template>
  <div style="padding: 15px 15px 15px 15px">
    <el-upload
      class="lg-upload__demo"
      style="margin-bottom: 15px;width: 100%;display: flex;flex-direction: row"
      ref="upload"
      :action="uploadAction"
      :auto-upload="false"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-change="beforeUpload"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :data="extraParam"
      :headers="headers"
      :limit="fileSizeLimit"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :accept="fileType"
      :show-file-list="false"
      multiple>
      <el-button style="" slot="trigger" size="small" type="primary" icon="el-icon-document-checked">选取航迹文件</el-button>
      <div style="height: 20px;flex-grow: 4;"></div>
      <el-button style="" size="small" type="success" icon="el-icon-upload" @click="submitUpload">上传文件</el-button>
      <div style="height: 20px;flex-grow: 4;"></div>
      <el-button style="" size="small" type="danger" @click="clearTrack">清除</el-button>
    </el-upload>

    <el-table :data="fileList" max-height="400px" :show-header="false" :row-style="{height: '50px'}" :cell-style="{padding: '0'}" fit highlight-current-row style="width: 100%; overflow-y: auto;">
      <el-table-column align="center" prop="name" min-width="100px" label="文件名称"></el-table-column>
      <el-table-column align="center" min-width="40px" label="文件类型">
        <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.name.substring(scope.row.name.lastIndexOf('.') + 1) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120px" label="上传时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.raw.lastModifiedDate.toJSON() }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  width="90px">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index)"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ImportData',
  props: {
    /* 上传框提示 */
    promptMessage: {
      default: '只能上传kml/json/pwline文件',
      type: String
    },
    /* 文件上传路径 */
    uploadAction: {
      default: 'http://192.168.202.76:8736/provider/dataManage/tower',
      type: String
    },
    /* 文件类型 */
    fileType: {
      default: '.json,.kml,.pwline',
      type: String
    },
    /* 限制最大文件上传数 */
    fileSizeLimit: {
      default: 4,
      type: Number
    }
  },
  data () {
    return {
      /* 上传时附带的额外参数，返回是一个对象 */
      extraParam: {},
      /* 已上传的文件列表 */
      fileList: [],
      /* 请求头 */
      headers: {},
      /* 是否在选取文件后立即进行上传 */
      autoUpload: false
    }
  },
  methods: {
    /* 文件列表移除文件成功时的钩子 */
    handleRemove (file, fileList) {
      return console.log(`已成功移除"${file.name}"文件`)
    },
    /* 处理上传失败时的勾子 */
    // eslint-disable-next-line handle-callback-err
    handleUploadError (err, file, fileList) {
      console.error('文件上传失败')
    },
    /* 文件删除前的勾子 */
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除"${file.name}"文件吗？`)
    },
    handleDelete (index) {
      this.fileList.splice(index, 1)
    },
    /* 上传文件之前的钩子 因设置了auto-upload为false，如果使用before-upload，虽有提示，但是还是会请求服务器 */
    beforeUpload (file, fileList) {
      // 1、判断文件名是否重复，不允许上传相同文件
      const existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)
      if (existFile) {
        fileList.pop()
        console.warn(file.name + ' 文件已存在！')
      }
      // 2、获取文件后缀
      fileList.forEach(everyFile => {
        const fileType = everyFile.name.substring(everyFile.name.lastIndexOf('.'))
        if (this.fileType.search(fileType) === -1) {
          fileList.pop()
          console.warn('上传文件的类型不正确' + '文件类型必须为' + this.fileType + '')
        }
      })
      this.fileList = fileList
    },
    /* 文件超出个数限制时的钩子 */
    handleExceed (files, fileList) {
      console.warn('当前限制选择' + this.fileSizeLimit + `个文件，本次选择了 ${files.length} 个文件，已超出了文件最大上传个数`)
    },
    /* 文件上传成功时的钩子 */
    handleUploadSuccess (res, file, fileList) {
      console.info(JSON.stringify(res))
    },
    /* 确定上传 */
    submitUpload () {
      const fd = new FormData()
      this.fileList.forEach(item => {
        console.log(item.raw)
        fd.append('files', item.raw)
      })
      axios.post('http://192.168.1.104:8838/provider/dataManage/tower/uploadTowerData', fd)
        .then(response => {
          if (response.data) {
            console.log('上传成功')
          } else {
            console.log('上传失败')
          }
        })
    },
    /* 清除所有上传信息，为下次上传做准备 */
    clearTrack () {
      for (let i = this.fileList.length - 1; i >= 0; i--) {
        this.handleDelete(i)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .el-upload__tip {
    font-weight: bold;
    font-size: 14px;
  }
  .el-upload.el-upload--text {
    width: 100%;
  }
</style>
