import React, {useCallback} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import ProfileTabView from './components/profileTabs/ProfileTabView';
import {User, users} from 'static-data/users';
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

type Props = NativeStackScreenProps<ProfileStackParamsList>;

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const user = users[12];

  const handleEditProfile = useCallback(
    () => navigation.navigate(ProfileStackParams.EditProfile, {userId: ''}),
    [navigation],
  );

  const navigateToChatRoom = useCallback(() => {
    navigation.navigate('Chat', {
      screen: ChatStackParams.ChatRoom,
      params: {userId: ''},
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserProfile
          user={user}
          onEditProfile={handleEditProfile}
          navigateToChatRoom={navigateToChatRoom}
        />
        <ProfileTabView username={user.username} />
      </ScrollView>
    </SafeAreaView>
  );
};

interface UserProfileProps {
  user: User;
  onEditProfile: () => void;
  navigateToChatRoom: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onEditProfile,
  navigateToChatRoom,
}) => (
  <View style={styles.profileContainer}>
    <View style={styles.profileCard}>
      <UserHeader
        user={user}
        onEditProfile={onEditProfile}
        navigateToChatRoom={navigateToChatRoom}
      />
      <UserDetails username={user.username} bio={user.bio} />
    </View>
  </View>
);

interface UserHeaderProps {
  user: User;
  onEditProfile: () => void;
  navigateToChatRoom: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  user,
  onEditProfile,
  navigateToChatRoom,
}) => (
  <View style={styles.avatarSection}>
    <AppAvatar size={80} source={user.image} />
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
