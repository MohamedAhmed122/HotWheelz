import firestore from '@react-native-firebase/firestore';
import {MapEvent} from './create-mapEvents';

export const getTodaysMapEvents = async (): Promise<{
  data: MapEvent[];
  error: boolean;
}> => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const snapshot = await firestore()
      .collection('map_events')
      .where('createdAt', '>=', firestore.Timestamp.fromDate(startOfDay))
      .where('createdAt', '<=', firestore.Timestamp.fromDate(endOfDay))
      .get();

    const todaysEvent = snapshot.docs.map(doc => ({
      ...doc.data(),
    })) as MapEvent[];

    return {data: todaysEvent, error: false};
  } catch (error) {
    console.error('Error fetching today’s map events:', error);
    return {data: [], error: true};
  }
};

export const getUserMapEvents = async (
  userId: string,
): Promise<{data: MapEvent[]; error: boolean}> => {
  try {
    const snapshot = await firestore()
      .collection('map_events')
      .where('userId', '==', userId)
      .get();

    const userEvents = snapshot.docs.map(doc => ({
      ...doc.data(),
    })) as MapEvent[];

    return {data: userEvents, error: false};
  } catch (error) {
    console.error('Error fetching user map events:', error);
    return {data: [], error: true};
  }
};

export const updateMapEvent = async (
  eventId: string,
  updatedFields: Partial<MapEvent>,
): Promise<{isSuccess: boolean; isError: boolean}> => {
  try {
    // Ensure the eventId is valid
    if (!eventId) {
      return {isSuccess: false, isError: true};
    }

    await firestore()
      .collection('map_events')
      .doc(eventId)
      .update(updatedFields);

    console.log(`Event with ID ${eventId} successfully updated.`);
    return {isSuccess: true, isError: false};
  } catch (error) {
    console.error('Error updating the event:', error);
    return {isSuccess: false, isError: true};
  }
};
