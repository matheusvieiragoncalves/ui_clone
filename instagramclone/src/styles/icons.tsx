import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import colors from './colors';

interface IProps {
  name?: string;
  size?: number;
  color?: string;
  style?: any;
}

const iconDefaultConfig = {
  size: 30,
  color: colors.iconColor,
};

export const PlusSquareIcon = (props: IProps) => (
  <Feather name="plus-square" {...iconDefaultConfig} {...props} />
);

export const HeartIcon = (props: IProps) => (
  <Feather name="heart" {...iconDefaultConfig} {...props} />
);

export const MessageCircleIcon = (props: IProps) => (
  <Feather name="message-circle" {...iconDefaultConfig} {...props} />
);
