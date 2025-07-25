import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Platform,
} from "react-native";

interface CalendarModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDateSelect?: (date: string) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  isVisible,
  onClose,
  onDateSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

const handleChange = (
  event: DateTimePickerEvent,
  date?: Date | undefined
) => {
  if (event.type === "set" && date) {
    setSelectedDate(date);
    onDateSelect?.(date.toISOString().split("T")[0]);

    // For Android only: DateTimePicker auto-closes, so defer close slightly
    if (Platform.OS === "android") {
      setTimeout(() => {
        onClose();
      }, 100); // 100ms delay prevents flicker
    }
  } else if (event.type === "dismissed") {
    onClose(); // user canceled
  }
};


  return (
   <DateTimePicker
  value={selectedDate}
  mode="date"
  display={Platform.OS === "ios" ? "inline" : "calendar"}
  onChange={handleChange}
  themeVariant="dark"
  textColor="white"
  style={{ backgroundColor: "#6A1B9A" }}
/>

  );
};

export default CalendarModal;

