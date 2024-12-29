import {AppText} from 'common/text';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from 'styles';

const SuggestionRow = ({item}: {item: string}) => (
  <View style={styles.row}>
    <View style={styles.iconContainer}>
      <Entypo name={'location-pin'} size={30} />
    </View>
    <AppText>{item}</AppText>
  </View>
);

const Row = ({item, onPress}: {item: string; onPress(): void}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Entypo name={'location-pin'} size={30} />
      </View>
      <AppText>{item}</AppText>
    </TouchableOpacity>
  );
};

export {Row, SuggestionRow};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: '80%',
    marginLeft: '1.5%',
  },
  iconContainer: {
    backgroundColor: COLORS.gray,
    padding: 7,
    borderRadius: 10,
    marginRight: 10,
  },
});
