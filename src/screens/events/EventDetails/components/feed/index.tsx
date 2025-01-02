import {View} from 'react-native';

import FeedList from './feed-list';
import {ScaledSheet} from 'react-native-size-matters';

export default function Feed() {
  return (
    <View style={styles.container}>
      <FeedList />
      <FeedList />
      <FeedList />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginHorizontal: '20@ms',
    marginTop: '10@mvs',
    marginBottom: '100@mvs',
  },
});
