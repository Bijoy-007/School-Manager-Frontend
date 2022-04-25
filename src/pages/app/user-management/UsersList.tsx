import { notification } from 'antd';
import { useEffect, useCallback, useState } from 'react';
import getAllUser from '../../../apis/get-all-user';
import ContentWrapper from '../../../components/app/ui/ContentWrapper';
import Loader from '../../../components/app/ui/Loader';
import ListTable from '../../../components/app/UserList/ListTable';
import UserListInfo from '../../../components/app/UserList/UserListInfo';
import Applayout from '../../../layout/AppLayout';
import Userlist from '../../../types/user/userList';

const UsersList = () => {
  const [users, setUsers] = useState<Userlist[]>([]);
  const [isActivate, setIsActivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllUser();
      if (res.data && res.ok) {
        setUsers(res.data);
      }
      setLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      setLoading(false);
      notification.error({ message: 'Something went wrong!' });
    }
  }, []);

  const assistant_teacher = users.filter(
    (teacher) => teacher.type === 'ASSISTANT_TEACHER',
  );
  const senior_teacher = users.filter(
    (teacher) => teacher.type === 'SENIOR_TEACHER',
  );
  const userTypes = {
    assistants: assistant_teacher.length,
    seniors: senior_teacher.length,
    all_teachers: users.length,
  };

  /**
   * @description: This is the initial effect to fetch the users list
   */

  useEffect(() => {
    fetchList().catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      notification.error({ message: 'Something went wrong!' });
    });
  }, [isActivate]);

  return (
    <Applayout>
      <Loader loading={loading}>
        <ContentWrapper>
          <UserListInfo data={users} types={userTypes} />
          <ListTable
            data={users}
            onActivate={() => {
              setIsActivate((prev) => !prev);
            }}
          />
        </ContentWrapper>
      </Loader>
    </Applayout>
  );
};

export default UsersList;
