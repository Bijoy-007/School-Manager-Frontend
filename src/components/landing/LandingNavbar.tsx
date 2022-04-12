import { useState } from 'react';
import { Menu, Row, Col } from 'antd';
import {
  HomeFilled,
  ToolFilled,
  MailFilled,
  MenuOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import ClickEvent from '../../types/clickEvent';
import classes from './LandingNavbar.module.css';

const { Item } = Menu;

const LandingNavbar = () => {
  const [currentKey, setCurrentKey] = useState<string>('home');
  const navigate = useNavigate();

  const menuClickHandler = (event: ClickEvent) => {
    setCurrentKey(event.key);
    navigate(`/#${event.key}`);
  };

  const brandNameClickHandler = () => {
    setCurrentKey('home');
    navigate('/#home');
  };

  return (
    <div>
      <Row>
        <Col
          className={classes['landing-navbar__brand-wrapper']}
          lg={12}
          md={12}
          sm={20}
          xs={20}
        >
          <span
            onClick={brandNameClickHandler}
            className={classes['landing-navbar__brand-text']}
          >
            REACT TEMPLATE
          </span>
        </Col>
        <Col
          className={classes['landing-navbar__menu']}
          lg={12}
          md={12}
          sm={4}
          xs={4}
        >
          <Menu
            onClick={menuClickHandler}
            selectedKeys={[currentKey]}
            mode="horizontal"
            overflowedIndicator={
              <MenuOutlined
                style={{ fontSize: '1.2rem' }}
                className={classes['landing-menu__icon']}
              />
            }
          >
            <Item
              className={classes['landing-navbar__menu-item-one']}
              key="home"
              icon={<HomeFilled />}
            >
              Home
            </Item>
            <Item key="features" icon={<ToolFilled />}>
              Features
            </Item>
            <Item key="contact" icon={<MailFilled />}>
              Contact
            </Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default LandingNavbar;
