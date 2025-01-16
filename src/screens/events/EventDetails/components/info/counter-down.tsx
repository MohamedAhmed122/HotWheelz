import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {COLORS} from 'styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {AppText} from 'common/text';

interface CountdownTimerProps {
  date: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({date}) => {
  const targetTime = new Date(date).getTime();
  const [timeRemaining, setTimeRemaining] = useState<number>(
    targetTime - Date.now(),
  );

  const scale = useSharedValue(1);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1000) {
          clearInterval(countdownInterval);
          Alert.alert('Countdown complete!');
          return 0;
        }

        scale.value = withSpring(1.2, {}, () => {
          scale.value = withTiming(1);
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
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    return (
      <View style={styles.timeContainer}>
        {days > 0 && (
          <Animated.View style={[styles.timeBox, animatedStyle]}>
            <Text style={styles.timeValue}>
              {days.toString().padStart(2, '0')}
              <AppText style={styles.subText}>d</AppText>
            </Text>
          </Animated.View>
        )}
        <Animated.View style={[styles.timeBox, animatedStyle]}>
          <Text style={styles.timeValue}>
            {hours.toString().padStart(2, '0')}
            <AppText style={styles.subText}>h</AppText>
          </Text>
        </Animated.View>
        <Animated.View style={[styles.timeBox, animatedStyle]}>
          <Text style={styles.timeValue}>
            {minutes.toString().padStart(2, '0')}
            <AppText style={styles.subText}>m</AppText>
          </Text>
        </Animated.View>
        {!days && (
          <Animated.View style={[styles.timeBox, animatedStyle]}>
            <Text style={styles.timeValue}>
              {seconds.toString().padStart(2, '0')}
              <AppText style={styles.subText}>s</AppText>
            </Text>
          </Animated.View>
        )}
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
  subText: {
    fontSize: 18,
  },
});

export default CountdownTimer;
