import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDetailsPage from '../pages/app/user-management/UserDetailsPage';
import DashboardPage from '../pages/app/DashboardPage';
import Landing from '../pages/LandingPage';
import UsersList from '../pages/app/user-management/UsersList';

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        /* * APP ROUTES */
        <Route path="/app/dashboard" element={<DashboardPage />} />
        <Route path="/app/users/:id" element={<UserDetailsPage />} />
        <Route path="/app/users" element={<UsersList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
