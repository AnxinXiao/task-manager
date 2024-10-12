import { defineStore } from "pinia";
import { ref,computed } from "vue";

// export const useCounterStore = defineStore("counter", {
//   // 定义数据状态
//   state: () => {
//     return {
//       count: 0,
//     };
//   },
//   // 定义计算属性
//   getters: {
//     doubleCount: (state) => state.count * 2,
//   },
//   // 定义修改数据状态的方法
//   actions: {
//     increment() {
//       this.count++;
//     },
//     decrement() {
//       this.count--;
//     },
//   },
// });

export const useCounterStore = defineStore("counter",()=>{
    // 在这里面定义数据状态以及修改数据状态的方法
    const count = ref(0)

    // 修改数据状态的方法
    const increment = () => {
        count.value++
    }
    const decrement = () => {
        count.value--
    }
    const doubleCount = computed(() => count.value * 2)
    return {
        count,
        increment,
        decrement,
        doubleCount
    }
})