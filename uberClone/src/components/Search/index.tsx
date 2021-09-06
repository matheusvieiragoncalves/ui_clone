import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styles from './styles';

interface IProps {
  onLocationSelected: (data: any, details: any) => void;
}

const Search: React.FC<IProps> = ({ onLocationSelected }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Para onde?"
      onPress={onLocationSelected}
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
