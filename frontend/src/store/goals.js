/*
  A goal is an object with the following properties
  {
    id: int,
    title: string,
    description: string,
    tasks: list // This list only needs to contain the ids of the columm and task in obj e.g. [{taskId: 1}]
    completed: boolean
    dueDate: date object

  }

 */

const state = {
  goals: []
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
  ADD_TASK_TO_GOAL({goals}, {goalId, taskId}){
    var goal = goals.find(g => g.id === goalId)
    if(goal){
      goal.tasks.push({taskId: parseInt(taskId)})
    }
  },
  REMOVE_TASK_FROM_GOAL({goals}, {goalId, taskId}){
    var goal = goals.find(g => g.id === goalId)
    if(goal){
      goal.tasks.splice(goal.tasks.indexOf({taskId}), 1)
    }
  },
  UPDATE_GOAL_TASKS({goals}, {goalId, newTasksList}){
    var goal = goals.find(g => g.id === goalId)
    if(goal){
      goal.tasks = newTasksList
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
  add_goal({commit, state}, {title, description, tasks, dueDate}){
    var goal = {
      id: state.goals.length + 1,
      title,
      description,
      tasks,
      completed: false,
      dueDate,
    }
    commit('ADD_GOAL', goal)
  },
  remove_goal({commit}, goalId){
    commit('REMOVE_GOAL', goalId)
  },
  add_task_to_goal({commit}, {goalId, taskId}){
    commit('ADD_TASK_TO_GOAL', {goalId, taskId})
  },
  update_goal_tasks({commit}, {goalId, newTasksList}){
    commit('UPDATE_GOAL_TASKS', {goalId, newTasksList})
  },
  remove_task_from_goal({commit}, {goalId, taskId}){
    commit('REMOVE_TASK_FROM_GOAL', {goalId, taskId})
  },
  complete_goal({commit}, goalId){
    commit('COMPLETE_GOAL', goalId)
  }
}

const getters = {
  /*
    state, getters, rootState <-- keep order or it won't work.
  */
  get_goal_tasks: (state, _, rootState) => (goalId) => {
    const goal = state.goals.find(g => g.id === goalId)
    if(goal){
      var goalTasks = []
      goal.tasks.forEach(goalTask => {
        rootState.columns.forEach((col) => {
          var taskFound = col.tasks.find((t) => t.id === goalTask.taskId)
          if(taskFound){
            goalTasks.push(taskFound)
          }
        })
      })
      return goalTasks
    }
  },
  get_percentage_completed: (state, getters) => (goalId) =>{
    const goal_tasks = getters.get_goal_tasks(goalId)
    var goalTasksDone = goal_tasks.filter(task => task.done === true).length
    var goalTasksTotal = goal_tasks.length
    return parseFloat(((goalTasksDone / goalTasksTotal ) * 100).toFixed(2)) || 0
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}