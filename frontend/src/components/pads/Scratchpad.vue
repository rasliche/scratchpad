<template>
  <div class="text-left">
    <p class="text-left">
      <span class="mr-2">
        <font-awesome-icon icon="filter" class="mr-2"/>
          <a href="javascript:void(0)" @click="showalltasks">{{ showall ? 'Hide done' : 'Show all (' + column.tasks.length + ')' }} </a>
      </span>
    </p>
    <div class="list-group scratch pt-2 pb-2">
      <p class="text-center text-info mt-5 mb-5" v-if="tasks_not_done.length == 0 & !showall">¯\_(ツ)_/¯ Nothing here</p>
      <div v-if="!showall">
        <TaskItem v-for="task in tasks_not_done" :key="task.id" :note="task" :columnid="column.id"/>
      </div>
      <div v-else>
        <TaskItem v-for="task in column.tasks" :key="task.id" :note="task" :columnid="column.id" />
      </div>
    </div>
    <textarea id="task_text" type="text" placeholder='(Shift+Enter to save)' class="mt-4 mb-3 form-control bg-transparent" 
    @keyup.shift.enter="add_task($event, column)" rows="6"></textarea>
    <p>
      <a class="text-white p-2 bg-success" href="javascript:void(0)" @click="add_task(false, column)">Add</a> &nbsp; 
    </p>
  </div>
</template>

<script>
import TaskItem from './TaskItem'
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
    TaskItem
  },
  methods:{
    showalltasks(){this.showall = !this.showall},
    add_task(e, column){
      var tasktext;
      if(!e){
        tasktext = document.getElementById('task_text').value
      }else{
        tasktext = e.target.value
      }
      var columnid = column.id
      if(tasktext != ''){
        this.$store.dispatch('add_task', {columnid, text: tasktext})
        if(e){
          e.target.value = ''
        }else{
          document.getElementById('task_text').value = ''
        }
      }else{
        alert('Type something.')
      }
    }
  },
  computed: {
    tasks_not_done(){
      return this.column.tasks.filter((task) => task.done === false)
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