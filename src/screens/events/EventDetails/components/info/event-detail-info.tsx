import {View, ScrollView, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {infoStyle as styles} from './styles';
import {ProfileStackParams} from 'navigation/types';
import {AppText} from 'common/text';
import ListIcon from 'common/list';
import {COLORS} from 'styles';
import AppAvatar from 'common/avatar';

import {IOrganizedEvent} from 'service/organizedEvents';
import {FC} from 'react';
import {formateLongDate} from 'utils/date';
import moment = require('moment');

type Props = {
  eventDetail: IOrganizedEvent;
};

const EventDetailInfo: FC<Props> = ({eventDetail}) => {
  const navigation = useNavigation();

  const navigateToUserProfile = () => {
    navigation.navigate('Profile', {
      screen: ProfileStackParams.Profile,
    });
  };

  const renderDateSection = () => (
    <View style={styles.dateSectionContainer}>
      <AppText style={styles.title}>{eventDetail.title}</AppText>
      <View style={styles.datePriceRow}>
        <View style={styles.priceContainer}>
          <Icon name="dollar" size={25} color={COLORS.primary} />
          <AppText style={styles.priceText}>10$</AppText>
        </View>
        <View style={styles.dateContainer}>
          <AppText style={styles.whiteText}>
            {moment(eventDetail.startDate).format('MMM')}
          </AppText>
          <AppText style={styles.dateText}>
            {moment(eventDetail.startDate).format('DD')}
          </AppText>
        </View>
      </View>
    </View>
  );

  const renderEventInfo = () => (
    <View>
      <Pressable
        onPress={navigateToUserProfile}
        style={styles.organizerContainer}>
        <AppAvatar source={eventDetail.user.photo} size={32} />
        <AppText style={styles.organizerText}>
          Organized by{' '}
          <AppText style={styles.boldText}>{eventDetail.user.username}</AppText>
        </AppText>
      </Pressable>
      <View style={styles.infoContainer}>
        <ListIcon
          icon="calendar-month"
          color={COLORS.lightGrey}
          listText={`${formateLongDate(
            eventDetail.startDate,
          )} - ${formateLongDate(eventDetail.endDate)}
          `}
          containerStyle={styles.listContainer}
          textStyle={styles.listText}
        />
        <ListIcon
          icon="location-pin"
          color={COLORS.lightGrey}
          listText={eventDetail.address}
          containerStyle={styles.listContainer}
          textStyle={styles.listText}
        />
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {renderDateSection()}
      {renderEventInfo()}
    </ScrollView>
  );
};

export default EventDetailInfo;
