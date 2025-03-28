// src/components/Layout/MainLayout.tsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../Navigation/Sidebar';
import { Outlet } from 'react-router-dom';
// import './MainLayout.css';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255,255,255,0.3)' }} />
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Car Parking System ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
