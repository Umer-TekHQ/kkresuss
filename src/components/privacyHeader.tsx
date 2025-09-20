import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Images } from '../assets';
import { AppNavigatorParamList } from '../navigators/routeNames';
import { Colors } from '../theme/colors';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const PrivacyHeader = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  return (
    <View style={styles.customHeader}>
      <View style={styles.leftIcons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.backScreen} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.refresh} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images.whiteCross} style={styles.headerIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default PrivacyHeader;

const styles = StyleSheet.create({
  customHeader: {
    height: 65,
    backgroundColor: Colors.kresusBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerIcon: {
    marginLeft: 10
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
