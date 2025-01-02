import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {COLORS} from 'styles';
import Icon from 'react-native-vector-icons/Feather';

type ImagePickerProps = {
  imageUri?: string;
  setImageUri(value?: string): void;
};

const ImagePicker: React.FC<ImagePickerProps> = ({imageUri, setImageUri}) => {
  // const [imageUri, setImageUri] = useState<string | undefined>();
  const handleOpenGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <TouchableOpacity onPress={handleOpenGallery}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.pickImage, styles.image]}
          onPress={handleOpenGallery}>
          <Icon name="image" size={34} color={COLORS.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 100,
  },
  pickImage: {
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImagePicker;
