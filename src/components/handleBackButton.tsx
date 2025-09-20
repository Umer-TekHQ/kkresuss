import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const HeaderBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
      <Image source={Images.backScreen} style={styles.backIconSmall} />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;

const styles = StyleSheet.create({
  backBtn: {},
  backIconSmall: {
    tintColor: Colors.white,
    width: 35,
    height: 35,
  },
});
