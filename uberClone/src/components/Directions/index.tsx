import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

interface IProps {
  destination: {
    latitude: number;
    longitude: number;
  };
  origin: {
    latitude: number;
    longitude: number;
  };
  onReady: (result: any) => void;
}

const Directions: React.FC<IProps> = ({ destination, origin, onReady }) => {
  return (
    <MapViewDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey="AIzaSyAbFUaWmzEHZwffrql9rEwehV38qeUP4Yw"
      strokeWidth={4}
      strokeColor="#02AEFC"
    />
  );
};

export default Directions;
