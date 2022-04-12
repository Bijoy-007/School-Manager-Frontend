import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './app/App';
import { store } from './store/store';

const container = document.getElementById('root') as Element;

const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
