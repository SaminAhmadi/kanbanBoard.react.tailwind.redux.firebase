import { FC, useEffect } from 'react';
// redux
import { fetchColumns } from '../../store/redux/columns/columnSlice.ts';
import { fetchTasks } from '../../store/redux/tasks/taskSlice.ts';
// components
import AddNewColumn from '../../components/ui/common/add-new-column';
import ColumnComponent from './components/column';
// hooks
import { useAppDispatch, useAppSelector } from '../../hooks';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector(state => state.board.currentBoardId);
  const columns = useAppSelector(state => state.column.columns);

  useEffect(() => {
    if (currentBoardId) {
      dispatch(fetchColumns(currentBoardId));
      dispatch(fetchTasks(currentBoardId));
    }
  }, [currentBoardId]);

  if (columns.length <= 0)
    return (
      <div className="w-full flex justify-end p-8 ">
        <AddNewColumn />
      </div>
    );
  return (
    <div className="w-full p-8 flex justify-between gap-6 flex-wrap">
      <div
        className={`grid md:grid-cols-3 sm:grid-cols-1 ${columns.length == 1 ? `w-[60%]` : `md:w-[70%] gap-3 sm:w-full`} flex-row`}
      >
        {columns.map(col => (
          <ColumnComponent col={col} key={col.id} />
        ))}
      </div>
      <div className="md:w-[25%] sm:w-full">
        <AddNewColumn />
      </div>
    </div>
  );
};
export default Home;
