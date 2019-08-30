import Vue from 'vue'
import Vuex from 'vuex'
// import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    timers: [],
    columns:[{
      id:1,
      title: 'Things to do',
      notes: []
    }],
    alerts:[]
  },
  mutations:{
    UPDATE_STATE(state, newstate){
      state.columns = newstate.columns
      state.timers = newstate.timers
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
    },
    ADD_TIMER({timers}, timerobj){
      timers.push(timerobj)
    },
    DELETE_TIMER({timers}, timerid){
      var timer_to_delete = timers.filter((t) => t.id === timerid)[0]
      if(timer_to_delete){
        timers.splice(timers.indexOf(timer_to_delete), 1)
      }
    },
    ADD_NOTE_ALERT({columns}, {noteid, alertobj}){
      columns.forEach((col)=>{
        var note = col.notes.filter((note) => note.id === noteid)[0]
        if(note){
          if(note.alerts){
            note.alerts.push(alertobj)
          }else{
            note['alerts'] = []
            note.alerts.push(alertobj)
          }
          return
        }
      })
    },
    DELETE_NOTE_ALERTS({columns}, noteid){
      columns.forEach((col)=>{
        var note = col.notes.filter((note) => note.id === noteid)[0]
        if(note){
          if(note.alerts){
            note.alerts = []
          }
          return
        }
      })
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
      var alertobj = {id: `${new Date().getTime().toString()}`, message, error }
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
    },
    add_timer({commit}, {id, note, timer, created}){
      commit('ADD_TIMER', {id, note, timer, created})
    },
    delete_timer({commit}, timerid){
      commit('DELETE_TIMER', timerid)
    },
    add_note_alert({commit}, {noteid, time}){
      var alertobj = {
        time,
        completed: false
      }
      commit('ADD_NOTE_ALERT', {noteid, alertobj})
    },
    delete_note_alerts({commit}, noteid){
      commit('DELETE_NOTE_ALERTS', noteid)
    }
  },
  getters:{
    all_todos_not_done_count({columns}){
      var total = 0
      columns.forEach((col)=>{
        total += col.notes.filter((todo)=>todo.done === false).length
      })
      return total
    }
  }
})

export default store