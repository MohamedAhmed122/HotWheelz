import {Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';

import Icon from 'react-native-vector-icons/Entypo';

import Geocoder from 'react-native-geocoding';

// import {GooglePlaceData} from 'react-native-google-places-autocomplete';

import SosModal from '../models/SosModal';
import EventModal from '../models/EventModal';
import {Biker} from 'static-data/bikers';
import {COLORS} from 'styles';
import React = require('react');
import {styles} from './styles';
// import {users} from 'static-data/users';
// import PlacesAutoComplete from './places-auto-complete';

Geocoder.init('AIzaSyACCMN-X9DexzrTdlpjSj1LfGnlIXqsNqo');

export default function MapButtons({
  onAddNewLocation,
}: {
  onAddNewLocation(biker: Biker): void;
}) {
  const [isSosModalVisible, setIsSosModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  // const [eventCoords, setEventCoords] = useState<{
  //   latitude: number;
  //   longitude: number;
  // }>();

  // const convertLocationToCoord = () => {
  //   if (userLocationInput?.description) {
  //     Geocoder.from(userLocationInput.description)
  //       .then((json) => {
  //         const location = json.results[0].geometry.location;
  //         console.log(location.lat, location.lng);
  //         setEventCoords({ latitude: location.lat, longitude: location.lng });
  //       })
  //       .catch((error) => console.warn(error));
  //   }
  // };

  // useEffect(() => {
  //   if (userLocationInput?.description) {
  //     console.log(userLocationInput?.description, 'userLocationInput?.description');
  //     convertLocationToCoord();
  //   }
  // }, [userLocationInput?.description]);

  // const onSubmitCreateNewEvent = () => {
  //   setIsCreateModalVisible(false);
  //   setIsSosModalVisible(false);
  //   console.log(eventCoords?.latitude, eventCoords?.longitude);
  //   onAddNewLocation({
  //     id: Date.now().toLocaleString(),
  //     latitude: eventCoords?.latitude || 54.18811486939455,
  //     longitude: eventCoords?.longitude || 25.57497189254693,
  //     text,
  //     user: users[Math.floor(Math.random() * 12) + 1],
  //     joinable: isSoS ? false : checked,
  //     isSOS: isSoS,
  //     miles: Math.floor(Math.random() * 20) + 1,
  //   });
  //   setText('');
  // };

  const onModalOpen = (isEvent?: boolean) => {
    if (isEvent) {
      setIsCreateModalVisible(true);
    } else {
      setIsSosModalVisible(true);
    }
  };

  return (
    <React.Fragment>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.sosButton]}
          onPress={() => onModalOpen()}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onModalOpen(true)}>
          <Icon name="plus" size={35} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <SosModal
        isVisible={isSosModalVisible}
        onClose={() => setIsSosModalVisible(false)}
      />
      <EventModal
        isVisible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
      />
    </React.Fragment>
  );
}
