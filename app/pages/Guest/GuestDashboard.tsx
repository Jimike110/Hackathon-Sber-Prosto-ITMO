// src/pages/Guest/GuestDashboard.tsx
import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const GuestDashboard: React.FC = () => {
  return (
    <Card>
      <Title level={2}>Guest Dashboard</Title>
      <p>Guest related content goes here.</p>
    </Card>
  );
};

export default GuestDashboard;
