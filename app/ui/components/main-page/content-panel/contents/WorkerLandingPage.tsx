// import React from "react";
// import { Card, Table, Button, Typography, Row, Col } from "antd";
// import { useNavigate } from "react-router-dom";
// import ContentPanel from "..";

// const { Title, Text } = Typography;

// // Dummy data representing the worker's vehicles.
// const dummyCars = [
//   { key: "1", model: "Toyota Camry", plate: "ABC-123", color: "Silver" },
//   { key: "2", model: "Honda Civic", plate: "XYZ-789", color: "Black" },
//   { key: "3", model: "Ford Focus", plate: "DEF-456", color: "White" },
// ];

// const columns = [
//   {
//     title: "Model",
//     dataIndex: "model",
//     key: "model",
//   },
//   {
//     title: "Plate Number",
//     dataIndex: "plate",
//     key: "plate",
//   },
//   {
//     title: "Color",
//     dataIndex: "color",
//     key: "color",
//   },
// ];

// const WorkerLandingPage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleAddVehicle = () => {
//     // Navigate to the "Add Vehicle" page.
//     ContentPanel({"selectedKey": "2"});
//     navigate("/add-vehicle");
//   };

//   return (
//     <div style={{ padding: "24px", background: "#f0f2f5" }}>
//       <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
//         <Col>
//           <Title level={2}>My Vehicles</Title>
//           <Text type="secondary">Below is a list of your currently registered vehicles.</Text>
//         </Col>
//         <Col>
//           <Button type="primary" size="large" onClick={handleAddVehicle}>
//             Add Vehicle
//           </Button>
//         </Col>
//       </Row>
//       <Card bordered={false} style={{ borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//         <Table 
//           dataSource={dummyCars} 
//           columns={columns} 
//           pagination={false} 
//           responsive 
//         />
//       </Card>
//     </div>
//   );
// };

// export default WorkerLandingPage;
