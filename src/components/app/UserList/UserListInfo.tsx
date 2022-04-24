import { Tag } from 'antd';
import SearchBar from './SearchBar';
import classes from './UserListInfo.module.css';

const UserListInfo = () => {
  return (
    <div className={classes['info_section']}>
      <h1>Teachers </h1>
      <div className={classes.search}>
        <SearchBar />
      </div>
      <div className={classes['info_tags']}>
        <Tag color="orange">orange</Tag>
        <Tag color="gold">gold</Tag>
        <Tag color="lime">lime</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
      </div>
    </div>
  );
};

export default UserListInfo;
