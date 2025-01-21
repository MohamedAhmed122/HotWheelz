import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {ApiResponse} from 'service/organizedEvents';

export interface Profile {
  username: string;
  photo: string;
  bio: string;
  userLocation: {
    lat: number;
    lng: number;
  };
  city: string;
  country: string;
  isOrganizer: boolean;
  address: string;
  userId: string;
  savedEvents?: string[]; // I just added
}

// Create User Profile
export const createUserProfile = async (
  profileData: Omit<Profile, 'photo' | 'isOrganizer' | 'userId'>,
  photoUri: string,
): Promise<{success?: true; error?: string}> => {
  try {
    const userId = auth().currentUser?.uid;
    // Upload photo to storage
    const photoRef = storage().ref(`/profilePhotos/${userId}`);
    await photoRef.putFile(photoUri);
    const photoUrl = await photoRef.getDownloadURL();

    // Create profile data
    const profile: Profile = {
      ...profileData,
      photo: photoUrl,
      isOrganizer: false,
      userId: userId,
    };

    // Save profile in Firestore
    await firestore().collection('Profile').doc(userId).set(profile);

    return {success: true};
  } catch (error) {
    console.error('Error creating user profile:', error);
    return {error: 'Failed to create user profile. Please try again.'};
  }
};

// Update User Profile
export const updateUserProfile = async (
  updatedData: Partial<Profile>,
): Promise<{success?: true; error?: string}> => {
  const userId = auth().currentUser?.uid;
  try {
    console.log(updatedData.photo, 'updatedData.photo');

    if (updatedData.photo) {
      // Upload photo to storage
      const photoRef = storage().ref(`/profilePhotos/${userId}`);
      await photoRef.putFile(updatedData.photo);
      const photoUrl = await photoRef.getDownloadURL();
      updatedData = {...updatedData, photo: photoUrl};
    }

    await firestore().collection('Profile').doc(userId).update(updatedData);
    return {success: true};
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {error: 'Failed to update user profile. Please try again.'};
  }
};

// Get User Profile
export const getUserProfile = async (): Promise<{
  data?: Profile;
  error?: string;
}> => {
  const userId = auth().currentUser?.uid;

  try {
    const doc = await firestore().collection('Profile').doc(userId).get();

    if (doc.exists) {
      const profile = doc.data() as Profile;
      return {data: profile};
    } else {
      return {error: 'NOT_FOUND'};
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {error: 'FAILED'};
  }
};

export const saveOrganizedEvent = async (
  eventId: string,
): Promise<ApiResponse<void>> => {
  const userId = auth().currentUser?.uid;
  try {
    await firestore()
      .collection('Profile')
      .doc(userId)
      .update({
        savedEvents: firestore.FieldValue.arrayUnion(eventId),
      });

    return {isSuccess: true, isError: false};
  } catch (error) {
    console.error(error);
    return {isSuccess: false, isError: true};
  }
};

export const unSaveOrganizedEvent = async (
  eventId: string,
): Promise<ApiResponse<void>> => {
  const userId = auth().currentUser?.uid;
  try {
    await await firestore()
      .collection('Profile')
      .doc(userId)
      .update({
        savedEvents: firestore.FieldValue.arrayRemove(eventId),
      });

    return {isSuccess: true, isError: false};
  } catch (error) {
    console.error(error);
    return {isSuccess: false, isError: true};
  }
};
