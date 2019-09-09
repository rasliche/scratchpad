<template>
  <div class="m-auto">
    <b-card-group deck class="ml-3 mr-3">
      <b-card header="Due Today">
        <div v-if="tasks_due_today.length > 0">
          <b-card-text v-for="task in tasks_due_today" :key="task.id" class="text-left">
            <b-form-checkbox @change="confirm_done(task.columnid, task.id)" :value="task.id" :id="`cb-${task.id}`">
              <router-link to="/tasks">{{task.text}}</router-link>
            </b-form-checkbox> 
            <span class="badge badge-info" v-for="goal in get_task_goals(task.id)" :key="goal">{{goal}}</span>         
            <hr>
          </b-card-text>
        </div>
        <b-card-text v-else class="text-success">🥳 Yay! It's all done.</b-card-text>
      </b-card>
      <b-card header="My Goals">
        <div v-if="goals.length > 0">
          <b-card-text v-for="goal in goals" :key="goal.id" class="text-left">
            <b-progress :max="100" variant="success" height="1.5rem" animated>
              <b-progress-bar :value="get_percentage_completed(goal.id)" class="font-weight-bold text-dark">{{ goal.title }} - ({{ get_percentage_completed(goal.id) }} %)</b-progress-bar>
            </b-progress>
          </b-card-text>
        </div>
        <b-card-text v-else class="text-success">😕 You don't have any goals setup.</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
/*
  show a checkbox and task description if due today
  if checked then confirmation to mark task done should be prompted
*/
import { mapState, mapActions, mapGetters} from 'vuex'
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
    ...mapState('goals',{goals: state => state.goals}),
    ...mapState({columns: state => state.columns}),
    ...mapGetters('goals', ['get_percentage_completed']),
    ...mapGetters(['get_task_goals'])
  },
  methods:{
    ...mapActions({toggle_done: 'toggle_done'}),
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