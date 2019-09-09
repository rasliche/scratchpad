<template>
  <div class="list-group-item mb-2" draggable @dragstart="pickuptask($event, task.id, columnid)">
    <small class="spt font-italic">{{ task.created | toHumanDate }}</small>
    <p>    
      <span class="mr-2"><small v-if="error_message" class="text-danger mr-2 error-message">{{error_message}}</small>#{{ task.id }}</span>
      <span :class="task.done ? 'badge badge-success mr-2' : 'badge badge-warning mr-2'">{{ task.done ? 'Done' : '' }}</span>
      <span v-for="goal in taskGoals" :key="goal.id" class="badge badge-success mr-2">{{ goal.title }}</span>
      <span class="badge badge-info">Due {{ task.dueDate | toHumanDate }}</span>
    </p>
    <p class="pts3">
      <span v-for="alert in taskalerts" :key="alert.time" class="badge badge-warning mr-2">
        <font-awesome-icon icon="clock"/> {{alert.time}}
      </span>
    </p>
    <p v-if="!edit" class="text-left mt-4 mb-3 mr-5 pr-5">{{ task.text }}</p>
    <p v-else>
      <input @keyup.enter="save_edit" v-model="new_text" type="text" class="form-control border-warning mt-3 mb-3 mr-5">
    </p>
    <p>
      <input @keyup.enter="save_reminder" v-if="setting_reminder" v-model="reminder_input" type="text" placeholder=" hh:mm (Enter to save)">
    </p>
    <div class="text-left">
      <span class="mr-3">
        <a href="javascript:void(0)" class="text-success" @click="toggle_done"><font-awesome-icon icon="check"/> {{ task.done ? 'Undo' : 'Done' }}</a>
      </span>
      <b-dropdown size="sm" text="More" variant="outline-secondary" class="m-2">
        <b-dropdown-item-button v-if="!edit" @click="edit = !edit"><font-awesome-icon icon="pen" class="text-info mr-3"/>Edit</b-dropdown-item-button>
        <b-dropdown-item-button v-else @click="save_edit"><font-awesome-icon icon="save" class="text-info mr-3"/>Save</b-dropdown-item-button>
        <b-dropdown-item-button @click="setting_reminder = !setting_reminder"><font-awesome-icon icon="clock" class="text-info mr-3"/>Remind me</b-dropdown-item-button>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item-button @click="delete_task"><font-awesome-icon icon="trash" class="text-danger mr-3"/>Delete</b-dropdown-item-button>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {mapState} from 'vuex'
export default {
  name: 'TaskItem',
  data(){
    return{
      new_text: this.note.text,
      edit:false,
      task: this.note, // props are not reactive. To ensure reactivity remains, they must be used as local data properties.
      reminder_input: '',
      setting_reminder: false,
      error_message: '',
      taskGoals: []
    }
  },
  props: {
    note: {
      type: Object,
      required: true
    },
    columnid: {
      type: Number,
      required: true
    }
  },
  filters:{
    toHumanDate(d){
      return moment(d).calendar()
    }
  },
  methods:{
    pickuptask(e, taskid, columnid){
      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.dropEffect = "move"
      e.dataTransfer.setData('taskid', taskid)
      e.dataTransfer.setData('columnid', columnid)
    },
    save_reminder(){
      if(this.reminder_input.match(/^\d\d:\d\d$/gsi) && this.reminder_input.match(/^[0-2][0-9]:[0-5][0-9]$/)){
        this.$store.dispatch('add_reminder', {taskid: this.task.id, time: this.reminder_input})
        this.reminder_input = ''
        this.toggle_settings()
      }else{
        this.error_message = 'Entry must be 24h based.'
        setTimeout(()=>{
          this.error_message = ''
        }, 3000)
      }
    },
    save_edit(){
      this.$store.dispatch('update_task', {taskid: this.task.id, text: this.new_text})
      this.toggle_settings()
    },
    toggle_settings(){
      // "cancel" action
      this.setting_reminder = false
      this.edit = false
    },
    toggle_done(){
      this.$store.dispatch('toggle_done', {taskid: this.task.id})
    },
    delete_task(){
      if(confirm('Delete task?')){
        this.$store.dispatch('delete_task', {taskid: this.task.id})
      }
    }
  },
  computed:{
    ...mapState(['columns']),
    taskalerts(){
      return this.task.alerts.filter((alert) => alert.completed === false)
    }
  },
  created(){
    this.$store.state.goals.goals.forEach(goal => {
      if(goal.tasks.find(t => t.taskId === this.task.id)){
        this.taskGoals.push(goal)
      }
    });
  }
}
</script>

<style>

input:focus, input.form-control:focus{
  outline-width: 0 !important;
  box-shadow: none;
  outline: none!important;
}
.spt{
  position: absolute!important;
  right: 10px!important;
  bottom: 15px!important;
}
.pts2{
  position: absolute!important;
  right: 10px!important;
}
.pts3{
  position: absolute!important;
  left: 20px!important;
}
.pts{
  position: absolute!important;
  right: 70px!important;
}
</style>