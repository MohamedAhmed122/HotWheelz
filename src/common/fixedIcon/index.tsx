import {StyleSheet, View} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Entypo';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import {IconContainer} from 'common/iconContainer';
import {COLORS} from 'styles';

export default function FixedIcon({onPress}: {onPress(): void}) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(360, {duration: 3000}),
        withDelay(3000, withTiming(0, {duration: 0})),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  return (
    <View style={styles.container}>
      <IconContainer
        onPress={onPress}
        color={COLORS.primary}
        style={styles.iconContainer}>
        <Animated.View style={animatedStyle}>
          <Icon name="plus" size={30} color={COLORS.white} />
        </Animated.View>
      </IconContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  iconContainer: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
