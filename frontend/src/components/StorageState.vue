<template>
  <p class="mb-0 p-2"><font-awesome-icon icon="box-open" class="text-info" title="Local storage used"/> {{usedStorage}} %</p>
</template>

<script>
/*eslint-disable*/
import {mapState} from 'vuex'
export default {
  name: 'StorageState',
  data(){
    return {
      styleObject: {
        width: '4.6!important'
      }
    }
  },
  computed:{
    ...mapState({
    usedStorage: state => ((state.usedStorage / 5000)*100).toFixed(2)
  })}
}
</script>

<style>

</style>