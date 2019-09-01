<template>
  <div>
    <div class="row ml-1 mr-1">
      <div class="col">
        <ul class="nav nav-tabs mb-4">
          <li class="nav-item mr-2">
            <a @click="add_new_column" href="javascript:void(0)" class="new_tab nav-link bg-info text-white"><font-awesome-icon icon="plus" /> New</a>
          </li>
          <Tab v-for="column in columns" :key="column.id" :column="column" />
        </ul>
        <Scratchpad v-if="active_column" :column="active_column" />
      </div>
    </div>
  </div>
</template>

<script>
import Scratchpad from '../components/pads/Scratchpad'
import Tab from '../components/Tab'

import { mapState } from 'vuex';

export default  {
  name:'Home',
  components:{
    Scratchpad,
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
    add_new_column(){
      this.$store.dispatch('add_new_column', {title: 'Change me'})
    }
  }
}
</script>
<style scoped>
.new_tab{
  border-radius: 0!important;
}
</style>