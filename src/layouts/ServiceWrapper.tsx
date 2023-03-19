import { useState } from 'react';
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { Layout, Menu } from 'antd';
import styled from 'styled-components';
const { Content, Sider, Header } = Layout;

const ServiceWrapper = ({ children }: any) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <Layout>
      <Sider
        collapsed={isCollapsed}
        onCollapse={(collapsedState) => setIsCollapsed(collapsedState)}
        width={260}
        style={{
          borderRight: '1px solid #dadada',
          background: 'white',
        }}
      >
        {!isCollapsed && <Logo src={'/logo.png'} alt='switchwon logo' />}

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
        <Header
          style={{
            padding: '0px 15px',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px #eee',
          }}
        >
          <MenuOutlined
            style={{ fontSize: 20 }}
            onClick={() => setIsCollapsed((prevState) => !prevState)}
          />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

const Logo = styled.img`
  width: 100%;
  padding: 40px;
`;
export default ServiceWrapper;
