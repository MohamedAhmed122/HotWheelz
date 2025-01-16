import {Text, View, TouchableOpacity, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

import {eventCardStyle as styles} from './styles';
import {useToggle} from 'hooks/useToggle';

import {COLORS} from 'styles';
import {IconContainer} from 'common/iconContainer';
import ListIcon from 'common/list';
import EventJoiner from 'components/eventJoiners';
import {GoingButton} from 'common/goingButton';
import {IOrganizedEvent} from 'service/organizedEvents';
import {formateLongDate} from 'utils/date';
import AppAvatar from 'common/avatar';

interface Props {
  item: IOrganizedEvent;
  onEventCardPressed?(): void;
}

export default function EventCard({item, onEventCardPressed}: Props) {
  const {value: isGoing, toggleButton: toggleGoingButton} = useToggle();
  const {value: isWatched, toggleButton: toggleWatchButton} = useToggle();

  const {user, description, title, address, startDate, joiners} = item;

  //   const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={onEventCardPressed}>
      <View style={styles.main}>
        <Pressable style={styles.flex} onPress={() => {}}>
          <AppAvatar source={user.photo} size={45} style={styles.avatar} />
          <Text style={styles.username}> {user.username}</Text>
        </Pressable>
        <IconContainer
          style={styles.iconContainer}
          onPress={toggleWatchButton}
          color={isWatched ? COLORS.orange : COLORS.lightGrey}>
          <Icon name="bookmark" size={22} color={COLORS.white} />
        </IconContainer>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.desc}>{title}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {description}
        </Text>
        <ListIcon listText={formateLongDate(startDate)} icon="calendar-month" />
        <ListIcon listText={address} icon="location-pin" />
      </View>
      <EventJoiner joiners={joiners} joinedCount={joiners.length} />
      <View style={styles.likeContainer}>
        <GoingButton isGoing={isGoing} toggleButton={toggleGoingButton} />
      </View>
    </TouchableOpacity>
  );
}
