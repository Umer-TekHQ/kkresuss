import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Images } from '../../assets/index';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import BottomSheetExplore from '../../components/BottomSheetExplore'



export const BottomSheetScreen = ({ navigation }: any) => {
  const translateY = useSharedValue(0);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={Images.trade1} style={styles.image} />
        <View style={{zIndex: 9999}}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <View style={styles.backborder}>
            <Image source={Images.whitecross} style={styles.cross} />
          </View>
        </TouchableOpacity>
        </View>
        </View>

      <BottomSheetExplore/>

      <View style={styles.bottomOverlay}>
        <TouchableOpacity
          style={styles.bottomButton}
        >
          <Text style={styles.bottomButtonText}>Launch </Text>
          <Image
            source={Images.launcharrowup}
            style={styles.uparrow}
          />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070807",
  },
  image: {
    width: "100%",
    height: hp("45%"),
    position: "absolute",
  },
  cross: {
    tintColor: "white",
    width: wp('9'),
    height: hp('5%'),
    },
  backborder: {
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
    borderTopWidth: 0.5,
    borderColor: 'blue',
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('10%'),
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: '#10132C'
  },
  bottomButton: {
    borderColor: '#4898F3',
    borderWidth: 1,
    paddingHorizontal: 135,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row'
  },
  bottomButtonText: {
    color: "white",
    fontSize: wp("4%"),
    fontWeight: '500'
  },
  uparrow:{
    width: wp('3%'),
    height: hp('1.5%'),
    marginLeft: 8,
    marginTop: 5,
  },
});
