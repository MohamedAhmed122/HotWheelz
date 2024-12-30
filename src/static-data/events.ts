import {User, users} from './users';

export type EventType = {
  id: string;
  title: string;
  description: string;
  joined: number;
  isOnWatchList: false;
  user: User;
  joinedUsers: User[];
  address: string;
  date: string;
  maxCapacity: number;
};

export const events: EventType[] = [
  {
    id: 'e1',
    title: 'Tech Networking Event',
    description:
      'Join us for an evening of tech talks and networking with top industry professionals.',
    joined: 40,
    isOnWatchList: false,
    user: users[0],
    joinedUsers: users,
    address: '123 Tech Rd, Silicon Valley',
    date: '2024-05-20',
    maxCapacity: 100,
  },
  {
    id: 'e2',
    title: 'Startup Pitch Night',
    description:
      'Watch new startups pitch their companies to a panel of venture capitalists.',
    joined: 13,
    isOnWatchList: false,
    user: users[1],
    joinedUsers: [users[0], users[5], users[4]],
    address: '456 Innovate St, Startup City',
    date: '2024-06-15',
    maxCapacity: 50,
  },
  {
    id: 'e3',
    title: 'Outdoor Concert',
    description:
      'Experience an unforgettable night under the stars with great music and company.',
    joined: 25,
    isOnWatchList: false,
    user: users[2],
    joinedUsers: [users[9], users[8], users[7]],
    address: '789 Festival Ave, Music Town',
    date: '2024-07-30',
    maxCapacity: 150,
  },
  {
    id: 'e4',
    title: 'Art & Wine Tasting',
    description:
      'Explore exquisite art collections while tasting fine wines curated from around the world.',
    joined: 40,
    isOnWatchList: false,
    user: users[3],
    joinedUsers: [users[0], users[1], users[8], users[2]],
    address: '321 Gallery Blvd, Metro City',
    date: '2024-08-25',
    maxCapacity: 80,
  },
  {
    id: 'e5',
    title: 'Coding Workshop',
    description:
      'Hands-on coding workshop where you can learn and practice new programming languages.',
    joined: 7,
    isOnWatchList: false,
    user: users[4],
    joinedUsers: [users[1], users[3]],
    address: '654 Developer Way, Tech Town',
    date: '2024-09-10',
    maxCapacity: 30,
  },
];
