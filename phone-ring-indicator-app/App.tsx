import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Easing } from 'react-native-reanimated';

const _color = '#6E01EF';
const _size = 100;

export default function App() {
  return (
    <View style={[styles.center, { flex: 1 }]}>
      <StatusBar />
      <View style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map((index) => {
          return (
            <MotiView
              key={index}
              style={[StyleSheet.absoluteFillObject, styles.dot]}
              from={{ opacity: 0.7, scale: 1 }}
              animate={{
                opacity: 0,
                scale: 4
              }}
              transition={{
                type: 'timing',
                duration: 2000,
                easing: Easing.out(Easing.ease),
                delay: index * 400,
                repeatReverse: false,
                loop: true
              }}
            />
          );
        })}
        <Feather name="phone-outgoing" size={32} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _color
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
