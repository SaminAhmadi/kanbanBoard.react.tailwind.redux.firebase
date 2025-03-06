import { FC } from 'react';
// components
import TaskCard from '../../components/ui/common/task-card';
import IconProvider from '../../utils/icon-provider';
// types
import { RoadmapProps } from './types';

const RoadmapPlans: FC<RoadmapProps> = ({ title, tasks, iconColor }) => {
  console.log(iconColor);
  return (
    <div className="w-[20%] h-[43rem] flex flex-col gap-4">
      <div className="flex items-center gap-1">
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
      <TaskCard task={tasks} />
      <TaskCard task={tasks} />
      <TaskCard task={tasks} />
    </div>
  );
};
export default RoadmapPlans;
