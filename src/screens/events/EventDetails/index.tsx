import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Fragment, useEffect, useState} from 'react';

import {EventCover} from './components/info/event-background';
import EventDetailInfo from './components/info/event-detail-info';

import EventFooter from './components/info/event-footer';

import EventMap from './components/info/event-map';
import {ScaledSheet} from 'react-native-size-matters';
import Feed from './components/feed';

import EventJoiner from 'components/eventJoiners';
import {AppTab} from 'common/tab';
import {IOrganizedEvent, getOrganizedEventById} from 'service/organizedEvents';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EventsStackParams, EventsStackParamsList} from 'navigation/types';
import {AppText} from 'common/text';
import {Stepper} from 'common/stepper';
// https://i.pinimg.com/originals/0b/fa/33/0bfa33d0a891669ceb3b362834c3fedd.png

// const event = events[0];

export enum EventDetailTabsType {
  FEED = 'FEED',
  DETAILS = 'DETAILS',
}

const tabs = [
  {
    tabKey: EventDetailTabsType.DETAILS,
    tabName: 'Details',
  },
  {
    tabKey: EventDetailTabsType.FEED,
    tabName: 'Feed',
  },
];

type Props = NativeStackScreenProps<
  EventsStackParamsList,
  EventsStackParams.EventDetails
>;
export default function EventDetailsScreen({route}: Props) {
  const eventId = route.params.eventId;

  const [activeTab, setActiveTab] = useState<string>(tabs[0].tabKey);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [eventDetail, setEventDetail] = useState<IOrganizedEvent | undefined>();

  useEffect(() => {
    setIsLoading(true);

    getOrganizedEventById(eventId, response => {
      setIsLoading(false);
      setIsError(response.isError);
      setEventDetail(response.data);
    });
  }, [eventId]);

  if (isLoading) {
    return (
      <View style={{height: 400}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !eventDetail) {
    return (
      <View>
        <AppText>Error</AppText>
      </View>
    );
  }

  return (
    <Fragment>
      <ScrollView>
        <EventCover eventDetail={eventDetail} />

        <EventDetailInfo eventDetail={eventDetail} />

        <EventJoiner
          joiners={eventDetail.joiners}
          joinedCount={eventDetail.joiners.length}
          joinersCounterDisplay={6}
          joinerContainerStyle={styles.joinerContainerStyle}
          showSeeAll
        />
        <AppTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabContainerStyle={{marginBottom: 0}}
        />
        {activeTab === EventDetailTabsType.DETAILS && (
          <EventMap eventDetail={eventDetail} />
        )}
        {activeTab === EventDetailTabsType.FEED && (
          <Feed feeds={eventDetail.feeds} />
        )}
      </ScrollView>
      <EventFooter activeTab={activeTab} eventDetail={eventDetail} />
    </Fragment>
  );
}

const styles = ScaledSheet.create({
  joinerContainerStyle: {
    marginLeft: '30@ms',
    marginTop: '10@mvs',
    paddingRight: '40@ms',
  },
});
