import ModalView from 'components/ModalView';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {AppText} from 'common/text';
import {users} from 'static-data/users';
import {User} from 'static-data/users';
import AppAvatar from 'common/avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from 'styles';
import {ItemSeparator} from 'common/ItemSeparator';
import {ms} from 'react-native-size-matters';

export default function EventJoinersModal({
  isVisible,
  onClose,
  isSos,
}: {
  isVisible: boolean;
  onClose(): void;
  isSos: boolean;
}) {
  users;

  return (
    <ModalView
      title={isSos ? 'Helpers Are On Their Way' : 'Ride Together, Stay Strong'}
      onClose={onClose}
      visible={isVisible}>
      <>
        {users.slice(0, 6).map((item, index) => (
          <>
            <Joiner user={item} key={item.id} />
            {index < users.slice(0, 6).length - 1 && <ItemSeparator />}
          </>
        ))}

        <NoJoiners isSos={isSos} />
      </>
    </ModalView>
  );
}

const Joiner = ({user}: {user: User}) => {
  return (
    <View style={styles.joinerContainer}>
      <View style={styles.joinerUserContainer}>
        <AppAvatar source={user.image} size={30} />
        <AppText style={styles.usernameText}>{user.username}</AppText>
      </View>
      <AppText style={styles.kmText}> 20 KM away</AppText>
      <TouchableOpacity>
        <Icon name="message-text" color={COLORS.primary} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export const NoJoiners = ({isSos}: {isSos: boolean}) => {
  return (
    <View style={styles.noJoinerContainer}>
      <View style={styles.iconContainer}>
        <Icon
          name={isSos ? 'shield-alert-outline' : 'bike'}
          size={50}
          color={isSos ? COLORS.danger : COLORS.primary}
        />
      </View>
      <AppText style={styles.noJoinerText}>
        {isSos
          ? 'Help will arrive soon. Stay safe and strong!'
          : 'No participants yet. Be the first to join the fun!'}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  joinerContainer: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  joinerUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 0.4,
  },
  usernameText: {
    fontWeight: '600',
    marginLeft: ms(14),
  },
  kmText: {
    marginLeft: ms(6),
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
  },
  noJoinerContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
  },
  iconContainer: {
    marginBottom: 10,
  },
  noJoinerText: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: '500',
    marginVertical: 10,
  },
});
