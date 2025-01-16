import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS} from 'styles';

type AppAvatarProps = {
  source: string;
  size?: number;
  fallbackText?: string;
  style?: StyleProp<ViewStyle>;
};

const AppAvatar: React.FC<AppAvatarProps> = ({
  source,
  size = 50,
  fallbackText = 'A',
  style,
}) => {
  const isUri = source.startsWith('http') || source.startsWith('file://');

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}>
      {isUri ? (
        <FastImage
          source={{
            uri: source,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
            style,
          ]}
          resizeMode="cover"
        />
      ) : (
        <Text style={[styles.fallbackText, {fontSize: size / 2.5}]}>
          {fallbackText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkGray,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default AppAvatar;
