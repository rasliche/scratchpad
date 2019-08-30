<template>
  <div>
    <div class="row ml-1 mr-1">
      <div class="col">
        <ul class="nav nav-tabs mb-4">
          <li class="nav-item">
            <a href="javascript:void(0)" @click="tabs" :class="tab == 't1' ? 'nav-link active' : 'nav-link'" id="t1">Things to do</a>
          </li>
          <li class="nav-item">
            <a :class="tab == 't2' ? 'nav-link active' : 'nav-link'" @click="tabs" href="javascript:void(0)" id="t2">My timers ({{ this.$store.state.timers.length }})</a>
          </li>
        </ul>
        <div v-if="tab=='t1'">
          <Scratchpad v-for="column in columns" :key="column.id" :column="column"/>
        </div>
        <div v-else >
          <Timerspad />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scratchpad from '../components/pads/Scratchpad'
import Timerspad from '../components/pads/Timerspad'

import { mapState } from 'vuex';

export default  {
  name:'Home',
  data(){
    return {
      tab: ''
    }
  },
  components:{
    Scratchpad,
    Timerspad
  },
  methods:{
    tabs(e){
      this.tab = e.target.id

    }
  },
  computed: mapState({
    columns: state => state.columns,
    timers: state => state.timers
  })
}
</script>
