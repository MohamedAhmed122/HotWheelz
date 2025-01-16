import {StyleSheet, View, ViewProps} from 'react-native';
import {COLORS} from 'styles';

interface StepIndicatorProps extends ViewProps {
  active?: boolean;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  active,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        styles.container,
        active ? styles.active : styles.inactive,
        style,
      ]}
      {...props}
    />
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 3,
    borderRadius: 2,
    flex: 1,
  },
  active: {
    backgroundColor: COLORS.primary,
  },
  inactive: {
    backgroundColor: COLORS.darkGray,
  },
});
