import { Spin } from 'antd';

import classes from './Loader.module.css';

const Loader = () => {
  return (
    <div className={classes['loader-wrapper']}>
      <Spin tip="Loading..." size="large" />
    </div>
  );
};

export default Loader;
