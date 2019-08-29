<template>
  <div class="text-left ml-3">
    <h3 class="mb-4">{{column.title}}</h3>
    <ul class="list-group mb-4" id="scratch">
      <p class="text-center text-info" v-if="notes_not_done.length == 0">¯\_(ツ)_/¯ Nothing here</p>
      <div v-if="!showall">
        <Note v-for="note in notes_not_done" :key="note.id" :note="note" />
      </div>
      <div v-else>
        <Note v-for="note in column.notes" :key="note.id" :note="note" />
      </div>
    </ul>
    <textarea type="text" placeholder='(Shift+Enter to save)' class="form-control mt-2 mb-2 bg-transparent" 
    @keyup.shift.enter="add_note($event, column)"
    rows="6"></textarea>
    <a href="#">Alerts</a> &nbsp; <a href="#" @click="showallnotes">{{ showall ? 'Hide done' : 'Show all'}}</a>
  </div>
</template>

<script>
/* eslint-disable */
import Note from './Note'
export default {
  name: 'Scratchpad',
  props:{
    column: {
      type: Object,
      required: true
    }
  },
  data(){return{showall:false}},
  components:{
    Note
  },
  methods:{
    showallnotes(){this.showall = !this.showall},
    add_note(e, column){
      var notetext = e.target.value
      var columnid = column.id
      var note = {
        id: new Date().getTime().toString(),
        text: notetext,
        done: false,
        created: new Date().toUTCString()
      }
      if(notetext != ''){
        this.$store.dispatch('add_note', {columnid, note})
        e.target.value = ''
      }else{
        alert('Type something.')
      }
    }
  },
  computed: {
    notes_not_done(columnid){
      return this.column.notes.filter((note) => note.done == false)
    }
  }
}
</script>

<style>
#scratch{
  max-height: 400px;
  overflow-y: scroll;
}
</style>