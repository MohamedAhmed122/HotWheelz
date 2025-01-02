import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ImageBackground,
  Pressable,
  Animated,
  Easing,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {coverStyles as styles} from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from 'styles';
import {EventsStackParams, EventsStackParamsList} from 'navigation/types';
import CountdownTimer from './counter-down';

type Navigation = NativeStackNavigationProp<
  EventsStackParamsList,
  EventsStackParams
>;

export default function EventCover() {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const targetDate = new Date('2024-12-31T00:00:00');

  // Animation effect for each update
  const triggerAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({hours: 0, minutes: 0, seconds: 0});
        return false; // Stop further updates
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({hours, minutes, seconds});
        triggerAnimation(); // Trigger animation
        return true;
      }
    };

    const interval = setInterval(() => {
      if (!calculateTimeLeft()) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [targetDate]);

  return (
    <ImageBackground
      source={require('assets/images/event-bg.png')}
      resizeMode="cover"
      style={styles.background}>
      <Pressable
        style={{marginTop: 5 + top, marginLeft: 20}}
        onPress={navigation.goBack}>
        <Icon name="arrowleft" size={24} color={COLORS.white} />
      </Pressable>
      <View style={styles.counterContainer}>
        <CountdownTimer />
      </View>
    </ImageBackground>
  );
}
