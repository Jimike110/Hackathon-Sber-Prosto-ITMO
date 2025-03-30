// // app/pages/Admin/AdminDashboard.tsx
// import React from 'react';
// import { Card, Typography } from 'antd';

// const { Title } = Typography;

// const AdminDashboard: React.FC = () => {
//   return (
//     <Card>
//       <Title level={2}>Admin Dashboard</Title>
//       <p>Admin related content goes here.</p>
//     </Card>
//   );
// };

// export default AdminDashboard;


import React, { useState } from "react";
import ReactDOM from "react-dom";
import { TimePicker } from "antd";
// import "antd/dist/antd.css";
// import "./index.css";
import moment from "moment";

const TimeComponent = () => {
  const [selectedTime, setSelectedTime] = useState(moment());
  const disabledHours = () => {
    const hours = [];
    const currentHour = moment().hour();

    for (let i = currentHour + 1; i <= 24; i++) {
      hours.push(i);
    }

    return hours;
  };

  const disabledMinutes = (selectedHour) => {
    const minutes = [];
    const currentMinute = moment().minute();
    if (selectedHour === moment().hour()) {
      for (let i = currentMinute + 1; i <= 60; i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  const onSelect = (time) => {
    if (time.isAfter(moment())) {
      console.log("ping");
      setSelectedTime(moment());
      return;
    }

    setSelectedTime(time);
  };

  return (
    <TimePicker
      onSelect={onSelect}
      disabledHours={disabledHours}
      disabledMinutes={disabledMinutes}
      format="h:mm a"
      value={selectedTime}
      style={{ width: "100%" }}
      use12Hours={true}
    />
  );
};

// ReactDOM.render(<TimeComponent />, document.getElementById("root"));

export default TimeComponent