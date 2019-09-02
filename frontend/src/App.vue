<template>
  <div id="app">
    <Navbar />
    <Alert class="alert-pos" v-for="alert in alerts" :key="alert.id"  :alert="alert"/>
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
    setInterval((()=>{
      this.columns.forEach(col => {
        col.notes.forEach(note => {
          var incomplete_reminders = note.alerts.filter((alert) => alert.completed === false)
          var now = new Date()
          var h = now.getHours()
          var m = now.getMinutes()
          incomplete_reminders.forEach((reminder) => {
            var rem_h = parseInt(reminder.time.split(':')[0])
            var rem_m = parseInt(reminder.time.split(':')[1])
            if(rem_h === h || rem_h < h){
              if(rem_m === m || rem_m < m){
                this.$store.dispatch('add_alert', {message: `REMINDER: ${note.text}`, error: false})
                this.$store.dispatch('update_reminder', {columnid:col.id, noteid:note.id, reminderid: reminder.id})
              }
            }
          })
        })
      });
    }), 10000)
    

  },
  computed: {
    ...mapState({
    alerts: state => state.alerts,
    columns: state => state.columns
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

.alert-pos{
  position: absolute!important;
  right: 20px;
  top:120px;
  z-index: 201010;
}
</style>
