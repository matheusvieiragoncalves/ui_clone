import React, { useEffect, useState } from 'react';
import { Animated, Image, ImageBackground, StyleSheet } from 'react-native';

interface IProps {
  smallSource: string;
  source: string;
  aspectRatio: number;
  shouldLoad: boolean;
}

const ImageAnimated = Animated.createAnimatedComponent(Image);

const LazyImage: React.FC<IProps> = ({
  smallSource,
  source,
  aspectRatio,
  shouldLoad,
}) => {
  const [loaded, setLoaded] = useState(false);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (!shouldLoad) return;

    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, [shouldLoad]);

  const handlerAnimate = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      source={{ uri: smallSource }}
      style={[styles.Image, { aspectRatio: aspectRatio }]}
      resizeMode="contain"
      blurRadius={2}
    >
      {loaded && (
        <ImageAnimated
          source={{ uri: source }}
          style={[styles.Image, { aspectRatio: aspectRatio, opacity: opacity }]}
          resizeMode="contain"
          onLoadEnd={handlerAnimate}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: '100%',
  },
});

export default LazyImage;
