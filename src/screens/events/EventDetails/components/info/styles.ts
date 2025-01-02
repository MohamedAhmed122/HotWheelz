import {ScaledSheet} from 'react-native-size-matters';
import {COLORS} from 'styles';

export const coverStyles = ScaledSheet.create({
  background: {
    overflow: 'hidden',
    width: '100%',
    height: '200@mvs',
  },
  counterContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '15@mvs',
  },
  counterText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: '45@mvs',
    fontWeight: '600',
  },
  whiteText: {
    color: COLORS.white,
  },
});

export const infoStyle = ScaledSheet.create({
  whiteText: {
    color: COLORS.white,
  },
  dateSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10@mvs',
    marginHorizontal: '16@ms',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  priceContainer: {
    marginHorizontal: 10,
    width: '50@ms',
    height: '50@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: COLORS.primary,
    marginTop: 'auto',
    fontWeight: '700',
  },
  dateContainer: {
    width: '50@ms',
    height: '50@ms',
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '16@ms',
  },
  organizerText: {
    marginLeft: '10@ms',
    color: COLORS.darkGray,
    fontSize: 16,
  },
  datePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: '600',
  },
  infoContainer: {
    marginHorizontal: 20,
    marginTop: 8,
  },
  listContainer: {
    alignItems: 'flex-start',
  },
  listText: {
    fontWeight: '600',
  },
  scrollContainer: {
    paddingBottom: 16,
  },
});
