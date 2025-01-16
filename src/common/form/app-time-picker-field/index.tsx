import {FormikContextType, useFormikContext} from 'formik';
import {StyleSheet} from 'react-native';

import AppSelectTime from '../../app-select-time';
import {AppText} from 'common/text';
import {COLORS} from 'styles';

export const AppTimePickerField = () => {
  const {
    setFieldValue,
    values,
    errors,
    touched,
  }: FormikContextType<{startTime: Date; endTime: Date}> = useFormikContext();

  const setStartTime = (startTime: Date) => {
    setFieldValue('startTime', startTime);
  };

  const setEndTime = (endTime: Date) => {
    setFieldValue('endTime', endTime);
  };

  return (
    <>
      <AppSelectTime
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        startTime={values['startTime']}
        endTime={values['endTime']}
      />
      {errors['startTime'] && touched['startTime'] && (
        <AppText style={styles.error}>{errors['startTime'] as string}</AppText>
      )}
      {errors['endTime'] && touched['endTime'] && (
        <AppText style={styles.error}>{errors['endTime'] as string}</AppText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: COLORS.danger,
    margin: 10,
  },
});
