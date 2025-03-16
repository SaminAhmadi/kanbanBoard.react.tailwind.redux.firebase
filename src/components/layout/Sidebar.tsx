import { FC, useEffect, useState } from 'react';
// components
import IconProvider from '../../utils/icon-provider';
import BoardModal from '../ui/common/modal/add-new-board';
import {
  fetchBoards,
  removeBoard,
  setCurrentBoard,
} from '../../store/redux/boards/boardSlice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NavSkeleton from '../ui/skeleton/nav-skeleton';

interface sidebarProps {
  open: boolean;
}
const SideBarMenu: FC<sidebarProps> = ({ open }) => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(state => state.board.boards);
  const loading = useAppSelector(state => state.board.loading);
  // fetching data
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  // select a board based on their id
  const handleBoardSelect = (boardId: string) => {
    dispatch(setCurrentBoard(boardId));
  };

  // dark mode functionality
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // open modal functionality
  let [isOpenModal, setIsOpenModal] = useState(false);

  return (
    open && (
      <>
        {loading ? (
          <NavSkeleton />
        ) : (
          <>
            <nav className="w-[17%] pt-3 flex flex-col gap-2 bg-[var(--primary-bg)]">
              {/* boards section */}
              <p className="Montserrat-regular text-[var(--subtext-one)] pb-2 pl-3">
                ALL BOARDS
              </p>
              <div className="w-full h-full flex flex-col gap-1.5 group transition-colors duration-200">
                <div className="flex flex-col gap-3">
                  {boards
                    .slice() // Create a shallow copy to avoid mutating state
                    .sort((a, b) => a.id.localeCompare(b.id)) // Sort alphabetically by ID
                    .map(board => (
                      <button
                        key={board.id}
                        className="Montserrat-semiBold group text-[var(--primary-text)] hover:text-white transition duration-200"
                        onClick={() => handleBoardSelect(board.id)}
                      >
                        <div className="w-[90%] flex items-center justify-between hover:bg-[var(--button-primary)] bg-[var(--tertiary-bg)] rounded-tr-2xl rounded-br-2xl p-3 cursor-pointer transition">
                          <IconProvider
                            icon="MenuBoard"
                            size="21"
                            className="fill-[var(--icon-color)]"
                            variant="Bold"
                          />
                          <p>{board.title}</p>
                          <IconProvider
                            icon="Trash"
                            size="21"
                            variant="Bold"
                            className="fill-[var(--icon-color)] cursor-pointer"
                            onClick={() => dispatch(removeBoard(board.id))}
                          />
                        </div>
                      </button>
                    ))}
                </div>
                {/* create new board */}
                <div className="flex flex-col gap-3">
                  <div className=" w-[90%] flex items-center gap-2 rounded-tr-2xl rounded-br-2xl p-3 cursor-pointer transition">
                    <IconProvider
                      icon="MenuBoard"
                      size="21"
                      className="fill-[var(--icon-color)]"
                      variant="Bold"
                    />
                    <button
                      className="Montserrat-semiBold  text-[var(--logo-color)] hover:text-[--primary-text] transition duration-200"
                      onClick={() => setIsOpenModal(true)}
                    >
                      Create new board
                    </button>
                  </div>
                </div>
              </div>
              {/* toggle button */}
              <div className="flex items-center justify-center gap-3 bg-[var(--button-secondary)] py-4 px-3 rounded-s shadow-[-1px_-2px_16px_0px_rgba(0,_0,_0,_0.1)]">
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
            <BoardModal
              openAnchorEl={isOpenModal}
              onClose={() => setIsOpenModal(false)}
            />
          </>
        )}
      </>
    )
  );
};
export default SideBarMenu;
