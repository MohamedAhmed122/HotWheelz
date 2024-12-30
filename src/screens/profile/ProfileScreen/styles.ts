import {StyleSheet} from 'react-native';
import { COLORS } from 'styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  profileContainer: {
    padding: 20,
  },
  profileCard: {
    elevation: 0,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    alignSelf: 'flex-start',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#191F33',
  },
  bio: {
    marginTop: 20,
    color: '#464D61',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'white',
    margin: 10,
    width: 60,
    height: 60,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconText: {
    fontSize: 20,
  },
});


