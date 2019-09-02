<template>
  <div>
    <div class="list-group scratch pt-2 pb-2">
      <p class="text-center text-info mt-5 mb-5" v-if="!tasksCount">No regular tasks scheduled yet.</p>
      <RegularTaskItem v-for="task in tasks" :key="task.id" :task="task"></RegularTaskItem>
    </div>
    <form class="form-input" v-on:submit.prevent="addTask">
      <h5 class="text-left">Schedule a new Task</h5>
      <div class="form-group row">
        <input type="text" class="form-control form-control-sm col-sm-4" id="taskName" v-model="taskName" placeholder="Name (e.g eat bananas)" required>
      </div>
      <div class="form-group row">
        <input type="text" class="form-control form-control-sm col-sm-4" id="taskDuration" v-model="taskDuration" placeholder="Duration (in HH:MM format)" required>
      </div>
      <div class="form-group row">
        <input type="text" class="form-control form-control-sm col-sm-4" id="taskTime" v-model="taskTime" placeholder="Time (in HH:MM format)" required>
      </div>
      <div class="form-group row">
        <button type="submit" class="btn btn-outline-info btn-sm col-sm-1">Add Task</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RegularTaskItem from './RegularTaskItem';

export default {
  name: 'RegularTasksPad',
  components: {
    RegularTaskItem,
  },
  data() {
    return {
      taskName: '',
      taskDuration: '',
      taskTime: '',
    }
  },
  computed: {
    ...mapGetters('regularTasks', [
      'tasks',
      'tasksCount',
    ]),
  },
  methods: {
    ...mapActions('regularTasks', [
      'add_task',
      'update_global_time',
    ]),
    addTask() {
      // Remove white spaces and extract hrs:min
      let [hrs, min] = this.taskDuration.trim('').replace(/ /g, '').split(':');
      const duration = { hrs, min };

      [hrs, min] = this.taskTime.trim('').replace(/ /g, '').split(':');
      const time = { hrs, min };

      const id = Math.floor(Math.random() * 100000);
      const name = this.taskName

      // Add task to our store
      this.add_task({ id, name, time, duration })
    },
  },
  created() {
    this.update_global_time();
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
.form-input {
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.form-group {
  padding-left: 1rem;
}
</style>