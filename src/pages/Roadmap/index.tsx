import { FC } from 'react';
// components
import TaskCard from '../../components/ui/common/task-card';
import IconProvider from '../../utils/icon-provider';
// types
import { RoadmapProps } from './types';

const RoadmapPlans: FC<RoadmapProps> = ({ tasks, iconColor, title }) => {
  return (
    <div className="w-full h-[43rem] flex flex-col gap-4">
      {/*column header*/}
      <div className="flex items-center gap-1 ">
        <IconProvider
          icon="RecordCircle"
          className={iconColor}
          size="22"
          variant="Bulk"
        />
        <h3 className="Montserrat-bold text-[--subtext-one] tracking-[0.5rem]">
          {title}
        </h3>
      </div>
      {/* Task lists / rows */}
      <div className=" w-full flex flex-col gap-3 overflow-y-auto shadow-[-6px_6px_17px_-6px_rgba(0,_0,_0,_0.1)]">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </div>
  );
};
export default RoadmapPlans;
