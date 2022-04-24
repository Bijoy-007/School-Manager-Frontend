import { Link } from 'react-router-dom';
import LandingLayout from '../layout/LandingLayout';

const Landing = () => {
  return (
    <LandingLayout>
      <h1>Landing Page</h1>
      <Link to="/app/users">Go to Users</Link>
    </LandingLayout>
  );
};

export default Landing;
