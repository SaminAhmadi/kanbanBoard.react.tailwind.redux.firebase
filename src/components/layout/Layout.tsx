import { FC, useState } from 'react';
// components
import Header from './Header.tsx';
// style
import '../../styles/index.css';
import '../../styles/custom.css';
// components
import SideBarMenu from './Sidebar.tsx';
import Home from '../../pages/Home';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  setDragAndDropTasks,
  setTasks,
} from '../../store/redux/tasks/taskSlice.ts';

const Layout: FC = () => {
  let [open, setOpen] = useState<boolean>(true);
  const HandleToggle = () => {
    setOpen(!open);
  };
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.task.tasks);
  const columns = useAppSelector(state => state.column.columns);
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const columnId = over.id as string;
    const newColumn = columns.find(col => col.id === columnId);
    if (!newColumn) return;
    const newStatus = newColumn.title;
    dispatch(
      setTasks(
        tasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      ),
    );
    dispatch(setDragAndDropTasks({ taskId, newStatus }));
  }
  return (
    <>
      <Header handleFnc={HandleToggle} />
      <main className="md:flex md:flex-row content-height bg-[var(--secondary-bg)] sm:overflow-y-auto sm:h-[calc(100vh-80px)!important]">
        <SideBarMenu open={open} />
        <DndContext onDragEnd={handleDragEnd}>
          <Home />
        </DndContext>
      </main>
    </>
  );
};
export default Layout;
