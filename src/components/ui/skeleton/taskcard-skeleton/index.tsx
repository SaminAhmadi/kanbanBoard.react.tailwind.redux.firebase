import { FC } from 'react';

const TaskcardSkeleton: FC = () => {
  return (
    <div className="w-full bg-[var(--primary-bg)] rounded-xl px-3 py-10 relative animate-pulse border-2 border-[var(--icon-color)]">
      <div className="h-5 w-3/4 bg-[--tertiary-bg] rounded"></div>
      <div className="absolute top-2 right-2 flex gap-2">
        <div className="h-6 w-6 bg-[var(--tertiary-bg)] rounded-md"></div>
        <div className="h-6 w-6 bg-[var(--tertiary-bg)] rounded-md"></div>
      </div>
    </div>
  );
};
export default TaskcardSkeleton;
