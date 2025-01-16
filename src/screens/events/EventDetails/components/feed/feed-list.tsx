import AppAvatar from 'common/avatar';
import {AppText} from 'common/text';
import {View} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';
import {Feed} from 'service/organizedEvents';
import {COLORS} from 'styles';

export default function FeedList({feed}: {feed: Feed}) {
  return (
    <View>
      <View style={styles.flex}>
        <AppAvatar style={styles.avatar} source={feed.photo} />
        <AppText style={styles.username}> {feed.username}</AppText>
      </View>
      <AppText style={styles.feedText}>{feed.feed}</AppText>
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
