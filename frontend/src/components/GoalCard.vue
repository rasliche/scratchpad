<template>
  <b-card 
    bg-variant="default" 
    :header="goal.title" class="text-center goal_card m-3" style="max-width:40rem;">
    <b-card-text>{{goal.description}}</b-card-text>
    <b-progress :max="100" variant="success" height="1.5rem">
      <b-progress-bar :value="percentageComplete" class="font-weight-bold text-dark">{{ percentageComplete }} % completed</b-progress-bar>
    </b-progress>
    <hr>
    <h3 class="text-left">Goal tasks</h3>
    <b-list-group>
      <b-list-group-item v-for="task in goalTasks" :key="task.id" class="d-flex justify-content-between align-items-center">
        #{{ task.id }} {{ task.text }} 
        <b-badge :variant="task.done ? 'success' : 'warning'" pill>{{ task.done ? 'done' : 'not done' }}</b-badge>
      </b-list-group-item>
    </b-list-group>
    <hr>
    <a @click="show = !show" href="javascript:void(0)" class="mr-2">Edit Goal</a>
    <a v-if="percentageComplete == 100" href="javascript:void(0)" @click="complete_goal(goal.id)">Complete</a>
    <div v-if="show">
      <div>
        <p class="text-left">Select all tasks you wish to include as part of this goal.
        If you want to add extra tasks, you also need to select the tasks already part of the goal.</p>
        <b-form-group label="Tasks To Do" class="text-left">
          <b-form-checkbox-group
            v-model="selectedOptions"
            :options="tasks_todo"
          ></b-form-checkbox-group>
        </b-form-group>
        <b-form-group label="Tasks Done" class="text-left">
          <b-form-checkbox-group
            v-model="selectedOptions"
            :options="tasks_done"
          ></b-form-checkbox-group>
        </b-form-group>
      </div>
      <a @click="removeGoal(goal.id)" href="javascript:void(0)" class="text-danger mr-2">Delete Goal</a>
      <b-button @click="updateGoal" variant="success">Update Goal</b-button>
    </div>
  </b-card>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name:'GoalCard',
  props: {
    goalObj: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      goal: this.goalObj,
      show : false,
      selectedOptions: [],
      tasks_todo :[],
      tasks_done: []
    }
  },
  computed:{
    ...mapState({
      columns: state => state.columns
    }),
    ...mapGetters('goals', ['get_goal_tasks', 'get_percentage_completed']),
    ...mapGetters(['allTasks']),
    goalTasks: function(){ return this.get_goal_tasks(this.goal.id)},
    percentageComplete: function(){return this.get_percentage_completed(this.goal.id) || 0}
  },
  methods:{
    ...mapActions('goals', ['update_goal_tasks', 'remove_goal']),
    updateGoal(){
      this.update_goal_tasks({goalId: this.goal.id, newTasksList: this.selectedOptions})
      this.show = false
    },
    removeGoal(goalId){
      if(confirm(`Delete goal "${this.goal.title}" ?`)){
        this.remove_goal(goalId)
      }
    }
  },
  created(){
    this.allTasks.filter((t) => t.done === false).forEach(task => {
      this.tasks_todo.push({text:`#${task.id} - ${task.text}`, value:{taskId:task.id}})
    });
    this.allTasks.filter((t) => t.done === true).forEach(task => {
      this.tasks_done.push({text: `#${task.id} - ${task.text}`, value:{taskId:task.id}})
    });
  }
}
</script>

<style>
.goal_card{
  max-width: 50rem;
  margin: auto!important;
}
</style>