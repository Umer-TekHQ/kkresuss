import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Images } from '../../assets/index'
import {BottomSheetUnified} from '../../components/BottomSheet'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ProfileBottom = ({navigation}: any) => {
  const translateY = useSharedValue(0);
  return (
      <GestureHandlerRootView>
        <View style={styles.container}>
              <Image
              source={Images.prosimage}
              style={styles.image}
              />
              <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backborder}>
              <Image
                source={Images.backarrow}
                style={styles.cross}
              />
              </View>
              </TouchableOpacity>
        </View>
        <BottomSheetUnified screen="profilebottom" translateY={translateY} />
        
      </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#080C4C',
  },
  image:{
    width: screenWidth * 0.45,
    height: screenHeight * 0.2,
    position: 'absolute',
    marginTop: screenHeight * 0.11,
    marginLeft: screenWidth * 0.33,
  },
  cross:{
    marginLeft: screenWidth * 0.013,
    fontSize: 20,
    marginTop: screenHeight * 0.006,
    fontWeight: '400',
    tintColor: 'white'
  },
  backborder:{
    width: screenWidth * 0.07,
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.025,
  }
})
