import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';

const screenHeight = Dimensions.get('window').height;

interface CalendarModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDateSelect?: (date: string) => void;
  markedDates?: { [key: string]: any };
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  isVisible,
  onClose,
  onDateSelect,
  markedDates = {},
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.4}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Availability Calendar</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Calendar
            markedDates={markedDates}
            onDayPress={(day) => {
              onDateSelect?.(day.dateString);
              onClose();
            }}
            style={styles.calendar}
            theme={{
              backgroundColor: '#fff',
              calendarBackground: '#fff',
              selectedDayBackgroundColor: '#4CAF50',
              todayTextColor: '#4CAF50',
              arrowColor: '#4CAF50',
              textSectionTitleColor: '#2A1524',
            }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    maxHeight: screenHeight * 0.8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#2A1524',
    marginBottom: 12,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  calendar: {
    borderRadius: 10,
  },
});
