import {View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ScaledSheet} from 'react-native-size-matters';
import AppAvatar from 'common/avatar';
import {AppText} from 'common/text';
import {User} from 'static-data/users';
import {COLORS} from 'styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ChatHeader({user}: {user?: User}) {
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: top ?? 20}]}>
      <View style={styles.avatarContainer}>
        <AppAvatar source={user?.image} size={50} />
        <AppText style={styles.userName}>{user?.name}</AppText>
      </View>
      <View style={styles.iconsContainer}>
        <MaterialIcons
          name="call"
          size={30}
          color="white"
          style={styles.icon}
        />
        <MaterialIcons name="more-vert" size={30} color="white" />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '20@s',
    // paddingTop: top ?? '20@s',
    paddingBottom: '10@s',
    borderBottomLeftRadius: '20@s',
    borderBottomRightRadius: '20@s',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: '3.84@s',
    elevation: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: 'white',
    fontSize: '15@s',
    fontWeight: '700',
    marginLeft: '10@s',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10@s',
  },
});
