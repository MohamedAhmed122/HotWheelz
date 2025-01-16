import {View} from 'react-native';
import {useState} from 'react';
import moment from 'moment';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {AppInput} from 'common/input';

type Props = {
  startTime?: Date;
  endTime?: Date;
  setStartTime(d: Date): void;
  setEndTime(d: Date): void;
};
export default function AppSelectTime({
  setEndTime,
  setStartTime,
  startTime,
  endTime,
}: Props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [showStartTime, setShowStartTime] = useState(false);

  const [showEndTime, setShowEndTime] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);

  const hideDatePicker = () => setDatePickerVisibility(false);

  const onStartTimePressed = () => {
    showDatePicker();
    setShowStartTime(true);
  };

  const onEndTimePressed = () => {
    showDatePicker();
    setShowEndTime(true);
  };

  const onHidePicker = () => {
    hideDatePicker();
    setShowEndTime(false);
    setShowStartTime(false);
  };

  const handleConfirm = (date: Date) => {
    showStartTime && setStartTime(date);
    showEndTime && setEndTime(date);
    onHidePicker();
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <AppInput
          rightIconName="calendar"
          placeholder="Start Time"
          onPressIn={onStartTimePressed}
          value={startTime ? moment(startTime).format('HH:mm') : ''}
          inputContainerStyle={{
            width: '45%',
            marginLeft: '2.5%',
            borderRadius: 15,
          }}
        />
        <AppInput
          rightIconName="calendar"
          placeholder="End Time (Optional)"
          onPressIn={onEndTimePressed}
          value={endTime ? moment(endTime).format('HH:mm') : ''}
          inputContainerStyle={{
            width: '45%',
            marginLeft: '5%',
            borderRadius: 15,
          }}
        />
      </View>
      <DateTimePickerModal
        date={showStartTime ? startTime : endTime}
        isVisible={isDatePickerVisible}
        mode={'time'}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={moment().toDate()}
        maximumDate={moment().add(1, 'years').toDate()}
      />
    </View>
  );
}
