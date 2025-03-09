import { FC, useState } from 'react';
// components
import IconProvider from '../../utils/icon-provider';

interface sidebarProps {
  open: boolean;
}
const SideBarMenu: FC<sidebarProps> = ({ open }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  return (
    open && (
      <nav className="w-[17%] pt-3 flex flex-col gap-2 bg-[var(--primary-bg)]">
        {/* board section */}
        <p className="Montserrat-regular text-[var(--subtext-one)] pb-2 pl-3">
          ALL BOARDS
        </p>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className=" w-[90%] flex items-center gap-2 bg-[var(--button-primary)] rounded-tr-2xl rounded-br-2xl p-3 cursor-pointer">
              <IconProvider
                icon="MenuBoard"
                size="21"
                className="fill-[var(--subtext-two)]"
                variant="Bold"
              />
              <a className="Montserrat-semiBold text-white ">Roadmap</a>
            </div>
          </div>
        </div>
        {/* toggle button */}
        <div className="flex items-center justify-center gap-3 bg-[var(--primary-bg)] py-4 px-3 rounded-s shadow-[-1px_-2px_16px_0px_rgba(0,_0,_0,_0.1)]">
          <IconProvider
            icon="Sun1"
            variant="Bold"
            size="25"
            className="fill-[var(--subtext-two)]"
          />
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              aria-label="Toggle Dark Mode"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
          </label>
          <IconProvider
            icon="Moon"
            variant="Bold"
            size="25"
            className="fill-[var(--subtext-two)]"
          />
        </div>
      </nav>
    )
  );
};
export default SideBarMenu;
