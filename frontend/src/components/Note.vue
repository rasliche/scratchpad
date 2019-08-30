<template>
  <div>
    <li class="list-group-item mb-1">
      <small class="spt font-italic">{{ note.created | toHumanDate }}</small>
      <small :class="note.done ? 'pts badge badge-success' : 'pts badge badge-warning'"
      >{{ note.done ? 'Done' : 'Todo' }}</small>
      <p class="m-1 mr-5 text-left">{{note.text}}</p>
      <div class="text-left">
        <span>
          <a href="javascript:void(0)" class="text-success" @click="toggle_done(note.id)">{{ note.done ? 'Undo' : 'Done' }}</a>
        </span>
        &nbsp;
        <span><a href="javascript:void(0)" class="text-muted" @click="delete_note(note.id)">Delete</a></span>
      </div>
    </li>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Note',
  props: {
    note: {
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
    toggle_done(noteid){
      this.$store.dispatch('toggle_done', noteid)
    },
    delete_note(noteid){
      this.$store.dispatch('delete_note', noteid)
    }
  }
}
</script>

<style scoped>
.spt{
  position: absolute!important;
  right: 10px!important;
  bottom: 15px!important;
}
.pts{
  position: absolute!important;
  right: 10px!important;
}
</style>