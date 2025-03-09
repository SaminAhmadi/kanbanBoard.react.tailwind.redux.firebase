import { create } from 'zustand';
// types
import { zustandProps } from './types';

const useStore = create<zustandProps>(set => ({
  tasks: JSON.parse(localStorage.getItem('tasks') ?? '[]'),
  setTasks: tasks => set({ tasks }),
  updateTaskColumn: (taskId, newColumn) => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId ? { ...task, columnTitle: newColumn } : task,
      ),
    }));
  },
  addTask: task =>
    set(state => {
      const newTasks = [...state.tasks, task];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return { tasks: newTasks };
    }),
  editTasks: (taskId, taskTitle, taskColumnTitle) =>
    set(state => {
      const newTasks = state.tasks.map(task =>
        task.id === taskId
          ? { ...task, title: taskTitle, columnTitle: taskColumnTitle }
          : task,
      );
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return { tasks: newTasks }; // zustand needs an object to update its state
    }),
  removeTasks: taskId =>
    set(state => {
      const newTasks = state.tasks.filter(task => taskId !== task.id);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return { tasks: newTasks };
    }),
}));
export default useStore;
