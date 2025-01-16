import { theme } from './../../theme/index';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '90%',
    marginLeft: '5%',
    height: 60,
    borderRadius: 35,
    marginHorizontal: 10,
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    marginHorizontal: 10,
    textAlign: 'center',
  },

  pickerContainer: {
    width: '95%',
    marginLeft: '2.5%',
    backgroundColor: theme.colors.lightGray,
    height: 50,
    borderRadius: 25,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  pickerText: {
    marginLeft: 10,
    color: theme.colors.darkGray,
    fontSize: 18,
  },
  modalContainer: {
    marginTop: 30,
    flex: 1,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },

  colorInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorView: {
    height: 10,
    width: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginLeft: 5,
  },
});
