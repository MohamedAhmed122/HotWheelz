import notifee from '@notifee/react-native';

// Create a notification channel
export const configureNotifee = async () => {
  await notifee.createChannel({
    id: 'default-channel-id',
    name: 'Default Channel',
    description: 'A default channel for notifications',
    sound: 'default',
  });
};
