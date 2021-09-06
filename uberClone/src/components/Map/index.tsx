import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import MapView from 'react-native-maps';
import Directions from '../Directions';
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
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
    title: '',
  });

  const mapViewRef = useRef<any>();

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

  const handleLocationSelected = (data: any, { geometry }: any) => {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;

    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  };

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
            ref={mapViewRef}
            zoomControlEnabled
          >
            {destination.latitude !== 0 && (
              <Directions
                destination={destination}
                origin={region}
                onReady={(result: any) => {
                  mapViewRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: 50,
                      left: 50,
                      top: 50,
                      bottom: 50,
                    },
                  });
                }}
              />
            )}
          </MapView>
          <Search onLocationSelected={handleLocationSelected} />
        </>
      )}
    </View>
  );
};

export default Map;
