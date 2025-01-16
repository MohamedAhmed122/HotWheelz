import {useEffect, useState} from 'react';
import MapBikerView from '../MapView';
import {IMapEvents, getTodaysMapEvents} from 'service/map-events';
import {AppLoading} from 'common/loading';

export default function MapScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [events, setEvents] = useState<IMapEvents[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getTodaysMapEvents(response => {
      setIsLoading(false);
      setIsError(response.isError);
      setEvents(response.data);
    });
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return <MapBikerView events={events} />;
}
