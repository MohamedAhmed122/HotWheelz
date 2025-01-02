import Checkbox from 'common/checkbox';
import {AppInput} from 'common/input';
import ModalView from 'components/ModalView';
import PlacesAutoCompleteInput, {
  LocationType,
} from 'components/PlacesAutoCompelete';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {createMapEvent} from 'service/mapEvents/create-mapEvents';
import useStore from 'store';

export default function EventModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose(): void;
}) {
  const [text, setText] = useState('');
  const [location, setLocation] = useState<LocationType>();
  const [isAgreed, setIsAgreed] = useState(false);
  const {profile} = useStore();

  const onCreateEvent = async () => {
    if (profile) {
      const result = await createMapEvent(profile, {
        userLocation: {lat: location.lat, lng: location.lng},
        address: location.address,
        city: location.city,
        description: text,
        isJoinable: isAgreed,
        isSOS: false,
        title: '',
      });
      console.log(result, 'result');
    }
  };

  return (
    <ModalView
      title="Let's go for ride"
      onClose={onClose}
      visible={isVisible}
      onSubmitModal={() => onCreateEvent()}>
      <>
        <PlacesAutoCompleteInput onChangeLocation={setLocation} />

        <AppInput
          isMulti
          placeholder="Details"
          value={text}
          onChangeText={setText}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            label="Do you want other biker join you?"
            checked={isAgreed}
            onChange={checked => setIsAgreed(checked)}
          />
        </View>
      </>
    </ModalView>
  );
}

const styles = StyleSheet.create({
  descInput: {
    padding: 2,
    minHeight: 100,
    paddingTop: 10,
    borderRadius: 15,
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
});
