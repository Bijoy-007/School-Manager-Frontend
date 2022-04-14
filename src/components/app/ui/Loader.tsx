import { Spin } from 'antd';

import classes from './Loader.module.css';

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

const Loader = ({ children, loading }: Props) => {
  const LoadingUI = (
    <div className={classes['loader-wrapper']}>
      <Spin tip="Loading..." size="large" />
    </div>
  );

  if (loading) return <>{LoadingUI}</>;
  return <>{children}</>;
};

export default Loader;
