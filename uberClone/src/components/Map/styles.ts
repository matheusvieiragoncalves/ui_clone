import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {},
  locationBox: {
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',

    marginTop: Platform.select({
      ios: 20,
      android: 12,
    }),

    marginLeft: Platform.select({
      ios: 0,
      android: 0,
    }),
  },
  locationText: {
    marginVertical: 8,
    marginHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  locationInfoBox: {
    backgroundColor: '#222',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 2,
  },
  locationInfoText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  locationInfoTextSmall: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default styles;
