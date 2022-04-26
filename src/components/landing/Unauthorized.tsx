import { Result } from 'antd';
import { Link } from 'react-router-dom';

/**
 * TODO => useNavigate hook not working
 */

const Unauthorized = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Link to="/">Back Home</Link>}
  />
);

export default Unauthorized;
