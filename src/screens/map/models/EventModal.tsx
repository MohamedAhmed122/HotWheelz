import Checkbox from 'common/checkbox';
import {AppInput} from 'common/input';
import ModalView from 'components/ModalView';
import PlacesAutoCompleteInput, {
  LocationType,
} from 'components/PlacesAutoCompelete';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useEventMap} from './useEventMap';
import {AppText} from 'common/text';

export default function EventModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose(): void;
}) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<LocationType>();
  const [isJoinable, setIsJoinable] = useState(false);
  const {onCreateEventMap, isLoading, error} = useEventMap('EVENT', onClose);

  const onEventCreationSuccess = () => setDescription('');

  const onHandleEventCreation = async () => {
    await onCreateEventMap(
      description,
      location,
      isJoinable,
      '',
      onEventCreationSuccess,
    );
  };

  return (
    <ModalView
      title="Let's go for ride"
      onClose={onClose}
      visible={isVisible}
      onSubmitModal={() => onHandleEventCreation()}
      isLoading={isLoading}>
      <>
        <PlacesAutoCompleteInput onChangeLocation={setLocation} />

        <AppInput
          isMulti
          placeholder="Details"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            label="Do you want other biker join you?"
            checked={isJoinable}
            onChange={checked => setIsJoinable(checked)}
          />
        </View>
        {error && <AppText style={styles.errorText}>{error}</AppText>}
      </>
    </ModalView>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});
