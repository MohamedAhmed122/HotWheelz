import {COLORS} from '@styles/index';
import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    width: '95%',
    marginLeft: '2.5%',
    backgroundColor: COLORS.lightGray,
    height: 50,
    borderRadius: '12@s',
    padding: '10@s',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@vs',
    borderWidth: 1,
    borderColor: COLORS.darkGray,
  },

  inputText: {
    backgroundColor: 'transparent',
    width: 'auto',
    marginLeft: 20,
    color: COLORS.dark,
    fontSize: 18,
    flex: 1,
  },
  descInput: {
    padding: 2,
    minHeight: 100,
    paddingTop: 10,
    borderRadius: 15,
    alignItems: 'flex-start',
  },
});

export default styles;
