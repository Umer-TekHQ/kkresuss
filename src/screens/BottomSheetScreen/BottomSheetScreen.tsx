import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { Images } from '../../assets/index';
import BottomSheetExplore from '../../components/BottomSheetExplore';
import { Colors } from '../../theme/colors';

export const BottomSheetScreen = ({ navigation }: any) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={Images.trade1} style={styles.image} />

        <View style={{ zIndex: 9999 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.cancel} style={styles.cross} />
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheetExplore />

      <View style={styles.bottomOverlay}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Launch</Text>
          <Image source={Images.launchArrowUp} style={styles.uparrow} />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  image: {
    width: '100%',
    height: hp('45%'),
    position: 'absolute',
  },
  cross: {
    tintColor: 'white',
    width: wp('9%'),
    height: hp('5%'),
    marginLeft: 5,
    marginTop: 15,
  },
  backBorder: {
    marginLeft: 15,
    marginTop: 20,
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  bottomOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('10%'),
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: Colors.background,
  },
  bottomButton: {
    borderColor: Colors.downArrow,
    borderWidth: 1,
    paddingHorizontal: 135,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
  },
  bottomButtonText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: '500',
  },
  uparrow: {
    width: wp('3%'),
    height: hp('1.5%'),
    marginLeft: 8,
    marginTop: 5,
  },
});
