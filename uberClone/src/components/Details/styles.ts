import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 300,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#222',
  },

  button: {
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
    borderRadius: 4,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    width: '100%',
  },

  infoBoxText: {
    fontSize: 14,
    marginHorizontal: 4,
  },
});

export default styles;
