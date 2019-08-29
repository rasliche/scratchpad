<template>
  <div>
    <li class="list-group-item mb-1">
      <small class="spt">{{ note.created | toHumanDate }}</small>
      <p class="mb-2 text-left">{{note.text}}</p>
      <div class="text-left">
        <span><a href="#" class="text-success" @click="mark_done(note.id)">Done</a></span>
        &nbsp;
        <span><a href="#" class="text-muted" @click="delete_note(note.id)">Delete</a></span>
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
    mark_done(noteid){
      this.$store.dispatch('mark_done', noteid)
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
}
</style>