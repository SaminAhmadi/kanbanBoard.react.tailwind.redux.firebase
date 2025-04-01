// main
import { FC, FormEvent, useState } from 'react';
// redux
import { editTasksFirebase } from '../../../../../store/redux/tasks/taskSlice.ts';
// hooks
import { useAppDispatch } from '../../../../../hooks';
// types
interface EditTaskProps {
  open: boolean;
  handleClose: () => void;
  description: string;
  id: string;
}

const EditTaskModal: FC<EditTaskProps> = ({
  handleClose,
  description,
  id,
  open,
}) => {
  let [value, setValue] = useState<string>(description);
  const dispatch = useAppDispatch();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    dispatch(editTasksFirebase({ taskId: id, description: value }));
    handleClose();
  };
  console.log('close: ', handleClose, 'open value:', open);
  if (!open) return;
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full py-3"
    >
      <div className="transparent-bg"></div>
      <form
        className="xl:w-[30%] sm:w-[80%] md:w-[50%] bg-[--primary-bg] flex flex-col gap-4 p-4 rounded-xl"
        onSubmit={handleSubmit}
      >
        {/* form header */}
        <div className=" w-full flex items-center justify-between">
          <h3 className="Montserrat-bold text-[--primary-text]">Edit Task</h3>
          <button
            className="Montserrat-medium text-[--primary-text]"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
        {/* form content */}
        <div className="flex flex-col gap-2 ">
          <label className="Montserrat-regular text-[var(--subtext-two)]">
            Edit task description
          </label>
          <textarea
            value={value}
            onChange={event => setValue(event.target.value)}
            className="border-2 outline-0 resize-none p-2 rounded-md bg-transparent text-[var(--primary-text)] focus:border-[var(--hover-text)]"
            rows={8}
          />
        </div>
        <button
          className="Montserrat-medium text-white bg-[--button-primary] rounded-xl p-3 w-full"
          type="submit"
        >
          submit edit
        </button>
      </form>
    </div>
  );
};
export default EditTaskModal;
