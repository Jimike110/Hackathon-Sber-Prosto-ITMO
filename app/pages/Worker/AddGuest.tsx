// app/pages/Worker/AddGuest.tsx

import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { RangePickerProps } from 'antd/es/date-picker';
import { postData } from '@/app/lib/api';

dayjs.extend(customParseFormat);

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  if (!current) return false;
  return current.isBefore(dayjs().startOf("day"));
};

export const AddGuest = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<any>(null);

  const onFinish = async (values: any) => {
    try {
      const payload = {
        ...values,
        arrival: values.arrival.toISOString(), // Ensure date is in a proper format
      };

      const data = await postData(`/pass/guest`, payload);
      console.log("API Response for Guest Booking:", data);

      setGuests(data);
      navigate('/worker/guests'); // Navigate only after success
    } catch (error) {
      console.error("Error submitting guest data:", error);
    }
  };

  return (
    <Card style={{ padding: '24px' }}>
      <Title level={2}>Add Guest</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item 
          label="Name" 
          name="name" 
          rules={[{ required: true, message: 'Please enter the guest name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Plate" 
          name="plate" 
          rules={[{ required: false, message: 'Please enter their plate number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Arrival" 
          name="arrival" 
          rules={[{ required: true, message: 'Please choose an arrival date and time' }]}
        >
          <DatePicker 
            showTime
            disabledDate={disabledDate}
            showSecond={false}
            minuteStep={15}
          />
        </Form.Item>
        <Form.Item 
          label="Duration" 
          name="duration" 
          rules={[{ required: true, message: 'Please choose a duration' }]}
        >
          <Select 
            options={[
              { value: 5, label: '5 minutes' },
              { value: 10, label: '10 minutes' },
              { value: 3600, label: '1 day' },
              { value: 43800, label: '1 month' }
            ]}
          />
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
