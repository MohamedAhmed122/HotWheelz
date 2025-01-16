import {StyleSheet, Text} from 'react-native';
import {FormikContextType, useFormikContext} from 'formik';
import {AppPicker, PickerItemType} from 'common/picker';
import {COLORS} from 'styles';

interface Props {
  name: string;
  placeholder: string;
  inverted?: boolean;
  items: Array<PickerItemType>;
}

export const AppPickerField: React.FC<Props> = ({
  name,
  items,
  placeholder,
  inverted,
}) => {
  const {errors, setFieldValue, values, touched}: FormikContextType<any> =
    useFormikContext();

  return (
    <>
      <AppPicker
        placeholder={placeholder}
        setSelectedItems={item => setFieldValue(name, item)}
        items={items}
        selectedItems={values[name]}
        inverted={inverted}
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
