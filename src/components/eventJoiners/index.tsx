import {useState} from 'react';
import React from 'react';

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
import {Joiner} from 'service/organizedEvents';
import AppAvatar from 'common/avatar';

type Props = {
  joiners: Array<Joiner>;
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

  const handleAvatarPress = (user: Joiner) => {
    console.log(user);
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
        <Pressable
          key={joiner.userId}
          onPress={() => handleAvatarPress(joiner)}>
          <AppAvatar
            source={joiner.photo}
            size={45}
            style={[{marginLeft: index !== 0 ? -15 : 0}]}
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

  // if (joinedCount === 0) {
  //   return <></>;
  // }

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
