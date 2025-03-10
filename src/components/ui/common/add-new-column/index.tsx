import { FC, useState } from 'react';
import IconProvider from '../../../../utils/icon-provider';
import ColumnModal from '../modal/add-column-modal';

const AddNewColumn: FC = () => {
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className="flex gap-2 items-center justify-center bg-[var(--tertiary-bg)] w-full">
        <IconProvider
          icon="AddCircle"
          className="fill-[var(--subtext-two)] cursor-pointer"
          size="22"
          variant="Bulk"
          onClick={() => setIsModalOpen(true)}
        />
        <h3 className="text-[var(subtext-two)] Montserrat-medium">
          <button
            className="cursor-pointer text-[var(--subtext-two)]"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Column
          </button>
        </h3>
      </div>
      <ColumnModal
        onClose={() => setIsModalOpen(false)}
        openAnchEl={isModalOpen}
      />
    </>
  );
};
export default AddNewColumn;
