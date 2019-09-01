<template>
  <div class="margin-top-120">
    <div class="row ml-1 mr-1">
      <div class="col">
        <ul class="nav nav-tabs mb-4">
          <li class="nav-item mr-2">
            <a @click="add_new_column" href="javascript:void(0)" class="new_tab nav-link bg-info text-white"><font-awesome-icon icon="plus" /> New</a>
          </li>
          <li class="nav-item mr-2">
            <a @click="show_timers_tab" href="javascript:void(0)" :class="activeTab === 'timers_tab' ? 'nav-link active' : 'nav-link'">My timers ({{timers.length}})</a>
          </li>
          <Tab v-for="column in columns" :key="column.id" :column="column" />
        </ul>
        <Scratchpad v-if="active_column" :column="active_column" />
        <Timerspad v-if="activeTab === 'timers_tab'" />
      </div>
    </div>
  </div>
</template>

<script>
import Timerspad from '../components/pads/Timerspad'
import Scratchpad from '../components/pads/Scratchpad'
import Tab from '../components/Tab'

import { mapState } from 'vuex';

export default  {
  name:'Home',
  components:{
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
    })
  },
  methods:{
    show_timers_tab(){
      this.$store.dispatch('update_active_tab', 'timers_tab')
    },
    add_new_column(){
      this.$store.dispatch('add_new_column', {title: 'Change me'})
    }
  }
}
</script>
<style>
.margin-top-120{
  margin-top: 120px!important;
}
.new_tab{
  border-radius: 0!important;
}
</style>