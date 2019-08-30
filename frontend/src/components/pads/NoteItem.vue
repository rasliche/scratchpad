<template>
  <div>
    <li class="list-group-item mb-2">
      <small class="spt font-italic">{{ note.created | toHumanDate }}</small>
      <small :class="note.done ? 'pts badge badge-success' : 'pts badge badge-warning'"
      >{{ note.done ? 'Done' : 'Todo' }}</small>
      <small class="pts2">#{{ note.id }}</small>
      <p class="text-left mr-5">{{note.text}}</p>
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
  name: 'NoteItem',
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

<style>
.spt{
  position: absolute!important;
  right: 10px!important;
  bottom: 15px!important;
}
.pts2{
  position: absolute!important;
  right: 10px!important;
}
.pts{
  position: absolute!important;
  right: 70px!important;
}
</style>