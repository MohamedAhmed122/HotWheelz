import {Text, View, TouchableOpacity, Pressable} from 'react-native';

import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from 'styles';
import {AppBadge} from 'common/badge';
import {Biker} from 'static-data/bikers';
import AppAvatar from 'common/avatar';

type Props = {
  item: Biker;
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
 

  const onNavigateToUserProfile = () => {
    // TODO:
  };
  return (
    <TouchableOpacity
      style={[styles.container, !selected && styles.unselectedContainer]}
      onPress={onPress}>
      <View style={styles.mapCard}>
        <Pressable style={styles.userInfo} onPress={onNavigateToUserProfile}>
          <AppAvatar source={item.user?.image} size={40} />
          <Text style={styles.username}>{item.user?.username}</Text>
        </Pressable>
        <Pressable onPress={onCancelPressed}>
          <Icon name="cancel" size={24} color={COLORS.darkGray} />
        </Pressable>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {item.user?.username} {item.text}
      </Text>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.distanceText}>Distance: {item.miles}KM</Text>
          {!item.isSOS && (
            <Text style={[styles.distanceText, {marginTop: 5}]}>
              Start: now
            </Text>
          )}
        </View>
        {item.joinable && (
          <AppBadge title={'Join'} onPress={onJoinUserEvent}>
            Join
          </AppBadge>
        )}
        {item.isSOS && (
          <AppBadge
            title="Help me"
            color={COLORS.danger}
            onPress={onJoinUserEvent}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
