import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {COLORS} from 'styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

const CountdownTimer: React.FC = () => {
  const initialTime = 1 * 60 * 60 * 1000 + 30 * 60 * 1000 + 15 * 1000; // 1 hour, 30 minutes, 15 seconds
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);

  // Shared values for animation
  const scale = useSharedValue(1);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1000) {
          clearInterval(countdownInterval);
          Alert.alert('Countdown complete!');
          return 0;
        }

        // Trigger animation on each update
        scale.value = withSpring(1.2, {}, () => {
          scale.value = withTiming(1); // Reset scale to normal
        });

        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const formatTime = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
      <View style={styles.timeContainer}>
        <Animated.View style={[styles.timeBox, animatedStyle]}>
          <Text style={styles.timeValue}>
            {hours.toString().padStart(2, '0')}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.timeBox, animatedStyle]}>
          <Text style={styles.timeValue}>
            {minutes.toString().padStart(2, '0')}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.timeBox, animatedStyle]}>
          <Text style={styles.timeValue}>
            {seconds.toString().padStart(2, '0')}
          </Text>
        </Animated.View>
      </View>
    );
  };

  return <View style={styles.container}>{formatTime(timeRemaining)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: -30,
  },
  timeBox: {
    alignItems: 'center',
  },
  timeValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default CountdownTimer;
