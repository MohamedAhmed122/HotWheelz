import {COLORS} from '@styles/index';
import {ActivityIndicator, StyleProp, Text, ViewStyle} from 'react-native';
import styles from './styles';
import {AppPressableScale} from 'common/pressableScale';

export interface AppButtonProps {
  title: string;
  color?: string;
  onPress(): void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  color = COLORS.primary,
  onPress,
  loading,
  disabled,
  style,
}) => (
  <AppPressableScale
    activeScale={0.9}
    onPress={onPress}
    disabled={loading || disabled}
    style={[
      styles.container,
      {backgroundColor: color, opacity: loading ? 0.6 : 1},
      style,
    ]}>
    {loading ? (
      <ActivityIndicator color={COLORS.white} size={'small'} />
    ) : (
      <Text style={styles.text}>{title}</Text>
    )}
  </AppPressableScale>
);
