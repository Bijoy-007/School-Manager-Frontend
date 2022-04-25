import { LockTwoTone, UnlockTwoTone } from '@ant-design/icons';
import { Avatar, Button, Popconfirm, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';
import updateUserDetails from '../../../apis/update-user-details';
import UserDetails from '../../../types/user/userDetails';
// import moment from 'moment';

interface Props {
  data: Partial<UserDetails>[];
}

const updateStatus = async (details: Partial<UserDetails>) => {
  try {
    const res = await updateUserDetails({
      id: details.id,
      isActive: !details.isActive,
    });
    if (res.data && res.ok) {
      // eslint-disable-next-line no-console
      console.log(res.data);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

const activatehandler = (record: Partial<UserDetails>) => {
  updateStatus(record).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
};

const columns: ColumnType<Partial<UserDetails>>[] = [
  {
    title: '',
    dataIndex: 'profileImage',
    align: 'center',
    width: '5%',
    render: (text, record) =>
      record.profileImage ? (
        <Avatar src={record.profileImage} />
      ) : (
        <Avatar
          style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16,
            )}`,
          }}
        >
          {record.name?.slice(0, 1).toUpperCase()}
        </Avatar>
      ),
  },
  {
    title: 'Teacher Id',
    dataIndex: 'teacherId',
    sorter: (a, b) => {
      if (a.teacherId && b.teacherId) {
        return a.teacherId || '' > b.teacherId ? 1 : -1;
      }
      return 0;
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Designation',
    dataIndex: 'type',
    filters: [
      {
        text: 'Principal',
        value: 'PRINCIPAL',
      },
      {
        text: 'Senior Teacher',
        value: 'SENIOR_TEACHER',
      },
      {
        text: 'Assistant Teacher',
        value: 'ASSISTANT_TEACHER',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => {
      const types = record.type?.toUpperCase().split(' ').join('_');
      return types?.indexOf(value.toString()) === 0;
    },
    render: (text, record) => {
      switch (text) {
        case 'PRINCIPAL':
          record.type = 'Principal';
          break;
        case 'SENIOR_TEACHER':
          record.type = 'Senior Teacher';
          break;
        case 'ASSISTANT_TEACHER':
          record.type = 'Assistant Teacher';
          break;
      }
      return record.type;
    },
  },
  {
    title: 'Joining Date',
    dataIndex: 'createdAt',
    sorter: (a, b) => {
      if (a.createdAt && b.createdAt) {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        return aDate > bDate ? 1 : -1;
      }
      return 0;
    },
    /**
     * TODO => Add date format
     */
    render: (text) => {
      return new Date(text as Date).toLocaleDateString();
    },
  },
  {
    title: 'Contact Email',
    dataIndex: 'email',
  },
  {
    title: 'Action',
    dataIndex: 'isActive',
    render: (text, record) => (
      <Popconfirm
        placement="topLeft"
        title={`Are you sure you want to deactivate ${record.name || ''}?`}
        onConfirm={activatehandler.bind(this, record)}
        okText="Yes"
        cancelText="No"
        onCancel={(e) => {
          e?.stopPropagation();
        }}
      >
        <Button
          type="ghost"
          shape="circle"
          icon={record.isActive ? <LockTwoTone /> : <UnlockTwoTone />}
          onClick={(e) => {
            e.stopPropagation();
          }}
        ></Button>
      </Popconfirm>
    ),
  },
];

const ListTable = (props: Props) => {
  const navigate = useNavigate();
  const onChange = (
    pagination: unknown,
    filters: unknown,
    sorter: unknown,
    extra: unknown,
  ) => {
    // eslint-disable-next-line no-console
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <Table
      columns={columns}
      pagination={{ position: ['topRight'], pageSize: 10 }}
      dataSource={props.data}
      rowKey="id"
      onChange={onChange}
      onRow={(record) => {
        return {
          // * click row
          onClick: () => {
            if (record.id) navigate(`/app/users/${record.id}`);
          },
        };
      }}
    />
  );
};

export default ListTable;
