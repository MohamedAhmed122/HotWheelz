import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {ApiResponse, Joiner} from './organizedEvents';

export interface MapEvent {
  userId: string;
  user: {
    photo: string;
    username: string;
  };
  userLocation: {
    lat: number;
    lng: number;
  };
  city: string;
  address: string;
  description: string;
  country: string;
  startDate?: string;
  isJoinable: boolean;
  isEventCompleted: boolean;
  isSOS: boolean;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  title?: string;
}

export interface MapEventsWithJoiners extends MapEvent {
  joiners: Joiner[];
}

export interface IMapEvents extends MapEventsWithJoiners {
  id: string;
}

// Firestore reference
const mapEventRef = firestore().collection('MapEvent');

// Helper function to get the current user's info
const getCurrentUser = () => auth().currentUser;

// Create a new MapEvent
export const createMapEvent = async (
  event: Omit<MapEvent, 'userId' | 'createdAt' | 'isEventCompleted'>,
): Promise<ApiResponse<string>> => {
  try {
    const user = getCurrentUser();
    const newEvent: MapEvent = {
      ...event,
      userId: user.uid,
      createdAt: firestore.Timestamp.now(),
      isEventCompleted: false,
    };

    const docRef = await mapEventRef.add(newEvent);

    return {
      isSuccess: true,
      isError: false,
      data: docRef.id,
    };
  } catch (error) {
    console.error('Error creating event:', error);
    return {
      isSuccess: false,
      isError: true,
    };
  }
};

// Get today's events
export const getTodaysMapEvents = (
  callback: (response: ApiResponse<IMapEvents[]>) => void,
) => {
  const startOfToday = firestore.Timestamp.fromDate(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );

  mapEventRef.where('createdAt', '>=', startOfToday).onSnapshot(
    snapshot => {
      const events = snapshot.docs.map(doc => ({
        ...(doc.data() as MapEvent),
        id: doc.id,
      })) as IMapEvents[];
      callback({
        isSuccess: true,
        isError: false,
        data: events,
      });
    },
    error => {
      console.error("Error fetching today's events:", error);
      callback({
        isSuccess: false,
        isError: true,
      });
    },
  );
};

// Update an existing MapEvent
export const updateMapEvent = async (
  eventId: string,
  updatedFields: Partial<MapEvent>,
): Promise<ApiResponse<void>> => {
  try {
    await mapEventRef.doc(eventId).update(updatedFields);
    return {
      isSuccess: true,
      isError: false,
    };
  } catch (error) {
    console.error('Error updating event:', error);
    return {
      isSuccess: false,
      isError: true,
    };
  }
};

// Add a joiner to a MapEvent
export const addJoinerToMapEvent = async (
  eventId: string,
  joiner: any, // Replace with your Joiner type
): Promise<ApiResponse<void>> => {
  try {
    await mapEventRef.doc(eventId).update({
      joiners: firestore.FieldValue.arrayUnion(joiner),
    });
    return {
      isSuccess: true,
      isError: false,
    };
  } catch (error) {
    console.error('Error adding joiner:', error);
    return {
      isSuccess: false,
      isError: true,
    };
  }
};

// Remove a joiner from a MapEvent
export const removeJoinerFromMapEvent = async (
  eventId: string,
  joiner: any, // Replace with your Joiner type
): Promise<ApiResponse<void>> => {
  try {
    await mapEventRef.doc(eventId).update({
      joiners: firestore.FieldValue.arrayRemove(joiner),
    });
    return {
      isSuccess: true,
      isError: false,
    };
  } catch (error) {
    console.error('Error removing joiner:', error);
    return {
      isSuccess: false,
      isError: true,
    };
  }
};

// Delete a MapEvent
export const deleteMapEvent = async (
  eventId: string,
): Promise<ApiResponse<void>> => {
  try {
    await mapEventRef.doc(eventId).delete();
    return {
      isSuccess: true,
      isError: false,
    };
  } catch (error) {
    console.error('Error deleting event:', error);
    return {
      isSuccess: false,
      isError: true,
    };
  }
};
// export const createMapEvent = async (
//     event: Omit<MapEvent, 'userId' | 'createdAt' | 'isEventCompleted' | 'ttl'>,
//   ): Promise<ApiResponse<string>> => {
//     try {
//       const user = getCurrentUser();
//       const currentTime = Date.now();
//       const ttlTime = currentTime + 8 * 60 * 60 * 1000; // 8 hours from now

//       const newEvent: MapEvent = {
//         ...event,
//         userId: user.uid,                           // ID of the current user
//         createdAt: firestore.Timestamp.now(),      // Event creation time
//         isEventCompleted: false,                   // Initial state of the event
//         ttl: firestore.Timestamp.fromMillis(ttlTime), // TTL timestamp for deletion
//       };

//       const docRef = await firestore().collection('mapEvents').add(newEvent);

//       return {
//         isSuccess: true,
//         isError: false,
//         data: docRef.id,
//       };
//     } catch (error) {
//       console.error('Error creating event:', error);
//       return {
//         isSuccess: false,
//         isError: true,
//       };
//     }
//   };
