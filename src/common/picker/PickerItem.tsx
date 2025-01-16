import {TouchableOpacity, View} from 'react-native';

import styles from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from 'styles';
import {AppText} from 'common/text';
import AppAvatar from 'common/avatar';

interface PickerProps {
  label: string;
  onPress(): void;
  color?: string;
  icon?: string;
  image?: string;
  selected: boolean;
}

export const PickerItem: React.FC<PickerProps> = ({
  color,
  icon,
  onPress,
  image,
  label,
  selected,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, {backgroundColor: color ?? COLORS.gray}]}>
        {icon && <MaterialCommunityIcons name={icon} size={35} color="white" />}
        {image && <AppAvatar source={image} size={20} />}
        <AppText style={{marginLeft: 10}}>{label}</AppText>
        {selected && (
          <View style={{marginLeft: 'auto', marginRight: 10}}>
            <MaterialCommunityIcons name={'check'} size={25} color="green" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
