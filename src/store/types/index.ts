export type Task = {
  id: string;
  title: string;
  columnTitle: string;
  iconColor: string;
};
// zustand props
export interface zustandProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTasks: (
    taskId: string,
    taskTitle: string,
    taskColumnTitle: string,
  ) => void;
  removeTasks: (taskId: string) => void;
}
