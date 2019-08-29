<template>
  <div>
    <a @click="start_timer" v-if="!timeron" href="javascript:void(0)">
      <font-awesome-icon icon="play"/>
    </a>
    <a @click="pause_timer"  v-else href="javascript:void(0)">
      <font-awesome-icon  icon="pause"/>
    </a>
    &nbsp;
    <a @click="stop_timer" href="javascript:void(0)">
      <font-awesome-icon icon="stop"/>
    </a>
    &nbsp;
    <span>{{ timer }}</span>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Timer',
  data(){
    return{
      timeron: false,
      timer: '00:00:00',
      a: null
    }
  },
  methods:{
    start_timer(){
      this.timeron = true
      var s = new Date().getTime()
      var b = setInterval(()=>{
        this.timer = moment(new Date().getTime() - s).format('hh:mm:ss')
      },1000)
      this.a = b.toString()
    },
    pause_timer(){
      this.timeron = false
      clearInterval(this.a)
    },
    stop_timer(){
      this.timeron = false
      clearInterval(this.a)
    }
  }
}
</script>

<style>

</style>