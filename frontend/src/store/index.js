import Vue from 'vue'
import Vuex from 'vuex'
import timer from './timer'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    timer
  },
  state:{
    activeTab:'',
    columns:[{
      id:1,
      title: 'Things to do',
      notes: []
    }],
    alerts:[],
    usedStorage: 0
  },
  mutations:{
    DELETE_COLUMN({columns}, {columnid}){
      var col = columns.filter((c)=>c.id === columnid)[0]
      if(col){
        columns.splice(columns.indexOf(col), 1)
      }
    },
    SAVE_NEW_TITLE({columns}, {columnid, newtitle}){
      var col = columns.filter((c)=>c.id === columnid)[0]
      if(col){
        col.title = newtitle
      }
    },
    UPDATE_ACTIVE_TAB(state, columnid){
      state.activeTab = columnid
    },
    ADD_NEW_COLUMN({columns}, newcolobj){
      columns.push(newcolobj)
    },
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
    UPDATE_NOTE({columns}, {columnid, noteid, text}){
      var col = columns.filter((c) => c.id === columnid)[0]
      if(col){
        var note = col.notes.filter((n) => n.id === noteid)[0]
        if(note){
          note.text = text
        }
      }
    },
    TOGGLE_DONE({columns}, {columnid, noteid}){
      var col = columns.filter((c) => c.id === columnid)[0]
      if(col){
        var note = col.notes.filter((n) => n.id === noteid)[0]
        if(note){
          note.done = !note.done
        }
      }
    },
    DELETE_NOTE({columns}, {columnid, noteid}){
      var col = columns.filter((c) => c.id === columnid)[0]
      if(col){
        var note = col.notes.filter((n) => n.id === noteid)[0]
        if(note){
          var index = col.notes.indexOf(note)
          col.notes.splice(index, 1)
        }
      }
    },
    ADD_ALERT({alerts}, alert){
      alerts.push(alert)
    },
    REMOVE_ALERT({alerts}, alertobj){
      var a = alerts.filter((alert) => alert.id === alertobj.id)[0]
      if(a){
        alerts.splice(alerts.indexOf(a), 1)
      }
    },
    ADD_NOTE_ALERT({columns}, {columnid, noteid, alertobj}){
      var col = columns.filter((c)=> c.id === columnid)[0]
      if(col){
        var note = col.notes.filter((n) => n.id === noteid)[0]
        if(note){
          if(note.alerts){
            note.alerts.push(alertobj)
          }else{
            note['alerts'] = []
            note.alerts.push(alertobj)
          }
        }
      }
    },
    DELETE_NOTE_ALERTS({columns}, {columnid, noteid}){
      var col = columns.filter((c) => c.id === columnid)[0]
      if (col){
        var note = col.notes.filter((note) => note.id === noteid)[0]
        if(note){
          if(note.alerts){
            note.alerts = []
          }
        }
      }
    },
    UPDATE_STORAGE_USED(store, newValue){
      store.usedStorage = newValue
    }
  },
  actions:{
    delete_column({commit}, {columnid}){
      commit('DELETE_COLUMN', {columnid})
    },
    add_new_column({commit, state}, {title}){
      // get next id or assign 1 if no columns exist
      var nextid = state.columns.length > 0 ? state.columns[ state.columns.length - 1 ].id + 1 : 1
      var newcolobj = {
        id: nextid,
        title,
        notes:[]
      }
      commit('ADD_NEW_COLUMN', newcolobj)
    },
    save_new_title({commit}, {columnid, newtitle}){
      commit('SAVE_NEW_TITLE', {columnid, newtitle})
    },
    update_active_tab({commit}, columnid){
      commit('UPDATE_ACTIVE_TAB', columnid)
    },
    add_note({commit}, {columnid, note}){
      commit('ADD_NOTE', {columnid, note})
    },
    update_note({commit}, {columnid, noteid, text}){
      commit('UPDATE_NOTE', {columnid, noteid, text})
    },
    toggle_done({commit}, {columnid, noteid}){
      commit('TOGGLE_DONE', {columnid, noteid})
    },
    delete_note({commit}, {columnid, noteid}){
      commit('DELETE_NOTE', {columnid, noteid})
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
    add_note_alert({commit}, {columnid, noteid, time}){
      var alertobj = {
        time,
        completed: false
      }
      commit('ADD_NOTE_ALERT', {columnid, noteid, alertobj})
    },
    delete_note_alerts({commit}, {columnid, noteid}){
      commit('DELETE_NOTE_ALERTS', {columnid, noteid})
    },
    calculate_used_storage({commit}){
      var _lsTotal = 0, _xLen, _x
      for(_x in localStorage){
        if(!localStorage.hasOwnProperty(_x)){
          continue
        }
        _xLen = ((localStorage[_x].length + _x.length)* 2)
        _lsTotal += _xLen
      }
      commit('UPDATE_STORAGE_USED', (_lsTotal/1024).toFixed(2))
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