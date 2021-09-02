import { MotiImage } from 'moti';
import React from 'react';
import plateImg from '../../assets/plate.png';
import { styles } from './styles';

export function Plate() {
  return (
    <MotiImage
      style={styles.plate}
      source={plateImg}
      resizeMode="contain"
      from={{
        rotate: `100deg`,
        opacity: 0
      }}
      animate={{
        rotate: `0deg`,
        opacity: 1
      }}
      transition={{
        type: 'timing',
        duration: 2000
        // repeat: 3
        // loop: true
      }}
    />
  );
}
