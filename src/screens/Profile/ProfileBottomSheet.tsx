import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Images } from '../../assets/index'
import BottomSheetProfileBottom from '../../components/BottomSheetProfileBottom'
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ProfileBottom = ({navigation}: any) => {
  return (
      <GestureHandlerRootView>
        <View style={styles.container}>
              <Image
              source={Images.prosImage}
              style={styles.image}
              />
              <TouchableOpacity onPress={() => navigation.goBack()} style={{zIndex:999}}>
              <View style={styles.backBorder}>
              <Image
                source={Images.backButton}
                style={styles.cross}
              />
              </View>
              </TouchableOpacity>
        </View>
        <BottomSheetProfileBottom />
        
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
    width: screenWidth * 0.08,
    height: screenWidth * 0.08,
  },
  backBorder:{
    width: screenWidth * 0.07,
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.025,
  }
})
