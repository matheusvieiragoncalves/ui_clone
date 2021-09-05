import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import MapView from 'react-native-maps';
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
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View />
      ) : (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          loadingEnabled
          customMapStyle={mapDarkModeStyles}
        />
      )}
    </View>
  );
};

export default Map;
