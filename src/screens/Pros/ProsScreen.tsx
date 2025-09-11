import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View, } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Images } from '../../assets/index'
import BottomSheetPro  from '../../components/BottomSheetPro'

export const ProsScreen = ({navigation}: any) => {
  return (
      <GestureHandlerRootView>
        <View style={styles.container}>
              <Image
              source={Images.prosImage}
              style={styles.image}
              />
              <View style={{zIndex: 9999}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backBorder}>
              <Image
                source={Images.backArrow}
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
    marginTop: 10,
    width: 10,
    height: 14,
    fontWeight: '400',
    tintColor: 'white',

  },
  backBorder:{
    width: 25,
    marginLeft: 18,
    marginTop: 20,
  }
})
