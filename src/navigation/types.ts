type NO_PARAMS = undefined;

export enum AuthStackParams {
  Login = 'Login',
  Register = 'Register',
}

export enum EventsStackParams {
  EventsList = 'EventsList',
  EventDetails = 'EventDetails',
}

export enum ProfileStackParams {
  Profile = 'UserProfile',
  EditProfile = 'EditProfile',
  CreateProfile = 'CreateProfile',
  OtherProfile = 'OtherProfiles',
}

export enum ChatStackParams {
  ChatList = 'ChatList',
  ChatRoom = 'ChatRoom',
}

export enum MapStackParams {
  Map = 'Map',
}

export type AuthStackParamsList = {
  [AuthStackParams.Login]: NO_PARAMS;
  [AuthStackParams.Register]: NO_PARAMS;
};

export type EventsStackParamsList = {
  [EventsStackParams.EventsList]: NO_PARAMS;
  [EventsStackParams.EventDetails]: {eventId: string};
};

export type ProfileStackParamsList = {
  [ProfileStackParams.Profile]: NO_PARAMS;
  [ProfileStackParams.EditProfile]: {userId};
  [ProfileStackParams.CreateProfile]: NO_PARAMS;
  [ProfileStackParams.OtherProfile]: {userId: string};
};

export type ChatStackParamsList = {
  [ChatStackParams.ChatList]: NO_PARAMS;
  [ChatStackParams.ChatRoom]: {userId: string};
};

export type MapStackParamsList = {
  [MapStackParams.Map]: NO_PARAMS;
};
