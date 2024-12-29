import Checkbox from 'common/checkbox';
import {AppInput} from 'common/input';
import ModalView from 'components/ModalView';
import PlacesAutoCompleteInput from 'components/PlacesAutoCompelete';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GooglePlaceData} from 'react-native-google-places-autocomplete';
import Modal from 'react-native-modal';
import {COLORS} from 'styles';

export default function EventModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose(): void;
}) {
  const [text, setText] = useState('');
  const [location, setLocation] = useState<GooglePlaceData>();
  const [isAgreed, setIsAgreed] = useState(false);
  return (
    <ModalView
      title="Let's go for ride"
      onClose={onClose}
      visible={isVisible}
      onSubmitModal={onClose}>
      <>
        <PlacesAutoCompleteInput onChangeLocation={setLocation} />

        <AppInput
          placeholder="Details"
          inputContainerStyle={styles.descInput}
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
