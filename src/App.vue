<template>
  <div id="app">
    <div class="container">
      <div class="task-stats">
        <p>任务总数：{{taskTotal}}</p>
        <p>已完成任务：{{completedTaskTotal}}</p>
      </div>
      <input v-model="newTaskTitle" placeholder="新增任务" @keyup.enter="addTask">
      <TaskList :tasks="computedUnTask" title="待办"></TaskList>
      <TaskList :tasks="completedTasks" title="已完成"></TaskList>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted,computed } from 'vue';
import TaskList from './components/TaskList.vue';
import { useTaskStore } from './stores/useTaskStore';
const taskStore = useTaskStore();

const newTaskTitle = ref('');

// 计算未完成任务
const computedUnTask = computed(() => taskStore.tasks.filter(task => !task.completed));

// 计算已完成
const completedTasks = computed(() => taskStore.tasks.filter(task => task.completed));

const taskTotal = computed(() => taskStore.tasks.length);

const completedTaskTotal = computed(() => taskStore.completedTaskTotal);

const loading = computed(() => taskStore.loading);

onMounted(
  async () => {
    await taskStore.fetchTasks();
  }
)

const addTask = async () => {
  if(newTaskTitle.value.trim()){
    await taskStore.addTask({
      title: newTaskTitle.value,
      completed: false
    })
    newTaskTitle.value = '';
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}

.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

;
</style>
