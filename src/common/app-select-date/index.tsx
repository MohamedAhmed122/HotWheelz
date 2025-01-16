import {View} from 'react-native';
import {useState} from 'react';
import moment from 'moment';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {AppInput} from 'common/input';

type Props = {
  date: Date;
  setDate(d: Date): void;
  placeholder?: string;
};
export default function AppSelectDate({
  setDate,
  date,
  placeholder = 'Select Date',
}: Props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);

  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (d: Date) => {
    hideDatePicker();
    setDate(d);
  };

  console.log(moment().toDate(), moment().add(1, 'years').toDate());

  return (
    <View>
      <AppInput
        leftIconName="down"
        rightIconName="calendar"
        placeholder={placeholder}
        onPressIn={showDatePicker}
        value={date ? moment(date).format('DD.MM.YYYY') : ''}
      />
      <DateTimePickerModal
        date={date}
        isVisible={isDatePickerVisible}
        mode={'date'}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={moment().toDate()}
        maximumDate={moment().add(1, 'years').toDate()}
      />
    </View>
  );
}
