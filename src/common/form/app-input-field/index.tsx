import {FormikContextType, useFormikContext} from 'formik';
import {FC} from 'react';
import {Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {InitialValueType} from '../app-form';
import {AppInput, AppInputProps} from 'common/input';
import {COLORS} from 'styles';

interface Props extends AppInputProps {
  name: keyof InitialValueType;
  inputContainerStyle?: StyleProp<ViewStyle>;
}

export const AppInputField: FC<Props> = ({
  name,
  inputContainerStyle,
  ...otherProps
}) => {
  const {
    setFieldValue,
    values,
    errors,
    setFieldTouched,
    touched,
  }: FormikContextType<InitialValueType> = useFormikContext();
  console.log(errors);
  return (
    <>
      <AppInput
        inputContainerStyle={inputContainerStyle}
        onChangeText={text => setFieldValue(name, text)}
        value={values[name] as string | undefined}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      {errors[name] && touched[name] && (
        // @ts-expect-error
        <Text style={styles.error}>{errors[name]}</Text>
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
