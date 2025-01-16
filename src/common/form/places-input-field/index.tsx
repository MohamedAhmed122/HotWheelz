import {AppText} from 'common/text';
import PlacesAutoCompleteInput, {
  LocationType,
} from 'components/PlacesAutoCompelete';
import {FormikContextType, useFormikContext} from 'formik';
import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from 'styles';
import {InitialValueType} from '../app-form';

interface Props {
  name: string; // Replace `any` with your Formik initial values type
  placeholder?: string;
}

export const PlacesAutoCompleteInputField: FC<Props> = ({
  name,
  placeholder,
}) => {
  const {
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
  }: FormikContextType<InitialValueType> = useFormikContext();

  const handleChangeLocation = (location: LocationType) => {
    setFieldValue(name, location);
    setFieldTouched(name, true);
  };

  return (
    <>
      <PlacesAutoCompleteInput
        placeholder={placeholder}
        onChangeLocation={handleChangeLocation}
      />
      {errors[name] && touched[name] && (
        <AppText style={styles.error}>{errors[name]}</AppText>
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
