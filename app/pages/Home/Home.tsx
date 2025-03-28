// src/pages/Home/Home.tsx
import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <Card>
      <Title>Welcome to the Car Parking System</Title>
      <Paragraph>
        Use the sidebar to navigate through your dashboard.
      </Paragraph>
    </Card>
  );
};

export default Home;
