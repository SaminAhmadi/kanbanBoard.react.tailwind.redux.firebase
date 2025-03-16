import { FC } from 'react';
import IconProvider from '../../../../utils/icon-provider';
import { useAppSelector } from '../../../../hooks';
import TaskcardSkeleton from '../../skeleton/taskcard-skeleton';

interface TaskCardProps {
  title: string;
}

const TaskCard: FC<TaskCardProps> = ({ title }) => {
  const loading = useAppSelector(state => state.task.loading);
  console.log(title);
  return (
    <>
      {loading ? (
        <TaskcardSkeleton />
      ) : (
        <div className="w-full bg-[var(--primary-bg)] rounded-xl px-3 py-10 relative group transition-colors duraction-300 border-2 border-[var(--subtext-one)] cursor-pointer ">
          <h4 className="Montserrat-semiBold text-left text-[var(--primary-text)] hover:text-[var(--hover-text)] transition ">
            {title}
          </h4>
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 duration-300 transition-colors">
            <button className="p-1 rounded-md">
              <IconProvider
                icon="Edit"
                variant="Bulk"
                size="19"
                className="fill-gray-600"
              />
            </button>
            <button className="p-1 rounded-md bg-red-200 hover:bg-red-300 transition">
              <IconProvider
                icon="Trash"
                variant="Bulk"
                size="19"
                className="fill-red-500"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default TaskCard;
