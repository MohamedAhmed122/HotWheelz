import {FormikContextType, useFormikContext} from 'formik';
import {StyleSheet} from 'react-native';

import AppSelectDate from '../../app-select-date';
import {AppText} from 'common/text';
import {COLORS} from 'styles';
import {FC} from 'react';

type Props = {
  name: string;
  placeholder: string;
};

export const AppDatePickerField: FC<Props> = ({name, placeholder}) => {
  const {
    setFieldValue,
    values,
    errors,
    touched,
  }: FormikContextType<{date: Date}> = useFormikContext();

  const setDate = (date: Date) => setFieldValue(name, date);

  return (
    <>
      <AppSelectDate
        date={values[name]}
        setDate={setDate}
        placeholder={placeholder}
      />
      {errors[name] && touched[name] && (
        <AppText style={styles.error}>{errors[name] as string}</AppText>
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
