import {View, ImageBackground, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {coverStyles as styles} from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from 'styles';
import {EventsStackParams, EventsStackParamsList} from 'navigation/types';
import CountdownTimer from './counter-down';
import {IOrganizedEvent} from 'service/organizedEvents';
import {FC} from 'react';

type Navigation = NativeStackNavigationProp<
  EventsStackParamsList,
  EventsStackParams
>;

type Props = {
  eventDetail: IOrganizedEvent;
};

export const EventCover: FC<Props> = ({eventDetail}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();

  const {startDate} = eventDetail;
  return (
    <ImageBackground
      source={require('assets/images/event-bg.png')}
      resizeMode="cover"
      style={styles.background}>
      <Pressable
        style={{marginTop: 5 + top, marginLeft: 20}}
        onPress={navigation.goBack}>
        <Icon name="arrowleft" size={24} color={COLORS.white} />
      </Pressable>
      <View style={styles.counterContainer}>
        <CountdownTimer date={startDate} />
      </View>
    </ImageBackground>
  );
};
