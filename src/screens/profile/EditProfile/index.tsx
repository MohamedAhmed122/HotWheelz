import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {AppInput} from 'common/input';

import {AppButton} from 'common/button';
import {AppText} from 'common/text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'styles';
import {getUserProfile, updateUserProfile} from 'service/profile';
import useStore from 'store';
import ImagePicker from '../CreateProfileScreen/PickImage';
import {useNavigation} from '@react-navigation/native';

export default function EditProfileScreen() {
  const {profile, updateProfile} = useStore();
  const [imageUri, setImageUri] = useState<string | undefined>(profile.photo);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const {top} = useSafeAreaInsets();
  const [error, setError] = useState({
    imageError: false,
    isError: false,
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Name is required'),
    bio: Yup.string()
      .max(200, 'Bio cannot exceed 200 characters')
      .required('Bio is required'),
  });

  const getCurrentProfile = async () => {
    await getUserProfile().then(res => {
      if (res.data) {
        updateProfile(res.data);
      }
    });
  };
  const onHandleSubmit = async (values: {name: string; bio: string}) => {
    setError({
      imageError: false,
      isError: false,
    });
    if (!imageUri) {
      setError(err => ({
        ...err,
        imageError: true,
      }));
      return;
    }
    setIsLoading(true);

    let body;
    if (imageUri === profile.photo) {
      body = {
        username: values.name,
        bio: values.bio,
      };
    } else {
      body = {
        username: values.name,
        bio: values.bio,
        photo: imageUri,
      };
    }
    const {success, error: isError} = await updateUserProfile(body);
    if (success) {
      await getCurrentProfile();
      navigation.goBack();
    }
    if (isError) {
      setError(err => ({
        ...err,
        isError: true,
      }));
    }
    setIsLoading(false);
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
          name: profile.username,
          bio: profile.bio,
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

            {error.isError && (
              <Text style={styles.errorText}>{'Please try again later'}</Text>
            )}
            <AppButton
              title="Submit"
              onPress={handleSubmit}
              loading={isLoading}
            />
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
