import { FC, useEffect, useState } from 'react';
// redux
import { fetchColumns } from '../../store/redux/columns/columnSlice.ts';
import { fetchTasks, setCurrentID } from '../../store/redux/tasks/taskSlice.ts';
// components
import ColumnComponent from './components/column';
import AddNewColumn from './components/add-new-column';
// hooks
import { useAppDispatch, useAppSelector } from '../../hooks';

const Home: FC = () => {
  const [, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const currentBoardId = useAppSelector(state => state.board.currentBoardId);
  const boards = useAppSelector(state => state.board.boards);
  const columns = useAppSelector(state => state.column.columns);

  useEffect(() => {
    const fetchBoardData = async () => {
      setLoading(true);
      // If there's no current board ID, set it to the first board's ID
      if (!currentBoardId && boards.length > 0) {
        dispatch(setCurrentID(boards[0].id));
        dispatch(fetchColumns(boards[0].id));
        dispatch(fetchTasks(boards[0].id));
      }
      // If there's a current board, fetch its columns and tasks
      if (currentBoardId) {
        await dispatch(fetchColumns(currentBoardId));
        await dispatch(fetchTasks(currentBoardId));
      }
      setLoading(false);
    };

    // Fetch data only when the boards or currentBoardId changes
    fetchBoardData().then();
  }, [boards, currentBoardId, dispatch]);

  return (
    <div className="w-full p-8 flex justify-between gap-6 flex-wrap">
      <div
        className={`grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ${columns.length == 1 ? `w-[60%]` : `md:w-[70%] gap-3 sm:w-full kanban-board`} flex-row`}
      >
        {columns.map(col => (
          <ColumnComponent col={col} key={col.id} />
        ))}
      </div>
      <div className="lg:w-[25%] sm:w-full">
        <AddNewColumn />
      </div>
    </div>
  );
};
export default Home;
