<template>
  <div>
    <div class="row ml-1">
      <div class="col-6">
        <Scratchpad v-for="column in columns" :key="column.id" :column="column"/>
      </div>
    </div>
  </div>
</template>

<script>
import Scratchpad from '../components/Scratchpad'
import { mapState } from 'vuex';

export default  {
  name:'Home',
  components:{
    Scratchpad,
  },
  computed: mapState({
    columns: state => state.columns
  })
}
</script>
