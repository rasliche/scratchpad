<template>
  <div>
    <a @click="start_timer" class="mr-2" v-if="!timeron" href="javascript:void(0)">
      <font-awesome-icon icon="play"/>
    </a>
    <!-- <a @click="pause_timer" class="mr-2"  v-else href="javascript:void(0)">
      <font-awesome-icon  icon="pause"/>
    </a> -->
    <a v-if="timeron" @click="stop_timer" class="mr-2" href="javascript:void(0)">
      <font-awesome-icon icon="stop"/>
    </a>
    <span class="mr-2">{{ timer | toHumanDate }}</span>
    <span v-if="!timeron & timer > 0">
      <input v-model="timerentry"  type="text" class="border-0 mr-2" placeholder="Short note...">
      <a href="javascript:void(0)" @click="save_timer_entry" class="mr-2">Save</a>
      <a href="javascript:void(0)" @click="clear_timer_entry">Clear</a>
    </span>
    <a href="javascript:void(0)">( {{ this.$store.state.timers.length }} timers )</a>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Timer',
  data(){
    return{
      timeron: false,
      // timerpaused: false,
      timer: 0,
      a: null,
      timerentry:''
    }
  },
  filters:{
    toHumanDate(d){
      return moment(d).format('hh:mm:ss')
    }
  },
  methods:{
    start_timer(){
      this.timeron = true
      var s = moment()
      var b = setInterval(()=>{
        this.timer = moment() - s
        document.title = this.$options.filters.toHumanDate(this.timer)
      },1000)
      this.a = b.toString()
    },
    // pause_timer(){
    //   this.timeron = false
    //   this.timerpaused = true
    //   clearInterval(this.a)

    //   var s = new Date().getTime()
    //   var b = setInterval(()=>{
    //     this.timer = this.timer + (new Date().getTime() - s)
    //   },1000)
    //   this.a = b.toString()
    // },
    stop_timer(){
      this.timeron = false
      clearInterval(this.a)
      document.title = 'Scratchy'
    },
    save_timer_entry(){
      this.$store.dispatch('add_timer', {note: this.timerentry, timer: this.$options.filters.toHumanDate(this.timer) })
      this.clear_timer_entry()
    },
    clear_timer_entry(){
      this.timer = 0
    }
  }
}
</script>

<style>

</style>