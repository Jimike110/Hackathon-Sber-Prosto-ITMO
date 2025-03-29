import { Card, Modal, Space, Typography, DatePicker } from "antd";
import Title from "antd/es/typography/Title";
import type { GetProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});

const disabledRangeTime = (type: string) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

const { Text } = Typography;

// Reusable Modal Component
interface ParkingSpaceModalProps {
  visible: boolean;
  onClose: () => void;
  spaceInfo: {
    row: number;
    column: number;
  } | null;
}

const ParkingSpaceModal: React.FC<ParkingSpaceModalProps> = ({
  visible,
  onClose,
  spaceInfo,
}) => {

    
  return (
    <Modal
      title={`Информация о месте`}
      open={visible}
      onOk={onClose}
      onCancel={onClose}
    >
      {spaceInfo && (
        <>
          <Space
            direction="vertical"
            size={"middle"}
            style={{ display: "flex" }}
          >
            <div>
              <Text>Номер ряда: {spaceInfo.column}</Text>
              <br />
              <Text>Номер места: {spaceInfo.row}</Text>
              <br />
              <Text>Статус: </Text>
              <br />
              <Text>Телефон: </Text>
              <br />
            </div>
            <Title level={5}>Выберете время</Title>
            <Card>
              <Space size="middle">
                <div className="date-start">
                    <Text>Старт: </Text>
                  <DatePicker
                  type="start"
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={disabledDate}
                    disabledTime={disabledRangeTime}
                    showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                  />
                </div>
                <div className="date-end">
                    <Text>Окончание</Text>
                  <DatePicker
                  type="end"
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={disabledDate}
                    disabledTime={disabledRangeTime}
                    showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                  />
                </div>
              </Space>
            </Card>
          </Space>
        </>
      )}
    </Modal>
  );
};

export default ParkingSpaceModal;
