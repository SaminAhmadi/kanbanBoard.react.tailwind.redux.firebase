// components
import Layout from './components/layout/Layout.tsx';
import { Provider } from 'react-redux';
// redux
import store from './store/redux/store/store.ts';

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
