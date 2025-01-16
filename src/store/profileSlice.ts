import {LocationType} from 'components/PlacesAutoCompelete';
import {Profile} from 'service/profile';
import {StoreSlice} from 'store';

type AuthProfile = {
  username: string;
  location?: LocationType;
  bio: string;
  imageUri: string;
};

export interface ProfileSlice {
  profile?: Profile;

  updateProfile(profile: Profile): void;

  authProfile?: AuthProfile;

  updateAuthProfile(authProfile: AuthProfile): void;
}

export const createProfileSlice: StoreSlice<ProfileSlice> = set => ({
  authProfile: {
    username: '',
    bio: '',
    imageUri: '',
  },
  updateProfile: profile => set({profile}),

  updateAuthProfile: authProfile => set({authProfile}),
});
