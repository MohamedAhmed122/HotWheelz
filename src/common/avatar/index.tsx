import {Image, StyleSheet, View, Text} from 'react-native';
import {COLORS} from 'styles';

type AppAvatarProps = {
  source: string;
  size?: number;
  fallbackText?: string;
};

const AppAvatar: React.FC<AppAvatarProps> = ({
  source,
  size = 50,
  fallbackText = 'A',
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
        <Image
          source={{uri: source}}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
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
