import {ScaledSheet} from 'react-native-size-matters';
import {COLORS} from 'styles';

export const styles = ScaledSheet.create({
  textInput: {
    width: '95%',
    marginLeft: '2.5%',
    backgroundColor: COLORS.gray,
    minHeight: 50,
    borderRadius: '15@s',
    padding: '10@s',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@vs',
    fontSize: 18,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sosButton: {
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: COLORS.danger,
    shadowColor: COLORS.danger,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginTop: 500,
  },
  sosText: {
    color: COLORS.danger,
    fontWeight: '900',
    fontSize: 15,
  },
});
