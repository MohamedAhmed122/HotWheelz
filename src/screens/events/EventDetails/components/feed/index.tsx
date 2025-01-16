import {View} from 'react-native';

import FeedList from './feed-list';
import {ScaledSheet} from 'react-native-size-matters';
import {FC} from 'react';
import {Feed} from 'service/organizedEvents';
import {AppText} from 'common/text';

type Props = {
  feeds: Feed[];
};

const EventFeed: FC<Props> = ({feeds}) => {
  if (!feeds.length) {
    return (
      <View
        style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
        <AppText style={{fontSize: 17}}>No Feed Listed, Be the First </AppText>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {feeds.map(item => (
        <FeedList key={item.feed} feed={item} />
      ))}
    </View>
  );
};

export default EventFeed;

const styles = ScaledSheet.create({
  container: {
    marginHorizontal: '20@ms',
    marginTop: '10@mvs',
    marginBottom: '100@mvs',
  },
});
