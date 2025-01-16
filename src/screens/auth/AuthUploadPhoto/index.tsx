import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {AuthTitle} from 'components/AuthTitle';
import {Stepper} from 'common/stepper';
import {AuthHeader} from 'components/AuthHeader';
import ImagePicker from 'screens/profile/CreateProfileScreen/PickImage';
import {mvs} from 'react-native-size-matters';
import {AppButton} from 'common/button';
import useStore from 'store';
import {createUserProfile, getUserProfile} from 'service/profile';
import {getCurrentUser} from 'service/auth';

export default function AuthUserUploadPhoto() {
  const [imageUri, setImageUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    authProfile,
    updateAuthProfile,

    updateProfile,
    updateIsAuthenticated,
    isAuthenticated,
    updateUser,
  } = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      updateUser(getCurrentUser());
    }
  }, [isAuthenticated]);

  const [error, setError] = useState('');

  const getCurrentProfile = async () => {
    await getUserProfile().then(res => {
      if (res.data) {
        updateProfile(res.data);
        updateIsAuthenticated(true);
      } else {
        setError(res.error);
      }
    });
  };

  const profileCreation = async () => {
    const {success} = await createUserProfile(
      {
        username: authProfile.username,
        bio: authProfile.bio,
        userLocation: {
          lat: authProfile.location.lat,
          lng: authProfile.location.lng,
        },
        city: authProfile.location.city,
        country: authProfile.location.country,
        address: authProfile.location.address,
      },
      imageUri,
    );
    if (success) {
      getCurrentProfile();
    }
  };

  const onSubmitPhoto = async () => {
    if (!imageUri) {
      setError('Image is required for better experience');
      return;
    }
    setIsLoading(true);
    setError('');
    updateAuthProfile({...authProfile, imageUri});
    await profileCreation();
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <AuthTitle />
        <View style={{marginTop: mvs(24)}}>
          <Stepper currentIndex={4} steps={[0, 1, 2, 3, 4]} />
        </View>

        <AuthHeader
          title="Upload Your Profile Photo"
          subtitle="Upload your photo to personalize your profile and let others recognize you in the HotWheelz community!"
        />

        <View style={styles.input}>
          <ImagePicker imageUri={imageUri} setImageUri={setImageUri} />
        </View>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <AppButton title="Submit" onPress={onSubmitPhoto} loading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  input: {
    marginHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    fontSize: 14,
    marginLeft: 8,
  },
});
