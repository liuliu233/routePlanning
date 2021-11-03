<template>
  <div
    class="lg-step"
    :style="{
      '--margin': margin,
      '--background': background,
      '--color': color}"
    >
    <div class="el-step__icon is-text">
      <i :class="[ 'el-step__icon-inner', 'is-status', 'lg-icon', { 'el-icon-check': isActive } ]"></i>
    </div>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'lg-step',
  props: {
    title: {
      defaults: '',
      type: String
    },
    isStart: {
      defaults: false,
      type: Boolean
    },
    isItem: {
      defaults: false,
      type: Boolean
    },
    isEnd: {
      defaults: false,
      type: Boolean
    },
    isActive: {
      defaults: false,
      type: Boolean
    }
  },
  data () {
    return {}
  },
  computed: {
    margin: function () {
      return (!this.isStart && !this.isEnd) ? '-20px' : ''
    },
    background: function () {
      return this.isStart ? (this.isActive ? 'url(' + require('../../assets/images/lg/step1_ac.png') + ') center no-repeat'
        : 'url(' + require('../../assets/images/lg/step1_h.png') + ') center no-repeat')
        : (this.isEnd ? (this.isActive ? 'url(' + require('../../assets/images/lg/step3_ac.png') + ') center no-repeat'
          : 'url(' + require('../../assets/images/lg/step3_h.png') + ') center no-repeat')
          : (this.isActive ? 'url(' + require('../../assets/images/lg/step2_ac.png') + ') center no-repeat'
            : 'url(' + require('../../assets/images/lg/step2_h.png') + ') center no-repeat'))
    },
    color: function () {
      return this.isActive ? '#ffffff' : '#000000'
    }
  }
}
</script>

<style lang="scss">
  .lg-step {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    color: var(--color);
    font-weight: bold;
    flex-shrink: 1;
    flex-basis: 50%;
    height: 46px;
    margin-left: var(--margin);
    margin-right: var(--margin);
    background: var(--background);
    background-size: 100% 100%;
    .el-step__icon {
      background: 0 0;
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
    .lg-icon {
      font-size: 8px !important;
      font-weight: bold;
    }
  }
</style>
