// app/ui/components/Modal/index.tsx

import { fetchData, isApiError } from "@/app/lib/api";
import { Modal, Space, Typography, DatePicker, Radio, TimePicker, Card } from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const { Text } = Typography;

interface ParkingSpaceModalProps {
  visible: boolean;
  onClose: () => void;
  spaceInfo: {
    row: number;
    column: number;
  } | null;
}

const options = [
  { label: 'По дням', value: 'Day' },
  { label: 'По часам', value: 'Hour' },
];

const ParkingSpaceModal: React.FC<ParkingSpaceModalProps> = ({
  visible,
  onClose,
  spaceInfo,
}) => {
  const [bookingType, setBookingType] = useState<'Day' | 'Hour'>('Day');
  const [disabledDayDates, setDisabledDayDates] = useState<string[]>([]);
  const [selectedDayRange, setSelectedDayRange] = useState<[any, any] | null>(null);
  const [selectedHourDate, setSelectedHourDate] = useState<any>(null);
  const [selectedHourTime, setSelectedHourTime] = useState<any>(null);
  const [disabledHourTimes, setDisabledHourTimes] = useState<number[]>([]);

  useEffect(() => {
    if (bookingType === 'Day') {
      console.log("Fetching disabled dates for day booking...");
      // Fake API response
      const fakeData = { forbiddenDates: ["2025-04-01", "2025-04-05"] };
      setDisabledDayDates(fakeData.forbiddenDates);

      // Uncomment to use real API
      
      // fetchData(`/booking/${spaceInfo?.row}_${spaceInfo?.column}/date`)
      //   .then((data) => {
      //     console.log("API Response for Day Booking:", data);
      //     setDisabledDayDates(data.forbiddenDates);
      //   })
      //   .catch((error) => console.error("Error fetching day booking data:", error));
      
    }
  }, [bookingType, spaceInfo]);

  const handleHourDateChange = (date: any, dateString: string) => {
    setSelectedHourDate(date);
    console.log("Fetching disabled hours for:", dateString);
    
    // Fake API response
    // const fakeData = { forbiddenHours: dateString === "2025-04-10" ? [10, 11, 15] : [] };
    // setDisabledHourTimes(fakeData.forbiddenHours);
    
    // Uncomment to use real API
    fetchData(`/booking/${spaceInfo?.row}_${spaceInfo?.column}/hours?day=${dateString}`)
      .then((data) => {
        console.log("API Response for Hour Booking:", data);
        setDisabledHourTimes(data.forbiddenHours);
      })
      .catch((error) => console.error("Error fetching hour booking data:", error));
  };

  const disabledDayDate = (current: any) => {
    if (!current) return false;
    return current.isBefore(dayjs().startOf("day")) || disabledDayDates.includes(current.format("YYYY-MM-DD"));
  };

  const disabledHourDate = (current: any) => {
    return current && current.isBefore(dayjs().startOf("day"));
  };

  const disabledHourTime = () => {
    let disabled = [...disabledHourTimes];
    if (selectedHourDate && selectedHourDate.isSame(dayjs(), "day")) {
      const currentHour = dayjs().hour();
      for (let i = 0; i < currentHour; i++) {
        if (!disabled.includes(i)) disabled.push(i);
      }
    }
    return { disabledHours: () => disabled.sort((a, b) => a - b) };
  };

  return (
    <Modal
      title={`Информация о месте`}
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      width={600}
    >
      {spaceInfo && (
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <div>
            <Text>Номер ряда: {spaceInfo.column}</Text>
            <br />
            <Text>Номер места: {spaceInfo.row}</Text>
          </div>
          <Title level={5}>Выберите время бронирования</Title>
          <Card>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Radio.Group
                options={options}
                onChange={(e) => setBookingType(e.target.value)}
                value={bookingType}
                optionType="button"
                buttonStyle="solid"
              />
              {bookingType === "Day" ? (
                <RangePicker
                  disabledDate={disabledDayDate}
                  onChange={(dates) => setSelectedDayRange(dates as [any, any])}
                  format="YYYY-MM-DD"
                  style={{ width: "100%" }}
                />
              ) : (
                <Space direction="vertical" style={{ width: "100%" }}>
                  <DatePicker
                    disabledDate={disabledHourDate}
                    onChange={handleHourDateChange}
                    format="YYYY-MM-DD"
                    style={{ width: "100%" }}
                    placeholder="Выберите дату"
                  />
                  <TimePicker
                    disabledTime={disabledHourTime}
                    onChange={(time) => setSelectedHourTime(time)}
                    format="HH:mm"
                    style={{ width: "100%" }}
                    placeholder="Выберите время"
                    minuteStep={15}
                  />
                </Space>
              )}
            </Space>
          </Card>
        </Space>
      )}
    </Modal>
  );
};

export default ParkingSpaceModal;
