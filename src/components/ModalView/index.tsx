import {AppButton} from 'common/button';
import {AppText} from 'common/text';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import {mvs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from 'styles';

type Props = {
  modalStyle?: StyleProp<ViewStyle>;
  title: string;
  onClose(): void;
  visible: boolean;
  onSubmitModal?(): void;
  children: JSX.Element;
};

export default function ModalContainer({
  modalStyle,
  title,
  onClose,
  children,
  visible,
  onSubmitModal,
}: Props) {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.8}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <AppText fontFamily="RobotoBold" style={styles.title}>
            {title}
          </AppText>
          <Pressable onPress={onClose}>
            <Icon name="cancel" size={24} color={COLORS.darkGray} />
          </Pressable>
        </View>
        <>{children}</>
        {onSubmitModal && (
          <AppButton
            style={styles.button}
            title="Submit"
            onPress={onSubmitModal}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 14,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 16,
  },
  title: {
    color: COLORS.primary,
    fontSize: 19,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },
  button: {
    marginBottom: mvs(45),
  },
});
