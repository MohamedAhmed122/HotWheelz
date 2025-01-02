import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Profile} from 'service/profile';
import {StoreSlice} from 'store';

export interface AuthSlice {
  isAuthenticated: boolean;
  updateIsAuthenticated(value: boolean): void;
  user: FirebaseAuthTypes.User | null;

  updateUser(value: FirebaseAuthTypes.User);

  profile?: Profile;

  updateProfile(profile: Profile): void;
}

export const createAuthSlice: StoreSlice<AuthSlice> = set => ({
  isAuthenticated: false,

  user: null,

  updateIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),

  updateUser: user => set({user}),

  updateProfile: profile => set({profile}),
});
