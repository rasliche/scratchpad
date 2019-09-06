<template>
  <div class="text-left ml-3 margin-top-120">
    <h1 class="mb-4">Settings</h1>
    <div class="mt-4">
      <h4>Data</h4>
      <a @click="download_data" href="javascript:void(0)">Export data (.json)</a>
    </div>
    <div class="mt-4">
      <h4>Delete columns</h4>
      <select @change="update_selected" class="form-control">
        <option value="" selected >Select a column</option>
        <option v-for="column in columns" :key="column.id" :value="column.id">{{ column.id }}) {{ column.title }}</option>
      </select>
      <p class="mt-4">
        <a @click="delete_column" v-if="selected_col_label" class="text-white p-3 bg-danger" href="javascript:void(0)">Delete column "{{ selected_col_label }}"</a>
      </p>
    </div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import {mapState} from 'vuex'
export default {
  name: 'Settings',
  data(){
    return {
      colid: null,
      selected_col_label: ''
    }
  },
  methods:{
    update_selected(e){
      var col = e.target.selectedOptions[0].value
      var label = e.target.selectedOptions[0].innerText
      this.selected_col_label = label
      this.colid = parseInt(col)
    },
    delete_column(){
      if(confirm(`Delete column ${this.selected_col_label}?`)){
        this.$store.dispatch('delete_column', {columnid: this.colid})
        this.colid = null
        this.selected_col_label = ''
      }
    },
    download_data(){
      var blob = new Blob([localStorage.getItem('state')], {type: "text/plain;charset=utf-8"});
      saveAs(blob, `your-data-${new Date().getTime()}.txt`);
    }
  },
  computed: mapState({
    columns: state => state.columns
  })
}
</script>

<style>

</style>