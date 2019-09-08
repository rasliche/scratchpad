<template>
  <div class="m-auto" style="max-width:35rem;">
    <b-card-group deck class="ml-3 mr-3">
      <b-card header="Do this today">
        <div v-if="tasks_due_today.length > 0">
          <b-card-text v-for="task in tasks_due_today" :key="task.id" class="text-left">
            <b-form-checkbox @change="confirm_done(task.columnid, task.id)" :value="task.id" :id="`cb-${task.id}`">
              <router-link to="/tasks">{{task.text}}</router-link>
            </b-form-checkbox>          
          </b-card-text>
        </div>
        <b-card-text v-else class="text-success">🥳 Yay! It's all done.</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
/*
  show a checkbox and task description if due today
  if checked then confirmation to mark task done should be prompted
*/
import { mapState, mapActions} from 'vuex'
export default {
  name:'Dashboard',
  computed:{
    tasks_due_today(){
      var tasksDueToday = [];
      this.columns.forEach(col => {  
        var colTasksDue = col.tasks.filter((task)=> task.due === true && task.done === false && task.dueDate === new Date().toDateString())
        tasksDueToday = tasksDueToday.concat(colTasksDue)              
      });
      return tasksDueToday
    },
    ...mapState({
      columns: state => state.columns
    })
  },
  methods:{
    ...mapActions({
      toggle_done: 'toggle_done'
    }),
    confirm_done(columnid, taskid){
      if(confirm(`Mark task #${taskid} as "done"?`)){
        this.toggle_done({columnid, taskid})
      }else{
        // TODO: prevent checkbox from being checked.
      }
    }
  }
}
</script>

<style scoped>
p{
  margin-bottom: 0.5rem!important; 
}
</style>