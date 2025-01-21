import {Pressable, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';

import {AppButton} from 'common/button';
import {AppInput} from 'common/input';
import {AppText} from 'common/text';

import {getCurrentUser, loginWithEmail} from 'service/auth';

import {Stepper} from 'common/stepper';
import {AuthHeader} from 'components/AuthHeader';
import {mvs} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams, AuthStackParamsList} from 'navigation/types';
import {useEffect, useState} from 'react';
import useStore from 'store';
import {getUserProfile} from 'service/profile';

type Props = NativeStackScreenProps<AuthStackParamsList>;

export default function LoginScreen({navigation}: Props) {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {top} = useSafeAreaInsets();
  const {updateIsAuthenticated, isAuthenticated, updateUser, updateProfile} =
    useStore();

  const onPressRegister = () => navigation.navigate(AuthStackParams.Register);

  const handleLogin = async (values: {email: string; password: string}) => {
    try {
      setLoading(true);
      setErr(null);
      await loginWithEmail(values.email, values.password);

      await getCurrentProfile();
    } catch (error: any) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      updateUser(getCurrentUser());
    }
  }, [isAuthenticated]);

  const getCurrentProfile = async () => {
    await getUserProfile().then(res => {
      if (res.data) {
        updateProfile(res.data);
        updateIsAuthenticated(true);
      }
    });
  };

  return (
    <>
      <AuthHeader
        containerStyle={{marginTop: mvs(24) + top}}
        title="Login To Your Account"
        subtitle="Enter your email and password to access your HotWheelz account and join the cycling community!"
      />
      <Formik
        initialValues={{email: '', password: ''}}
        // validationSchema={loginValidationSchema}
        onSubmit={handleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={styles.container}>
            <View>
              <AppInput
                placeholder="email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && (
                <AppText style={styles.error}>{errors.email}</AppText>
              )}
              <AppInput
                placeholder="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <AppText style={styles.error}>{errors.password}</AppText>
              )}
              {err && <AppText style={styles.error}>{err}</AppText>}
            </View>
            <View style={{width: '100%'}}>
              <AppButton
                title="Login"
                onPress={handleSubmit}
                disabled={!isValid || loading}
              />
              <Pressable
                style={styles.registerContainer}
                onPress={onPressRegister}>
                <AppText style={{textAlign: 'center'}}>
                  You don't have an account?
                  <AppText style={styles.registerText}> Register</AppText>
                </AppText>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-start',
    marginLeft: '6%',
    marginBottom: 8,
  },
  registerContainer: {
    marginTop: 10,
  },
  registerText: {
    fontWeight: 'bold',
  },
});
