import { FC } from 'react';
import IconProvider from '../../../../../utils/icon-provider';

interface BoardModalProps {
  openAnchorEl: boolean;
  onClose: () => void;
}
const BoardModal: FC<BoardModalProps> = ({ onClose, openAnchorEl }) => {
  if (!openAnchorEl) return null;
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
              Name Your Board
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
              Board columns
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <input className="rounded-md p-2 w-[90%] border-2 outline-none bg-transparent text-[var(--primary-text)] focus:border-[var(--hover-text)]" />
                <IconProvider
                  icon="Trash"
                  size="20"
                  color="grey"
                  className="cursor-pointer"
                />
              </div>
              <div className="flex gap-2 items-center">
                <input className="rounded-md p-2 w-[90%] border-2 outline-none bg-transparent text-[var(--primary-text)] focus:border-[var(--hover-text)]" />
                <IconProvider
                  icon="Trash"
                  size="20"
                  color="grey"
                  className="cursor-pointer"
                />
              </div>
            </div>
            {/* add new column */}
            <button
              type="button"
              className="Montserrat-semiBold bg-[var(--button-secondary)] text-[var(--primary-text)] w-full rounded-lg px-3 py-2 shadow-xl"
            >
              + Add new column
            </button>
          </div>
          <button
            type="button"
            className="Montserrat-medium text-white bg-[var(--button-primary)] rounded-lg px-3 py-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default BoardModal;
