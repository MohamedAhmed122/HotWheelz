import {useState, useEffect, useCallback} from 'react';
import RNLocation, {Location} from 'react-native-location';

type UseCurrentLocationReturn = {
  location: Location | null;
  error: string | null;
  refreshLocation: () => void;
};

export const useGetCurrentLocation = (): UseCurrentLocationReturn => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Configure RNLocation
  const configureLocation = useCallback(() => {
    RNLocation.configure({
      distanceFilter: 10,
      allowsBackgroundLocationUpdates: true,
      desiredAccuracy: {
        ios: 'bestForNavigation',
        android: 'highAccuracy',
      },
      androidProvider: 'auto',
    });
  }, []);

  const requestPermissions = useCallback(async () => {
    try {
      const granted = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      });
      if (!granted) {
        setError('Location permission denied');
      }
    } catch (err) {
      setError('Failed to request location permissions');
    }
  }, []);

  const fetchLocation = useCallback(async () => {
    try {
      if (
        await RNLocation.checkPermission({
          ios: 'whenInUse',
          android: {detail: 'coarse'},
        })
      ) {
        const latestLocation = await RNLocation.getLatestLocation({
          timeout: 5000,
        });
        if (latestLocation) {
          setLocation(latestLocation);
          setError(null);
        } else {
          setError('Failed to fetch location');
        }
      } else {
        setError('Location permission not granted');
      }
    } catch (err) {
      setError('Failed to fetch location');
    }
  }, []);

  const refreshLocation = useCallback(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    (async () => {
      configureLocation();
      await requestPermissions();
      await fetchLocation();
    })();
  }, [configureLocation, requestPermissions, fetchLocation]);

  return {location, error, refreshLocation};
};
