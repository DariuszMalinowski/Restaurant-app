import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTables } from './features/TablesRedux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <div>
      <h1>Restaurant App</h1>
    </div>
  );
}

export default App;