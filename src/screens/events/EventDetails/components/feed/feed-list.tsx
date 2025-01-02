import {AppText} from 'common/text';
import {Image, View} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';
import {COLORS} from 'styles';

export default function FeedList() {
  return (
    <View>
      <View style={styles.flex}>
        <Image
          resizeMode="cover"
          style={styles.avatar}
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg',
          }}
        />
        <AppText style={styles.username}> {'Mohamed Youssef'}</AppText>
      </View>
      <AppText style={styles.feedText}>
        Some feedback from each user that will help you to understand the event
      </AppText>
    </View>
  );
}

const styles = ScaledSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s',
    margin: '5@s',
  },
  username: {
    fontSize: 18,
    color: COLORS.primary,
  },
  feedText: {
    marginLeft: 10,
    marginBottom: 10,
  },
});
