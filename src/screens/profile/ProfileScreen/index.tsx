import {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import ProfileTabView from './components/profileTabs/ProfileTabView';

import {AppText} from 'common/text';
import AppAvatar from 'common/avatar';
import {COLORS} from 'styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ChatStackParams,
  ProfileStackParams,
  ProfileStackParamsList,
} from 'navigation/types';
import {styles} from './styles';
import useStore from 'store';
import {Profile, getUserProfile} from 'service/profile';
import CreateProfileScreen from '../CreateProfileScreen';

type Props = NativeStackScreenProps<ProfileStackParamsList>;

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const {user: currentUser, updateProfile} = useStore();
  const [error, setError] = useState<string | undefined>();
  const [profile, setProfile] = useState<Profile | undefined>();

  const handleEditProfile = useCallback(
    () => navigation.navigate(ProfileStackParams.EditProfile, {userId: ''}),
    [navigation],
  );

  const navigateToChatRoom = useCallback(() => {
    // @ts-ignore
    navigation.navigate('Chat', {
      screen: ChatStackParams.ChatRoom,
      params: {userId: ''},
    });
  }, [navigation]);

  const handleGetUserProfile = () => {
    getUserProfile(currentUser.uid).then(res => {
      setProfile(res.data);
      res.data && updateProfile(res.data);
      setError(res.error);
    });
  };

  useEffect(() => {
    if (currentUser?.uid) {
      handleGetUserProfile();
    }
  }, [currentUser]);

  if (error === 'NOT_FOUND') {
    return <CreateProfileScreen getUserProfile={handleGetUserProfile} />;
  }
  if (error) {
    return <View>Error please try again Later</View>;
  }

  if (!profile) {
    return (
      <View>
        <AppText>loading...</AppText>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserProfile
          profile={profile}
          onEditProfile={handleEditProfile}
          navigateToChatRoom={navigateToChatRoom}
        />
        <ProfileTabView profile={profile} />
      </ScrollView>
    </SafeAreaView>
  );
};

interface UserProfileProps {
  profile: Profile;
  onEditProfile: () => void;
  navigateToChatRoom: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  profile,
  onEditProfile,
  navigateToChatRoom,
}) => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileCard}>
        <UserHeader
          profile={profile}
          onEditProfile={onEditProfile}
          navigateToChatRoom={navigateToChatRoom}
        />
        <UserDetails username={profile.username} bio={profile.bio} />
      </View>
    </View>
  );
};

interface UserHeaderProps {
  profile: Profile;
  onEditProfile: () => void;
  navigateToChatRoom: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  profile,
  onEditProfile,
  navigateToChatRoom,
}) => (
  <View style={styles.avatarSection}>
    <AppAvatar size={80} source={profile.photo} />
    <ProfileSocialLinks
      onEditProfile={onEditProfile}
      navigateToChatRoom={navigateToChatRoom}
    />
  </View>
);

interface UserDetailsProps {
  username: string;
  bio: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({username, bio}) => (
  <View>
    <AppText style={styles.username}>{username}</AppText>
    <AppText style={styles.bio}>{bio}</AppText>
  </View>
);

interface ProfileSocialLinksProps {
  onEditProfile: () => void;
  navigateToChatRoom: () => void;
}

const ProfileSocialLinks: React.FC<ProfileSocialLinksProps> = ({
  onEditProfile,
  navigateToChatRoom,
}) => (
  <View style={styles.socialLinksContainer}>
    <SocialIcon icon="🚴🏿‍♂️" onPress={navigateToChatRoom} />
    <SocialIcon
      IconComponent={Icon}
      iconProps={{name: 'edit', size: 24, color: COLORS.primary}}
      onPress={onEditProfile}
    />
  </View>
);

interface SocialIconProps {
  onPress: () => void;
  icon?: string;
  IconComponent?: React.ComponentType<any>;
  iconProps?: object;
}

const SocialIcon: React.FC<SocialIconProps> = ({
  onPress,
  icon,
  IconComponent,
  iconProps,
}) => (
  <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
    {IconComponent ? (
      <IconComponent {...iconProps} />
    ) : (
      <AppText style={styles.iconText}>{icon}</AppText>
    )}
  </TouchableOpacity>
);

export default ProfileScreen;
