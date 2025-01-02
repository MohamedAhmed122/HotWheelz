import {AppInput} from 'common/input';

import ModalView from 'components/ModalView';
import PlacesAutoCompleteInput, {
  LocationType,
} from 'components/PlacesAutoCompelete';
import {useState} from 'react';

export default function SosModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose(): void;
}) {
  const [text, setText] = useState('');
  const [location, setLocation] = useState<LocationType>();
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
          isMulti
          value={text}
          onChangeText={setText}
        />
        {/* <View style={{marginBottom: 60}} /> */}
      </>
    </ModalView>
  );
}
