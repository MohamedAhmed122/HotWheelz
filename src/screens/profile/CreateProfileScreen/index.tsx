import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ImagePicker from './PickImage';
import {AppInput} from 'common/input';
import PlacesAutoCompleteInput, {
  LocationType,
} from 'components/PlacesAutoCompelete';
import {AppButton} from 'common/button';
import {AppText} from 'common/text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'styles';
import {createUserProfile} from 'service/profile';
import useStore from 'store';

export default function CreateProfileScreen({
  getUserProfile,
}: {
  getUserProfile(): void;
}) {
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [location, setLocation] = useState<LocationType>();
  const {user} = useStore();
  const {top} = useSafeAreaInsets();
  const [error, setError] = useState({
    imageError: false,
    locationError: false,
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Name is required'),
    bio: Yup.string()
      .max(200, 'Bio cannot exceed 200 characters')
      .required('Bio is required'),
  });

  const onHandleSubmit = async (values: {name: string; bio: string}) => {
    setError({
      imageError: false,
      locationError: false,
    });
    if (!imageUri) {
      setError(err => ({
        ...err,
        imageError: true,
      }));
      return;
    }
    if (!location.lat) {
      setError(err => ({
        ...err,
        locationError: true,
      }));
      return;
    }

    const {success, error: wow} = await createUserProfile(
      user,
      {
        username: values.name,
        bio: values.bio,
        userLocation: {lat: location.lat, lng: location.lng},
        city: location.city,
        country: location.country,
        address: location.address,
      },
      imageUri,
    );
    if (success) {
      getUserProfile();
    }
  };

  return (
    <View style={{flex: 1}}>
      <AppText
        style={{
          marginTop: 10 + top,
          textAlign: 'center',
          color: COLORS.primary,
          fontSize: 20,
          fontWeight: '600',
        }}>
        Create Your Profile
      </AppText>

      <ImagePicker imageUri={imageUri} setImageUri={setImageUri} />
      {error.imageError && (
        <Text style={styles.errorText}>Image is Required</Text>
      )}
      <Formik
        initialValues={{
          name: '',
          bio: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => onHandleSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <AppInput
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {errors.name && touched.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <AppInput
              placeholder="Bio"
              isMulti
              value={values.bio}
              onChangeText={handleChange('bio')}
              onBlur={handleBlur('bio')}
            />
            {errors.bio && touched.bio && (
              <Text style={styles.errorText}>{errors.bio}</Text>
            )}

            <PlacesAutoCompleteInput onChangeLocation={setLocation} />
            {error.locationError && (
              <Text style={styles.errorText}>Location is Required</Text>
            )}

            <AppButton title="Submit" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 20,
  },
});
