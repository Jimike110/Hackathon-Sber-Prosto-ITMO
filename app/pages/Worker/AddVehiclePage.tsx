// app/pages/Worker/AddVehiclePage.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const AddVehiclePage: React.FC = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState();

  const onFinish = (values: any) => {
    console.log('Vehicle Added:', values);
    setCars(values)
    // After successfully adding a vehicle, navigate back to the landing page.
    navigate('/worker');
  };

  return (
    <Card style={{ padding: '24px' }}>
      <Title level={2}>Add Vehicle</Title>
      <Form layout="vertical" onFinish={onFinish}>
      <Form.Item 
          label="Vehicle Manufacturer" 
          name="manufacturer" 
          rules={[{ required: true, message: 'Please enter the vehicle manufacturer' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Vehicle Model" 
          name="model" 
          rules={[{ required: true, message: 'Please enter the vehicle model' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Plate Number" 
          name="plate" 
          rules={[{ required: true, message: 'Please enter the plate number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Color" 
          name="color" 
          rules={[{ required: true, message: 'Please enter the vehicle color' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddVehiclePage;
