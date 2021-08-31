import React from 'react';
import { Text, View } from 'react-native';
import colors from '../../styles/colors';

const Home: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
      }}
    >
      <Text>Olá home</Text>
    </View>
  );
};

export default Home;
