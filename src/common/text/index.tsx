import {StyleProp, TextProps, TextStyle, Text} from 'react-native';

export interface AppTextProps
  extends Pick<TextProps, Exclude<keyof TextProps, 'style'>> {
  style?: StyleProp<TextStyle>;
  fontFamily?:
    | 'RobotoBlack'
    | 'RobotoBold'
    | 'RobotoExtraBold'
    | 'RobotoExtraLight'
    | 'RobotoMedium'
    | 'RobotoRegular'
    | 'RobotoLight'
    | 'RobotoThin';
}

export const AppText: React.FC<AppTextProps> = ({
  fontFamily = 'Roboto-Regular',
  style,
  ...props
}) => (
  <Text
    style={[{fontFamily, letterSpacing: 0.1, fontSize: 15}, style]}
    {...props}
  />
);
