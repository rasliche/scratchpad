<template>
  <div class="text-left">
    <p class="text-left">
      <span class="mr-2">
        <font-awesome-icon icon="filter" class="mr-2"/>
          <a href="javascript:void(0)" @click="showallnotes">{{ showall ? 'Hide done' : 'Show all (' + column.notes.length + ')' }} </a>
      </span>
    </p>
    <div class="list-group scratch pt-2 pb-2">
      <p class="text-center text-info mt-5 mb-5" v-if="notes_not_done.length == 0 & !showall">¯\_(ツ)_/¯ Nothing here</p>
      <div v-if="!showall">
        <NoteItem v-for="note in notes_not_done" :key="note.id" :note="note" :columnid="column.id"/>
      </div>
      <div v-else>
        <NoteItem v-for="note in column.notes" :key="note.id" :note="note" :columnid="column.id" />
      </div>
    </div>
    <textarea id="todo_text" type="text" placeholder='(Shift+Enter to save)' class="mt-4 mb-3 form-control bg-transparent" 
    @keyup.shift.enter="add_note($event, column)" rows="6"></textarea>
    <p>
      <a class="text-white p-2 bg-success" href="javascript:void(0)" @click="add_note(false, column)">Add</a> &nbsp; 
    </p>
  </div>
</template>

<script>
import NoteItem from './NoteItem'
export default {
  name: 'Scratchpad',
  props:{
    column: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      filtering: false,
      showall:false
    }
  },
  components:{
    NoteItem
  },
  methods:{
    showallnotes(){this.showall = !this.showall},
    add_note(e, column){
      var notetext;
      if(!e){
        notetext = document.getElementById('todo_text').value
      }else{
        notetext = e.target.value
      }
      var columnid = column.id
      var note = {
        id: Math.floor(Math.random() * 100000),
        text: notetext,
        done: false,
        alerts: [],
        created: new Date().toUTCString()
      }
      if(notetext != ''){
        this.$store.dispatch('add_note', {columnid, note})
        if(e){
          e.target.value = ''
        }else{
          document.getElementById('todo_text').value = ''
        }
      }else{
        alert('Type something.')
      }
    }
  },
  computed: {
    notes_not_done(){
      return this.column.notes.filter((note) => note.done == false)
    }
  }
}
</script>

<style>
.scratch{
  max-height: 500px;
  overflow-y: scroll;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
textarea.form-control:focus{
  outline-width: 0 !important;
  box-shadow: none;
  outline: none!important;
}
</style>