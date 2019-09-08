<template>
  <div>
    <span @click="toggle_actionplus" class="actionplus"><font-awesome-icon v-if="show" icon="minus"/><font-awesome-icon v-else icon="plus"/></span>
    <span v-if="show" class="actionspan">
      <b-list-group>
        <b-list-group-item @click="add_new_column">
          <font-awesome-icon icon="plus" class="mr-2 text-info"/>New Column
        </b-list-group-item>
        <b-list-group-item>
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
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Actionplus',
  data(){
    return {
      show: false
    }
  },
  methods:{
    ...mapActions('timer',['toggle_timer']),
    toggle_actionplus(){
      // reverse this.show
      this.show = !this.show
    },
    add_new_column(){
      this.$store.dispatch('add_new_column', {title: 'Change me'})
      this.toggle_actionplus()
      this.$router.push('/tasks')
    }
  },
  computed:{
    ...mapState('timer', ['timerOn'])
  }
}
</script>

<style>
.actionspan{
  background: white;
  z-index: 200102;
  /* border: 1px solid green; */
  position: absolute;
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
  position: absolute!important;
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