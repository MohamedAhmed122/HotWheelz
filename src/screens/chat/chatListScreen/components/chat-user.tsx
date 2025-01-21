import {Pressable, View} from 'react-native';

import moment from 'moment';
import {ChatData} from 'static-data/chatData';
import AppAvatar from 'common/avatar';
import {AppText} from 'common/text';
import {COLORS} from 'styles';
import {ScaledSheet} from 'react-native-size-matters';

type Props = {
  item: ChatData;
  onPress(): void;
};

export default function ChatUser({item, onPress}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AppAvatar source={item.user.image} size={60} />
      <View style={styles.innerContainer}>
        <View style={styles.nameMessageContainer}>
          <AppText style={styles.nameText}>{item.user.name}</AppText>
          <View style={{flexDirection: 'row'}}>
            {/* {!!item.lastMsg.photo && (
              <View style={styles.imageIcon}>
                <FontAwesome6 name="images" size={20} color={COLORS.primary} />
              </View>
            )} */}
            <AppText style={styles.messageText}>
              {!!item.lastMsg?.msg ? item.lastMsg?.msg : 'image'}
            </AppText>
          </View>
        </View>
        <View style={styles.timeUnreadContainer}>
          <AppText style={styles.timeText}>
            {moment(item.lastMsgAt).format('hh:mmA')}
          </AppText>
          {!!item.unreadMsgs && (
            <View style={styles.unreadMsgContainer}>
              <AppText style={styles.unreadMsgText}>{item.unreadMsgs}</AppText>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  nameMessageContainer: {
    marginLeft: '10@ms',
  },
  nameText: {
    color: COLORS.primary,
    fontSize: '16@ms',
  },
  messageText: {
    fontWeight: '600',
    fontSize: '14@ms',
    marginTop: '5@mvs',
    width: '80%',
  },
  timeUnreadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: '11@ms',
    color: 'gray',
  },
  unreadMsgContainer: {
    alignSelf: 'center',
    marginTop: '5@mvs',
    width: '25@ms',
    height: '25@ms',
    borderRadius: '12.5@ms',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadMsgText: {
    color: COLORS.white,
    fontSize: '11@ms',
    fontWeight: '700',
  },
  imageIcon: {
    marginTop: 5,
    marginRight: 5,
  },
});
