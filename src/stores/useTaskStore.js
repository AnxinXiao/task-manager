import { defineStore } from "pinia";
import { fetchTasksFromServer, addTaskToServer, deleteTaskFromServer, toggleTaskStatusOnServer } from "../api/taskApi";

export const useTaskStore = defineStore("taskStore", {
    // 定义数据状态
  state: () => ({
    // 任务列表
    tasks: [
      {
        id: 1,
        title: "Task 1",
        completed: false,
      },
      {
        id: 2,
        title: "Task 2",
        completed: false,
      },
    ],
    loading:false // 是否正在加载数据
  }),
  // 计算属性
  getters: {
    // 完成的任务
    computedTask: (state) => state.tasks.filter(task => task.completed),
    // 未完成任务
    computedUnTask: (state) => state.tasks.filter(task => !task.completed),
    // 任务总数
    taskTotal: (state) => state.tasks.length,
    // 完成的任务数量
    completedTaskTotal: (state) => state.tasks.filter(task => task.completed).length
  },
  actions: {
    async fetchTasks() {
      this.loading = true
      const tasks = await fetchTasksFromServer()
      this.tasks = tasks
      this.loading = false
    },
    // 添加任务
    async addTask(task) {
      this.loading = true
      const newTask = await addTaskToServer(task)
      this.tasks.push(newTask)
    },
    // 删除任务
    async deleteTask(taskId) {
      this.loading = true
      await deleteTaskFromServer(taskId)
      this.tasks = this.tasks.filter(task => task.id !== taskId)
      this.loading = false
    },
    // 切换任务状态
    async toggleTaskStatus(taskId) {
      this.loading = true
      await toggleTaskStatusOnServer(taskId)
      this.tasks = this.tasks.map(task => {
        if(task.id === taskId) {
          return {
            ...task,
            completed: !task.completed
          }
          this.loading = false
        }
        return task
      })
    }
  }
})