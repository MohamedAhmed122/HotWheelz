import {Animated, Pressable, StyleSheet} from 'react-native';
import {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {AppInput} from 'common/input';
import {COLORS} from 'styles';

type Props = {
  onSendMsg(msg: string): void;
};

export default function ChatInbox({onSendMsg}: Props) {
  const {bottom} = useSafeAreaInsets();
  const [value, onChangeText] = useState('');
  // const { height, progress } = useKeyboardAnimation();

  // const scale = progress.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [1, 2],
  // });

  const handleSendMsg = () => {
    onSendMsg(value);
    onChangeText('');
  };

  return (
    <Animated.View
      style={[
        styles.inboxContainer,
        {
          // transform: [{ translateY: height }],
        },
      ]}>
      <AppInput
        value={value}
        onChangeText={onChangeText}
        multiline
        inputContainerStyle={{marginBottom: 10 + bottom}}
        LeftIcon={() => (
          <Pressable onPress={handleSendMsg}>
            {value ? (
              <Feather name="send" size={28} color={COLORS.primary} />
            ) : (
              <MaterialIcons
                name="keyboard-voice"
                size={28}
                color={COLORS.primary}
              />
            )}
          </Pressable>
        )}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inboxContainer: {
    minHeight: 100,
    backgroundColor: COLORS.primary,
    justifyContent: 'flex-start',
    marginTop: 'auto',
  },
});
