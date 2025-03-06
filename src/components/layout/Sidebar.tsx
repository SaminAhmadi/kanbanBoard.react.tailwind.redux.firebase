import { FC } from 'react';
// components
import IconProvider from '../../utils/icon-provider';

interface sidebarProps {
  open: boolean;
}
const SideBarMenu: FC<sidebarProps> = ({ open }) => {
  return (
    open && (
      <nav className="w-[17%] pl-3 pt-3 flex flex-col gap-2 bg-[var(--primary-bg)]">
        <p className="Montserrat-regular text-[var(--subtext-one)] pb-2">
          ALL BOARDS
        </p>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <IconProvider
                icon="MenuBoard"
                size="21"
                className="fill-[var(--subtext-one)]"
                variant="Bold"
              />
              <p className="Montserrat-semiBold">Roadmap</p>
            </div>
          </div>
          {/* toggle button */}
          <div className="flex items-center justify-center gap-3 bg-[var(--secondary-bg)] py-4 px-3 rounded-s">
            <IconProvider
              icon="Sun1"
              variant="Bold"
              size="25"
              className="fill-[var(--subtext-two)]"
            />
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            </label>
            <IconProvider
              icon="Moon"
              variant="Bold"
              size="25"
              className="fill-[var(--subtext-two)]"
            />
          </div>
        </div>
      </nav>
    )
  );
};
export default SideBarMenu;
