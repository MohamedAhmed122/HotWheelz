import {StyleProp, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import {FC} from 'react';
import {AppText} from 'common/text';

interface Props extends ViewProps {
  title?: string;
  subtitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const AuthHeader: FC<Props> = ({title, subtitle, containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <AppText style={styles.title}>{title}</AppText>}
      {subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 28,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '300',
  },
});
