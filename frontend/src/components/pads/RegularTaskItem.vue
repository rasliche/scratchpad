<template>
  <div class="list-group-item" mb-2>
    <div class="row">
        <div class="col-sm-4">
          <div class="task-header">
            <h5 class="text-left mr-5">
                <span>{{ task.name }}</span>
            </h5>
            <p v-if="timerOn" class="text-left mr-5">
                <span v-if="timerSave" class="glow">{{ duration | toHumanDate }}</span>
                <span v-else class="text-info">{{ timer | toHumanDate }}</span>
            </p>
            <p v-else class="text-left mr-5">
              <span>When?</span>
              <a class="btn text-info" href="javascript:void(0)" @click="toggleTime">
                <font-awesome-icon icon="clock" />
                {{ getRemainingTime() }}
              </a>
            </p>
          </div>
        </div>
        <div class="col-sm-8">
          <small class="pts2"># {{ task.id }}</small>
          <br />
          <small class="pts2">
            Should take {{ task.duration.hrs + (task.duration.min / 60) }} hrs.
          </small>
          <br />
          <br />
          <p v-if="task.previous_sprints.length === 0">
            <small class="pts2 text-info">No previous sprints for this task were found.</small>
          </p>
          <p v-else>
            <small class="pts2"><em>Previous sprints</em></small>
            <br />
            <small class="pts2 text-info">
              <span v-for="sprint in task.previous_sprints" :key="sprint"> 
                <em>{{ sprint | toHumanDate }},&nbsp; </em>
              </span> 
            </small>
          </p>
      </div>
    </div>
    <div v-if="timerSave" class="text-left">
      <span class="mr-3">
        <a class="btn text-success" href="javascript:void(0)" @click="saveSprint">Save</a>
        <a class="btn text-danger" href="javascript:void(0)" @click="clearDuration">Clear</a>
      </span>
    </div>
    <div v-else class="text-left">
      <span v-if="timerOn" class="mr-3">
        <a class="btn text-info" href="javascript:void(0)" @click="stopTimer">
          <font-awesome-icon icon="stop" />Stop
        </a>
      </span>
      <span v-else>
        <a class="btn text-success" href="javascript:void(0)" @click="startTimer">
          <font-awesome-icon icon="play" />&nbsp; Start Now
        </a>
        <a class="btn text-danger" href="javascript:void(0)" @click="deleteTask">Delete Task</a>
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
  data() {
    return {
      timerOn: false,
      duration: 0,
      formatTime: false,
      timerSave: false,
      start: null,
    };
  },
  computed: {
    ...mapGetters('regularTasks', [
        'now',
    ]),
    timer() {
        return this.now - this.start;
    }
  },
  filters: {
      toHumanDate(d) {
          var duration = moment.duration(d)
          var _h = duration.hours()
          var _m = duration.minutes()
          var _s = duration.seconds()
          return `${_h < 10 ? "0" + _h : _h}:${_m < 10 ? "0" + _m : _m}:${_s < 10 ? "0" + _s : _s}`
      },
  },
  methods: {
      ...mapActions('regularTasks', [
          'update_task',
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

          if (this.formatTime) return timeToTask.calendar();

          return moment(this.now).to(timeToTask);
      },
      deleteTask() {
        this.delete_task(this.task.id);
      },
      startTimer() {
        this.timerOn = true;
        this.start = moment();
      },
      clearDuration() {
        this.duration = 0;
        this.timerOn = false;
        this.timerSave = false;
        this.start = null;
      },
      saveSprint() {
        this.update_task({
          taskId: this.task.id,
          updates: {
            new_sprint: this.duration,
          },
        });

        this.clearDuration();
      },
      stopTimer() {
        this.duration = this.timer;
        this.timerSave = true;
      },
      toggleTime() {
        this.formatTime = !this.formatTime;
      }
  }
}
</script>

<style>
.pts2 {
  position: absolute !important;
  right: 10px !important;
  align-items: right;
}
.glow {
  color: #fff;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}
@keyframes glow {
  from {
      text-shadow: 0 0 3px #000, 0 0 4px #fff, 0 0 5px #fff, 0 0 6px #fff,
          0 0 7px #fff, 0 0 8px #fff, 0 0 9px #fff;
  }
  to {
      text-shadow: 0 0 3px #fff, 0 0 4px #53ff4d, 0 0 5px #53ff4d,
          0 0 6px #53ff4d, 0 0 7px #53ff4d, 0 0 8px #53ff4d, 0 0 9px #53ff4d;
  }
}
@-webkit-keyframes glow {
  from {
      text-shadow: 0 0 3px #000, 0 0 4px #fff, 0 0 5px #fff, 0 0 6px #fff,
          0 0 7px #fff, 0 0 8px #fff, 0 0 9px #fff;
  }
  to {
      text-shadow: 0 0 3px #fff, 0 0 4px #53ff4d, 0 0 5px #53ff4d,
          0 0 6px #53ff4d, 0 0 7px #53ff4d, 0 0 8px #53ff4d, 0 0 9px #53ff4d;
  }
}
.task-header {
padding-left: 0.7rem; 
}
</style>