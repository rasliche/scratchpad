<template>
  <div class="list-group-item mb-2">
    <small class="spt font-italic">{{ dnote.created | toHumanDate }}</small>
    <small :class="dnote.done ? 'pts badge badge-success' : 'pts badge badge-warning'">{{ dnote.done ? 'Done' : '' }}</small>
    <small class="pts2">#{{ dnote.id }}</small>

    <p v-if="!edit" class="text-left mt-3 mb-3 mr-5 pr-5">{{ dnote.text }}</p>
    <p v-else>
      <input @keyup.enter="save_edit" v-model="new_text" type="text" class="form-control border-warning border-bottom mt-3 mb-3 mr-5">
    </p>
    
    <div class="text-left">
      <span class="mr-3">
        <a href="javascript:void(0)" class="text-success" @click="toggle_done"><font-awesome-icon icon="check"/> {{ dnote.done ? 'Undo' : 'Done' }}</a>
      </span>
      <div v-if="show_settings" class="d-inline">
        <!-- <span class="mr-3">
          <a href="javascript:void(0)" class="text-info" @click="toggle_set_alert"><font-awesome-icon icon="clock"/> Set alert</a>
          <input @keyup.enter="add_note_alert" v-if="setting_alert" class="ml-2" type="text" placeholder="hh:mm (Enter to save)">
        </span> -->
        <span class="mr-3">
          <a v-if="!edit" href="javascript:void(0)" class="text-info" @click="toggle_edit"><font-awesome-icon icon="pen"/> Edit</a>
          <a v-else href="javascript:void(0)" class="text-info" @click="save_edit"><font-awesome-icon icon="pen"/> Save</a>
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
      setting_alert: false,
      dnote: this.note // props are not reactive. To ensure reactivity remains, they must be used as local data properties.
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
    save_edit(){
      this.$store.dispatch('update_note', {columnid: this.columnid, noteid: this.dnote.id, text: this.new_text})
      this.toggle_settings()
    },
    toggle_edit(){
      this.edit = !this.edit
    },
    toggle_set_alert(){!this.setting_alert
      this.setting_alert = !this.setting_alert
    },
    toggle_settings(){
      // "cancel" action
      this.show_settings = !this.show_settings
      this.setting_alert = false
      this.edit = false
    },
    toggle_done(){
      this.$store.dispatch('toggle_done', {columnid: this.columnid, noteid: this.dnote.id})
    },
    delete_note(){
      if(confirm('Delete note?')){
        this.$store.dispatch('delete_note', {columnid: this.columnid, noteid: this.dnote.id})
      }
    },
    add_note_alert(e){
      this.$store.dispatch('add_note_alert', {columnid: this.columnid, noteid: this.dnote.id, time:e.target.value})
      e.target.value = ''
      this.toggle_settings()
    },
    delete_note_alerts(){
      this.$store.dispatch('delete_note_alerts', {columnid: this.columnid, noteid: this.dnote.id})
      this.toggle_settings()
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
.pts{
  position: absolute!important;
  right: 70px!important;
}
</style>