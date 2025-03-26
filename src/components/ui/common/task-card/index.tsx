// main
import { FC, useState } from 'react';
import * as React from 'react';
import { useDraggable } from '@dnd-kit/core';
// redux
import { deleteTaskFromFirebase } from '../../../../store/redux/tasks/taskSlice.ts';
// hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// components
import IconProvider from '../../../../utils/icon-provider';
import TaskcardSkeleton from '../../skeleton/taskcard-skeleton';
import EditTaskModal from '../modal/edit-task-modal';
// types
interface TaskCardProps {
  title: string;
  id: string;
}

const TaskCard: FC<TaskCardProps> = ({ title, id }) => {
  console.log('Rendering TaskCard:', { id, title }); // Debugging
  const loading = useAppSelector(state => state.task.loading);
  const dispatch = useAppDispatch();

  // modal handling
  let [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleIsOpenModal = (modalValue: boolean) => {
    setIsOpenModal(!modalValue);
  };

  // draggable card section
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        transform: `translate(${transform.x}px,${transform.y}px)`,
      }
    : undefined;

  // Prevent drag from activating. issue caused by DnD
  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('button')) {
      event.stopPropagation();
    }
  };
  return (
    <>
      {loading ? (
        <TaskcardSkeleton />
      ) : (
        <>
          <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="w-full bg-[var(--primary-bg)] rounded-xl px-3 py-10 relative group transition-colors duraction-300 border-2 border-[var(--subtext-one)] cursor-pointer "
            style={style}
          >
            <h4 className="Montserrat-semiBold text-left text-[var(--primary-text)] hover:text-[var(--hover-text)] transition ">
              {title}
            </h4>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 duration-300 transition-colors">
              <button
                className="p-1 rounded-md"
                onClick={() => handleIsOpenModal(isOpenModal)}
                onPointerDown={handlePointerDown}
              >
                <IconProvider
                  icon="Edit"
                  variant="Bulk"
                  size="19"
                  className="fill-gray-600"
                />
              </button>
              <button
                onPointerDown={handlePointerDown}
                className="p-1 rounded-md bg-red-200 hover:bg-red-300 transition"
                onClick={() => {
                  console.log('Deleting task with ID:', id);
                  dispatch(deleteTaskFromFirebase(id));
                }}
              >
                <IconProvider
                  icon="Trash"
                  variant="Bulk"
                  size="19"
                  className="fill-red-500"
                />
              </button>
            </div>
          </div>
          {isOpenModal && (
            <EditTaskModal
              open={isOpenModal}
              handleClose={() => setIsOpenModal(false)}
              description={title}
              id={id}
            />
          )}
        </>
      )}
    </>
  );
};
export default TaskCard;
