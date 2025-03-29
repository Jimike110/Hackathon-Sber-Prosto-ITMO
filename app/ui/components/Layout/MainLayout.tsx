// src/components/Layout/MainLayout.tsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../Navigation/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import Title from 'antd/es/typography/Title';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC<{ title?: string }> = ({ title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  // const matches = useMatches();

  // Get title from route state or prop
  const pageTitle = title || location.state?.title || 'Car Parking System';
  // const pageTitle = matches[matches.length - 1].handle?.

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255,255,255,0.3)' }} />
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <Title level={3} style={{ margin: 0 }}>{pageTitle}</Title>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Car Parking System ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;