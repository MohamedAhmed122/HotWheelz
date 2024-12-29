import {User, users} from './users';

export type Biker = {
  id: string;
  latitude: number;
  longitude: number;
  text: string;
  user: User;
  joinable: boolean;
  isSOS: boolean;
  miles: number;
};

export const bikers: Biker[] = [
  {
    id: 'u1',
    latitude: 54.68811486939455,
    longitude: 25.27497189254693,
    text: 'is cycling and looking for partner, wanna join',
    miles: 8,
    joinable: true,
    isSOS: false,
    user: users[0],
  },
  {
    id: 'u2',
    latitude: 54.6872,
    longitude: 25.2872,
    text: 'is cycling and looking for partner, wanna join',
    miles: 11,
    joinable: false,
    isSOS: false,
    user: users[1],
  },
  {
    id: 'u3',
    latitude: 54.6899,
    longitude: 25.2699,
    text: 'is working Bolt on his bike',
    miles: 6.7,
    joinable: true,
    isSOS: false,
    user: users[2],
  },
  {
    id: 'u4',
    latitude: 54.689,
    longitude: 25.259,
    text: 'is working Bolt on his bike',
    miles: 15,
    joinable: false,
    isSOS: true,
    user: users[3],
  },
  {
    id: 'u6',
    latitude: 54.679,
    longitude: 25.279,
    text: 'is cycling and looking for partner, wanna join',
    miles: 9.2,
    joinable: false,
    isSOS: false,
    user: users[4],
  },
  {
    id: 'u5',
    latitude: 54.669,
    longitude: 25.279,
    text: 'is cycling and looking for partner, wanna join',
    miles: 16,
    joinable: true,
    isSOS: false,
    user: users[5],
  },
];
