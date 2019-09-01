<template>
  <li class="nav-item">
    <input v-if="startEdit" @keyup.enter="save_new_title" v-model="newTitle" type="text" class="form-control border-warning">
    <a v-else href="javascript:void(0)" @click="tab" :class="activeTab == column.id ? 'nav-link active' : 'nav-link'" :id="column.id"><font-awesome-icon v-if="activeTab === column.id" @click="toggle_edit_title" icon="pen"/> {{ column.title }} ({{notes_note_done}})</a>
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
    notes_note_done(){
      return this.column.notes.filter((n) => n.done === false).length
    },
    ...mapState({
    activeTab: state => state.activeTab
  })},
  methods:{
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