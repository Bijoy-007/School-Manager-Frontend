import { useState } from 'react';
import { Input, AutoComplete, SelectProps } from 'antd';
import UserDetails from '../../../types/user/userDetails';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: UserDetails[];
}

const searchResult = (query: string, data: UserDetails[]) => {
  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.teacherId.toLowerCase().includes(query.toLowerCase()),
  );

  return filteredData.map((user) => {
    return {
      value: user.id,
      label: (
        <div>
          <p>
            {user.teacherId} <span>{user.name}</span>
          </p>
        </div>
      ),
    };
  });
};

const SearchBar = (props: Props) => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    value ? setOptions(searchResult(value, props.data)) : setOptions([]);
  };

  const onSelect = (value: string) => {
    navigate(`/app/users/${value}`);
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{ width: 300 }}
      onSelect={onSelect}
      options={options}
      onSearch={handleSearch}
    >
      <Input.Search size="large" placeholder="input here" enterButton />
    </AutoComplete>
  );
};

export default SearchBar;
