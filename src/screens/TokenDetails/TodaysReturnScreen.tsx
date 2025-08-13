import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import React,{useRef} from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Images } from '../../assets/index'
import {BottomSheetUnified} from '../../components/BottomSheet'
import TodaysReturn, { TodaysReturnRef } from '../../components/TodaysReturn'

 const TodaysReturnScreen = ({navigation}: any) => {
  const translateY = useSharedValue(0);
   const sheetRef = useRef<TodaysReturnRef>(null);

  return (
      <GestureHandlerRootView>
        <View style={styles.container}>
              <Image
              source={Images.return}
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
        {/* <BottomSheetUnified screen="todaysReturn" translateY={translateY} /> */}
        {/* if error arises i will call uppar component */}
       <TodaysReturn ref={sheetRef} />
      </GestureHandlerRootView>
  )
}
export default TodaysReturnScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#080C4C'
  },
  image:{
    width: '60%',
    height: 220,
    position: 'absolute',
    marginTop: 40,
    marginHorizontal: 90, 
  },
  cross:{
    marginLeft: 5,
    marginTop: 10,
    width: 12,
    height: 16,
    fontWeight: '400',
    tintColor: 'white'
  },
  backborder:{
    // backgroundColor: 'grey',
    // borderWidth: 1,
    width: 25,
    marginLeft: 20,
    marginTop: 20,
    // borderRadius: 20,    
  }
})