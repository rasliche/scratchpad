const state = {
  tasks: [],
};

const getters = {
  tasksCount: state => state.tasks.length,
  tasks: state => state.tasks,
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};