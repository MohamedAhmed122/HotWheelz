import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import ChatMessage from './components/chat-message';
import moment from 'moment';
import ChatInbox from './components/chat-inbox';
import ChatHeader from './components/chat-header';

// import Recorder from './Record';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Message, messages} from 'static-data/chatData';
import {ChatStackParams, ChatStackParamsList} from 'navigation/types';
import {users} from 'static-data/users';

export interface ExtendMsg extends Message {
  showAvatar: boolean;
  isSameSenderAsPrevious: boolean;
  isSameDate: boolean;
}

const preprocessMessages = (messages: Message[]) =>
  messages.map((message, index, arr) => ({
    ...message,
    showAvatar: index === 0 || arr[index - 1]?.user.id !== message.user.id,
    isSameSenderAsPrevious:
      index !== 0 && arr[index - 1].user.id === message.user.id,
    isSameDate:
      index === 0 || moment(arr[index - 1].date).isSame(message.date, 'day'),
  }));

type Navigation = NativeStackScreenProps<ChatStackParamsList, ChatStackParams>;
export default function Chat({route}: Navigation) {
  const user = route.params?.user;

  const flatListRef = useRef<FlatList>(null);

  const [chatMsgs, setChatMsgs] = useState<ExtendMsg[]>(() =>
    preprocessMessages(messages),
  );

  useEffect(() => {
    setTimeout(() => {
      if (flatListRef?.current) {
        flatListRef?.current.scrollToIndex({
          index: chatMsgs.length - 1,
          animated: false,
          viewPosition: 1,
          viewOffset: -40,
        });
      }
    }, 200);
  }, []);

  const onSendMsg = (msg: string) => {
    const newMessage = {
      id: new Date().toISOString(),
      receiver: false,
      sender: true,
      msg: {msg},
      date: new Date(),
      user: users[0],
    };
    setChatMsgs(currentMsgs => {
      const processedMessages = preprocessMessages([
        ...currentMsgs,
        newMessage,
      ]);
      return processedMessages;
    });
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: chatMsgs.length - 1,
      });
    }, 100);
  };

  const renderItem: ListRenderItem<ExtendMsg> = ({item}) => (
    <ChatMessage msg={item} />
  );

  return (
    <React.Fragment>
      <ChatHeader user={user} />
      <FlatList
        ref={flatListRef}
        keyExtractor={item => item.id}
        data={chatMsgs}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 20}}
      />
      <ChatInbox onSendMsg={onSendMsg} />
    </React.Fragment>
    // TODO: after building the expo-build-properties add the KeyboardGestureArea again.
    // <KeyboardGestureArea interpolator="ios">
    // </KeyboardGestureArea>
  );
}

const styles = StyleSheet.create({});
