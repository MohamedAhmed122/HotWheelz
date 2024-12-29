import {COLORS} from '@styles/index';
import {ScaledSheet} from 'react-native-size-matters';

export const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'white',
    opacity: 0.9,
    margin: '7@mvs',
    height: '135@mvs',
    borderRadius: '12@mvs',
    padding: '10@mvs',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: '1.41@mvs',
    elevation: 2,
  },
  unselectedContainer: {
    opacity: 0.7,
    backgroundColor: 'lightgray',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: '10@mvs',
  },
  description: {
    marginVertical: '7@mvs',
    width: '200@ms',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distanceText: {
    fontSize: '13@s',
    fontWeight: '300',
  },
  chipText: {
    color: COLORS.primary,
  },
  mapCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
