import { Avatar, Button, Popconfirm, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';
import updateUserDetails from '../../../apis/update-user-details';
import Userlist from '../../../types/user/userList';

interface Props {
  data: Userlist[];
}

const updateStatus = async (details: Userlist) => {
  try {
    const res = await updateUserDetails({
      id: details.id,
      isActive: !details.isActive,
      name: '',
      email: '',
      type: '',
      joiningDate: null,
      description: '',
      teacherId: '',
      phone: '',
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

const activatehandler = (record: Userlist) => {
  // eslint-disable-next-line no-console
  console.log(record);
  updateStatus(record).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
};

const columns: ColumnType<Userlist>[] = [
  {
    title: '',
    dataIndex: 'profileImage',
    key: 'profileImage',
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
          {record.name.slice(0, 1).toUpperCase()}
        </Avatar>
      ),
  },
  {
    title: 'Teacher Id',
    dataIndex: 'teacherId',
    key: 'teacherId',
    sorter: (a, b) => {
      return a.teacherId > b.teacherId ? 1 : -1;
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Designation',
    dataIndex: 'type',
    key: 'type',
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
      const types = record.type.toUpperCase().split(' ').join('_');
      return types.indexOf(value.toString()) === 0;
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
    key: 'createdAt',
    sorter: (a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1;
    },
    /**
     * TODO => Add date format
     */
  },
  {
    title: 'Contact Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'isActive',
    render: (text, record) =>
      record.isActive ? (
        <Popconfirm
          placement="topLeft"
          title={`Are you sure you want to deactivate ${record.name}?`}
          onConfirm={activatehandler.bind(this, record)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" shape="round" danger>
            Diactivate
          </Button>
        </Popconfirm>
      ) : (
        <Popconfirm
          placement="topRight"
          title={`Are you sure you want to activate ${record.name}?`}
          onConfirm={activatehandler.bind(this, record)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            onClick={activatehandler.bind(this, record)}
            type="primary"
            shape="round"
          >
            Activate
          </Button>
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
      pagination={{ position: ['topRight'] }}
      dataSource={props.data}
      onChange={onChange}
      onRow={(record, rowIndex) => {
        return {
          // * click row
          onClick: () => {
            // eslint-disable-next-line no-console
            console.log(record.id, rowIndex);
            if (record.id) navigate(`/app/users/${record.id}`);
          },
        };
      }}
    />
  );
};

export default ListTable;
