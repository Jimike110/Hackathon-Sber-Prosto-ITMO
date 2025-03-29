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



  // Booking type state
  const [bookingType, setBookingType] = useState<'Day' | 'Hour'>('Day');
  // For day booking: store disabled dates (simulate API result)
  const [disabledDayDates, setDisabledDayDates] = useState<string[]>([]);
  const [selectedDayRange, setSelectedDayRange] = useState<[any, any] | null>(null);
  
  // For hour booking: store selected date and time, and disabled hours (simulate API result)
  const [selectedHourDate, setSelectedHourDate] = useState<any>(null);
  const [selectedHourTime, setSelectedHourTime] = useState<any>(null);
  const [disabledHourTimes, setDisabledHourTimes] = useState<number[]>([]);

  // Simulate fetching disabled dates for day booking when booking type changes to 'Day'
  useEffect(() => {
    if (bookingType === 'Day') {
      // Example: These dates are occupied – replace with your API call
      setDisabledDayDates(["2025-04-01", "2025-04-05"]);
      // Clear any previously selected values
      setSelectedDayRange(null);
    }
  }, [bookingType]);

  // When switching to Hour booking, reset previous selections
  useEffect(() => {
    if (bookingType === 'Hour') {
      setSelectedHourDate(null);
      setSelectedHourTime(null);
      setDisabledHourTimes([]); // reset API-simulated disabled hours
    }
  }, [bookingType]);

  // Handler for radio button changes
  const handleBookingTypeChange = (e: any) => {
    const value = e.target.value;
    setBookingType(value);
  };

  // For hour booking: when a date is selected, fetch disabled hours for that date
  const handleHourDateChange = (date: any, dateString: string | string[]) => {
    setSelectedHourDate(date);
    // Simulate an API call:
    // For example, if the chosen date is "2025-04-10", disable hours 10, 11, and 15.
    if (dateString === "2025-04-10") {
      setDisabledHourTimes([10, 11, 15]);
    } else {
      setDisabledHourTimes([]);
    }
  };

  // Disable past dates and API-provided occupied dates for day booking
  const disabledDayDate = (current: any) => {
    if (!current) return false;
    const today = dayjs().startOf("day");
    if (current.isBefore(today)) return true;
    return disabledDayDates.includes(current.format("YYYY-MM-DD"));
  };

  // For hour booking, disable past dates
  const disabledHourDate = (current: any) => {
    if (!current) return false;
    const today = dayjs().startOf("day");
    return current.isBefore(today);
  };

  // Disable times in TimePicker for hour booking
  const disabledHourTime = () => {
    // Start with API-simulated disabled hours
    let disabled = [...disabledHourTimes];
    // If the selected date is today, also disable hours less than the current hour.
    if (selectedHourDate && selectedHourDate.isSame(dayjs(), "day")) {
      const currentHour = dayjs().hour();
      for (let i = 0; i < currentHour; i++) {
        if (!disabled.includes(i)) disabled.push(i);
      }
    }
    // Sort disabled hours array
    disabled.sort((a, b) => a - b);
    return { disabledHours: () => disabled };
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
            <br />
            <Text>Статус: </Text>
            <br />
            <Text>Телефон: </Text>
            <br />
          </div>
          <Title level={5}>Выберите время бронирования</Title>
          <Card>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Radio.Group
                options={options}
                onChange={handleBookingTypeChange}
                value={bookingType}
                optionType="button"
                buttonStyle="solid"
              />
              {bookingType === "Day" ? (
                <div style={{ marginTop: 16 }}>
                  <RangePicker
                    disabledDate={disabledDayDate}
                    onChange={(dates) => setSelectedDayRange(dates as [any, any])}
                    format="YYYY-MM-DD"
                    style={{ width: "100%" }}
                  />
                </div>
              ) : (
                <div style={{ marginTop: 16 }}>
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
                    />
                  </Space>
                </div>
              )}
            </Space>
          </Card>
        </Space>
      )}
    </Modal>
  );
};

export default ParkingSpaceModal;
