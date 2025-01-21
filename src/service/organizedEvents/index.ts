import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type Joiner = {
  userId: string;
  username: string;
  photo: string;
};

export type Feed = {
  userId: string;
  username: string;
  photo: string;
  feed: string;
};

export interface OrganizedEvent {
  userId: string;
  user: {
    photo: string;
    username: string;
  };
  createAt: FirebaseFirestoreTypes.Timestamp;
  endDate: string;
  endTime: string;
  eventLocation: {
    lat: number;
    lng: number;
  };
  city: string;
  address: string;
  country: string;
  description: string;
  maxNumber: number;
  startDate: string;
  startTime: string;
  title: string;
  joiners: Joiner[];
  feeds: Feed[];
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  isError: boolean;
  data?: T;
}

export interface IOrganizedEvent extends OrganizedEvent {
  id: string;
}

// Firestore reference
const organizedEventRef = firestore().collection('OrganizedEvent');

export const createOrganizedEvent = async (
  event: Omit<OrganizedEvent, 'joiners' | 'feeds' | 'userId' | 'createAt'>,
): Promise<ApiResponse<void>> => {
  try {
    const userId = auth().currentUser?.uid;

    if (!userId) {
      return {isSuccess: false, isError: true};
    }

    const newEvent = {
      ...event,
      joiners: [],
      feeds: [],
      createAt: firestore.FieldValue.serverTimestamp(),
      userId,
    };

    await organizedEventRef.add(newEvent);

    return {isSuccess: true, isError: false};
  } catch (error) {
    console.error(error);
    return {isSuccess: false, isError: true};
  }
};

export const joinOrganizedEvent = async (
  eventId: string,
  joiner: Joiner,
): Promise<ApiResponse<void>> => {
  try {
    await organizedEventRef.doc(eventId).update({
      joiners: firestore.FieldValue.arrayUnion(joiner),
    });

    return {isSuccess: true, isError: false};
  } catch (error) {
    console.error(error);
    return {isSuccess: false, isError: true};
  }
};

export const unJoinOrganizedEvent = async (
  eventId: string,
  joiner: Joiner,
): Promise<ApiResponse<void>> => {
  try {
    await organizedEventRef.doc(eventId).update({
      joiners: firestore.FieldValue.arrayRemove(joiner),
    });

    return {isSuccess: true, isError: false};
  } catch (error) {
    console.error(error);
    return {isSuccess: false, isError: true};
  }
};

export const addFeed = async (
  eventId: string,
  feed: Feed,
): Promise<ApiResponse<void>> => {
  try {
    await organizedEventRef.doc(eventId).update({
      feeds: firestore.FieldValue.arrayUnion(feed),
    });

    return {isSuccess: true, isError: false};
  } catch (error) {
    console.error(error);
    return {isSuccess: false, isError: true};
  }
};

export const getAllOrganizedEvents = async (): Promise<
  ApiResponse<{
    events: IOrganizedEvent[];
    upComingEvents: IOrganizedEvent[];
    pastEvents: IOrganizedEvent[];
  }>
> => {
  try {
    const now = new Date();

    const snapshot = await organizedEventRef.get();
    const events = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as IOrganizedEvent[];

    const upComingEvents = events.filter(
      event => new Date(event.startDate) > now,
    );
    const pastEvents = events.filter(event => new Date(event.endDate) < now);

    return {
      isSuccess: true,
      isError: false,
      data: {
        events,
        upComingEvents,
        pastEvents,
      },
    };
  } catch (error) {
    console.error(error);
    return {isSuccess: false, isError: true};
  }
};

export const getOrganizedEventById = (
  eventId: string,
  callback: (response: ApiResponse<IOrganizedEvent>) => void,
) => {
  return organizedEventRef.doc(eventId).onSnapshot(
    doc => {
      if (!doc.exists) {
        callback({
          isSuccess: false,
          isError: true,
        });
        return;
      }

      const event = {...doc.data(), id: doc.id} as IOrganizedEvent;
      callback({
        isSuccess: true,
        isError: false,
        data: event,
      });
    },
    error => {
      console.error(error);
      callback({
        isSuccess: false,
        isError: true,
      });
    },
  );
};
export const getEventsByIds = async (
  eventIds: string[],
): Promise<
  ApiResponse<{
    matchedEvents: IOrganizedEvent[];
  }>
> => {
  try {
    // Fetch all organized events
    const response = await getAllOrganizedEvents();

    if (!response.isSuccess || !response.data) {
      return {
        isSuccess: false,
        isError: true,
        data: {
          matchedEvents: [],
        },
      };
    }

    const {events} = response.data;

    // Filter events by matching IDs
    const matchedEvents = events.filter(event => eventIds.includes(event.id));

    return {
      isSuccess: true,
      isError: false,
      data: {
        matchedEvents,
      },
    };
  } catch (error) {
    console.error('Error fetching events by IDs:', error);

    return {
      isSuccess: false,
      isError: true,
      data: {
        matchedEvents: [],
      },
    };
  }
};
