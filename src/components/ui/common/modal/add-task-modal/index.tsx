// main
import { FC, FormEvent, useState } from 'react';
// redux
import { addToTasks } from '../../../../../store/redux/tasks/taskSlice.ts';
// hooks
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
// types
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  let [description, setDescription] = useState<string>('');
  let [status, setStatus] = useState<string>('todo');

  const dispatch = useAppDispatch();

  const currentBoardID = useAppSelector(state => state.board.currentBoardId);
  const columnTitles = useAppSelector(state => state.column.columns);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Dispatch your task adding logic here, passing description and status
    dispatch(addToTasks({ description, status, currentBoardID }));
  };
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
      <div className="relative z-[40] xl:w-[30%] sm:w-[80%] max-w-2xl max-h-full p-6  bg-[var(--secondary-bg)] rounded-lg shadow-lg">
        {/*  modal content */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          {/*description of the task */}
          <div className="flex flex-col gap-2">
            <label className="Montserrat-medium text-[var(--subtext-one)] text-sm">
              Task Description
            </label>
            <textarea
              className="border-2 outline-0 resize-none p-2 rounded-md bg-transparent text-[var(--primary-text)] focus:border-[var(--hover-text)]"
              rows={8}
              placeholder="e.g it's always good to take a break."
              onChange={event => setDescription(event.target.value)}
            />
          </div>
          {/*drop down*/}
          <div className="flex flex-col gap-2">
            <label className="Montserrat-medium text-[var(--subtext-one)] text-sm">
              Current status
            </label>
            <select
              className="p-2 outline-0 border-2 bg-transparent rounded-md text-[var(--primary-text)] focus:border-[var(--hover-text)]"
              value={status}
              onChange={event => {
                if (event.target.value === '') return;
                else {
                  setStatus(event.target.value);
                }
              }}
            >
              {columnTitles.map(col => (
                <option
                  value={col.title}
                  className="Montserrat-regular text-[var(--primary-text)] bg-[var(--primary-bg)]"
                >
                  {col.title}
                </option>
              ))}
            </select>
          </div>
          {/* submit button */}
          <button
            className="Montserrat-medium text-white bg-[--button-primary] rounded-xl p-3"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Modal;
