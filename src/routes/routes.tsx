import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDetailsPage from '../pages/app/user-management/UserDetailsPage';
import DashboardPage from '../pages/app/DashboardPage';
import Landing from '../pages/LandingPage';

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        /* * APP ROUTES */
        <Route path="/app/dashboard" element={<DashboardPage />} />
        <Route path="/app/users/:id" element={<UserDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
