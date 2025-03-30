// app/ui/components/Navigation/Sidebar.tsx
import React from 'react';
import { Menu, QRCode } from 'antd';
import { DashboardOutlined, CarOutlined, PlusOutlined, UserOutlined, QrcodeOutlined, MonitorOutlined, CameraOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogout } from '@/app/hooks/useLogout';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
    const { logoutUser } = useLogout();

  const menuItems = [
    { label: 'Home', key: '/', icon: <DashboardOutlined /> },
    { label: 'My Profile', key: '/worker', icon: <CarOutlined /> },
    { label: 'Add Vehicle', key: '/worker/add-vehicle', icon: <PlusOutlined /> },
    { label: 'Guests', key: '/worker/guests', icon: <UserOutlined />},
    { label: 'Admin Panel', key: '/admin', icon: <UserOutlined /> },
    { label: "QR Checker", key: '/admin/qr', icon: <QrcodeOutlined />},
    { label: "Screen", key: "/admin/screen", icon: <CameraOutlined />},
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
