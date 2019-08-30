<template>
  <div>
    <li class="list-group-item mb-2">
      <small class="spt font-italic">{{ note.created | toHumanDate }}</small>
      <small :class="note.done ? 'pts badge badge-success' : 'pts badge badge-warning'"
      >{{ note.done ? 'Done' : '' }}</small>
      <span v-if="note_has_active_alerts">
        <small v-for="notealert in note.alerts" :key="notealert.time" class="badge badge-warning mr-2">{{ notealert.time}}</small>
      </span>
      <small class="pts2">#{{ note.id }}</small>
      <p class="text-left mt-2 mr-5 pr-5">{{note.text}}</p>
      <div class="text-left">
        <span class="mr-2">
          <a href="javascript:void(0)" class="text-success" @click="toggle_done">{{ note.done ? 'Undo' : 'Done' }}</a>
        </span>
        <span v-if="show_settings" class="mr-2">
          <a v-if="!note_has_active_alerts" href="javascript:void(0)" class="text-info" @click="set_alert">Set Alert</a>
          <a v-else @click="delete_note_alerts" href="javascript:void(0)" class="text-info">Delete Alerts</a>
        </span>
        <input @keyup.enter="add_note_alert" v-if="setting_alert" type="text" class="p-1 mr-2" placeholder="hh:mm (Enter to save)">
        <span v-if="show_settings" class="mr-2">
          <a href="javascript:void(0)" class="text-danger" @click="delete_note">Delete</a>
        </span>
        <span>
          <a @click="toggle_settings" href="javascript:void(0)" class="text-muted">{{ show_settings ? 'Cancel' : 'More'}}</a>
          </span>
      </div>
    </li>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'NoteItem',
  data(){
    return{
      show_settings: false,
      setting_alert: false
    }
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  filters:{
    toHumanDate(d){
      return moment(d).calendar()
    }
  },
  methods:{
    set_alert(){
      this.setting_alert = true
    },
    toggle_settings(){
      this.show_settings = !this.show_settings
      this.setting_alert = false
    },
    toggle_done(){
      this.$store.dispatch('toggle_done', this.note.id)
    },
    delete_note(){
      if(confirm('Delete note?')){
        this.$store.dispatch('delete_note', this.note.id)
      }
    },
    add_note_alert(e){
      this.$store.dispatch('add_note_alert', {noteid: this.note.id, time:e.target.value})
      this.$store.dispatch('add_alert', {message: `Alert set for todo #${this.note.id} at ${e.target.value}`, error:false})
      e.target.value = ''
      this.toggle_settings()
    },
    delete_note_alerts(){
      this.$store.dispatch('delete_note_alerts', this.note.id)
      this.toggle_settings()
    }
  },
  computed:{
    note_has_active_alerts(){
      if(this.note.alerts != undefined){
        if(this.note.alerts.filter((n)=> n.completed === false).length > 0){
          return true
        }
      }
      return false 
    }
  }
}
</script>

<style>
.spt{
  position: absolute!important;
  right: 10px!important;
  bottom: 15px!important;
}
.pts2{
  position: absolute!important;
  right: 10px!important;
}
.pts{
  position: absolute!important;
  right: 70px!important;
}
</style>