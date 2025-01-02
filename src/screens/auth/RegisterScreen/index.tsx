import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik';

import {AppButton} from 'common/button';
import {AppInput} from 'common/input';
import {AppText} from 'common/text';
import {registerValidationSchema} from './utils';
import {useEffect, useState} from 'react';
import {getCurrentUser, registerWithEmail} from 'service/auth';
import useStore from 'store';

export default function RegisterScreen() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {isAuthenticated, updateIsAuthenticated, updateUser} = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      updateUser(getCurrentUser());
    }
  }, [isAuthenticated]);

  const handleRegister = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      setErr(null);
      await registerWithEmail(values.email, values.password);
      updateIsAuthenticated(true);
    } catch (error: any) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <AppText style={styles.title}>Welcome To HotWheelZ</AppText>
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
          <AppButton
            title="Register"
            onPress={handleSubmit}
            disabled={!isValid || loading}
          />
          <View style={styles.registerContainer}>
            <AppText>You have account! Login</AppText>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
});
