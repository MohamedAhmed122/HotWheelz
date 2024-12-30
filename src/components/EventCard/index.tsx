import {Text, View, TouchableOpacity, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {eventCardStyle as styles} from './styles';
import {useToggle} from 'hooks/useToggle';

import {COLORS} from 'styles';
import {IconContainer} from 'common/iconContainer';
import ListIcon from 'common/list';
import EventJoiner from 'components/eventJoiners';
import {GoingButton} from 'common/goingButton';

interface Props {
  item: any;
  onEventCardPressed?(): void;
}

export default function EventCard({item, onEventCardPressed}: Props) {
  const {value: isGoing, toggleButton: toggleGoingButton} = useToggle();
  const {value: isWatched, toggleButton: toggleWatchButton} = useToggle();

  const {user, description, title, address, date, joined, joinedUsers} = item;

  //   const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={onEventCardPressed}>
      <View style={styles.main}>
        <Pressable style={styles.flex} onPress={() => {}}>
          <Image
            resizeMode="cover"
            style={styles.avatar}
            source={{
              uri: user.image,
            }}
          />
          <Text style={styles.username}> {user.name}</Text>
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
        <ListIcon listText={date} icon="calendar-month" />
        <ListIcon listText={address} icon="location-pin" />
      </View>
      <EventJoiner joiners={joinedUsers} joinedCount={joined} />
      <View style={styles.likeContainer}>
        <GoingButton isGoing={isGoing} toggleButton={toggleGoingButton} />
      </View>
    </TouchableOpacity>
  );
}
