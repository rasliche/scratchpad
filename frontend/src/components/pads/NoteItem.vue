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
    <p>
      <input @keyup.enter="save_reminder" v-if="setting_reminder" v-model="reminder_input" type="text" placeholder=" hh:mm (Enter to save)">
    </p>
    <div class="text-left">
      <span class="mr-3">
        <a href="javascript:void(0)" class="text-success" @click="toggle_done"><font-awesome-icon icon="check"/> {{ dnote.done ? 'Undo' : 'Done' }}</a>
      </span>
      <b-dropdown size="sm" text="More" variant="outline-secondary" class="m-2">
        <b-dropdown-item-button v-if="!edit" @click="toggle_edit"><font-awesome-icon icon="pen" class="text-info mr-3"/>Edit</b-dropdown-item-button>
        <b-dropdown-item-button v-else @click="save_edit"><font-awesome-icon icon="save" class="text-info mr-3"/>Save</b-dropdown-item-button>
        <b-dropdown-item-button @click="set_reminder"><font-awesome-icon icon="clock" class="text-info mr-3"/>Remind me</b-dropdown-item-button>
        <select @change="move_note_across" class="custom-select custom-select-sm">
          <option>Move to ...</option>
          <option v-for="col in columns" :key="col.id" :value="col.id">{{ col.title }}</option>
        </select>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item-button @click="delete_note"><font-awesome-icon icon="trash" class="text-danger mr-3"/>Delete</b-dropdown-item-button>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {mapState} from 'vuex'
export default {
  name: 'NoteItem',
  data(){
    return{
      new_text: this.note.text,
      edit:false,
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
    move_note_across(e){
      var fromColId = parseInt(this.columnid)
      var toColId = parseInt(e.target.value)
      var noteid = this.dnote.id      
      this.$store.dispatch('move_note', {fromColId, toColId, noteid})
    },
    save_reminder(){
      if(this.reminder_input.match(/^\d\d:\d\d$/gsi) && this.reminder_input.match(/^[0-2][0-9]:[0-5][0-9]$/)){
        this.$store.dispatch('add_reminder', {columnid: this.columnid, noteid: this.dnote.id, time: this.reminder_input})
        this.reminder_input = ''
        this.toggle_settings()
      }else{
        this.error_message = 'Entry must be 24h based.'
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
    ...mapState(['columns']),
    notealerts(){
      // filter reminders that have not been raised     
      return this.dnote.alerts.filter((alert) => alert.completed === false)
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