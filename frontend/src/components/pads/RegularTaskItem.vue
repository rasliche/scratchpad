<template>
  <div class="list-group-item" mb-2>
    <h5 class="text-left mr-5">
      <span> {{ task.name }}</span>
    </h5>

    <small class="pts2"># {{ task.id }}</small><br>
    <small class="pts2">Should take {{ task.duration.hrs }}.{{ task.duration.min / 60 }} hrs.</small>
  
    <p class="text-left mr-5">
      <span>Starts &nbsp;&nbsp;&nbsp;</span>
      <span class="text-info"><font-awesome-icon icon="clock"/>  {{ getRemainingTime() }}  </span>
    </p>

    <div class="text-left">
      <span class="mr-3">
        <a href="javascript:void(0)" class="text-success"><font-awesome-icon icon="play"/> Start Now </a>
      </span>
      <span>
        <a href="javascript:void(0)" class="text-danger" @click="deleteTask">Delete</a>
      </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RegularTaskItem',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('regularTasks', [
      'now',
    ]),
  },
  methods: {
    ...mapActions('regularTasks', [
      'delete_task',
    ]),
    getRemainingTime() {
      const timeToTask = moment();
      const { hrs, min } = this.task.time;

      timeToTask.hours(hrs);
      timeToTask.minute(min);

      if (timeToTask < this.now) {
        // Task time for today has already passed, watch for tomorrow's day.
        timeToTask.add(1, 'd');
      }

      return moment(this.now).to(timeToTask);
    },
    deleteTask() {
      this.delete_task(this.task.id);
    }
  }
}
</script>

<style>
.pts2{
  position: absolute!important;
  right: 10px!important;
  align-items: right;
}
</style>