import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface ScalableContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleOnPress?: number;
  springConfig?: {damping: number; stiffness: number};
  easingConfig?: {duration?: number; easing?: Animated.EasingFunction};
  onPress?: () => void;
}

const ScalableContainer: React.FC<ScalableContainerProps> = ({
  children,
  style,
  scaleOnPress = 0.95,
  springConfig = {damping: 15, stiffness: 150},
  easingConfig = {duration: 150, easing: Easing.inOut(Easing.ease)},
  onPress,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(scaleOnPress, easingConfig);
    onPress && onPress();
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
  };

  return (
    <Animated.View
      style={[styles.container, animatedStyle, style]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScalableContainer;
