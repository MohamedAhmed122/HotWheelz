import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {EventsStackParams, EventsStackParamsList} from 'navigation/types';
import EventCard from 'components/EventCard';
import {AppTab} from 'common/tab';
import {COLORS} from 'styles';
import {events} from 'static-data/events';
import FixedIcon from 'common/fixedIcon';
import {IOrganizedEvent, getAllOrganizedEvents} from 'service/organizedEvents';
import {AppText} from 'common/text';

const TABS = [
  {tabKey: 'UP_COMING', tabName: 'UP COMING'},
  {tabKey: 'PAST_EVENT', tabName: 'PAST'},
];

type NavigationProps = NativeStackNavigationProp<EventsStackParamsList>;

const EventsListScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].tabKey);
  const navigation = useNavigation<NavigationProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [eventList, setEventList] = useState<{
    events: IOrganizedEvent[];
    upComingEvents: IOrganizedEvent[];
    pastEvents: IOrganizedEvent[];
  }>({
    events: [],
    upComingEvents: [],
    pastEvents: [],
  });

  const getAllEventList = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const {data, isError: err} = await getAllOrganizedEvents();
      setIsError(err);
      setEventList(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllEventList();
  }, []);
  const handleCreateButtonPress = useCallback(() => {
    navigation.navigate(EventsStackParams.CreateEvents);
  }, [navigation]);

  const handleEventCardPress = useCallback(
    (id: string) => {
      navigation.navigate(EventsStackParams.EventDetails, {eventId: id});
    },
    [navigation],
  );

  if (isLoading) {
    return (
      <View style={{height: 400}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <AppText>Error</AppText>
      </View>
    );
  }

  const renderEmptyList = () => (
    <View style={{height: 400, alignItems: 'center', justifyContent: 'center'}}>
      <AppText style={{fontSize: 20}}>No Event Listed </AppText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListEmptyComponent={renderEmptyList}
        ListHeaderComponent={
          <AppTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={TABS}
          />
        }
        data={
          activeTab === 'UP_COMING'
            ? eventList.upComingEvents
            : eventList.pastEvents
        }
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <EventCard
            item={item}
            onEventCardPressed={() => handleEventCardPress(item.id)}
          />
        )}
      />
      {/* Uncomment and customize the FixedButton as needed */}
      <FixedIcon onPress={handleCreateButtonPress} />
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
