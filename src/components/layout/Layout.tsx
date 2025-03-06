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

const Layout: FC = () => {
  let [open, setOpen] = useState<boolean>(true);
  const HandleToggle = () => {
    setOpen(!open);
    console.log(setOpen);
  };
  const task = useStore(state => state.tasks);
  return (
    <>
      <Header handleFnc={HandleToggle} />
      <main className="flex flex-row content-height bg-[var(--secondary-bg)]">
        <SideBarMenu open={open} />
        <div className="w-full p-8 overflow-y-scroll flex flex-wrap justify-evenly">
          {task.map(item => (
            <RoadmapPlans
              title={item.columnTitle}
              tasks={item.title}
              iconColor={item.iconColor}
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
