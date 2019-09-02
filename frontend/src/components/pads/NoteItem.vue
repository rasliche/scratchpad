<template>
  <div class="list-group-item mb-2">
    <small class="spt font-italic">{{ dnote.created | toHumanDate }}</small>
    <small :class="dnote.done ? 'pts badge badge-success' : 'pts badge badge-warning'">{{ dnote.done ? 'Done' : '' }}</small>
    <small class="pts2"><span v-if="error_message" class="text-danger error-message">{{error_message}}</span> #{{ dnote.id }}</small>
    <p class="pts3">
      <span v-for="notealert in notealerts" :key="notealert.time" class="badge badge-warning mr-2">
        <font-awesome-icon icon="clock"/> {{notealert.time}}
      </span>
    </p>

    <p v-if="!edit" class="text-left mt-5 mb-3 mr-5 pr-5">{{ dnote.text }}</p>
    <p v-else>
      <input @keyup.enter="save_edit" v-model="new_text" type="text" class="form-control border-warning mt-3 mb-3 mr-5">
    </p>
    
    <div class="text-left">
      <span class="mr-3">
        <a href="javascript:void(0)" class="text-success" @click="toggle_done"><font-awesome-icon icon="check"/> {{ dnote.done ? 'Undo' : 'Done' }}</a>
      </span>
      <div v-if="show_settings" class="d-inline">
        <span class="mr-3">
          <a v-if="!edit" href="javascript:void(0)" class="text-info" @click="toggle_edit"><font-awesome-icon icon="pen"/> Edit</a>
          <a v-else href="javascript:void(0)" class="text-info" @click="save_edit"><font-awesome-icon icon="pen"/> Save</a>
        </span>
        <span class="mr-3">
          <a href="javascript:void(0)" class="text-info mr-2" @click="set_reminder"><font-awesome-icon icon="clock"/> Remind me</a>
          <input @keyup.enter="save_reminder" v-if="setting_reminder" v-model="reminder_input" type="text" placeholder=" hh:mm (Enter to save)">
        </span>
        <span class="mr-3">
          <a href="javascript:void(0)" class="text-danger" @click="delete_note"><font-awesome-icon icon="trash"/> Delete</a>
        </span>
      </div>
      <span>
        <a @click="toggle_settings" href="javascript:void(0)" class="text-muted">{{ show_settings ? 'Cancel' : 'More'}}</a>
      </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'NoteItem',
  data(){
    return{
      new_text: this.note.text,
      edit:false,
      show_settings: false,
      dnote: this.note, // props are not reactive. To ensure reactivity remains, they must be used as local data properties.
      reminder_input: '',
      setting_reminder: false,
      error_message: ''
    }
  },
  props: {
    note: {
      type: Object,
      required: true
    },
    columnid: {
      type: Number,
      required: true
    }
  },
  filters:{
    toHumanDate(d){
      return moment(d).calendar()
    }
  },
  methods:{
    save_reminder(){
      if(this.reminder_input.match(/^\d\d:\d\d$/gsi)){
        this.$store.dispatch('add_note_alert', {columnid: this.columnid, noteid: this.dnote.id, time: this.reminder_input})
        this.reminder_input = ''
        this.toggle_settings()
      }else{
        this.error_message = 'Entry must be formatted hh:mm.'
        setTimeout(()=>{
          this.error_message = ''
        }, 3000)
      }
    },
    set_reminder(){
      this.setting_reminder = !this.setting_reminder
    },
    save_edit(){
      this.$store.dispatch('update_note', {columnid: this.columnid, noteid: this.dnote.id, text: this.new_text})
      this.toggle_settings()
    },
    toggle_edit(){
      this.edit = !this.edit
    },
    toggle_settings(){
      // "cancel" action
      this.show_settings = !this.show_settings
      this.setting_reminder = false
      this.edit = false
    },
    toggle_done(){
      this.$store.dispatch('toggle_done', {columnid: this.columnid, noteid: this.dnote.id})
    },
    delete_note(){
      if(confirm('Delete note?')){
        this.$store.dispatch('delete_note', {columnid: this.columnid, noteid: this.dnote.id})
      }
    }
  },
  computed:{
    notealerts(){
      // eslint-disable-next-line
      console.log(this.dnote.alerts);
      
      return this.dnote.alerts
    }
  }
}
</script>

<style>

input:focus, input.form-control:focus{
  outline-width: 0 !important;
  box-shadow: none;
  outline: none!important;
}
.spt{
  position: absolute!important;
  right: 10px!important;
  bottom: 15px!important;
}
.pts2{
  position: absolute!important;
  right: 10px!important;
}
.pts3{
  position: absolute!important;
  left: 20px!important;
}
.pts{
  position: absolute!important;
  right: 70px!important;
}
</style>