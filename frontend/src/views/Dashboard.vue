<template>
  <div class="m-auto">
    <b-card-group deck class="ml-3 mr-3" >
      <b-card header="Due Today" class="m-3 ml-5 mr-5" style="height:20rem;overflow-y:scroll;">
        <div v-if="tasks_due_today.length > 0">
          <SmallTasksItem v-for="task in other_active_tasks" :key="task.id" :task="task"/>
        </div>
        <div v-else>
          <b-card-text class="text-success" style="line-height:13">🥳 You don't have anything due today!</b-card-text>
        </div>
      </b-card>

      <b-card header="My Goals" class="m-3 ml-5 mr-5" style="height:20rem;overflow-y:scroll;">
        <div v-if="activeGoals.length > 0">
          <b-card-text v-for="goal in activeGoals" :key="goal.id" class="text-left">
            <b-progress :max="100" variant="success" height="1.5rem" animated>
              <b-progress-bar :value="get_percentage_completed(goal.id)" class="font-weight-bold text-dark">{{ goal.title }} - ({{ get_percentage_completed(goal.id) }} %)</b-progress-bar>
            </b-progress>
            <span class="badge-info badge mr-2">Due {{ goal.dueDate | toHumanDate }}</span>
            <span v-if="get_percentage_completed(goal.id) == 100">
              <a href="javascript:void(0)" @click="complete_goal(goal.id)">Complete</a>
            </span>
            <hr>
          </b-card-text>
        </div>
        <div v-else>
          <b-card-text class="text-success" style="line-height:13">🤯 You don't have any active goals!</b-card-text>
        </div>
      </b-card>
    </b-card-group>

    <div class="row">
      <div class="col">
          <b-card header="All Active Tasks" class="m-3 ml-5 mr-5" style="height:20rem;overflow-y:scroll;">
            <div v-if="other_active_tasks.length > 0">
              <SmallTasksItem v-for="task in other_active_tasks" :key="task.id" :task="task"/>
            </div>
            <div v-else>
              <b-card-text class="text-success" style="line-height:13">😕 You don't have anything to show!</b-card-text>
            </div>
          </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters} from 'vuex'
import moment from 'moment'
import SmallTasksItem from '../components/pads/regular_tasks/SmallTaskItem'

export default {
  name:'Dashboard',
  data(){
    return {
      u : 0
    }
  },
  components:{
    SmallTasksItem
  },
  filters:{
    toHumanDate(d){
      return moment(d).format("MMM Do YYYY")
    }
  },
  computed:{
    ...mapState('goals',{activeGoals: state => state.goals.filter((goal) => goal.completed === false)}),
    ...mapState({columns: state => state.columns}),
    ...mapGetters('goals', ['get_percentage_completed']),
    ...mapGetters(['allTasks']),

    tasks_due_today(){
      var tasksDueToday = [];
      this.columns.forEach(col => {        
        var colTasksDue = col.tasks.filter((task)=> task.due === true && task.done === false && task.dueDate === moment().format('YYYY-MM-DD'))
        tasksDueToday = tasksDueToday.concat(colTasksDue)              
      });
      return tasksDueToday
    },
    other_active_tasks(){
      return this.allTasks.filter((task) => task.done === false)
    }
  },
  methods:{
    ...mapActions(['toggle_done']),
    ...mapActions('goals',['complete_goal']),
    confirm_done(columnid, taskid){
      if(confirm(`Mark task #${taskid} as "done"?`)){
        this.toggle_done({columnid, taskid})
      }else{
        // TODO: prevent checkbox from being checked.
      }
    },
    updateSelf(){
      this.u++
    }
  }
}
</script>

<style scoped>
p{
  margin-bottom: 0.5rem!important; 
}
</style>