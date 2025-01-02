import {useEffect} from 'react';
import {getCurrentUser} from 'service/auth';
import {
  handleBackgroundNotifications,
  handleForegroundNotifications,
} from 'service/notifications/handleNotifications';
import {configureNotifee} from 'service/notifications/notifeeConfig';
import {
  getFCMToken,
  requestNotificationPermission,
} from 'service/notifications/notificationPermission';
import useStore from 'store';

export const useAppInit = () => {
  const {isAuthenticated, updateUser} = useStore();
  useEffect(() => {
    updateUser(getCurrentUser());
  }, [isAuthenticated]);

  useEffect(() => {
    configureNotifee();

    // Request notification permission
    requestNotificationPermission();

    // Get FCM token
    getFCMToken();

    // Handle notifications
    handleForegroundNotifications();
    handleBackgroundNotifications();
  }, []);
};
