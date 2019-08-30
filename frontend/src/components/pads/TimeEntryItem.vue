<template>
  <div>
    <li class="list-group-item mb-2">
      <small class="spt font-italic">{{ timer.created | toHumanDate }}</small>
      <small class="pts2">#{{ timer.id }} </small>
      <p class="text-left mr-5">
          <span class="badge-success badge mr-3">{{ timer.timer }}</span>
          <span>{{ timer.note }}</span>
      </p>
      <div class="text-left">
        <span>
        <a href="javascript:void(0)" class="text-secondary" @click="delete_timer">Delete</a>
        </span>
      </div>
    </li>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TimeEntryItem',
  props:{
    timer: {
      type: Object,
      required: true
    }
  },
  filters:{
    toHumanDate(d){
      return moment(d).calendar()
    }
  },
  methods:{
    delete_timer(){
      this.$store.dispatch('delete_timer', this.timer.id)
    }
  }
}
</script>

<style>

</style>