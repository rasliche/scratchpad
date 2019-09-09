<template>
  <li class="nav-item" 
    @dragover.prevent 
    @dragenter.prevent 
    @dragenter="highlight($event)" 
    @dragleave="highlight($event)" 
    @drop="drop_task($event, column.id)">
    <input 
      v-if="startEdit" 
      @keyup.enter="save_new_title" 
      v-model="newTitle" type="text" class="form-control border-warning">
    <a v-else href="javascript:void(0)" @click="tab" :class="activeTab == column.id ? 'nav-link active' : 'nav-link'" :id="column.id">
      <font-awesome-icon v-if="activeTab === column.id" @click="toggle_edit_title" icon="pen"/> {{ column.title }} ({{tasks_not_done}})
    </a>
  </li>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Tab',
  data(){
    return{
      startEdit:false,
      newTitle: this.column.title
    }
  },
  props:{
    column:{
      type: Object,
      required: true
    }
  },
  computed:{
    tasks_not_done(){
      return this.column.tasks.filter((t) => t.done === false).length
    },
    ...mapState({
    activeTab: state => state.activeTab
  })},
  methods:{
    highlight(e){
      const bg = e.target.style.background
      if(bg){
        e.target.style.background = null;
        e.target.style.color = "#007bff"
      }else{
        e.target.style.background = "#17a2b8"
        e.target.style.color = "white"
      }
    },
    drop_task(e, toColId){
      const fromColId = parseInt(e.dataTransfer.getData('columnid'))
      const taskid = parseInt(e.dataTransfer.getData('taskid'))
      this.$store.dispatch('move_task', {fromColId, toColId, taskid})
      e.target.style.background = null
      e.target.style.color = "#007bff"
    },
    tab(){
      this.$store.dispatch('update_active_tab', this.column.id)
    },
    toggle_edit_title(){
      this.startEdit = !this.startEdit
    },
    save_new_title(){
      this.toggle_edit_title()
      this.$store.dispatch('save_new_title', {columnid:this.column.id, newtitle: this.newTitle})
    }
  }
}
</script>

<style>

</style>