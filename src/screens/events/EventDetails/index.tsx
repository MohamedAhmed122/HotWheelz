import {ScrollView} from 'react-native';
import {Fragment, useState} from 'react';

import EventCover from './components/info/event-background';
import EventDetailInfo from './components/info/event-detail-info';

import EventFooter from './components/info/event-footer';

import EventMap from './components/info/event-map';
import {ScaledSheet} from 'react-native-size-matters';
import Feed from './components/feed';
import {events} from 'static-data/events';
import EventJoiner from 'components/eventJoiners';
import {AppTab} from 'common/tab';
// https://i.pinimg.com/originals/0b/fa/33/0bfa33d0a891669ceb3b362834c3fedd.png

const event = events[0];

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

// type Navigation = NativeStackNavigationProp<TabParamsList, TabParams.profileStack>;
export default function EventDetailsScreen() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].tabKey);
  return (
    <Fragment>
      <ScrollView>
        <EventCover />
        <EventDetailInfo />
        <EventJoiner
          joiners={event.joinedUsers}
          joinedCount={event.joined}
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
        {activeTab === EventDetailTabsType.DETAILS && <EventMap />}
        {activeTab === EventDetailTabsType.FEED && <Feed />}
      </ScrollView>
      <EventFooter activeTab={activeTab} />
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
