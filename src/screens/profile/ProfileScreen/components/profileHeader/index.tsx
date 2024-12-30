import {Image, Linking, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {AppText} from 'common/text';
import {COLORS} from 'styles';

import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';

export default function ProfileHeader() {
  const navigation = useNavigation<any>();

  const navigateToProfile = () => {
    // TODO: Add navigation logic
    // navigation.navigate(TabParams.profileStack, {
    //   screen: ProfileStackParams.bike,
    //   params: { id: '' },
    // });
  };

  const navigateToInstagram = () => {
    Linking.openURL('https://www.instagram.com/mohameddesoukey98/');
  };

  const navigateToChat = () => {
    // TODO: Add navigation logic
    // navigation.navigate(TabParams.chatStack, {
    //   screen: ChatStackParams.chat,
    //   params: { user: users[0] },
    // });
  };

  return (
    <>
      <Image
        source={require('../../../assets/cover2.jpg')}
        style={styles.coverImage}
      />
      <View style={styles.profileImageContainer} />
      <Image
        source={{
          uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
        }}
        style={styles.profileImage}
      />
      <View style={styles.profileDetailsContainer}>
        <AppText style={styles.profileName}>Mohamed Youssef</AppText>
        <AppText numberOfLines={2} style={styles.profileDescription}>
          I don't know about you, but I love cycling 🚴🏿‍♂️
        </AppText>

        <View style={styles.iconRow}>
          <ProfileIcon onPress={navigateToProfile} icon="🚴🏿‍♂️" />
          <ProfileIcon
            onPress={navigateToInstagram}
            IconComponent={Entypo}
            iconProps={{name: 'instagram', size: 29, color: COLORS.primary}}
          />
          <ProfileIcon
            onPress={navigateToChat}
            IconComponent={Ionicons}
            iconProps={{
              name: 'chatbox-ellipses',
              size: 29,
              color: COLORS.primary,
            }}
          />
        </View>
      </View>
    </>
  );
}

const ProfileIcon = ({
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
      <AppText>{icon}</AppText>
    )}
  </TouchableOpacity>
);
