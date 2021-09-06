import { PixelRatio, Platform } from 'react-native';

export const getPixelSize = (pixels: number) => {
  return Platform.select({
    ios: pixels,
    android: PixelRatio.getPixelSizeForLayoutSize(pixels),
  });
};
