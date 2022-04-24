import { Avatar, Button, Popconfirm, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import Userlist from '../../../types/user/userList';

interface Props {
  data: Userlist[];
}

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

// const data: Userlist[] = [
//   {
//     key: '1',
//     teacherId: 'T005',
//     name: 'John Brown',
//     joiningDate: '01/01/2019',
//     designation: 'Principal',
//     engagementType: 'Permanent',
//     isActive: true,
//     profileImage: 'https://joeschmoe.io/api/v1/random',
//   },
//   {
//     key: '2',
//     teacherId: 'T002',
//     name: 'Brown',
//     joiningDate: '01/10/2020',
//     designation: 'Senior Teacher',
//     engagementType: 'Permanent',
//     isActive: true,
//     profileImage: 'https://source.unsplash.com/user/c_v_r?sig=2',
//   },
//   {
//     key: '3',
//     teacherId: 'T003',
//     name: 'Jon',
//     joiningDate: '11/01/2020',
//     designation: 'Assistant Teacher',
//     engagementType: 'Temporary',
//     isActive: true,
//     profileImage: 'https://joeschmoe.io/api/v1/random',
//   },
//   {
//     key: '4',
//     teacherId: 'T004',
//     name: 'Test',
//     joiningDate: '01/01/2021',
//     designation: 'Principal',
//     engagementType: 'Permanent',
//     isActive: false,
//     profileImage: '',
//   },
// ];

const activatehandler = (record: Userlist) => {
  // eslint-disable-next-line no-console
  console.log(record);
};

const ListTable = (props: Props) => {
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
      dataSource={props.data}
      onChange={onChange}
      onRow={(record, rowIndex) => {
        return {
          // * click row
          onClick: () => {
            // eslint-disable-next-line no-console
            console.log(record, rowIndex);
          },
        };
      }}
    />
  );
};

export default ListTable;

/**
 * {
    "message": "success",
    "status": true,
    "data": [
        {
            "id": "3cf954c5-bc9a-49a7-95d2-8a50bc2b64b3",
            "name": "Bijoy",
            "email": "dasbijoy9804417767@gmail.com",
            "type": "ASSISTANT_TEACHER",
            "isActive": true,
            "createdAt": "2022-04-23T08:07:32.048Z",
            "teacherId": "T-1"
        },
        {
            "id": "5a1c3cd9-c31f-42b8-b776-21958d7d34d6",
            "name": "Prodip Kumar Paul",
            "email": "prodipkumarpaul708@gmail.com",
            "type": "ASSISTANT_TEACHER",
            "isActive": true,
            "createdAt": "2022-04-23T08:08:38.908Z",
            "teacherId": "T-2"
        }
    ]
}
 */
