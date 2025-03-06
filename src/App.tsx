// components
import Layout from './components/layout/Layout.tsx';
import { useEffect } from 'react';
import { InitializeLocalStorage } from './utils/initialize-localStorage';

function App() {
  useEffect(() => {
    InitializeLocalStorage();
  }, []);
  return <Layout />;
}

export default App;
