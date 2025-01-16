import {Dimensions, View, Text} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ScaledSheet} from 'react-native-size-matters';
import FeedInBox from '../feed/feed-inbox';
import {AppButton} from 'common/button';
import {EventDetailTabsType} from '../..';
import {COLORS} from 'styles';
import useStore from 'store';
import {
  IOrganizedEvent,
  joinOrganizedEvent,
  unJoinOrganizedEvent,
} from 'service/organizedEvents';
import {isJoinedToEvent} from 'utils/events-utils';
import {useState} from 'react';

const {width} = Dimensions.get('window');

type Props = {
  eventDetail: IOrganizedEvent;
  activeTab: string;
};

export default function EventFooter({activeTab, eventDetail}: Props) {
  const {bottom} = useSafeAreaInsets();
  const {profile} = useStore();
  const isJoiner = isJoinedToEvent(eventDetail.joiners, profile.userId);

  const [isLoading, setIsLoading] = useState(false);

  const joinEvent = async () => {
    setIsLoading(true);
    if (isJoiner) {
      await unJoinOrganizedEvent(eventDetail.id, {
        userId: profile.userId,
        photo: profile.photo,
        username: profile.username,
      });
    } else {
      await joinOrganizedEvent(eventDetail.id, {
        userId: profile.userId,
        photo: profile.photo,
        username: profile.username,
      });
    }
    setIsLoading(false);
  };

  return (
    <View style={[{height: 50 + bottom}, styles.container]}>
      {activeTab === EventDetailTabsType.DETAILS && (
        <View style={styles.row}>
          <Text style={[styles.text]}>Be Adventurous 🚴🏿‍♂️</Text>
          <AppButton
            title="Join"
            onPress={joinEvent}
            style={styles.button}
            loading={isLoading}
          />
        </View>
      )}
      {activeTab === EventDetailTabsType.FEED && (
        <FeedInBox eventId={eventDetail.id} />
      )}
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
