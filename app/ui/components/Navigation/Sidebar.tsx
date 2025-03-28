// src/components/Navigation/Sidebar.tsx
import React from 'react';
import { Menu } from 'antd';
import { DashboardOutlined, CarOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Home', key: '/', icon: <DashboardOutlined /> },
    { label: 'My Vehicles', key: '/worker', icon: <CarOutlined /> },
    { label: 'Add Vehicle', key: '/worker/add-vehicle', icon: <PlusOutlined /> },
    { label: 'Admin Panel', key: '/admin', icon: <UserOutlined /> },
  ];

  const handleClick = (e: any) => {
    navigate(e.key);
  };

  return (
    <Menu 
      theme="dark" 
      mode="inline" 
      selectedKeys={[location.pathname]}
      onClick={handleClick}
      items={menuItems}
    />
  );
};

export default Sidebar;
