import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
}

// Create User Profile
export const createUserProfile = async (
  user: FirebaseAuthTypes.User,
  profileData: Omit<Profile, 'photo' | 'isOrganizer' | 'userId'>,
  photoUri: string,
): Promise<{success?: true; error?: string}> => {
  try {
    // Upload photo to storage
    const photoRef = storage().ref(`/profilePhotos/${user.uid}`);
    await photoRef.putFile(photoUri);
    const photoUrl = await photoRef.getDownloadURL();

    // Create profile data
    const profile: Profile = {
      ...profileData,
      photo: photoUrl,
      isOrganizer: false,
      userId: user.uid,
    };

    // Save profile in Firestore
    await firestore().collection('Profile').doc(user.uid).set(profile);

    return {success: true};
  } catch (error) {
    console.error('Error creating user profile:', error);
    return {error: 'Failed to create user profile. Please try again.'};
  }
};

// Update User Profile
export const updateUserProfile = async (
  userId: string,
  updatedData: Partial<Profile>,
): Promise<{success?: true; error?: string}> => {
  try {
    await firestore().collection('Profile').doc(userId).update(updatedData);
    return {success: true};
  } catch (error) {
    console.error('Error updating user profile:', error);
    return {error: 'Failed to update user profile. Please try again.'};
  }
};

// Get User Profile
export const getUserProfile = async (
  userId: string,
): Promise<{data?: Profile; error?: string}> => {
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
