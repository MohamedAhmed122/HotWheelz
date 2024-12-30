import {ScaledSheet} from 'react-native-size-matters';
import {COLORS} from 'styles';

export const styles = ScaledSheet.create({
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10@mvs',
  },

  line: {
    height: 1,
    backgroundColor: 'gray',
    width: '30%',
  },
  joinerText: {
    textAlign: 'center',
    width: '40%',
    color: COLORS.primary,
  },
  joinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    marginTop: '10@mvs',
    marginLeft: '18@ms',
  },
  avatar: {
    zIndex: 20,
    width: '45@ms',
    height: '45@ms',
    borderRadius: '27@ms',
    borderColor: COLORS.orange,
    borderWidth: 3,
  },
  showMoreContainer: {
    zIndex: -1,
    marginLeft: '-12@ms',
    marginTop: '10@mvs',
  },
  joinerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '20@ms',
    marginTop: '12@mvs',
  },
  joinerFooterText: {
    marginLeft: '35@ms',
    color: COLORS.darkGray,
  },
  showMoreText: {
    marginRight: '20@ms',
  },
});
