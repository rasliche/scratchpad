/*
  A goal is an object with the following properties
  {
    id: int,
    title: string,
    description: string,
    tasks: list // This list only needs to contain the ids of the columm and task in obj e.g. [{columnId: 1, taskId: 1}]
    completed: boolean
    dueDate: date object

  }

 */

const state = {
  goals: [{
    id: 1,
    title: 'Test goal',
    description: 'Holidays to Bali, Indonesia and Italy!',
    tasks: [{columnId: 1, taskId: 1},{columnId: 1, taskId: 2}],
    completed: false,
    dueDate: new Date()
  }]
}

const mutations = {
  ADD_GOAL({goals}, newGoalObj){
    goals.push(newGoalObj)
  },
  REMOVE_GOAL({goals}, goalId){
    const goalToRemove = goals.find(goal => goal.id === goalId)
    if(goalToRemove){
      goals.splice(goals.indexOf(goalToRemove), 1)
    }
  },
  ADD_TASK_TO_GOAL({goals}, {goalId, columnId, taskId}){
    var goal = goals.find(g => g.id === goalId)
    if(goal){
      goal.tasks.push({columnId, taskId: parseInt(taskId)})
    }
  },
  REMOVE_TASK_FROM_GOAL({goals}, {goalId, columnId, taskId}){
    var goal = goals.find(g => g.id === goalId)
    if(goal){
      goal.tasks.splice(goal.tasks.indexOf({columnId, taskId}), 1)
    }
  },
  COMPLETE_GOAL({goals}, goalId){
    var goal = goals.find(g => g.id === goalId)
    if(goal){
      goal.completed = true
    }
  }
}

const actions = {
  add_goal({commit, state}, {title, description, tasks}){
    var goal = {
      id: state.goals.length + 1,
      title,
      description,
      tasks,
      completed: false,
      dueDate: new Date()
    }
    commit('ADD_GOAL', goal)
  },
  remove_goal({commit}, goalId){
    commit('REMOVE_GOAL', goalId)
  },
  add_task_to_goal({commit}, {goalId, taskId}){
    commit('ADD_TASK_TO_GOAL', {goalId, taskId})
  },
  remove_task_from_goal({commit}, {goalId, taskId}){
    commit('REMOVE_TASK_FROM_GOAL', {goalId, taskId})
  },
  complete_goal({commit}, goalId){
    commit('COMPLETE_GOAL', goalId)
  }
}

const getters = {}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}