// app/pages/Worker/WorkerLandingPage.tsx
import React, { useState } from "react";
import { Card, Table, Button, Typography, Row, Col, Tag, Space, Form, FormProps, Input, Checkbox } from "antd";
import { useNavigate, useOutletContext } from "react-router-dom";

type FieldType = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

interface WorkerLandingContext {
  cars: [];
}

const { Title, Text } = Typography;

const WorkerLandingPage: React.FC = () => {
  const navigate = useNavigate();
  // const { cars } = useOutletContext<WorkerLandingContext>();

  // Dummy data for vehicles
  const dummyCars = [
    {
      key: "1",
      manufacturer: "Toyota",
      model: "Toyota Camry",
      plate: "ABC-123",
      color: "Silver",
      active: true,
    },
    {
      key: "2",
      manufacturer: "Honda",
      model: "Honda Civic",
      plate: "XYZ-789",
      color: "Black",
    },
    {
      key: "3",
      manufacturer: "Ford",
      model: "Ford Focus",
      plate: "DEF-456",
      color: "White",
    },
  ];

  const columns = [
    { title: "Manufacturer", dataIndex: "manufacturer", key: "manufacturer" },
    { title: "Model", dataIndex: "model", key: "model" },
    { title: "Plate Number", dataIndex: "plate", key: "plate" },
    { title: "Color", dataIndex: "color", key: "color" },
    {
      title: "Status",
      key: "active",
      render: (record: any) =>
        record.active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="default">Inactive</Tag>
        ),
    },
  ];

  const activeVehicle = dummyCars.find((car) => car.active);

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row justify="space-between"
            align="middle"
            style={{ marginBottom: "24px" }}>
        <Col>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Имя"
              name="firstName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Фамилия"
              name="lastName"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              name="middleName"
              valuePropName="checked"
              label="Отчество"
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              name="phone"
              valuePropName="checked"
              label="Телефон"
            >
              <Input />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        
        <Col>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "24px" }}
          >
            <Col>
              <Title level={2}>My Vehicles</Title>
              <Text type="secondary">
                Below is a list of your currently registered vehicles.
              </Text>
            </Col>
            <Col>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/worker/add-vehicle")}
              >
                Add Vehicle
              </Button>
            </Col>
          </Row>

          {activeVehicle && (
            <Card
              bordered={false}
              style={{
                marginBottom: 24,
                borderRadius: 8,
                backgroundColor: "#e6f7ff",
                border: "1px solid #91d5ff",
              }}
            >
              <Title level={5} style={{ marginBottom: 8 }}>
                Current Active Vehicle
              </Title>
              <Text strong>{activeVehicle.model}</Text> ·
              <Text type="secondary" style={{ margin: "0 8px" }}>
                {activeVehicle.plate}
              </Text>{" "}
              ·<Tag color="blue">{activeVehicle.color}</Tag>
            </Card>
          )}

          <Card
            bordered={false}
            style={{
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <Table
              dataSource={dummyCars}
              columns={columns}
              pagination={false}
              rowClassName={(record) => (record.active ? "active-row" : "")}
            />
          </Card>
        </Col>
      </Row>

      <style>
        {`
          .active-row {
            background-color: #f6ffed;
          }
          .active-row:hover {
            background-color: #e6f7d7 !important;
          }
        `}
      </style>
    </div>
  );
};

export default WorkerLandingPage;
