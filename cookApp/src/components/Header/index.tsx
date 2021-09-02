import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export function Header() {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 3000 });
  }, []);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Feather name="arrow-left" color={theme.colors.brown} size={32} />

      <View>
        <Text style={styles.title}>Oriental Food</Text>

        <Text style={styles.subtitle}>Special Sushi</Text>
      </View>
    </Animated.View>
  );
}
