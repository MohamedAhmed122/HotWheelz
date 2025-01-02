// notifications.ts
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {Profile} from 'service/profile';

// types.ts
interface NotificationData {
  notificationId?: string;
  eventId?: string;
  action?: NotificationAction;
  [key: string]: any; // for other potential data fields
}

export enum NotificationAction {
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
  HELP = 'HELP',
  CONTACTED = 'CONTACTED',
}

export interface MapEvent {
  userId: string;
  username: string;
  photo: string;
  userLocation: {
    lat: number;
    lng: number;
  };
  city: string;
  address: string;
  description: string;
  isJoinable: boolean;
  isEventCompleted: boolean;
  isSOS: boolean;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  title?: string;
}

class NotificationError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'NotificationError';
  }
}

// Setup notifications with error handling
export const setupNotifications = async (): Promise<void> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      throw new NotificationError('Notification permissions denied');
    }

    const fcmToken = await messaging().getToken();
    const userId = auth().currentUser?.uid;

    if (!userId) {
      throw new NotificationError('User not authenticated');
    }

    await firestore().collection('Profile').doc(userId).update({fcmToken});

    // Handle token refresh
    messaging().onTokenRefresh(async token => {
      try {
        if (userId) {
          await firestore()
            .collection('Profile')
            .doc(userId)
            .update({fcmToken: token});
        }
      } catch (error) {
        console.error('Token refresh error:', error);
        throw new NotificationError('Failed to update FCM token');
      }
    });
  } catch (error) {
    console.error('Setup notifications error:', error);
    throw new NotificationError(
      'Failed to setup notifications: ' +
        (error instanceof Error ? error.message : 'Unknown error'),
    );
  }
};

// Send notification with tracking and retry
const sendNotification = async (
  notification: Omit<NotificationData, 'createdAt' | 'delivered' | 'read'>,
): Promise<void> => {
  console.log('sendNotification');
  const maxRetries = 3;
  let retryCount = 0;

  const attempt = async (): Promise<void> => {
    try {
      const notificationRef = await firestore()
        .collection('notifications')
        .add({
          ...notification,
          createdAt: firestore.Timestamp.now(),
          delivered: false,
          read: false,
          retryCount,
        });

      // Listen for delivery status updates
      const unsubscribe = firestore()
        .collection('notifications')
        .doc(notificationRef.id)
        .onSnapshot(async doc => {
          const data = doc.data() as NotificationData;
          if (data?.errorMessage && retryCount < maxRetries) {
            retryCount++;
            await attempt();
          }
          unsubscribe();
        });
    } catch (error) {
      console.error('Send notification error:', error);
      if (retryCount < maxRetries) {
        retryCount++;
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        await attempt();
      } else {
        throw new NotificationError(
          'Failed to send notification after max retries',
        );
      }
    }
  };

  await attempt();
};

// Create map event with enhanced notification handling
export const createMapEvent = async (
  profile: Profile,
  event: Omit<
    MapEvent,
    'username' | 'photo' | 'isEventCompleted' | 'createdAt' | 'userId'
  >,
): Promise<{isSuccess: boolean; isError: boolean}> => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new NotificationError('User not authenticated');

    const {isJoinable, description, city, isSOS, title, address, userLocation} =
      event;

    const eventData: MapEvent = {
      userId,
      username: profile.username,
      photo: profile.photo,
      userLocation,
      city,
      address,
      description,
      isJoinable,
      isSOS,
      title,
      isEventCompleted: false,
      createdAt: firestore.Timestamp.now(),
    };

    const eventRef = await firestore().collection('map_events').add(eventData);

    try {
      const cityUsersSnapshot = await firestore()
        .collection('Profile')
        .where('city', '==', profile.city)
        .where('userId', '!=', userId)
        .get();

      const notifications = cityUsersSnapshot.docs
        .filter(doc => doc.data().fcmToken)
        .map(doc => ({
          token: doc.data().fcmToken,
          title: isJoinable ? 'New Event Nearby!' : 'SOS Alert!',
          body: isJoinable
            ? `${profile.username} created an event: ${description}`
            : `Emergency: ${profile.username} needs assistance at ${profile.address}`,
          eventId: eventRef.id,
          action: isJoinable
            ? NotificationAction.ACCEPT
            : NotificationAction.HELP,
        }));

      console.log('notifications', notifications);

      await Promise.all(
        notifications.map(notification => sendNotification(notification)),
      );

      if (isSOS) {
        setTimeout(async () => {
          const followUpNotifications = notifications.map(({token}) => ({
            token,
            title: 'SOS Follow-up',
            body: `Follow-up: ${profile.username} requested assistance 10 minutes ago`,
            eventId: eventRef.id,
            action: NotificationAction.CONTACTED,
          }));

          await Promise.all(
            followUpNotifications.map(notification =>
              sendNotification(notification),
            ),
          );
        }, 600000);
      }
    } catch (error) {
      console.log(error, 'error');
    }

    return {isSuccess: true, isError: false};
  } catch (error) {
    return {isSuccess: false, isError: true};
  }
};

// Handle notification actions
const handleNotificationAction = async (
  notificationId: string,
  action: NotificationAction,
  eventId: string,
) => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new NotificationError('User not authenticated');

    // Update notification status
    await firestore().collection('notifications').doc(notificationId).update({
      read: true,
      actionTaken: action,
      actionTimestamp: firestore.Timestamp.now(),
    });

    // Handle different actions
    switch (action) {
      case NotificationAction.ACCEPT:
      case NotificationAction.HELP:
        await firestore().collection('event_responses').add({
          userId,
          eventId,
          action,
          timestamp: firestore.Timestamp.now(),
        });
        break;
      case NotificationAction.CONTACTED:
        await firestore().collection('map_events').doc(eventId).update({
          lastContactedBy: userId,
          lastContactedAt: firestore.Timestamp.now(),
        });
        break;
    }
  } catch (error) {
    console.error('Handle notification action error:', error);
    throw new NotificationError('Failed to handle notification action');
  }
};

const getNotificationId = (
  data: NotificationData | undefined,
): string | null => {
  if (!data || typeof data.notificationId !== 'string') {
    return null;
  }
  return data.notificationId;
};

const updateNotificationDeliveryStatus = async (notificationId: string) => {
  try {
    await firestore()
      .collection('notifications')
      .doc(notificationId)
      .update({delivered: true});
  } catch (error) {
    console.error('Error updating notification status:', error);
  }
};

// Enhanced notification listeners
export const setupNotificationListeners = () => {
  // Foreground message handler
  const unsubscribe = messaging().onMessage(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      const notificationId = getNotificationId(remoteMessage.data);
      const {title, body, eventId, action} = remoteMessage.data || {};

      if (action) {
        Alert.alert(
          title?.toString() || 'Notification',
          body?.toString() || '',
          [
            {
              text: 'Dismiss',
              style: 'cancel',
            },
            {
              text: action === NotificationAction.HELP ? 'Help' : 'Accept',
              onPress: () => {
                if (notificationId && eventId) {
                  handleNotificationAction(
                    notificationId,
                    action as NotificationAction,
                    eventId.toString(),
                  );
                }
              },
            },
          ],
        );
      }

      // Mark notification as delivered
      if (notificationId) {
        await updateNotificationDeliveryStatus(notificationId);
      }
    },
  );

  // Background message handler
  messaging().setBackgroundMessageHandler(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      const notificationId = getNotificationId(remoteMessage.data);

      if (notificationId) {
        await updateNotificationDeliveryStatus(notificationId);
      }

      return Promise.resolve();
    },
  );

  return unsubscribe;
};

// Get notification history
export const getNotificationHistory = async (limit: number = 50) => {
  const userId = auth().currentUser?.uid;
  if (!userId) throw new NotificationError('User not authenticated');

  try {
    const snapshot = await firestore()
      .collection('notifications')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Get notification history error:', error);
    throw new NotificationError('Failed to fetch notification history');
  }
};
