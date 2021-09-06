import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';
import markerImage from '../../assets/marker.png';
import { BackArrowIcon } from '../../global/styles/icons';
import Details from '../Details';
import Directions from '../Directions';
import Search from '../Search';
import mapDarkModeStyles from './mapDarkModeStyles';
import styles from './styles';

Geocoder.init('AIzaSyAbFUaWmzEHZwffrql9rEwehV38qeUP4Yw');

const INITIAL_DESTINATION = {
  latitude: 0,
  longitude: 0,
  title: '',
};

const Map: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });

  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState(INITIAL_DESTINATION);

  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentAddress, setCurrentAddress] = useState('');

  const mapViewRef = useRef<any>();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;

        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(','));

        setCurrentAddress(location);

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

  const handleBack = () => {
    setDestination(INITIAL_DESTINATION);
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
              <>
                <Directions
                  destination={destination}
                  origin={region}
                  onReady={(result: any) => {
                    setDistance(Math.floor(result.distance));
                    setDuration(Math.floor(result.duration));
                    setTimeout(() => {
                      mapViewRef.current.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                          right: 50,
                          left: 50,
                          top: 50,
                          bottom: 350,
                        },
                      });
                    }, 500);
                  }}
                />
                <Marker
                  coordinate={destination}
                  anchor={{ x: 0, y: 0 }}
                  image={markerImage}
                  style={styles.marker}
                >
                  <View style={styles.locationBox}>
                    <Text style={styles.locationText}>{destination.title}</Text>
                  </View>
                </Marker>

                <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                  <View style={styles.locationBox}>
                    <View style={styles.locationInfoBox}>
                      <Text style={styles.locationInfoText}>{distance}</Text>
                      <Text style={styles.locationInfoTextSmall}>Km</Text>
                    </View>

                    <View style={styles.locationInfoBox}>
                      <Text style={styles.locationInfoText}>{duration}</Text>
                      <Text style={styles.locationInfoTextSmall}>Min</Text>
                    </View>

                    <Text style={styles.locationText}>{currentAddress}</Text>
                  </View>
                </Marker>
              </>
            )}
          </MapView>
          {destination.latitude !== 0 ? (
            <>
              <TouchableOpacity onPress={handleBack} style={styles.buttonBack}>
                <BackArrowIcon color="#ddd" />
              </TouchableOpacity>
              <Details
                distance={distance}
                duration={duration}
                destination={destination.title}
                origin={currentAddress}
              />
            </>
          ) : (
            <Search onLocationSelected={handleLocationSelected} />
          )}
        </>
      )}
    </View>
  );
};

export default Map;
