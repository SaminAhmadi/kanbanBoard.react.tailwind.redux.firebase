import { FC } from 'react';
import IconProvider from '../../../../utils/icon-provider';

const AddNewColumn: FC = () => {
  return (
    <div className="flex gap-2 items-center justify-center bg-[var(--tertiary-bg)] w-full">
      <IconProvider
        icon="AddCircle"
        className="fill-[var(--subtext-two)] cursor-pointer"
        size="22"
        variant="Bulk"
      />
      <h3 className="text-[var(subtext-two)] Montserrat-medium">
        <a className="cursor-pointer text-[var(--subtext-two)]">
          Add New Column
        </a>
      </h3>
    </div>
  );
};
export default AddNewColumn;
