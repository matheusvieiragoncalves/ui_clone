import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styles from './styles';

const Search: React.FC = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Para onde?"
      onPress={(data, details) => {
        console.log(data, details);
      }}
      onFail={(err) => {
        console.log('erro: ', err);
      }}
      query={{
        key: 'AIzaSyAbFUaWmzEHZwffrql9rEwehV38qeUP4Yw',
        language: 'pt',
        components: 'country:br',
      }}
      textInputProps={{
        autoCapitalize: 'none',
        autoCorrect: false,
      }}
      fetchDetails
      enablePoweredByContainer={false}
      styles={styles}
    />
  );
};

export default Search;
