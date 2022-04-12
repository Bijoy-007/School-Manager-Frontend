import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';

import LandingFooter from '../components/landing/LandingFooter';
import LandingNavbar from '../components/landing/LandingNavbar';
import classes from './LandingLayout.module.css';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const LandingLayout = (props: Props) => {
  return (
    <Layout>
      <Header className={classes['landing-layout__header']}>
        <LandingNavbar />
      </Header>
      <Content>{props.children}</Content>
      <Footer>
        <LandingFooter />
      </Footer>
    </Layout>
  );
};

export default LandingLayout;
