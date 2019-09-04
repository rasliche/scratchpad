import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';
import timer from './timer'
import helperFunctions from './helperFunctions'
import regularTasks from './regularTasks';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    timer,
    regularTasks,
  },
  state:{
    activeTab:'',
    columns:[{
      id:1,
      title: 'Things to do',
      notes: []
    }],
    alerts:[],
    usedStorage: 0,
    now: moment(),
  },
  mutations:{
    MOVE_NOTE({columns}, {fromColId, toColId, noteid}){
      // get fromCol and toCol objects
      var fromCol = columns.filter(col => col.id === fromColId)[0]
      var toCol = columns.filter(col => col.id === toColId)[0]
      if(fromCol && toCol){
        // get the note object
        var note = fromCol.notes.filter(n => n.id === noteid)[0]
        if(note){
          // push note to toCol
          toCol.notes.push(note)
          // delete note from fromCol
          fromCol.notes.splice(fromCol.notes.indexOf(note), 1)
        }
      }
    },
    UPDATE_REMINDER({columns}, {columnid, noteid, reminderid}){
      var column = columns.filter((col) => col.id === columnid)[0]
      if(column){
        var note = column.notes.filter((n) => n.id === noteid)[0]
        if(note){
          var reminder = note.alerts.filter((rem) => rem.id === reminderid)[0]
          if(reminder){
            reminder.completed = true
          }
        }
      }
    },
    ADD_REMINDER({columns}, {columnid, noteid, alertobj}){
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
    DELETE_REMINDER({columns}, {columnid, noteid, reminderid}){
      var col = columns.filter((c) => c.id === columnid)[0]
      if (col){
        var note = col.notes.filter((note) => note.id === noteid)[0]
        if(note){
          var reminder = note.alerts.filter((rem) => rem.id === reminderid)[0]
          if(reminder){
            note.alerts.splice(note.alerts.indexOf(reminder), 1)
          }
        }
      }
    },
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
      if (newstate.columns) state.columns = newstate.columns
      if (newstate.timer) state.timer = newstate.timer
      if (newstate.regularTasks) state.regularTasks = newstate.regularTasks  
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
    UPDATE_STORAGE_USED(store, newValue){
      store.usedStorage = newValue
    },
    UPDATE_GLOBAL_TIME(state) {
      state.now = moment();
    },
  },
  actions:{
    move_note({commit}, {fromColId, toColId, noteid}){
      commit('MOVE_NOTE', {fromColId, toColId, noteid})
    },
    update_reminder({commit}, {columnid, noteid, reminderid}){
      commit('UPDATE_REMINDER', {columnid, noteid, reminderid})
    },
    add_reminder({commit, state}, {columnid, noteid, time}){     
      var alertobj = {
        id: helperFunctions.next_reminder_id(state, columnid, noteid),
        time,
        completed: false
      }
      commit('ADD_REMINDER', {columnid, noteid, alertobj})
    },
    delete_note_alerts({commit}, {columnid, noteid, reminderid}){
      commit('DELETE_REMINDER', {columnid, noteid, reminderid})
    },
    delete_column({commit}, {columnid}){
      commit('DELETE_COLUMN', {columnid})
    },
    add_new_column({commit, state}, {title}){
      var nextid = helperFunctions.next_column_id(state)
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
    add_note({commit, state}, {columnid, text}){
      var note = {
        id: helperFunctions.next_note_id(state, columnid),
        text,
        done: false,
        alerts: [],
        created: new Date().toUTCString()
      }
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
    },
    remove_alert({commit}, alertobj){
      commit('REMOVE_ALERT', alertobj)
    },
    update_state({commit}, state){
      commit('UPDATE_STATE', state)
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
    },
    global_time({ commit }) {
      return setInterval(() => {
        commit('UPDATE_GLOBAL_TIME')
      }, 1000)
    },
  },
  getters:{
    now: state => state.now,

    all_todos_not_done_count({columns}){
      var total = 0
      columns.forEach((col)=>{
        total += col.notes.filter((todo)=>todo.done === false).length
      })
      return total
    },
  }
})

export default store