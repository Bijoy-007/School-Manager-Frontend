import { Tag } from 'antd';
import Userlist from '../../../types/user/userList';
import SearchBar from './SearchBar';
import classes from './UserListInfo.module.css';

interface Props {
  data: Userlist[];
  types: {
    assistants: number;
    seniors: number;
    all_teachers: number;
  };
}

const UserListInfo = (props: Props) => {
  return (
    <div className={classes['info_section']}>
      <h1>Teachers </h1>
      <div className={classes.search}>
        <SearchBar data={props.data} />
      </div>
      <div className={classes['info_tags']}>
        <Tag color="green">All teachers - {props.types.all_teachers}</Tag>
        <Tag color="magenta">Senior Teacher - {props.types.seniors}</Tag>
        <Tag color="orange">Assistant Teacher - {props.types.assistants}</Tag>
      </div>
    </div>
  );
};

export default UserListInfo;
