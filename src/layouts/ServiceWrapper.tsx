import { useState } from 'react';

import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Avatar, Row } from 'antd';
import styled from 'styled-components';
const { Content, Sider, Header } = Layout;

const ServiceWrapper = ({ children }: any) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <Layout>
      <Sider
        collapsed={isCollapsed}
        onCollapse={(collapsedState) => setIsCollapsed(collapsedState)}
        width={240}
        style={{
          borderRight: '1px solid #dadada',
          background: 'white',
        }}
      >
        <Logo
          src={isCollapsed ? '/logo-small.png' : '/logo.png'}
          alt='switchwon logo'
        />
        <Menu mode='inline'>
          <Menu.Item key='menu'>
            <ShoppingCartOutlined style={{ fontSize: 20 }} />
            {!isCollapsed && <>주문 목록</>}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{
          transition: 'all 0.2s',
          minHeight: '100vh',
          backgroundColor: '#f8f8f8',
        }}
      >
        <HeaderBox>
          <Row
            justify='space-between'
            style={{ height: '100%' }}
            align='middle'
          >
            <MenuOutlined
              style={{ fontSize: 20 }}
              onClick={() => setIsCollapsed((prevState) => !prevState)}
            />
            <Avatar size={25} icon={<UserOutlined />} />
          </Row>
        </HeaderBox>
        <Content style={{ margin: '24px 16px 0' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

const Logo = styled.img`
  width: auto;
  height: 108px;
  padding: 40px 32px;
`;

const HeaderBox = styled(Header)`
  padding: 0px 15px;
  background-color: white;
  box-shadow: 0 2px 8px #eee;
`;
export default ServiceWrapper;
