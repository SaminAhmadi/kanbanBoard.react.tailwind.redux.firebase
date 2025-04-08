// main
import { FC } from 'react';
import { useDroppable } from '@dnd-kit/core';
// redux
import { removeColumnsFromFromFirebase } from '../../../../store/redux/columns/columnSlice.ts';
// hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// components
import IconProvider from '../../../../utils/icon-provider';
import ColumnSkeleton from '../../skeleton/column-skeleton';
// types
interface boardColumnProps {
  title: string;
  color: string;
  id: string;
}

const BoardColumns: FC<boardColumnProps> = ({ id, title, color }) => {
  const loading = useAppSelector(state => state.column.loading);
  const dispatch = useAppDispatch();
  // droppable section
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <>
      {loading ? (
        <ColumnSkeleton />
      ) : (
        <div
          className="w-full flex flex-col gap-4 overflow-hidden"
          ref={setNodeRef}
        >
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-1">
              <IconProvider
                icon="RecordCircle"
                size="22"
                variant="Bulk"
                color={color}
              />
              <h3 className="Montserrat-bold text-[--subtext-one] tracking-[0.5rem] capitalize">
                {title}
              </h3>
            </div>
            <IconProvider
              icon="Trash"
              size="22"
              variant="Bulk"
              color="var(--icon-color)"
              className="cursor-pointer"
              type="button"
              onClick={() =>
                dispatch(
                  removeColumnsFromFromFirebase({ colID: id, colTitle: title }),
                )
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
export default BoardColumns;
