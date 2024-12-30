import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppText} from 'common/text';
import {COLORS} from 'styles';

interface Props extends Omit<ViewProps, 'style'> {
  icon: string;
  listText: string;
  size?: number;
  color?: string;
  iconStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function ListIcon({
  icon,
  listText,
  size = 24,
  color = COLORS.darkGray,
  iconStyle,
  textStyle,
  containerStyle,
  ...otherProps
}: Props) {
  return (
    <View style={[styles.container, containerStyle]} {...otherProps}>
      <Icon style={iconStyle} size={size} color={color} name={icon} />
      <AppText style={[styles.text, textStyle]}>{listText}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  text: {
    marginLeft: 10,
    color: COLORS.darkGray,
  },
});
