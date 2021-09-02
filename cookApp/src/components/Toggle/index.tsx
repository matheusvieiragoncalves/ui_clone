import { Feather } from '@expo/vector-icons';
import { AnimatePresence, MotiView, useAnimationState } from 'moti';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export function Toggle() {
  const [toggleIsOpen, setToggleIsOpen] = useState(false);

  const toggleAnimationState = useAnimationState({
    closed: {
      height: 70
    },
    open: {
      height: 170
    }
  });

  const handleOpenToggle = () => {
    setToggleIsOpen(true);
    toggleAnimationState.transitionTo('open');
  };

  const handleCloseToggle = () => {
    setToggleIsOpen(false);
    toggleAnimationState.transitionTo('closed');
  };

  return (
    <MotiView style={styles.container} state={toggleAnimationState}>
      <Pressable onPressIn={handleOpenToggle} onPressOut={handleCloseToggle}>
        {toggleIsOpen ? (
          <AnimatePresence>
            <MotiView
              from={{
                rotate: '0deg',
                opacity: 0
              }}
              animate={{
                rotate: '90deg',
                opacity: 1
              }}
              transition={{
                type: 'spring'
              }}
            >
              <Feather name="x" color={theme.colors.white} size={26} />
            </MotiView>
          </AnimatePresence>
        ) : (
          <MotiView
            from={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: [
                {
                  value: 0,
                  type: 'timing'
                },
                {
                  value: 1.1,
                  type: 'spring'
                },
                {
                  value: 1,
                  type: 'timing'
                }
              ],
              opacity: 1
            }}
          >
            <Feather name="tag" color={theme.colors.white} size={26} />
          </MotiView>
        )}
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.label}>Calories</Text>

        <Text style={styles.value}>150</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Weight</Text>

        <Text style={styles.value}>190g</Text>
      </View>
    </MotiView>
  );
}
