import { Button, Col, Row, Table, Tag } from 'antd'
import Title from 'antd/es/typography/Title';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const MyGuests = () => {

    const navigate = useNavigate();

    const dummmyGuests = [
        {
          key: "1",
          name: "Ivan",
          phone: "+7 (954) 9025 902",
          date: "ABC-123",
          showPass: "Silver",
          active: true,
        },
        {
          key: "2",
          name: "Anton",
          phone: "+7 (925) 8405 123",
          date: "XYZ-789",
          showPass: "Black",
        },
        {
          key: "3",
          name: "Michael",
          phone: "+7 (926) 7684 223",
          date: "DEF-456",
          showPass: "White",
        },
      ];
    
      const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        { title: "Date", dataIndex: "date", key: "date" },
        {
            title: 'Show Pass',
            key: "showPass",
            render: (record: any) => 
                record.showPass && record.active ? (
                    <Button color='green' href=''>Show</Button>
                ) : (
                    <Button color='red' disabled>Expired</Button>
                )
        },
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


  return (
    <div>
        <Row justify={'space-between'} style={{ marginBottom: 20}}>
            <Col>
                <Title level={4}>My Guests</Title>
            </Col>
            <Col>
            <Button onClick={() => navigate("/worker/guests/add")}>Add Guest</Button>
            </Col>
        </Row>
        <Table
              dataSource={dummmyGuests}
              columns={columns}
              pagination={false}
              rowClassName={(record) => (record.active ? "active-row" : "")}
            />
    </div>
  )
}

export default MyGuests