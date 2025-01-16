import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import React from 'react';
import {COLORS} from 'styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface AppInputProps extends TextInputProps {
  inputContainerStyle?: StyleProp<ViewStyle>;
  isMulti?: boolean;
  rightIconName?: string;
  LeftIcon?: React.FC;
}

export const AppInput: React.FC<AppInputProps> = ({
  children,
  isMulti = false,
  inputContainerStyle,
  rightIconName,
  LeftIcon,
  ...otherProps
}) => {
  return (
    <View
      style={[
        styles.container,
        isMulti && styles.descInput,
        inputContainerStyle,
      ]}>
      {rightIconName && (
        <AntDesign name={rightIconName} color={COLORS.darkGray} size={20} />
      )}
      {children}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputText}
        {...otherProps}
      />
      {LeftIcon && <LeftIcon />}
    </View>
  );
};
