import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import logo from '../../assets/instagram.png';
import colors from '../../styles/colors';
import {
  HeartIcon,
  MessageCircleIcon,
  PlusSquareIcon,
} from '../../styles/icons';

const HeaderComponent: React.FC<any> = () => {
  return (
    <View style={styles.Container}>
      <Image source={logo} />
      <View style={styles.ActionList}>
        <TouchableOpacity
          onPress={() => {
            console.log('plus');
          }}
          style={styles.Icon}
        >
          <PlusSquareIcon />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log('favorites');
          }}
          style={styles.Icon}
        >
          <HeartIcon />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log('profile');
          }}
          style={styles.Icon}
        >
          <MessageCircleIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
    borderBottomColor: colors.headerBackground,
    borderBottomWidth: 2,
    paddingHorizontal: 20,
  },
  ActionList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  Icon: {
    marginLeft: 14,
  },
});

export default HeaderComponent;
