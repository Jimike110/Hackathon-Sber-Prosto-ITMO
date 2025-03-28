// import React from 'react';
// import { Form, Input, Button, Card } from 'antd';

// const AddVehiclePage: React.FC = () => {
//   const onFinish = (values: any) => {
//     console.log('Received values:', values);
//     // Implement vehicle addition logic here
//   };

//   return (
//     <Card>
//       <Form layout="vertical" onFinish={onFinish}>
//         <Form.Item
//           name="model"
//           label="Vehicle Model"
//           rules={[{ required: true, message: 'Please enter the vehicle model' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="plate"
//           label="Plate Number"
//           rules={[{ required: true, message: 'Please enter the plate number' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="color"
//           label="Color"
//           rules={[{ required: true, message: 'Please enter the vehicle color' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Add Vehicle
//           </Button>
//         </Form.Item>
//       </Form>
//     </Card>
//   );
// };

// export default AddVehiclePage;
