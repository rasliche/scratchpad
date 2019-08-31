<template>
  <div>
    <ul class="list-group scratch">
      <p class="text-center text-info mt-5 mb-5" v-if="timers.length == 0">¯\_(ツ)_/¯ Nothing here</p>      
      <TimeEntryItem v-for="timer in timers" :key="timer.id" :timer="timer" />
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TimeEntryItem from './TimeEntryItem'

export default {
  name: 'Timerspad',
  components:{
    TimeEntryItem
  },
  computed:mapState({
    timers: state => state.timers
  })
}
</script>

<style>

</style>