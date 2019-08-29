<template>
  <div id="app">
    <Navbar />
    <Alert v-for="alert in alerts" :key="alert.id"  :alert="alert"/>
    <router-view/>
  </div>
</template>

<script>
import Alert from './components/Alert'
import Navbar from './components/Navbar'
import {mapState} from 'vuex'
export default {
  name: 'app',
  components:{
    Alert,
    Navbar
  },
  created(){
    var state = JSON.parse(localStorage.getItem('state'))
    if (state){
      this.$store.dispatch('update_state', state)
    }
    setInterval(()=>{
      localStorage.setItem('state',JSON.stringify(this.$store.state))
    }, 10000)
  },
  computed: mapState({
    alerts: (state) => state.alerts
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html{
  overflow-x:hidden;
}
</style>
