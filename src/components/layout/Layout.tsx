import { FC, useState } from 'react';
// components
import Header from './Header.tsx';
import Footer from './Footer.tsx';
// style
import '../../styles/index.css';
import '../../styles/custom.css';
// components
import SideBarMenu from './Sidebar.tsx';
import RoadmapPlans from '../../pages/Roadmap';
import AddNewColumn from '../ui/common/add-new-column';
import useStore from '../../store/store.ts';
import { Task } from '../../store/types';

const Layout: FC = () => {
  let [open, setOpen] = useState<boolean>(true);
  const HandleToggle = () => {
    setOpen(!open);
    console.log(setOpen);
  };
  const { tasks } = useStore();
  // ✅ Group tasks by columnTitle
  const groupedTasks = tasks.reduce(
    (acc, task) => {
      if (!acc[task.columnTitle]) acc[task.columnTitle] = [];
      acc[task.columnTitle].push(task);
      return acc;
    },
    {} as Record<string, Task[]>,
  ); // Define type as Record<columnTitle, Task[]>

  return (
    <>
      <Header handleFnc={HandleToggle} />
      <main className="flex flex-row content-height bg-[var(--secondary-bg)]">
        <SideBarMenu open={open} />
        <div className="w-full p-8 overflow-y-scroll grid grid-cols-4 gap-6 flex-wrap">
          {Object.entries(groupedTasks).map(([columnTitle, tasks], index) => (
            <RoadmapPlans
              key={index}
              title={columnTitle} // Pass the column title
              tasks={tasks.filter(task => task.columnTitle === columnTitle)}
              iconColor={tasks[0]?.iconColor || 'text-gray-500'} // Use first task's color as iconColor
            />
          ))}
          <AddNewColumn />
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Layout;
