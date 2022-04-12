import { Layout } from 'antd';

import classes from './AppLayout.module.css';
import Loader from '../components/app/ui/Loader';
import SideBar from '../components/app/ui/SideBar';
import AppHedaer from '../components/app/ui/Header';

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

const { Header, Content } = Layout;

const Applayout = (props: Props) => {
  return (
    <Layout className={classes['app-layout__wrapper']}>
      <SideBar />
      <Layout>
        <Header className={classes['app-layout__header']}>
          <AppHedaer />
        </Header>
        {props.loading ? <Loader /> : <Content>{props.children}</Content>}
      </Layout>
    </Layout>
  );
};

export default Applayout;
