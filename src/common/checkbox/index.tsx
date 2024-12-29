import {AppText} from 'common/text';
import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from 'styles';

type CheckboxProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: number;
  color?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  size = 24,
  color = COLORS.primary,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handlePress = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}>
      <View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderColor: color,
            backgroundColor: isChecked ? color : 'transparent',
          },
        ]}>
        {isChecked && <Icon name="check" size={size * 0.6} color="#FFF" />}
      </View>
      <AppText style={styles.label}>{label}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export default Checkbox;
