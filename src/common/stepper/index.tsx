import {StyleSheet, View, ViewProps} from 'react-native';
import {StepIndicator} from './StepIndicator';

export interface StepperProps extends ViewProps {
  steps: Array<number>;
  currentIndex: number;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentIndex,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {steps.map((step, index) => (
        <StepIndicator
          key={step.toString()}
          active={step <= currentIndex}
          style={index !== steps.length - 1 && styles.separator}
        />
      ))}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: '5%',
  },
  separator: {
    marginRight: 4,
  },
});
