import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {COLORS} from '@styles/index';

interface Props extends Omit<TouchableOpacityProps, 'style'> {
  color?: string;
  title: string;
  onPress?(): void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const AppBadge: React.FC<Props> = ({
  color = COLORS.secondary,
  title,
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: color}, containerStyle]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 36,
    width: 105,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
