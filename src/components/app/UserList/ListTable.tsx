import { Avatar, Button, Popconfirm, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';

interface UserData {
  key: string;
  teacherId: string;
  name: string;
  joiningDate: string;
  designation: string;
  engagementType: string;
  status: string;
  profileImage: string;
}

const columns: ColumnType<UserData>[] = [
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
    dataIndex: 'designation',
    key: 'designation',
    filters: [
      {
        text: 'Principal',
        value: 'Principal',
      },
      {
        text: 'Senior Teacher',
        value: 'Senior Teacher',
      },
      {
        text: 'Assistant Teacher',
        value: 'Assistant Teacher',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) =>
      record.designation.indexOf(value.toString()) === 0,
  },
  {
    title: 'Joining Date',
    dataIndex: 'joiningDate',
    key: 'joiningDate',
    sorter: (a, b) => {
      return new Date(a.joiningDate) > new Date(b.joiningDate) ? 1 : -1;
    },
  },
  {
    title: 'Engagement Type',
    dataIndex: 'engagementType',
    key: 'engagementType',
    filters: [
      {
        text: 'Permanent',
        value: 'Permanent',
      },
      {
        text: 'Temporary',
        value: 'Temporary',
      },
    ],
    onFilter: (value, record) =>
      record.engagementType.indexOf(value.toString()) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'status',
    render: (text, record) =>
      record.status === 'Active' ? (
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

const data: UserData[] = [
  {
    key: '1',
    teacherId: 'T005',
    name: 'John Brown',
    joiningDate: '01/01/2019',
    designation: 'Principal',
    engagementType: 'Permanent',
    status: 'Active',
    profileImage: 'https://joeschmoe.io/api/v1/random',
  },
  {
    key: '2',
    teacherId: 'T002',
    name: 'Brown',
    joiningDate: '01/10/2020',
    designation: 'Senior Teacher',
    engagementType: 'Permanent',
    status: 'Inactive',
    profileImage: 'https://source.unsplash.com/user/c_v_r?sig=2',
  },
  {
    key: '3',
    teacherId: 'T003',
    name: 'Jon',
    joiningDate: '11/01/2020',
    designation: 'Assistant Teacher',
    engagementType: 'Temporary',
    status: 'Active',
    profileImage: 'https://joeschmoe.io/api/v1/random',
  },
  {
    key: '4',
    teacherId: 'T004',
    name: 'Test',
    joiningDate: '01/01/2021',
    designation: 'Principal',
    engagementType: 'Permanent',
    status: 'Inactive',
    profileImage: '',
  },
];

const activatehandler = (record: UserData) => {
  // eslint-disable-next-line no-console
  console.log(record);
};

const ListTable = () => {
  const onChange = (
    pagination: unknown,
    filters: unknown,
    sorter: unknown,
    extra: unknown,
  ) => {
    // alert('onChange');
    // eslint-disable-next-line no-console
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <Table
      columns={columns}
      pagination={{ position: ['topRight'] }}
      dataSource={data}
      onChange={onChange}
    />
  );
};

export default ListTable;
