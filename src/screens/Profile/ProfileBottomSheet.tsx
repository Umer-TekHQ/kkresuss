import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Images } from '../../assets/index'
import {BottomSheetUnified} from '../../components/BottomSheet'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { useNavigation } from '@react-navigation/native'


export const ProfileBottom = ({navigation}: any) => {
//   const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
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
    width: '45%',
    height: 160,
    position: 'absolute',
    marginTop: 85,
    marginLeft: 120,
    // alignItems: 'center'
    // marginHorizontal: 90, 
    // marginLeft: 10,
  },
  cross:{
    marginLeft: 5,
    fontSize: 20,
    marginTop: 5,
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
