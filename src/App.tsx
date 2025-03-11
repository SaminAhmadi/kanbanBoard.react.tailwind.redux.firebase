// components
import Layout from './components/layout/Layout.tsx';
import { useEffect } from 'react';
import { InitializeLocalStorage } from './utils/initialize-localStorage';
import { Provider } from 'react-redux';
import store from './store/redux/store/store.ts';

function App() {
  useEffect(() => {
    InitializeLocalStorage();
  }, []);
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
