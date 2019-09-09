<template>
  <div>
    <span @click="toggle_actionplus" class="actionplus"><font-awesome-icon v-if="show" icon="minus"/><font-awesome-icon v-else icon="plus"/></span>
    <span v-if="show" class="actionspan">
      <b-list-group>
        <b-list-group-item @click="add_new_column">
          <font-awesome-icon icon="plus" class="mr-2 text-info"/>New Column
        </b-list-group-item>
        <b-list-group-item @click="newGoalModal = !newGoalModal">
          <font-awesome-icon icon="flag" class="mr-2 text-secondary"/>New Goal
        </b-list-group-item>
        <b-list-group-item @click="toggle_timer(); toggle_actionplus();">
          <span v-if="timerOn">
            <font-awesome-icon icon="stop" class="mr-2 text-danger"/>Stop timer
          </span>
          <span v-else>
            <font-awesome-icon icon="play" class="mr-2 text-success"/>Start timer
          </span>
        </b-list-group-item>
        
      </b-list-group>
    </span>
    <b-modal no-close-on-backdrop v-model="newGoalModal">
      <h3>New Goal!</h3>
      <b-form>
        <b-form-input v-model="newGoal.title" required type="text" placeholder="Title" class="mb-2"></b-form-input>
        <b-form-input v-model="newGoal.description" required type="text" placeholder="Description" class="mb-2"></b-form-input>
        <p>Assign tasks to this goal</p>
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
        <label :or="`type-date`">Due date:</label>
        <b-form-input v-model="newGoal.dueDate" type="date" required></b-form-input>
      </b-form>
      <template v-slot:modal-footer="{ ok, cancel, hide }">
        <b-button size="sm" variant="success" @click="add_new_goal">Create goal</b-button>
        <b-button size="sm" variant="danger" @click="cancel(); clear_modal();">Cancel</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Actionplus',
  data(){
    return {
      show: false,
      newGoalModal: false,
      selectedOptions: [],
      tasks_todo: [],
      tasks_done: [],
      newGoal: {
        title: '',
        description: '',
        dueDate: ''
      }
    }
  },
  methods:{
    ...mapActions('timer',['toggle_timer']),
    ...mapActions('goals',['add_goal']),
    toggle_actionplus(){
      this.show = !this.show
    },
    add_new_column(){
      this.$store.dispatch('add_new_column', {title: 'Change me'})
      this.toggle_actionplus()
      this.$router.push('/tasks')
    },
    add_new_goal(){
      this.add_goal({title: this.newGoal.title, description:this.newGoal.description, 
      tasks:this.selectedOptions, dueDate: new Date(this.newGoal.dueDate)})
      this.clear_modal()
      this.newGoalModal = false
    },
    clear_modal(){
      this.selectedOptions = []
      this.newGoal = {
        title: '',
        description: '',
        dueDate: ''
      }
    }
  },
  computed:{
    ...mapState('timer', ['timerOn']),
    ...mapGetters(['allTasks'])
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
.actionspan{
  background: white;
  z-index: 200102;
  position: fixed;
  bottom: 105px;
  right: 50px;
  box-shadow: 2px 3px 8px -2px rgba(0,0,0,0.75)

}
.list-group-item:hover{
  background-color: rgba(0,0,0,0.02);
  cursor: pointer;
}
.actionplus{
  background: white;
  width: 50px;
  height: 50px;
  z-index: 200102;
  line-height: 50px;
  border-radius: 25px;
  position: fixed!important;
  bottom: 50px;
  right: 50px;
  font-size: 17pt;
  color: #4cb09f;
  box-shadow: 2px 3px 8px -2px rgba(0,0,0,0.75)
}
.actionplus:hover{
  background-color:rgb(76, 176, 159);
  color: white;
  cursor: pointer;
}
</style>