import {AppInput} from 'common/input';

import ModalView from 'components/ModalView';
import PlacesAutoCompleteInput, {
  LocationType,
} from 'components/PlacesAutoCompelete';
import {useState} from 'react';
import {useEventMap} from './useEventMap';
import {AppText} from 'common/text';
import {StyleSheet} from 'react-native';

export default function SosModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose(): void;
}) {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState<LocationType>();
  const {onCreateEventMap, isLoading, error} = useEventMap('SOS', onClose);

  const onSosSuccess = () => {
    setTitle('');
    setDescription('');
  };

  const onHandleCreateSos = async () => {
    await onCreateEventMap(description, location, true, title, onSosSuccess);
  };

  return (
    <ModalView
      title="What is your emergency?"
      visible={isVisible}
      onClose={onClose}
      onSubmitModal={onHandleCreateSos}
      isLoading={isLoading}>
      <>
        <AppInput
          placeholder="what's the problem?"
          value={title}
          onChangeText={setTitle}
          inputContainerStyle={{padding: 2, borderRadius: 14}}
        />
        <PlacesAutoCompleteInput onChangeLocation={setLocation} />
        <AppInput
          placeholder="More details"
          isMulti
          value={description}
          onChangeText={setDescription}
        />

        {error && <AppText style={styles.errorText}>{error}</AppText>}
      </>
    </ModalView>
  );
}
const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});
