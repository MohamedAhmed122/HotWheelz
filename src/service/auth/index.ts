import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const registerWithEmail = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginWithEmail = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await auth().signOut();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = (): FirebaseAuthTypes.User | null => {
  return auth().currentUser;
};
