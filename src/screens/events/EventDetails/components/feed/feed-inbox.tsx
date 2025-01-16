import {ActivityIndicator, Pressable, StyleSheet} from 'react-native';

import {AppInput} from 'common/input';
import {useState} from 'react';
import {addFeed} from 'service/organizedEvents';
import useStore from 'store';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from 'styles';

export default function FeedInBox({eventId}: {eventId: string}) {
  const [feed, setFeed] = useState('');
  const {profile} = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const onAddFeed = async () => {
    setIsLoading(true);
    await addFeed(eventId, {
      photo: profile.photo,
      userId: profile.userId,
      username: profile.username,
      feed,
    });
    setIsLoading(false);
  };

  return (
    <AppInput
      value={feed}
      onChangeText={setFeed}
      placeholder="Write a feed"
      inputContainerStyle={styles.inbox}
      LeftIcon={() => (
        <>
          {isLoading && <ActivityIndicator />}
          {!isLoading && (
            <Pressable onPress={onAddFeed}>
              <Icon name="send" color={COLORS.primary} size={20} />
            </Pressable>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  inbox: {
    marginBottom: 0,
    marginTop: -10,
  },
});
