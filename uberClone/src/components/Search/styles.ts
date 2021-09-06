import { Platform } from 'react-native';

const styles = {
  container: {
    position: 'absolute',
    top: Platform.select({ ios: 60, android: 60 }),
    width: '100%',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 54,
    marginHorizontal: 10,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 54,
    margin: 0,
    marginBottom: 0,
    marginRight: 0,
    marginTop: 0,
    marginLeft: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
  },
  listView: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  description: {
    fontSize: 16,
  },
};

export default styles;
