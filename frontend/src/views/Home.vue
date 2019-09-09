<template>
  <div>
    <div class="row ml-1 mr-1">
      <div class="col">
        <ul class="nav nav-tabs mb-4">
          <li class="nav-item mr-2">
            <a @click="show_timers_tab" href="javascript:void(0)" :class="activeTab === 'timers_tab' ? 'nav-link active' : 'nav-link'">My timers ({{timers.length}})</a>
          </li>
          <li class="nav-item mr-2">
            <a @click="show_regulars_tab" href="javascript:void(0)" :class="activeTab === 'regulars_tab' ? 'nav-link active' : 'nav-link'">My Regular Tasks ({{tasksCount}})</a>
          </li>
          <Tab v-for="column in columns" :key="column.id" :column="column" />
        </ul>
        <Scratchpad v-if="active_column" :column="active_column" />
        <Timerspad v-if="activeTab === 'timers_tab'" />
        <RegularTasksPad v-if="activeTab === 'regulars_tab'" />
      </div>
    </div>
  </div>
</template>

<script>
import Timerspad from '../components/pads/Timerspad'
import Scratchpad from '../components/pads/Scratchpad'
import RegularTasksPad from '../components/pads/RegularTasksPad'
import Tab from '../components/Tab'

import { mapState, mapGetters } from 'vuex';

export default  {
  name:'Home',
  components:{
    RegularTasksPad,
    Scratchpad,
    Timerspad,
    Tab
  },
  computed:{
    active_column(){
      return this.columns.filter((c) => c.id === this.activeTab)[0]
    },
    ...mapState({
      columns: state => state.columns,
      timers: state => state.timer.timers,
      activeTab: state => state.activeTab
    }),
    ...mapGetters({
      tasksCount: 'regularTasks/tasksCount',
    }),
  },
  methods:{
    show_timers_tab(){
      this.$store.dispatch('update_active_tab', 'timers_tab')
    },
    show_regulars_tab(){
      this.$store.dispatch('update_active_tab', 'regulars_tab')
    }
  }
}
</script>
<style>
.new_tab{
  border-radius: 0!important;
}
</style>