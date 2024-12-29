import {COLORS} from '@styles/index';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import styles from './styles';
import ScalableContainer from 'common/scalableContainer';
import {AppText} from 'common/text';

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
}) => {
  const disable = loading || disabled;
  const onButtonPress = () => {
    if (!disable) {
      onPress();
    }
  };
  return (
    <ScalableContainer
      scaleOnPress={disable ? 1 : 0.92}
      onPress={onButtonPress}
      style={[
        styles.container,
        {backgroundColor: color, opacity: loading ? 0.6 : 1},
        disable && styles.disableContainer,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={COLORS.white} size={'small'} />
      ) : (
        <AppText style={styles.text}>{title}</AppText>
      )}
    </ScalableContainer>
  );
};
