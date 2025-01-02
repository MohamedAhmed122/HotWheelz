import messaging from '@react-native-firebase/messaging';

export const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission granted.');
  } else {
    console.log('Notification permission denied.');
  }
};
export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.error('FCM token not available');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};
