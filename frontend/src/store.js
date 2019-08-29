import Vue from 'vue'
import Vuex from 'vuex'
// import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
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
    MARK_DONE({columns}, noteid){
      columns.forEach((col)=>{
        col.notes.forEach((note)=>{
          if (note.id === noteid){
            note.done = true
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
    }
  },
  actions:{
    add_note({commit}, {columnid, note}){
      commit('ADD_NOTE', {columnid, note})
    },
    mark_done({commit}, noteid){
      commit('MARK_DONE', noteid)
    },
    delete_note({commit}, noteid){
      commit('DELETE_NOTE', noteid)
    },
    add_alert({commit}, alertobj){
      commit('ADD_ALERT', alertobj)
    },
    update_state({commit}, state){
      commit('UPDATE_STATE', state)
    }
  },
  getters:{
  }
})

export default store