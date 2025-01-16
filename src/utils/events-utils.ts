import {Joiner} from 'service/organizedEvents';

export const isJoinedToEvent = (joiners: Joiner[], userId: string) =>
  joiners.some(joiner => joiner.userId === userId);
