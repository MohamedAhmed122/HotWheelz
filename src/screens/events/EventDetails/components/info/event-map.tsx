import {View, Dimensions} from 'react-native';

import {ScaledSheet} from 'react-native-size-matters';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {events} from 'static-data/events';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppText} from 'common/text';
import {COLORS} from 'styles';
import {Fragment} from 'react/jsx-runtime';

const {width} = Dimensions.get('window');

const item = events[0];
export default function EventMap() {
  return (
    <Fragment>
      <View style={styles.descContainer}>
        <AppText style={styles.desc}>
          {item.description} I need to write some text for no reason I don't
          know what I am doing
        </AppText>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{width: width - 88, height: 150}}
            region={{
              latitude: 54.6784,
              longitude: 25.2865,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}>
            <Marker
              coordinate={{
                latitude: 54.6784,
                longitude: 25.2865,
              }}>
              <Icon name="location-on" color="red" size={35} />
            </Marker>
          </MapView>
        </View>
      </View>
    </Fragment>
  );
}

const styles = ScaledSheet.create({
  descContainer: {
    marginHorizontal: '24@ms',
    marginTop: '12@mvs',
  },
  desc: {
    fontSize: 15,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  mapContainer: {
    marginTop: '18@mvs',
    backgroundColor: 'white',
    alignItems: 'center',
    width: width - 48,
    paddingVertical: '20@mvs',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: '100@mvs',
  },
});
