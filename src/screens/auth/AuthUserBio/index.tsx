import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AppInput} from 'common/input';
import {AuthTitle} from 'components/AuthTitle';
import {Stepper} from 'common/stepper';
import {AuthHeader} from 'components/AuthHeader';
import {AppButton} from 'common/button';
import {mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams, AuthStackParamsList} from 'navigation/types';
import useStore from 'store';

type Props = NativeStackScreenProps<AuthStackParamsList>;

export default function AuthUserBio({navigation}: Props) {
  const {authProfile, updateAuthProfile} = useStore();

  const [bio, setBio] = useState(authProfile?.bio || '');
  const [error, setError] = useState('');

  const onSubmitBio = () => {
    if (bio.length < 6) {
      setError('Bio must be at least 6 characters long');
      return;
    }
    setError('');
    updateAuthProfile({...authProfile, bio});

    navigation.navigate(AuthStackParams.AuthLocation);
  };
  return (
    <View style={styles.container}>
      <View>
        <AuthTitle />
        <View style={{marginTop: mvs(24)}}>
          <Stepper currentIndex={2} steps={[0, 1, 2, 3, 4]} />
        </View>

        <AuthHeader
          title="Insert your Bio"
          subtitle="Share with us a short bio to let other cyclists know more about you and your cycling adventures!"
        />

        <View style={styles.input}>
          <AppInput
            placeholder="Bio"
            isMulti
            inputContainerStyle={{minHeight: 140}}
            value={bio}
            onChangeText={setBio}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>
      <AppButton title="Submit" onPress={onSubmitBio} />
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
