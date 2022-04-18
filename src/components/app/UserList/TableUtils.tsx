import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useRef } from 'react';

export function tableColumnTextFilterConfig<T>(): ColumnType<T> {
  const searchInput = useRef<InputRef>(null);

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={'Search'}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button size="small" style={{ width: 90 }} onClick={clearFilters}>
            Reset
          </Button>
        </div>
      );
    },
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  };
}
