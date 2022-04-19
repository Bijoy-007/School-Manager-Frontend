import ContentWrapper from '../../../components/app/ui/ContentWrapper';
import ListTable from '../../../components/app/UserList/ListTable';
import UserListInfo from '../../../components/app/UserList/UserListInfo';
import Applayout from '../../../layout/AppLayout';

const UsersList = () => {
  return (
    <Applayout>
      <ContentWrapper>
        <UserListInfo />
        <ListTable />
      </ContentWrapper>
    </Applayout>
  );
};

export default UsersList;
