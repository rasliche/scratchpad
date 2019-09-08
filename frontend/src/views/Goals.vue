<template>
  <div class="m-3">
    <b-card-group deck>
      <b-card 
        v-for="goal in goals"
        :key="goal.id"
        bg-variant="default" 
        :header="goal.title" class="text-center goal_card">
        <b-card-text>{{goal.description}} {{percentageComplete}}% done!</b-card-text>
        <b-progress :value="percentageComplete" :max="100" show-progress animated></b-progress>
        <hr>
        <h3 class="text-left">Goal tasks</h3>
        <b-list-group>
          <b-list-group-item v-for="task in goalTasks" :key="task.id" class="d-flex justify-content-between align-items-center">
            #{{ task.id }} {{ task.text }} 
            <b-badge variant="primary" pill>{{ task.done ? 'done' : 'not done' }}</b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Goals',
  data(){
    return {
      goalTasks: [],
      percentageComplete: 0
    }
  },
  computed: {
    ...mapState('goals',{
      goals: state => state.goals
    }),
    ...mapState({
      columns: state => state.columns
    })
  },
  created(){
    this.goals.forEach(goal => {
      goal.tasks.forEach(goalTask => {
        var column = this.columns.find(col => col.id === goalTask.columnId)
        if(column){
          var task = column.tasks.find(t => t.id === goalTask.taskId)
          if(task){
            this.goalTasks.push(task)
          }
        }
      });
    });
    var goalTasksDone = this.goalTasks.filter(task => task.done === true).length
    var goalTasksTotal = this.goalTasks.length
    this.percentageComplete = parseFloat(((goalTasksDone / goalTasksTotal ) * 100).toFixed(2))
  }
}
</script>

<style>
.goal_card{
  max-width: 50rem;
  margin: auto!important;
}
</style>