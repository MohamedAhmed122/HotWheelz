import {View, FlatList} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import ChatUser from './components/chat-user';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChatStackParams, ChatStackParamsList} from 'navigation/types';
import {User} from 'static-data/users';
import {chatData} from 'static-data/chatData';
import {COLORS} from 'styles';

type Navigation = NativeStackScreenProps<ChatStackParamsList, ChatStackParams>;

export default function ChatList({navigation}: Navigation) {
  const onNavigateToChat = (user: User) =>
    navigation.navigate(ChatStackParams.ChatRoom, {user});

  return (
    <View>
      <SafeAreaView />
      <FlatList
        data={chatData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ChatUser item={item} onPress={() => onNavigateToChat(item.user)} />
        )}
        contentContainerStyle={{marginHorizontal: 20, paddingBottom: 120}}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.white,
              width: '100%',
              marginVertical: 15,
            }}
          />
        )}
      />
    </View>
  );
}
