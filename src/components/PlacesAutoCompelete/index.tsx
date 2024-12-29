import 'react-native-get-random-values';

import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
} from 'react-native-google-places-autocomplete';

import {ScaledSheet} from 'react-native-size-matters';
import {SuggestionRow} from './SuggestionRow';
import {COLORS} from 'styles';

// AIzaSyD8kMX3r5_zP5DAEpynVpa2Xa5ihSrz1vg

const GOOGLE_API_KEY = 'AIzaSyACCMN-X9DexzrTdlpjSj1LfGnlIXqsNqo';

export default function PlacesAutoCompleteInput({
  onChangeLocation,
  placeholder = 'Location',
}: {
  onChangeLocation(state: GooglePlaceData): void;
  placeholder?: string;
}) {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      enablePoweredByContainer={false}
      currentLocation={true}
      currentLocationLabel={placeholder}
      styles={{
        textInput: styles.textInput,
      }}
      onPress={(data, details = null) => {
        console.log('a7a...');
        console.log(JSON.stringify({data, details}));
        onChangeLocation(data);
        console.log(JSON.stringify(details?.geometry?.location));
      }}
      textInputProps={{
        leftIcon: {type: 'font-awesome', name: 'chevron-left'},
        errorStyle: {color: 'red'},
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
        components: 'country:lt',
        location: '54.68811486939455, 25.27497189254693',

        radius: '15000', //15 km
        enablePoweredByContainer: false,
      }}
      suppressDefaultStyles
      renderRow={item => <SuggestionRow item={item?.description} />}
    />
  );
}

const styles = ScaledSheet.create({
  textInput: {
    width: '95%',
    marginLeft: '2.5%',
    backgroundColor: COLORS.gray,
    minHeight: 50,
    borderRadius: '15@s',
    padding: '10@s',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@vs',
    fontSize: 18,
    color: COLORS.black,
  },
});
// import React, { useState, useEffect, useRef } from 'react';
// import 'react-native-get-random-values';
// import { GooglePlacesAutocomplete, GooglePlaceData } from 'react-native-google-places-autocomplete';
// import { ScaledSheet } from 'react-native-size-matters';
// import { SuggestionRow } from './SuggestionRow';
// import { COLORS } from 'styles';
// import RNLocation from 'react-native-location';

// const GOOGLE_API_KEY = 'AIzaSyACCMN-X9DexzrTdlpjSj1LfGnlIXqsNqo';

// export default function PlacesAutoCompleteInput({
//   onChangeLocation,
//   placeholder = 'Location',
// }: {
//   onChangeLocation(state: GooglePlaceData): void;
//   placeholder?: string;
// }) {
//   const [currentLocation, setCurrentLocation] = useState<string | null>(null);
//   const autoCompleteRef = useRef<GooglePlacesAutocomplete>(null);

//   // Fetch current location and set it as the initial value
//   useEffect(() => {
//     const fetchCurrentLocation = async () => {
//       try {
//         RNLocation.configure({
//           distanceFilter: 5,
//           allowsBackgroundLocationUpdates: false,
//         });

//         const permission = await RNLocation.requestPermission({
//           ios: 'whenInUse',
//           android: { detail: 'coarse' },
//         });

//         if (!permission) {
//           console.error('Location permission denied');
//           return;
//         }

//         const location = await RNLocation.getLatestLocation({ timeout: 5000 });
//         if (location) {
//           const { latitude, longitude } = location;

//           // Fetch the address for the current coordinates
//           const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
//           );
//           const data = await response.json();

//           if (data.results && data.results.length > 0) {
//             const formattedAddress = data.results[0].formatted_address;
//             setCurrentLocation(formattedAddress);

//             // Set the value in the input field
//             autoCompleteRef.current?.setAddressText(formattedAddress);
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching current location:', err);
//       }
//     };

//     fetchCurrentLocation();
//   }, []);

//   return (
//     <GooglePlacesAutocomplete
//       ref={autoCompleteRef}
//       placeholder={placeholder}
//       enablePoweredByContainer={false}
//       currentLocation={true}
//       currentLocationLabel={placeholder}
//       styles={{
//         textInput: styles.textInput,
//       }}
//       onPress={(data, details = null) => {
//         console.log('Selected location:', JSON.stringify({ data, details }));
//         onChangeLocation(data);
//       }}
//       textInputProps={{
//         leftIcon: { type: 'font-awesome', name: 'chevron-left' },
//         errorStyle: { color: 'red' },
//       }}
//       query={{
//         key: GOOGLE_API_KEY,
//         language: 'en',
//         components: 'country:lt',
//       }}
//       suppressDefaultStyles
//       renderRow={item => <SuggestionRow item={item?.description} />}
//     />
//   );
// }

// const styles = ScaledSheet.create({
//   textInput: {
//     width: '95%',
//     marginLeft: '2.5%',
//     backgroundColor: COLORS.gray,
//     minHeight: 50,
//     borderRadius: '15@s',
//     padding: '10@s',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: '20@vs',
//     fontSize: 18,
//     color: COLORS.black,
//   },
// });
