// src/pages/Admin/AdminDashboard.tsx
import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const AdminDashboard: React.FC = () => {
  return (
    <Card>
      <Title level={2}>Admin Dashboard</Title>
      <p>Admin related content goes here.</p>
    </Card>
  );
};

export default AdminDashboard;
