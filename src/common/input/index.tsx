import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import styles from './styles';

interface Props extends TextInputProps {
  inputContainerStyle?: StyleProp<ViewStyle>;
  isMulti?: boolean;
}

export const AppInput: React.FC<Props> = ({
  children,
  isMulti = false,
  inputContainerStyle,
  ...otherProps
}) => {
  return (
    <View
      style={[
        styles.container,
        isMulti && styles.descInput,
        inputContainerStyle,
      ]}>
      {children}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputText}
        {...otherProps}
      />
    </View>
  );
};
