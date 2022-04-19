import { Avatar, Button, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
// import { tableColumnTextFilterConfig } from '../../../components/app/UserList/TableUtils';

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
    render: (text, record) =>
      record.profileImage ? (
        <Avatar src={record.profileImage} />
      ) : (
        <Avatar src="https://joeschmoe.io/api/v1/random" />
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
        <Button
          onClick={activatehandler.bind(this, record)}
          type="primary"
          shape="round"
          danger
        >
          Diactivate
        </Button>
      ) : (
        <Button
          onClick={activatehandler.bind(this, record)}
          type="primary"
          shape="round"
        >
          Activate
        </Button>
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
    profileImage: 'https://source.unsplash.com/user/c_v_r?sig=1',
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
    profileImage: 'https://source.unsplash.com/user/c_v_r?sig=3',
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

const UsersList = () => {
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
  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default UsersList;

/**
 * 
 *  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => ({ children: name }),
    ...tableColumnTextFilterConfig<UserData>(),
    onFilter: (value, record) => {
      return record.name
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase());
    },
  },
 */

/**
   * 
   * // interface CustomColumn {
//   title: string | React.ReactNode;
//   dataIndex: string | string[];
//   // sorter?: { compare: (a: UserData, b: UserData) => number };

//   onFilter?: (value: string, record: UserData) => boolean;
// }

// const columns: ColumnsType<CustomColumn> = [
//   {
//     title: 'Teacher Id',
//     dataIndex: 'teacherId',
//     sorter: (a: { teacherId: string; }, b: { teacherId: string; }) =>
//       a.teacherId.length - b.teacherId.length,
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     // render: (text: string) => text,
//     // ...tableColumnTextFilterConfig<UserData>(),
//     // onFilter: (value: string, record: { name: string }) => {
//     //   return record.name
//     //     .toString()
//     //     .toLowerCase()
//     //     .includes(value.toString().toLowerCase());
//     // },
//   },
//   {
//     title: 'Designation',
//     dataIndex: 'designation',
//   },
//   {
//     title: 'Joining Date',
//     dataIndex: 'joiningDate',
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//   },
// ];
   */

/***
 * 
 * 
 * 
 * {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    onCell: () => ({}),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      // clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
          <Button
            onClick={() => {
              confirm();
            }}
            type="primary"
          >
            Search
          </Button>
         <Button
            onClick={() => {
              clearFilters();
            }}
            type="primary"
          >
            Reset
          </Button> 
          </>
          );
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
        onFilter: (value, record) => record.name.indexOf(value.toString()) === 0,
      },
 */
