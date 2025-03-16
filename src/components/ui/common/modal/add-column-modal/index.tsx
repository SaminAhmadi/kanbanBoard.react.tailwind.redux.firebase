import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { addNewColumn } from '../../../../../store/redux/columns/columnSlice.ts';

interface ColumnModalProps {
  onClose: () => void;
  openAnchEl: boolean;
}
const ColumnModal: FC<ColumnModalProps> = ({ onClose, openAnchEl }) => {
  let [newCol, setNewCol] = useState<string>(' ');
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector(state => state.board.currentBoardId);
  const columnList = useAppSelector(state => state.column.columns);
  console.log(columnList);
  if (!openAnchEl) return null;
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full py-3"
    >
      {/* Transparent Black Background */}
      <div className="transparent-bg"></div>
      <div className="relative z-[40] w-[30%] max-w-2xl max-h-full p-6  bg-[var(--secondary-bg)] rounded-lg shadow-lg">
        {/*  modal content */}
        <form className="flex flex-col gap-4">
          {/* form header */}
          <div className="flex w-full items-center justify-between">
            <h3 className="Montserrat-semiBold text-[var(--primary-text)]">
              Add Columns
            </h3>
            <button
              onClick={onClose}
              className="mt-4 text-[--primary-text] px-3 py-2 rounded"
            >
              Close
            </button>
          </div>
          {/* form content */}
          <div className="flex flex-col gap-4">
            <label className="Montserrat-medium text-[var(--subtext-one)] text-sm">
              Give A Name To Your Column
            </label>
            <div className="flex flex-col gap-2">
              <input
                className="rounded-md p-2 w-full border-2 outline-none bg-transparent text-[var(--primary-text)] focus:border-[var(--hover-text)]"
                placeholder="e.g: Todo"
                onChange={event => setNewCol(event.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            className="Montserrat-medium text-white bg-[var(--button-primary)] rounded-lg px-3 py-2"
            onClick={() => {
              if (newCol === '') return;
              else {
                dispatch(
                  addNewColumn({
                    columnTitle: newCol,
                    currentBoard: currentBoard,
                  }),
                );
              }
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default ColumnModal;
