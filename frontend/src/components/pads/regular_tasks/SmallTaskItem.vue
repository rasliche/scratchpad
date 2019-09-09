<template>
  <b-card-text class="text-left">
    <b-form-checkbox @change="confirm_done(task.id)" :value="task.id" :id="`cb-${task.id}`">
      <p># {{task.id}} - <router-link to="/tasks">{{task.text}}</router-link> </p>
    </b-form-checkbox> 
    <small class="mr-3"><span class="badge-info badge">Due {{task.dueDate | toHumanDate}}</span></small>
    <span class="badge badge-success mr-2" v-for="goal in get_task_goals(task.id)" :key="goal">{{goal}}</span>         
    <hr>
  </b-card-text>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import moment from 'moment'
export default {
  name: 'SmallTaskItem',
  props:{
    task: {
      type: Object,
      required: true
    }
  },
  filters:{
    toHumanDate(d){
      return moment(d).format("MMM Do YYYY")
    }
  },
  methods:{
    ...mapActions(['toggle_done']),
    ...mapActions('goals',['complete_goal']),
    confirm_done(taskid){
      if(confirm(`Mark task #${taskid} as "done"?`)){
        this.toggle_done({taskid})
      }else{
        // TODO: prevent checkbox from being checked.
      }
    }
  },
  computed:{
    ...mapGetters(['get_task_goals'])
  }
}
</script>

<style>

</style>