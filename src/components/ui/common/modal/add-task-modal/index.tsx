import { FC } from 'react';
import IconProvider from '../../../../../utils/icon-provider';
// style

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    // main Modal
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
              Add New Task
            </h3>
            <button
              onClick={onClose}
              className="mt-4 text-[--primary-text] px-3 py-2 rounded"
            >
              Close
            </button>
          </div>
          {/* form content */}
          <div className="flex flex-col gap-2">
            {/*Task name input*/}
            <label className="Montserrat-medium text-[var(--subtext-one)] text-sm">
              Task Name
            </label>
            <input
              placeholder="e.g take coffee break"
              className="border-2 outline-0 p-2 rounded-md bg-transparent text-[var(--primary-text)] focus:border-[var(--hover-text)]"
            />
          </div>
          {/*description of the task */}
          <div className="flex flex-col gap-2">
            <label className="Montserrat-medium text-[var(--subtext-one)] text-sm">
              Description
            </label>
            <textarea
              className="border-2 outline-0 resize-none p-2 rounded-md bg-transparent text-[var(--primary-text)] focus:border-[var(--hover-text)]"
              rows={8}
              placeholder="e.g it's always good to take a break."
            />
          </div>
          {/* subtasks input */}
          <div className="flex flex-col gap-4">
            <label className="Montserrat-medium text-[var(--subtext-one)] text-sm">
              Subtasks
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
            {/* add new subtask */}
            <button
              type="button"
              className="Montserrat-semiBold bg-[var(--button-primary)] text-white w-full rounded-lg px-3 py-2"
            >
              + Add new Subtask
            </button>
          </div>
          {/*drop down*/}
          <div className="flex flex-col gap-2">
            <label className="Montserrat-medium text-[var(--subtext-one)] text-sm">
              Current status
            </label>
            <select className="p-2 outline-0 border-2 bg-transparent rounded-md text-[var(--primary-text)] focus:border-[var(--hover-text)]">
              <option
                value="todo"
                className="Montserrat-regular text-[var(--primary-text)] bg-[var(--primary-bg)]"
              >
                Todo
              </option>
              <hr />
              <option
                value="doing"
                className="Montserrat-regular text-[var(--primary-text)] bg-[var(--primary-bg)]"
              >
                Doing
              </option>
              <hr />
              <option
                value="done"
                className="Montserrat-regular text-[var(--primary-text)] bg-[var(--primary-bg)]"
              >
                Done
              </option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Modal;
