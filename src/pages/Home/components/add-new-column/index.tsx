// main
import { FC, useState } from 'react';
// components
import IconProvider from '../../../../utils/icon-provider';
import ColumnModal from '../../../../components/ui/common/modal/add-column-modal';

const AddNewColumn: FC = () => {
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="h-full flex gap-2 items-center justify-center bg-[var(--tertiary-bg)] max-w-full p-8">
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
