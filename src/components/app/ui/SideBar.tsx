import { useState } from 'react';
import { Layout, Menu, notification } from 'antd';
import {
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import classes from './SideBar.module.css';
import ClickEvent from '../../../types/click-event';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '../../../store/slices/authSlice';

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [selectedKey, setSelectedKey] = useState<string>('1');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = (event: ClickEvent) => {
    if (event.key === 'logout') return setSelectedKey('/');
    setSelectedKey(event.key);
    navigate(`/app/${event.key}`);
  };

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const logoutHandler = () => {
    dispatch(logoutReducer());
    notification.success({ message: 'Logged out successfully' });
    navigate('/');
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className={classes['sidebar__logo']}>LOGO</div>
      <Menu
        selectedKeys={[selectedKey]}
        onClick={clickHandler}
        theme="dark"
        mode="inline"
      >
        <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
        <Menu.Item
          key="logout"
          onClick={logoutHandler}
          icon={<LogoutOutlined />}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
