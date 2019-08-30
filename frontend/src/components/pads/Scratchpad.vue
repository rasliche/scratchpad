<template>
  <div class="text-left">
    <ul class="list-group scratch">
      <p class="text-center text-info" v-if="notes_not_done.length == 0 & !showall">¯\_(ツ)_/¯ Nothing here</p>
      <div v-if="!showall">
        <NoteItem v-for="note in notes_not_done" :key="note.id" :note="note" />
      </div>
      <div v-else>
        <NoteItem v-for="note in column.notes" :key="note.id" :note="note" />
      </div>
    </ul>
    <textarea id="todo_text" type="text" placeholder='(Shift+Enter to save)' class="mt-4 mb-3 form-control bg-transparent" 
    @keyup.shift.enter="add_note($event, column)"
    rows="6"></textarea>
    <p>
      <a href="javascript:void(0)" @click="add_note(false, column)">Add</a> &nbsp; 
      <a href="javascript:void(0)" @click="showallnotes">{{ showall ? 'Hide done' : 'Show all (' + column.notes.length + ')' }} </a>
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
  max-height: 400px;
  overflow-y: scroll;
}
</style>