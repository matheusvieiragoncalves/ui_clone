import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import MapView from 'react-native-maps';
import Search from '../Search';
import mapDarkModeStyles from './mapDarkModeStyles';
import styles from './styles';

const Map: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        setRegion({ ...region, latitude, longitude });

        setLoading(false);
      },
      () => {
        Alert.alert(
          'Location Error',
          'Não foi possível localizar a posição atual do usuário'
        );
      },
      {
        timeout: 5000, // Tempo maximo para busca
        enableHighAccuracy: true, // Alta precisão GPS
        maximumAge: 1000, // Realiza intervalos de 1 segunda para busca a nova localização
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View />
      ) : (
        <>
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation
            loadingEnabled
            customMapStyle={mapDarkModeStyles}
          />
          <Search />
        </>
      )}
    </View>
  );
};

export default Map;
