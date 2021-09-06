import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import uberX from '../../assets/uberx.png';
import styles from './styles';

const Details: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular</Text>
      <Text style={styles.description}>Viagens baratas para o dia a dia</Text>
      <Image source={uberX} style={styles.image} />
      <Text style={styles.description}>UberX</Text>
      <Text style={styles.description}>R$6,00</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Solicitar UberX</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
