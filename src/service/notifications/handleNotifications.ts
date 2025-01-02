import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const handleForegroundNotifications = () => {
  messaging().onMessage(async remoteMessage => {
    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'Notification',
      body: remoteMessage.notification?.body || 'You have a new message!',
      android: {
        channelId: 'default-channel-id',
        smallIcon: 'ic_launcher',
      },
    });
  });
};

export const handleBackgroundNotifications = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'Notification',
      body: remoteMessage.notification?.body || 'You have a new message!',
      android: {
        channelId: 'default-channel-id',
        smallIcon: 'ic_launcher',
      },
    });
  });
};
