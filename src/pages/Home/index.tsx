import { FC, useEffect } from 'react';
// data
import { fetchColumns } from '../../store/redux/columns/columnSlice.ts';
// components
import BoardColumns from '../../components/ui/common/columns';
import AddNewColumn from '../../components/ui/common/add-new-column';
// hooks
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchTasks } from '../../store/redux/tasks/taskSlice.ts';
import TaskCard from '../../components/ui/common/task-card';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector(state => state.board.currentBoardId);
  const columns = useAppSelector(state => state.column.columns);
  const tasks = useAppSelector(state => state.task.tasks);

  useEffect(() => {
    if (currentBoardId) {
      dispatch(fetchColumns(currentBoardId));
      dispatch(fetchTasks(currentBoardId));
      console.log('Tasks in Redux:', tasks);
      console.log('Columns in Redux:', columns);
    }
  }, [currentBoardId, dispatch]);
  if (columns.length <= 0)
    return (
      <div className="w-full flex justify-end p-8 ">
        <AddNewColumn />
      </div>
    );
  return (
    <div
      className={`w-full p-8 overflow-y-scroll ${columns.length <= 2 ? 'flex justify-between' : 'grid grid-cols-4 gap-6 flex-wrap'}`}
    >
      {columns.map(col => (
        <div key={col.id} className="flex flex-col gap-4">
          <BoardColumns color={col.icon} title={col.title} />
          {/* Render tasks that belong to this column */}
          <div className="w-full flex flex-col gap-3 overflow-y-auto shadow-[-6px_6px_17px_-6px_rgba(0,_0,_0,_0.1)]">
            {tasks
              .filter(task => {
                console.log(
                  `Checking task ${task.description} with status ${task.status}`,
                );
                console.log(
                  `Does it match column title ${col.title}?`,
                  task.status === col.title,
                );
                return task.status === col.title;
              })
              .map(task => (
                <TaskCard key={task.id} title={task.description} />
              ))}
          </div>
        </div>
      ))}

      <AddNewColumn />
    </div>
  );
};
export default Home;
