const state = {
  timers: [],
  timerOn: false
}

const getters = {
  
}

const mutations = {
  TOGGLE_TIMER(state){
    state.timerOn = !state.timerOn
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
}

const actions = {
  toggle_timer({commit}){
    commit('TOGGLE_TIMER')
  },
  add_timer({commit}, {id, note, timer, created}){
    commit('ADD_TIMER', {id, note, timer, created})
  },
  delete_timer({commit}, timerid){
    commit('DELETE_TIMER', timerid)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}