import Vue from 'vue'
import Vuex from 'vuex'
// import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    timer: 0,
    columns:[{
      id:1,
      title: 'Things to do',
      notes: [{
        id:'1',
        text:'Drink water !',
        done: false,
        created: new Date().toUTCString()
      }]
    }],
    alerts:[]
  },
  mutations:{
    UPDATE_STATE(state, newstate){
      state.columns = newstate.columns
    },
    ADD_NOTE({columns}, {columnid, note}){
      var column = columns.filter((col) => col.id === columnid)[0]
      if (column) {
        column.notes.push(note)
      }
    },
    TOGGLE_DONE({columns}, noteid){
      columns.forEach((col)=>{
        col.notes.forEach((note)=>{
          if (note.id === noteid){
            note.done = !note.done
          }
        })
      })
    },
    DELETE_NOTE({columns}, noteid){
      columns.forEach((col)=>{
        col.notes.forEach((note)=>{
          if (note.id === noteid){
            var index = col.notes.indexOf(note)
            col.notes.splice(index, 1)
          }
        })
      })
    },
    ADD_ALERT({alerts}, alert){
      alerts.push(alert)
    },
    REMOVE_ALERT({alerts}, alertobj){
      var a = alerts.filter((alert)=>alert.id = alertobj.id)[0]
      if(a){
        alerts.splice(alerts.indexOf(a), 1)
      }
    }
  },
  actions:{
    add_note({commit}, {columnid, note}){
      commit('ADD_NOTE', {columnid, note})
    },
    toggle_done({commit}, noteid){
      commit('TOGGLE_DONE', noteid)
    },
    delete_note({commit}, noteid){
      commit('DELETE_NOTE', noteid)
    },
    add_alert({commit}, {message, error}){
      if(!error){error = false}
      var alertobj = {id: `${new Date().getTime().toString()}`, message, type: error ? 'alert alert-danger' : 'alert alert-success' }
      commit('ADD_ALERT', alertobj)
      setTimeout(()=>{
        commit('REMOVE_ALERT', alertobj)
      }, 4000)
    },
    remove_alert({commit}, alertobj){
      commit('REMOVE_ALERT', alertobj)
    },
    update_state({commit}, state){
      commit('UPDATE_STATE', state)
    }
  },
  getters:{
  }
})

export default store