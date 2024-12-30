import {AppTab} from 'common/tab';
import {useState} from 'react';
import EventTab from './EventTab';
import PhotoTab from './PhotoTabs';
import SavedTab from './SavedTab';

enum ProfileTabsType {
  PHOTO_TAB = 'PHOTO_TAB',
  EVENT_TAB = 'EVENT_TAB',
  SAVED_TAB = 'SAVED_TAB',
}

const tabs = [
  {
    tabKey: ProfileTabsType.PHOTO_TAB,
    tabName: 'Photos',
  },
  {
    tabKey: ProfileTabsType.EVENT_TAB,
    tabName: 'Events',
  },
  {
    tabKey: ProfileTabsType.SAVED_TAB,
    tabName: 'Saved',
  },
];
export default function ProfileTabView({username}: {username: string}) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].tabKey);

  return (
    <>
      <AppTab activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {activeTab === ProfileTabsType.EVENT_TAB && <EventTab />}
      {activeTab === ProfileTabsType.PHOTO_TAB && (
        <PhotoTab username={username} />
      )}
      {activeTab === ProfileTabsType.SAVED_TAB && <SavedTab />}
    </>
  );
}
