import { useState } from 'react';

import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Row } from 'antd';
import styled from 'styled-components';
import { Routes } from '../routes/routes';
import { Colors } from '../config/Colors';

const { Content, Sider, Header: AntdHeader } = Layout;

const { MAIN } = Colors;

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
          overflow: 'hidden',
        }}
      >
        <Logo
          src={isCollapsed ? '/logo-small.png' : '/logo.png'}
          alt='switchwon logo'
        />
        <Menu selectedKeys={['/']}>
          {Routes.map((route) => (
            <MenuItem key={route.path} icon={Object(route.sidebar).icon}>
              {Object(route.sidebar).label}
            </MenuItem>
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{
          transition: 'all 0.2s',
          minHeight: '100vh',
          backgroundColor: '#f8f8f8',
        }}
      >
        <Header>
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
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

const MenuItem = styled(Menu.Item)`
  font-weight: 700;
  font-size: 15px;

  &.ant-menu-item-selected {
    color: ${MAIN};
    background: #fff2e6;
  }
`;
const Logo = styled.img`
  width: auto;
  height: 108px;
  padding: 40px 32px;
`;

const Header = styled(AntdHeader)`
  padding: 0px 15px;
  background-color: white;
  box-shadow: 0 2px 8px #eee;
`;
export default ServiceWrapper;
