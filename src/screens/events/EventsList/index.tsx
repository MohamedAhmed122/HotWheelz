import {useCallback, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {EventsStackParams, EventsStackParamsList} from 'navigation/types';
import EventCard from 'components/EventCard';
import {AppTab} from 'common/tab';
import {COLORS} from 'styles';
import {events} from 'static-data/events';

const TABS = [
  {tabKey: 'UP_COMING', tabName: 'UP COMING'},
  {tabKey: 'PAST_EVENT', tabName: 'PAST'},
];

type NavigationProps = NativeStackNavigationProp<EventsStackParamsList>;

const EventsListScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].tabKey);
  const navigation = useNavigation<NavigationProps>();

  const handleCreateButtonPress = useCallback(() => {
    navigation.navigate(EventsStackParams.EventsList);
  }, [navigation]);

  const handleEventCardPress = useCallback(
    (id: string) => {
      navigation.navigate(EventsStackParams.EventDetails, {eventId: id});
    },
    [navigation],
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <AppTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={TABS}
          />
        }
        data={events}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <EventCard
            item={item}
            onEventCardPressed={() => handleEventCardPress(item.id)}
          />
        )}
      />
      {/* Uncomment and customize the FixedButton as needed */}
      {/* <FixedButton onPress={handleCreateButtonPress} /> */}
    </SafeAreaView>
  );
};

export default EventsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
