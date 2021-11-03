<template>
  <div class="lg-steps">
    <lg_step
      v-for="(i, index) in list"
      :key="index"
      :title="i.title"
      :is-start="1 === index + 1"
      :is-end="list.length === index + 1"
      :is-active="active >= index + 1"/>
  </div>
</template>

<script>
import lg_step from '@/components/Step/lg_step'
export default {
  name: 'lg_steps',
  components: {
    lg_step
  },
  props: {
    list: Array,
    active: {
      defaults: 0,
      type: Number
    }
  },
  data () {
    return {
      activeIndex: 1
    }
  }
}
</script>

<style scoped lang="scss">
 .lg-steps {
   display: flex;
   flex-direction: row;
   align-items: center;
   height: 46px;
   margin: 20px 0 20px 0px;
   background: #ffffff;
 }
</style>
