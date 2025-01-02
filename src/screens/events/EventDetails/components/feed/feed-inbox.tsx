import {StyleSheet} from 'react-native';

import {AppInput} from 'common/input';

export default function FeedInBox() {
  return (
    <AppInput placeholder="Write a feed" inputContainerStyle={styles.inbox} />
  );
}

const styles = StyleSheet.create({
  inbox: {
    marginBottom: 0,
    marginTop: -10,
  },
});
