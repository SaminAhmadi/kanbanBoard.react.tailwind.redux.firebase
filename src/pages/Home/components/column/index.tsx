import { FC } from 'react';
import BoardColumns from '../../../../components/ui/common/columns';
import TaskCard from '../../../../components/ui/common/task-card';
import { useAppSelector } from '../../../../hooks';
import { useDroppable } from '@dnd-kit/core';
import { Column } from '../../../../store/redux/columns/columnSlice.ts';

interface ColumnProps {
  col: Column;
}

const ColumnComponent: FC<ColumnProps> = ({ col }) => {
  const tasks = useAppSelector(state => state.task.tasks);
  const { setNodeRef } = useDroppable({ id: col.id });
  return (
    <div key={col.id} className="w-full flex flex-col gap-4" ref={setNodeRef}>
      <BoardColumns id={col.id} color={col.icon} title={col.title} />
      {/* Render tasks that belong to this column */}
      <div className="w-full flex flex-col gap-3  shadow-[-6px_6px_17px_-6px_rgba(0,_0,_0,_0.1)]">
        {tasks
          .filter(task => {
            return task.status === col.title;
          })
          .map(task => (
            <TaskCard key={task.id} title={task.description} id={task.id} />
          ))}
      </div>
    </div>
  );
};
export default ColumnComponent;
