<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  #app {
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-align: center;
  color: #2c3e50;
}
  div.el-tabs--card.el-tabs__content {
    /*height: calc(100% - 71px);*/
    height: 0px;
  }
  .el-tabs--card>.el-tabs__header {
    background-color: #1d848b;
    margin: 0px;
    border-bottom: none;
    .el-tabs__item {
      box-sizing: unset;
      border-left: 1px solid #5e5d5d;
      .el-icon-close {
        font-size: 14px;
        color: #ffffff;
        transition: none;
      }
    }
    .el-tabs__item.is-active {
      border: none;
      border-left: 1px solid #5e5d5d;
      background-color: #146d86;
      color: #ffffff;
    }
    .el-tabs__nav {
      border: none;
      border-radius: 0px 0 0 0;
      border-right: 1px solid #5e5d5d;
    }
  }
  #tab-management {
    padding: 0 15px;
    /*top: 5px;*/
    /*text-align: center;*/
    /*background-color: #6e8b1d;*/
    span.el-icon-close {
      display: none;
    }
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #1d848b;
    border-color: #1d848b;
    height: 16px;
    width: 16px;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #1d848b;
  }
  .el-checkbox.is-bordered.is-checked{
    border-color: #1d848b;
  }
  .el-checkbox__input .el-checkbox__inner {
    height: 16px;
    width: 16px;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color:  #1d848b;
  }
  .el-radio__input .el-radio__inner {
    height: 16px;
    width: 16px;
  }
  .el-radio__input.is-checked .el-radio__inner, .el-radio__input.is-indeterminate .el-radio__inner{
     background-color: #1d848b;
     border-color: #1d848b;
    height: 16px;
    width: 16px;
   }
  .el-radio__input.is-checked + .el-radio__label {
    color: #1d848b;
  }
  .el-radio.is-bordered.is-checked{
    border-color: #1d848b;
  }
  .el-radio__input.is-focus .el-radio__inner{
    border-color:  #1d848b;
  }
  .lg-dialog {
    z-index: 1010;
    .el-dialog{
      display: flex;
      flex-direction: column;
      margin:0 !important;
      position:absolute;
      border: none;
      border-radius: 6px;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      /*height:600px;*/
      max-height:calc(100% - 30px);
      max-width:calc(100% - 30px);
    }
    .el-dialog .el-dialog__body{
      flex:1;
      overflow: auto;
    }
    .el-dialog__header {
      text-align: left;
      padding: 10px 10px 10px 10px !important;
      border: none;
      border-bottom: 1px solid #f4f4f4;
      border-radius: 6px 6px 0px 0px;
      background: #1d848b;
      .el-dialog__title {
        color: #ffffff;
      }
    }
    .el-dialog__footer {
      text-align: right;
      padding: 12px 20px 12px 20px !important;
      border-top: 1px solid #f4f4f4;
    }
    .el-dialog__headerbtn {
      position: absolute;
      top: 12px;
      right: 12px;
      padding: 0;
      background: 0 0;
      border: none;
      outline: 0;
      cursor: pointer;
      font-size: 16px !important;
      .el-dialog__close {
        color: #ffffff;
      }
      .el-dialog__close:hover {
        color: #909399;
        border-radius: 10px;
        background: #ffffff;
      }
    }
    .el-dialog__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .lg-form {
    display: block;
    padding: 30px;
    background-color: #ffffff;
    text-align: center;
    .el-form-item {
      .el-form-item__label {
        font-size: 18px;
        font-weight: bold;
        height: 45px;
        line-height: 45px;
        color: #cccccc;
        text-align: center;
      }
      .el-form-item__content {
        .el-input--medium {
          .el-input__inner {
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            border: 2px solid #cccccc;
            text-align: center;
            color: #cccccc;
          }
        }
      }
    }
  }
  #lg-main-scrollbar {
    .el-scrollbar__wrap {
      overflow-x: hidden;
      margin-bottom: -23px!important;
    }
    .el-scrollbar__bar {
      display: none;
    }
  }
  #lg-checkbox-group {
    text-align: left;
    .el-checkbox {
    }
    .el-checkbox__label {
      color: #cccccc;
      font-size: 16px!important;
    }
  }
  #lg-radio-group {
    text-align: left;
    .el-radio-group {
      width: 100%;}
    .el-radio__label {
      color: #cccccc;
      font-size: 16px!important;
    }
  }
  #lg-slider {
    .el-slider__bar {
      background-color: #1d848b!important;
    }
    .el-slider__button {
      border: 2px solid #1d848b;
    }
  }
  #gl-top-content{
    .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--month {
      width: 120px;
    }
    input.el-input__inner {
      border: none;
      height: 30px;
      line-height: 30px;
      width: 120px;
      font-weight: bold;
      color: #1d848b;
    }
    i.el-input__icon.el-icon-date {
      line-height: 30px;
      color: #1d848b;
    }
    span.el-input__suffix {
      display: none;
    }
    span.el-input__prefix {
      display: none;
    }
    .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--month {
      font-size: 16px;
    }
  }
  #lg-planning-tab {
    .el-tabs__item {
      padding: 0px 15px!important;
    }
    .el-tabs__active-bar.is-top {
      background-color: #1d848b;
    }
  }
  .lg-left-scrollbar {
    .lg-planning__form {
      padding: 0px 15px;
      .el-form-item {
        .el-form-item__label {
          font-size: 14px;
          font-weight: bold;
          height: 40px;
          line-height: 40px;
          color: #606266;
          text-align: left;
        }
        .el-form-item__content {
          .el-input--medium {
            .el-input__inner {
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              border: 1px solid #606266;
              text-align: center;
              color: #606266;
            }
          }
        }
      }
      .el-form-item.el-form-item--medium {
        margin-bottom: 12px!important;
      }
      .lg-planning-radio-group {
        text-align: center;
        .el-form-item__content {
          /*margin-left: 0px!important;*/
        }
        .el-radio-group {
          width: 100%;}
        .el-radio__label {
          color: #606266;
          font-size: 14px!important;
        }
      }
      .lg-planning-checkbox-group {
        text-align: center;
        .el-checkbox {
        }
        .el-checkbox-group {
          width: 100%;
        }
        .el-checkbox__label {
          color: #606266;
          font-size: 14px!important;
        }
      }
      .el-tooltip__popper.is-dark {
        font-size: 14px!important;
      }
    }
    .el-scrollbar__view {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
  .lg-upload__demo {
    .el-upload.el-upload--text {
      width: auto;
    }
  }
  .lg-person-panel {
    .el-tabs__item {
    }
    .el-tabs__active-bar.is-top {
      background-color: #1d848b;
    }
    .el-form-item {
      .el-form-item__label {
        font-size: 14px;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
        text-align: left;
      }
    }
  }
  button.el-button.el-button--default.el-button--small.el-button--primary {
    background-color: #1d848b;
    border-color: #1d848b;
  }
  .lg-task-tree {
    .el-tree-node:focus > .el-tree-node__content {
      background-color: #1d848b !important;
    }
    .el-tree-node__content:hover {    background-color: #1d848b;
    }
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
      background-color: #1d848b;
      color: #47e1fa;
    }
  }

</style>
