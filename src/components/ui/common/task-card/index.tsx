import { FC } from 'react';
import { TaskProps } from './types';
import IconProvider from '../../../../utils/icon-provider';

const TaskCard: FC<TaskProps> = ({ task }) => {
  return (
    <div className="w-[100%] bg-[var(--primary-bgz)] rounded-xl px-3 py-10 shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px] relative group hover:bg-[--hover-bg] transition-colors duraction-300">
      <h4 className="Montserrat-semiBold  text-left">{task}</h4>
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 duration-300 transition-opacity">
        <button className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 transition">
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
  );
};
export default TaskCard;
