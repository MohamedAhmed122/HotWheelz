import {Text, View, TouchableOpacity, Pressable} from 'react-native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from 'styles';
import {AppBadge} from 'common/badge';

import AppAvatar from 'common/avatar';
import {IMapEvents} from 'service/map-events';
import useStore from 'store';
import {AppText} from 'common/text';
import {useState} from 'react';
import EventJoinersModal from '../models/EventJoinersModal';
import {calculateDistance} from 'utils/distance';

type Props = {
  item: IMapEvents;
  selected: boolean;
  onPress(): void;
  onCancelPressed(): void;
  onJoinUserEvent(): void;
};

export function MapCard({
  item,
  onPress,
  selected,
  onCancelPressed,
  onJoinUserEvent,
}: Props) {
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);

  const {profile} = useStore();

  const onNavigateToUserProfile = () => {
    // TODO:
  };
  const isCurrentUser = item.userId === profile.userId;
  const isDisplaySos = item.isSOS && !isCurrentUser;
  const isDisplayEvent = item.isJoinable && !item.isSOS && !isCurrentUser;
  const joinerCount = item?.joiners?.length || 0;
  const joinerText = item.isSOS
    ? isCurrentUser
      ? joinerCount === 0
        ? 'Help is coming'
        : `${joinerCount} On the way`
      : joinerCount === 0
      ? 'First to help'
      : `${joinerCount} On the way`
    : `${joinerCount || 0} Joiners`;

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          isCurrentUser && styles.currentUserCardContainer,
          !selected && styles.unselectedContainer,
        ]}
        onPress={onPress}>
        <View style={styles.mapCard}>
          <Pressable style={styles.userInfo} onPress={onNavigateToUserProfile}>
            <AppAvatar source={item.user.photo} size={40} />
            <Text style={styles.username}>{item.user?.username}</Text>
          </Pressable>
          <Pressable onPress={onCancelPressed}>
            <Icon name="cancel" size={24} color={COLORS.darkGray} />
          </Pressable>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.bottomRow}>
          <View>
            {isDisplaySos && (
              <Text style={[styles.distanceText, {marginTop: 5}]}>
                {item.user.username} Need your help
              </Text>
            )}
            <Text style={styles.distanceText}>
              Distance:{' '}
              {calculateDistance(
                {...profile.userLocation},
                {...item.userLocation},
              )}
              KM
            </Text>
            {isDisplayEvent && (
              <Text style={styles.distanceText}>Events start now</Text>
            )}
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={() => setIsJoinModalVisible(true)}>
            <AppText style={styles.joinersText}>{joinerText}</AppText>
          </Pressable>
          {isDisplayEvent && (
            <AppBadge
              title={'Join'}
              onPress={onJoinUserEvent}
              containerStyle={{
                marginTop: 5,
                marginLeft: 'auto',
              }}
            />
          )}
          {isDisplaySos && (
            <AppBadge
              title="Help"
              color={COLORS.danger}
              onPress={onJoinUserEvent}
              containerStyle={{
                marginTop: 5,
                marginLeft: 'auto',
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      <EventJoinersModal
        isVisible={isJoinModalVisible}
        onClose={() => setIsJoinModalVisible(false)}
        isSos={item.isSOS}
      />
    </>
  );
}
