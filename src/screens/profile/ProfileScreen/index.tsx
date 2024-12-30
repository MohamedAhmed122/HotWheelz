import React from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
// import { useNavigation } from '@react-navigation/native';

import ProfileTabView from './components/profileTabs/ProfileTabView';
import {User, users} from 'static-data/users';

import {AppText} from 'common/text';
import AppAvatar from 'common/avatar';
import {COLORS} from 'styles';

const Profile: React.FC<any> = ({navigation, route}) => {
  const user = route.params?.user || users[12];

  const handleEditProfile = React.useCallback(
    () => navigation.navigate('editProfile'),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserProfile user={user} onEditProfile={handleEditProfile} />
        <ProfileTabView username={user.username} />
      </ScrollView>
    </SafeAreaView>
  );
};

interface UserProfileProps {
  user: User;
  onEditProfile: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({user, onEditProfile}) => (
  <View style={styles.profileContainer}>
    <View style={styles.profileCard}>
      <View style={styles.avatarSection}>
        <AppAvatar size={80} source={user.image} />
        <ProfileSocialLinks />
      </View>
      <View>
        <AppText style={styles.username}>{user.username}</AppText>
        <AppText style={styles.bio}>{user.bio}</AppText>
      </View>
      {/* <View style={styles.actions}>
        <AppButton
          title="Edit Profile"
          onPress={onEditProfile}
          style={styles.actionButton}
        />
        <AppButton
          title="Share Profile"
          onPress={() => {}}
          style={styles.actionButton}
        />
      </View> */}
    </View>
  </View>
);

const ProfileSocialLinks = () => {
  const onNavigateToInstagram = () =>
    Linking.openURL('https://www.instagram.com/mohameddesoukey98/');

  return (
    <View style={styles.socialLinksContainer}>
      <SocialIcon icon="🚴🏿‍♂️" onPress={() => {}} />
      <SocialIcon
        IconComponent={Icon}
        iconProps={{name: 'instagram', size: 29, color: COLORS.primary}}
        onPress={onNavigateToInstagram}
      />
    </View>
  );
};

const SocialIcon = ({
  onPress,
  icon,
  IconComponent,
  iconProps,
}: {
  onPress: () => void;
  icon?: string;
  IconComponent?: React.ComponentType<any>;
  iconProps?: object;
}) => (
  <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
    {IconComponent ? (
      <IconComponent {...iconProps} />
    ) : (
      <AppText style={{fontSize: 20}}>{icon}</AppText>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  profileContainer: {
    padding: 20,
  },
  profileCard: {
    elevation: 0,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  username: {
    alignSelf: 'flex-start',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#191F33',
  },
  bio: {
    marginTop: 20,
    color: '#464D61',
    // textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    margin: 4,
    backgroundColor: '#e5e5e5',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'white',
    margin: 10,
    width: 60,
    height: 60,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Profile;
