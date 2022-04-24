import { useEffect, useCallback, useState } from 'react';
import getAllUser from '../../../apis/get-all-user';
import ContentWrapper from '../../../components/app/ui/ContentWrapper';
import ListTable from '../../../components/app/UserList/ListTable';
import UserListInfo from '../../../components/app/UserList/UserListInfo';
import Applayout from '../../../layout/AppLayout';
import Userlist from '../../../types/user/userList';

const UsersList = () => {
  const [users, setUsers] = useState<Userlist[]>([]);
  const fetchList = useCallback(async () => {
    try {
      const res = await getAllUser();
      if (res.data && res.ok) {
        //eslint-disable-next-line no-console
        console.log(res.data);
        setUsers(res.data);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  /**
   * @description: This is the initial effect to fetch the users list
   */

  useEffect(() => {
    fetchList().catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }, []);

  return (
    <Applayout>
      <ContentWrapper>
        <UserListInfo />
        <ListTable data={users} />
      </ContentWrapper>
    </Applayout>
  );
};

export default UsersList;
