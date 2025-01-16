import {Pressable, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';

import {AppButton} from 'common/button';
import {AppInput} from 'common/input';
import {AppText} from 'common/text';
import {registerValidationSchema} from './utils';
import {Fragment, useCallback, useEffect, useState} from 'react';
import {getCurrentUser, registerWithEmail} from 'service/auth';
import useStore from 'store';

import {Stepper} from 'common/stepper';
import {mvs} from 'react-native-size-matters';
import {AuthHeader} from 'components/AuthHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams, AuthStackParamsList} from 'navigation/types';

type Props = NativeStackScreenProps<AuthStackParamsList>;

export default function RegisterScreen({navigation}: Props) {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {isAuthenticated, updateUser} = useStore();

  const {top} = useSafeAreaInsets();

  useEffect(() => {
    if (isAuthenticated) {
      updateUser(getCurrentUser());
    }
  }, [isAuthenticated]);
  const onPressLogin = useCallback(() => {
    navigation.navigate(AuthStackParams.Login);
  }, [navigation]);

  const handleRegister = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      setErr(null);
      await registerWithEmail(values.email, values.password);
      navigation.navigate(AuthStackParams.AuthUsername);
    } catch (error: any) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <View style={{marginTop: mvs(24) + top}}>
        <Stepper currentIndex={0} steps={[0, 1, 2, 3, 4]} />
      </View>

      <AuthHeader
        title="Create Your Account"
        subtitle="Insert your email, create your account, and join the ride to start your journey "
      />

      <Formik
        initialValues={{email: '', confirmPassword: '', password: ''}}
        validationSchema={registerValidationSchema}
        onSubmit={handleRegister}>
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
              <AppInput
                placeholder="confirmPassword"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <AppText style={styles.error}>{errors.password}</AppText>
              )}
              {err && <AppText style={styles.error}>{err}</AppText>}
            </View>
            <View style={{width: '100%'}}>
              <AppButton
                title="Register"
                onPress={handleSubmit}
                disabled={!isValid || loading}
              />
              <Pressable
                style={styles.registerContainer}
                onPress={onPressLogin}>
                <AppText style={styles.registerText}>
                  You have account!
                  <AppText style={styles.loginTextContainer}> Login</AppText>
                </AppText>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 10,
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
    height: 50,
  },
  registerText: {
    textAlign: 'center',
  },
  loginTextContainer: {
    fontWeight: 'bold',
  },
});
