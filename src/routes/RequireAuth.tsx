import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';

const RequireAuth = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const location = useLocation();
  // eslint-disable-next-line no-console
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default RequireAuth;
