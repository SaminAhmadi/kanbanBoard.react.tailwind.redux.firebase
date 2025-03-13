import { FC } from 'react';
import IconProvider from '../../../../utils/icon-provider';
import { useAppSelector } from '../../../../hooks';

interface boardColumnProps {
  title: string;
  color: string;
}

const BoardColumns: FC<boardColumnProps> = ({ title, color }) => {
  const loading = useAppSelector(state => state.column.loading);
  const currentBoardID = useAppSelector(state => state.board.currentBoardId);
  console.log(currentBoardID, color);
  return (
    <>
      {loading && <p className="Montserrat-medium">loading data..</p>}
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-1 ">
          <IconProvider
            icon="RecordCircle"
            size="22"
            variant="Bulk"
            color={`var(${color})`}
          />
          <h3 className="Montserrat-bold text-[--subtext-one] tracking-[0.5rem]">
            {title}
          </h3>
        </div>
      </div>
    </>
  );
};
export default BoardColumns;
