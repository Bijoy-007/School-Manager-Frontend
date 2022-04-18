import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { tableColumnTextFilterConfig } from '../../../components/app/UserList/TableUtils';

interface UserData {
  key: string;
  teacherId: string;
  name: string;
  joiningDate: string;
  designation: string;
}

// interface CustomColumn {
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

const columns: ColumnType<UserData>[] = [
  {
    title: 'Teacher Id',
    dataIndex: 'teacherId',
    sorter: true,
  },
  {
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

  {
    title: 'Designation',
    dataIndex: 'designation',
  },
  {
    title: 'Joining Date',
    dataIndex: 'joiningDate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const data: UserData[] = [
  {
    key: '1',
    teacherId: 'T001',
    name: 'John Brown',
    joiningDate: '01/01/2020',
    designation: 'Principal',
  },
  {
    key: '2',
    teacherId: 'T002',
    name: 'Brown',
    joiningDate: '01/01/2020',
    designation: 'Principal',
  },
  {
    key: '3',
    teacherId: 'T003',
    name: 'Jon',
    joiningDate: '01/01/2020',
    designation: 'Principal',
  },
  {
    key: '4',
    teacherId: 'T004',
    name: 'Test',
    joiningDate: '01/01/2020',
    designation: 'Principal',
  },
];

const UsersList = () => {
  const onChange = (
    pagination: unknown,
    filters: unknown,
    sorter: unknown,
    extra: unknown,
  ) => {
    alert('onChange');
    // eslint-disable-next-line no-console
    console.log('params', pagination, filters, sorter, extra);
  };
  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default UsersList;
