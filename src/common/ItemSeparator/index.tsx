import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS} from '@styles/index';

export function AppLoading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
