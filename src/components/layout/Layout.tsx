import { FC, useState } from 'react';
// components
import Header from './Header.tsx';
import Footer from './Footer.tsx';
// style
import '../../styles/index.css';
import '../../styles/custom.css';
// components
import SideBarMenu from './Sidebar.tsx';
import Home from '../../pages/Home';

const Layout: FC = () => {
  let [open, setOpen] = useState<boolean>(true);
  const HandleToggle = () => {
    setOpen(!open);
    console.log(setOpen);
  };
  return (
    <>
      <Header handleFnc={HandleToggle} />
      <main className="flex flex-row content-height bg-[var(--secondary-bg)]">
        <SideBarMenu open={open} />
        <Home />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
