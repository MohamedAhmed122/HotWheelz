import {StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import {AuthTitle} from 'components/AuthTitle';
import {Stepper} from 'common/stepper';
import PlacesAutoCompleteInput, {
  LocationType,
} from 'components/PlacesAutoCompelete';
import {AuthHeader} from 'components/AuthHeader';
import {AppButton} from 'common/button';
import {mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams, AuthStackParamsList} from 'navigation/types';
import useStore from 'store';

type Props = NativeStackScreenProps<AuthStackParamsList>;

export default function AuthUserLocation({navigation}: Props) {
  const {authProfile, updateAuthProfile} = useStore();

  const [location, setLocation] = useState<LocationType>(authProfile?.location);
  const [error, setError] = useState('');

  const onSubmitLocation = () => {
    if (!location) {
      setError('Address is required for better experience');
      return;
    }
    setError('');
    updateAuthProfile({...authProfile, location});

    navigation.navigate(AuthStackParams.AuthUploadPhoto);
  };

  return (
    <View style={styles.container}>
      <View>
        <AuthTitle />
        <View style={{marginTop: mvs(24)}}>
          <Stepper currentIndex={3} steps={[0, 1, 2, 3, 4]} />
        </View>

        <AuthHeader
          title="Insert your Location"
          subtitle="Enter your location to help us personalize your experience and connect you with nearby cyclists and events."
        />

        <PlacesAutoCompleteInput
          placeholder="location"
          onChangeLocation={setLocation}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <AppButton title="Submit" onPress={onSubmitLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    fontSize: 14,
    marginLeft: 8,
  },
});
