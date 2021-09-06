import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IProps {
  name?: string;
  size?: number;
  color?: string;
  style?: any;
}

const iconDefaultConfig = {
  size: 30,
  color: '#000',
};

export const ClockIcon = (props: IProps) => (
  <AntDesign name="clockcircleo" {...iconDefaultConfig} {...props} />
);

export const BackArrowIcon = (props: IProps) => (
  <AntDesign name="arrowleft" {...iconDefaultConfig} {...props} />
);

export const RoadIcon = (props: IProps) => (
  <FontAwesome name="road" {...iconDefaultConfig} {...props} />
);

export const MyLocationIcon = (props: IProps) => (
  <MaterialIcons name="my-location" {...iconDefaultConfig} {...props} />
);

export const LocationIcon = (props: IProps) => (
  <MaterialIcons name="location-pin" {...iconDefaultConfig} {...props} />
);

export const StartRouteIcon = (props: IProps) => (
  <FontAwesome name="location-arrow" {...iconDefaultConfig} {...props} />
);
