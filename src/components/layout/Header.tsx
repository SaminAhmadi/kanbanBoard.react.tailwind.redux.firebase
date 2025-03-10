import { FC, useState } from 'react';
// components
import IconProvider from '../../utils/icon-provider';
import Modal from '../ui/common/modal/add-task-modal/index.tsx';

interface HeaderProps {
  handleFnc: () => void;
}

const Header: FC<HeaderProps> = ({ handleFnc }) => {
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  console.log(handleFnc);

  return (
    <>
      <header className="w-full">
        <div className="flex flex-row justify-between items-center bg-[var(--primary-bg)] px-3 py-4">
          <div className="logo flex items-center flex-wrap gap-1">
            <button onClick={handleFnc}>
              <IconProvider
                icon="Kanban"
                className="fill-[var(--logo-color)]"
                size="32"
              />
            </button>
            <h1 className="Montserrat-extraBold text-3xl text-[var(--primary-text)]">
              KanBan Board
            </h1>
          </div>
          <div className="py-2">
            <button
              className="bg-[var(--button-primary)] border-0 px-3 py-2 rounded-3xl"
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="Montserrat-bold text-white">+ Add New Task</p>
            </button>
          </div>
        </div>
      </header>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
export default Header;
