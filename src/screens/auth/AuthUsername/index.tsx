import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AuthTitle} from 'components/AuthTitle';
import {mvs} from 'react-native-size-matters';
import {Stepper} from 'common/stepper';
import {AuthHeader} from 'components/AuthHeader';
import {AppInput} from 'common/input';
import {AppButton} from 'common/button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams, AuthStackParamsList} from 'navigation/types';
import useStore from 'store';

type Props = NativeStackScreenProps<AuthStackParamsList>;

export default function AuthUsername({navigation}: Props) {
  const {authProfile, updateAuthProfile} = useStore();

  const [username, setUsername] = useState(authProfile?.username || '');
  const [error, setError] = useState('');

  const onSubmitUsername = () => {
    if (username.length < 6) {
      setError('Username must be at least 6 characters long');
      return;
    }
    setError('');
    updateAuthProfile({...authProfile, username});
    navigation.navigate(AuthStackParams.AuthBio);
  };

  return (
    <View style={styles.container}>
      <View>
        <AuthTitle />
        <View style={{marginTop: mvs(24)}}>
          <Stepper currentIndex={1} steps={[0, 1, 2, 3, 4]} />
        </View>

        <AuthHeader
          title="Insert your Username"
          subtitle="Enter your unique username to personalize your HotWheelz experience and connect with fellow cyclists! "
        />
        <AppInput
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <AppButton title="Submit" onPress={onSubmitUsername} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
