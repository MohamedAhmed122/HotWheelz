import {View, ScrollView, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';

import {infoStyle as styles} from './styles';
import {ProfileStackParams} from 'navigation/types';
import {AppText} from 'common/text';
import ListIcon from 'common/list';
import {COLORS} from 'styles';
import AppAvatar from 'common/avatar';
import {events} from 'static-data/events';

const EventDetailInfo = () => {
  const navigation = useNavigation();
  const item = events[0];

  const navigateToUserProfile = () => {
    navigation.navigate('Profile', {
      screen: ProfileStackParams.Profile,
    });
  };

  const DateSection = () => (
    <View style={styles.dateSectionContainer}>
      <AppText style={styles.title}>{item?.title}</AppText>
      <View style={styles.datePriceRow}>
        <View style={styles.priceContainer}>
          <Icon name="sack-dollar" size={20} color={COLORS.primary} />
          <AppText style={styles.priceText}>10$</AppText>
        </View>
        <View style={styles.dateContainer}>
          <AppText style={styles.whiteText}>Jul</AppText>
          <AppText style={styles.dateText}>25</AppText>
        </View>
      </View>
    </View>
  );

  const EventInfo = () => (
    <View>
      <Pressable
        onPress={navigateToUserProfile}
        style={styles.organizerContainer}>
        <AppAvatar source={item.user.image} size={32} />
        <AppText style={styles.organizerText}>
          Organized by{' '}
          <AppText style={styles.boldText}>{item.user.name}</AppText>
        </AppText>
      </Pressable>
      <View style={styles.infoContainer}>
        <ListIcon
          icon="calendar-month"
          color={COLORS.lightGrey}
          listText="Sat, January 25, 2020 at 3:00 PM - Thu, January 30, 2020 at 3:00 PM"
          containerStyle={styles.listContainer}
          textStyle={styles.listText}
        />
        <ListIcon
          icon="location-pin"
          color={COLORS.lightGrey}
          listText="69 quai des Chartrons, 33300 Bordeaux, France"
          containerStyle={styles.listContainer}
          textStyle={styles.listText}
        />
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <DateSection />
      <EventInfo />
    </ScrollView>
  );
};

export default EventDetailInfo;
