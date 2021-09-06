import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  ClockIcon,
  LocationIcon,
  MyLocationIcon,
  RoadIcon,
  StartRouteIcon,
} from '../../global/styles/icons';
import styles from './styles';

interface IProps {
  duration: number;
  distance: number;
  destination: string;
  origin: string;
}

const Details: React.FC<IProps> = ({
  duration,
  distance,
  destination,
  origin,
}) => {
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    setMinutes(duration % 60);
    setHours(Math.floor(duration / 60));
  }, [duration]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Viagem:</Text>

      <View style={styles.infoBox}>
        <MyLocationIcon />
        <Text style={styles.infoBoxText}>{origin}</Text>
      </View>

      <View style={styles.infoBox}>
        <LocationIcon />
        <Text style={styles.infoBoxText}>{destination}</Text>
      </View>

      <View style={styles.infoBox}>
        <ClockIcon />
        <Text style={styles.infoBoxText}>
          {hours > 0 && `${hours} Horas e`} {minutes} Minutos
        </Text>
      </View>

      <View style={[styles.infoBox, { borderBottomWidth: 0 }]}>
        <RoadIcon />
        <Text style={styles.infoBoxText}>{distance} Km</Text>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.5}>
        <StartRouteIcon color="#fff" />
        <Text style={styles.buttonText}>Inicial Viagem</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
