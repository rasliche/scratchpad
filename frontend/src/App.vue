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
    document.title = 'Scratchy'

    // start state of app when created with that of localStorage
    var state = JSON.parse(localStorage.getItem('state'))
    if (state){
      this.$store.dispatch('update_state', state)
    }

    // save stat to localStorage every 1 minute 
    setInterval(()=>{
      localStorage.setItem('state',JSON.stringify(this.$store.state))
      this.$store.dispatch('calculate_used_storage')
    }, 60000)

    // start the note alerts sentinel
    

  },
  computed: {
    ...mapState({
    alerts: state => state.alerts
  })}
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
