import {Dimensions, View, Text} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ScaledSheet} from 'react-native-size-matters';
import FeedInBox from '../feed/feed-inbox';
import {AppButton} from 'common/button';
import {EventDetailTabsType} from '../..';
import {COLORS} from 'styles';

const {width} = Dimensions.get('window');

export default function EventFooter({activeTab}: {activeTab: string}) {
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={[{height: 50 + bottom}, styles.container]}>
      {activeTab === EventDetailTabsType.DETAILS && (
        <View style={styles.row}>
          <Text style={[styles.text]}>Be Adventurous 🚴🏿‍♂️</Text>
          <AppButton title="Join" onPress={() => {}} style={styles.button} />
        </View>
      )}
      {activeTab === EventDetailTabsType.FEED && <FeedInBox />}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    width,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: '20@ms',
    backgroundColor: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '150@ms',
    marginTop: 0,
    borderRadius: 10,
  },
  text: {
    color: COLORS.primary,
    fontSize: 18,
  },
});

// const texts = [
//   "It's Free",
//   "Let's go biking",
//   'Out of my comfort zone everyday',
//   'Be Adventurous 🚴🏿‍♂️',
// ];
