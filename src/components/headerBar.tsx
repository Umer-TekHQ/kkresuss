import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const ICON_SIZE = Dimensions.get('window').width * 0.08;
const USERNAME_FONT = Dimensions.get('window').width * 0.04;

const HeaderBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images.backButton} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[styles.editText, { fontSize: USERNAME_FONT }]}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  icon: {
    width: ICON_SIZE, 
    height: ICON_SIZE 
  },
  editText: {
    color: Colors.white,
    marginTop: 5,
  },
});
