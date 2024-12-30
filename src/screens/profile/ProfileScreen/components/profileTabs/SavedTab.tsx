import { View } from 'react-native';
import React from 'react';
import { events } from 'static-data/events';
import EventCard from 'components/EventCard';


export default function SavedTab() {
  const myEvents = events.slice(3, 4);
  return (
    <View style={{ flex: 1 }}>
      {myEvents.map((item) => (
        <EventCard key={item.id} item={item} />
      ))}
    </View>
  );
}