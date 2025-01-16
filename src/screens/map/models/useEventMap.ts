import {LocationType} from 'components/PlacesAutoCompelete';
import {useState} from 'react';
import {createMapEvent} from 'service/map-events';
import useStore from 'store';

type EventMapType = 'SOS' | 'EVENT';

export const useEventMap = (type: EventMapType, onClose: () => void) => {
  const {profile} = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const errorMsg = `Failed to create ${
    type === 'SOS' ? 'SOS' : 'event'
  }, please try again`;

  const onCreateEventMap = async (
    description: string,
    location: LocationType,
    isJoinable: boolean = true,
    title?: string,
    callback?: () => void,
  ) => {
    setIsLoading(true);
    setError('');
    const {lat, lng, city, country, address} = location;
    const {isError, isSuccess} = await createMapEvent({
      title,
      description,
      userLocation: {
        lat,
        lng,
      },
      address,
      city,
      country,
      isJoinable,
      isSOS: type === 'SOS',
      user: {
        photo: profile.photo,
        username: profile.username,
      },
    });
    setIsLoading(false);

    if (isSuccess) {
      callback && callback();
      setTimeout(() => {
        onClose();
      }, 250);
      return;
    }
    if (isError) {
      setError(errorMsg);
    }
  };

  return {isLoading, error, onCreateEventMap};
};
