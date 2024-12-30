import {useState} from 'react';
import {
  View,
  Image,
  Pressable,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppText} from 'common/text';
import {styles} from './styles';
import {COLORS} from 'styles';

type Props = {
  joiners: Array<{id: string; image: string}>;
  joinedCount: number;
  showSeeAll?: boolean;
  joinersCounterDisplay?: number;
  joinerContainerStyle?: StyleProp<ViewStyle>;
};

export default function EventJoiner({
  joiners,
  joinedCount,
  showSeeAll = false,
  joinerContainerStyle,
  joinersCounterDisplay = 5,
}: Props) {
  const [joinersDisplayCount, setJoinersDisplayCount] = useState(
    joinersCounterDisplay,
  );

  const handleAvatarPress = (user: {id: string; image: string}) => {
    // TODO: Navigate to the user's profile
  };

  const toggleJoinersDisplay = () => {
    if (showSeeAll) {
      setJoinersDisplayCount(current =>
        current === joinersCounterDisplay
          ? joiners.length
          : joinersCounterDisplay,
      );
    }
  };

  const renderJoiners = () => (
    <View style={styles.avatarContainer}>
      {joiners.slice(0, joinersDisplayCount).map((joiner, index) => (
        <Pressable key={joiner.id} onPress={() => handleAvatarPress(joiner)}>
          <Image
            source={{uri: joiner.image}}
            resizeMode="cover"
            style={[
              styles.avatar,
              {marginLeft: index !== 0 ? -15 : 0, width: 45, height: 45},
            ]}
          />
        </Pressable>
      ))}
    </View>
  );

  const renderFooter = () =>
    showSeeAll && (
      <View style={styles.joinerFooter}>
        <AppText style={styles.joinerFooterText}>
          <AppText style={{fontWeight: '800'}}>{joinedCount}</AppText> People
          are going
        </AppText>
        {joinersDisplayCount > joinersCounterDisplay && (
          <Pressable onPress={toggleJoinersDisplay} style={styles.showMoreText}>
            <AppText style={{color: COLORS.darkGray}}>
              {joinersDisplayCount > joinersCounterDisplay ? 'Hide' : 'See all'}
            </AppText>
          </Pressable>
        )}
      </View>
    );

  return (
    <View>
      {!showSeeAll && (
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <AppText style={styles.joinerText}>{joinedCount} JOINERS</AppText>
          <View style={[styles.line, {marginLeft: 'auto'}]} />
        </View>
      )}
      <ScrollView
        contentContainerStyle={[styles.joinContainer, joinerContainerStyle]}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {renderJoiners()}
        {joiners.length > joinersDisplayCount && (
          <Pressable
            onPress={toggleJoinersDisplay}
            style={styles.showMoreContainer}>
            <Icon name="pluscircle" size={35} color={COLORS.white} />
          </Pressable>
        )}
      </ScrollView>
      {renderFooter()}
    </View>
  );
}
