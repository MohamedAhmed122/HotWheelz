import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import {COLORS} from 'styles';

interface Props extends Omit<TouchableOpacityProps, 'style'> {
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const IconContainer: React.FC<Props> = ({
  children,
  color = COLORS.lightGrey,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, {backgroundColor: color}]}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
