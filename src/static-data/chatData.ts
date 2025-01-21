import {User, users} from './users';

export type ChatData = {
  id: string;

  lastMsg: {msg?: string; photo?: string};
  unreadMsgs: number;
  lastMsgAt: Date;
  user: User;
};

export type Message = {
  id: string;
  receiver: boolean;
  sender: boolean;
  msg: {msg?: string; photo?: string};
  date: Date;
  user: User;
};

export const chatData: ChatData[] = [
  {
    id: 'u1',
    lastMsg: {msg: 'Hey, how are you?'},
    unreadMsgs: 2,
    lastMsgAt: new Date('2024-04-30T09:24:00'),
    user: users[0],
  },
  {
    id: 'u2',
    lastMsg: {msg: "Let's meet tomorrow"},
    unreadMsgs: 0,
    lastMsgAt: new Date('2024-04-30T08:15:00'),
    user: users[1],
  },
  {
    id: 'u3',
    lastMsg: {msg: ' ya elrab3 keafk?'},
    unreadMsgs: 5,
    lastMsgAt: new Date('2024-04-29T21:45:00'),
    user: users[2],
  },
  {
    id: 'u4',

    lastMsg: {msg: 'Can you call me?'},
    unreadMsgs: 0,
    lastMsgAt: new Date('2024-04-30T12:30:00'),
    user: users[3],
  },
  {
    id: 'u5',

    lastMsg: {photo: 'pic123.jpg'},
    unreadMsgs: 3,
    lastMsgAt: new Date('2024-04-30T14:20:00'),
    user: users[4],
  },
  {
    id: 'u6',

    lastMsg: {msg: "I'll send the files"},
    unreadMsgs: 4,
    lastMsgAt: new Date('2024-04-28T16:50:00'),
    user: users[5],
  },
  {
    id: 'u7',

    lastMsg: {msg: 'See you there'},
    unreadMsgs: 2,
    lastMsgAt: new Date('2024-04-27T19:30:00'),
    user: users[6],
  },
  {
    id: 'u8',

    lastMsg: {
      msg: 'See you there, to fuck the shit of you, and send nodes you little bitch',
    },
    unreadMsgs: 7,
    lastMsgAt: new Date('2024-04-30T11:05:00'),
    user: users[7],
  },
  {
    id: 'u9',

    lastMsg: {msg: 'All set for the weekend?'},
    unreadMsgs: 1,
    lastMsgAt: new Date('2024-04-30T18:40:00'),
    user: users[8],
  },
];

export const messages: Message[] = [
  {
    id: 'm1',
    receiver: true,
    sender: false,
    msg: {msg: 'Hello, how are you?'},
    date: new Date('2024-04-30T12:00:00'),
    user: users[0],
  },
  {
    id: 'm120',
    receiver: true,
    sender: false,
    msg: {msg: 'Hello, how are you? bro'},
    date: new Date('2024-04-30T12:00:00'),
    user: users[0],
  },
  {
    id: 'm1200',
    receiver: true,
    sender: false,
    msg: {msg: 'Hello, how are you? bro'},
    date: new Date('2024-04-30T12:00:00'),
    user: users[0],
  },
  {
    id: 'm2',
    receiver: false,
    sender: true,
    msg: {msg: "I'm good, thanks! And you?"},
    date: new Date('2024-04-30T12:01:00'),
    user: users[1],
  },
  {
    id: 'm20',
    receiver: false,
    sender: true,
    msg: {msg: 'Sunny day bro'},
    date: new Date('2024-04-30T12:01:00'),
    user: users[1],
  },
  // Repeating pattern for simplicity
  {
    id: 'm3',
    receiver: true,
    sender: false,
    msg: {msg: 'Doing great, thanks for asking!'},
    date: new Date('2024-04-31T12:02:00'),
    user: users[0],
  },
  {
    id: 'm4',
    receiver: false,
    sender: true,
    msg: {
      msg: 'Doing great, like your unfailthy mother:)) smdl;svmdlksmdvlskndvmlksdnvklsnvd lkdsnvklsdvn!',
    },
    date: new Date('2024-04-31T12:03:00'),
    user: users[1],
  },
  // Additional objects up to 20 entries
  {
    id: 'm5',
    receiver: true,
    sender: false,
    msg: {
      msg: "Let's meet tomorrow if you're free - Let's meet tomorrow if you're free Let's meet tomorrow if you're free Let's meet tomorrow if you're free",
    },
    date: new Date('2024-04-33T12:04:00'),
    user: users[0],
  },
  // ... Fill in more messages as needed up to 20
];
