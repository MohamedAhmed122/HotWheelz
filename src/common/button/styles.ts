import {ScaledSheet} from 'react-native-size-matters';
import {COLORS} from '@styles/index';

const styles = ScaledSheet.create({
  container: {
    width: '90%',
    padding: 13,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    color: COLORS.white,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default styles;
