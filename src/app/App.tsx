import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';

import AllRoutes from '../routes/routes';
import { setLoginStatus } from '../store/slices/authSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();

  dispatch(setLoginStatus());

  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
