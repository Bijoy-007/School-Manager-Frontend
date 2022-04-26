import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDetailsPage from '../pages/app/user-management/UserDetailsPage';
import DashboardPage from '../pages/app/DashboardPage';
import Landing from '../pages/LandingPage';
import UsersList from '../pages/app/user-management/UsersList';
import RequireAuth from './RequireAuth';
import Unauthorized from '../components/landing/Unauthorized';

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        /* * APP ROUTES */
        <Route element={<RequireAuth />}>
          <Route path="/app/dashboard" element={<DashboardPage />} />
          <Route path="/app/users/:id" element={<UserDetailsPage />} />
          <Route path="/app/users" element={<UsersList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
