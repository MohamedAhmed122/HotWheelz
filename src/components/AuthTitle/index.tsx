import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {FC} from 'react';
import {AppText} from 'common/text';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from 'styles';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends Omit<ViewProps, 'style'> {
  title?: string;
  showBackButton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const AuthTitle: FC<Props> = ({
  title,
  showBackButton = true,
  containerStyle,
}) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.container, containerStyle, {marginTop: top + 10}]}>
      {showBackButton && (
        <Pressable style={styles.iconContainer} onPress={navigation.goBack}>
          <Icon name="arrowleft" size={30} color={COLORS.primary} />
        </Pressable>
      )}
      {title && <AppText style={styles.title}>{title}</AppText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  title: {
    marginLeft: 20,
    fontSize: 28,
  },
});
