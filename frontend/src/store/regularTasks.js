const state = {
  tasks: [],
  tempTimerInfo: [],
};

const getters = {
  tasksCount: state => state.tasks.length,
  tasks: state => state.tasks,
  temp_timer_info: state => state.tempTimerInfo,
};

const mutations = {
  ADD_TASK({ tasks }, taskObj) {
    tasks.push(taskObj);
  },
  UPDATE_TASK({ tasks }, { taskId, updates }) {
    const task_to_update = tasks.find((t) => t.id === taskId);
    
    if (task_to_update) {
      const { name, time, duration, new_sprint } = updates;

      if (name) task_to_update.name = name;
      if (time) task_to_update.time = time;
      if (duration) task_to_update.duration = duration;

      // Store only the last 4 sprints
      if (new_sprint) {
        if (task_to_update.previous_sprints.length === 4) {
          task_to_update.previous_sprints.pop();
        }

        task_to_update.previous_sprints.unshift(new_sprint);
      }
    }
  },
  DELETE_TASK({ tasks }, taskId) {
    const task_to_delete = tasks.find((t) => t.id === taskId);

    if (task_to_delete) {
      tasks.splice(tasks.indexOf(task_to_delete), 1);
    }
  },
  SAVE_TIMER_INFO({ tempTimerInfo }, timerInfo) {
    tempTimerInfo.push(timerInfo);
  },
  DELETE_TIMER_INFO({ tempTimerInfo }, timerId) {
    const timerInfo = tempTimerInfo.find(t => t.id === timerId);

    if (timerInfo) {
      tempTimerInfo.splice(tempTimerInfo.indexOf(timerInfo), 1);
    }
  }
};

const actions = {
  add_task({ commit }, { id, name, time, duration }) {
    commit('ADD_TASK', { id, name, time, duration, previous_sprints: [], });
  },
  update_task({ commit }, { taskId, updates }) {
    commit('UPDATE_TASK', { taskId, updates});
  },
  delete_task({ commit }, taskId) {
    commit('DELETE_TASK', taskId);
  },
  save_timer_info({ commit }, { id, timerOn, duration, timerSave, start }) {
    // Delete saved timer info for this timer, if any
    commit('DELETE_TIMER_INFO', id);

    commit('SAVE_TIMER_INFO', { id, timerOn, duration, timerSave, start });
  },
  delete_timer_info({ commit }, timerId) {
    commit('DELETE_TIMER_INFO', timerId);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};