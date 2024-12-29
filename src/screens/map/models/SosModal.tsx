import {AppInput} from 'common/input';

import ModalView from 'components/ModalView';
import PlacesAutoCompleteInput from 'components/PlacesAutoCompelete';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {GooglePlaceData} from 'react-native-google-places-autocomplete';

export default function SosModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose(): void;
}) {
  const [text, setText] = useState('');
  const [location, setLocation] = useState<GooglePlaceData>();
  return (
    <ModalView
      title="What is your emergency?"
      visible={isVisible}
      onClose={onClose}
      onSubmitModal={() => {}}>
      <>
        <AppInput
          placeholder="what's the problem?"
          inputContainerStyle={{padding: 2, borderRadius: 14}}
        />
        <PlacesAutoCompleteInput onChangeLocation={setLocation} />
        <AppInput
          placeholder="More details"
          inputContainerStyle={styles.descInput}
          value={text}
          onChangeText={setText}
        />
        {/* <View style={{marginBottom: 60}} /> */}
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
});
