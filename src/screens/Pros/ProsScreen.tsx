import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Images } from '../../assets/index'
import BottomSheetPro  from '../../components/BottomSheetPro'

export const ProsScreen = ({navigation}: any) => {
  const translateY = useSharedValue(0);
  return (
      <GestureHandlerRootView>
        <View style={styles.container}>
              <Image
              source={Images.prosimage}
              style={styles.image}
              />
              <View style={{zIndex: 9999}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backborder}>
              <Image
                source={Images.backarrow}
                style={styles.cross}
              />
              </View>
              </TouchableOpacity>
              </View>
        </View>
        <BottomSheetPro/>
        
      </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#080C4C'
  },
  image:{
    width: '60%',
    height: '27%',
    position: 'absolute',
    marginTop: 70,
    alignSelf: 'center',
    marginLeft: 15,
  },
  cross:{
    // marginLeft: 5,
    marginTop: 10,
    width: 10,
    height: 14,
    fontWeight: '400',
    tintColor: 'white',

  },
  backborder:{
    width: 25,
    marginLeft: 18,
    marginTop: 20,
  }
})
