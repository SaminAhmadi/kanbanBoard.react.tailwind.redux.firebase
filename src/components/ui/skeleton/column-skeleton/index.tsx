// main
import { FC } from 'react';

const ColumnSkeleton: FC = () => {
  return (
    <div className="w-full flex flex-col gap-4 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 bg-[--tertiary-bg] rounded-full"></div>
        <div className="h-5 w-32 bg-[--tertiary-bg] rounded"></div>
      </div>
    </div>
  );
};
export default ColumnSkeleton;
