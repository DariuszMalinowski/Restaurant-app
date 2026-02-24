import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTables } from './features/TablesRedux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Table from './pages/Table';
import NavBar from './common/NavBar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;