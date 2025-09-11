import React,{useRef} from 'react'
import { Image, StyleSheet, TouchableOpacity, View, } from 'react-native'
import { Colors } from '../../theme/colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Images } from '../../assets/index'
import TodaysReturn, { TodaysReturnRef } from '../../components/TodaysReturn'

 const TodaysReturnScreen = ({navigation}: any) => {
   const sheetRef = useRef<TodaysReturnRef>(null);

  return (
      <GestureHandlerRootView>
        <View style={styles.container}>
              <Image
              source={Images.return}
              style={styles.image}
              />
              <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backBorder}>
              <Image
                source={Images.backArrow}
                style={styles.cross}
              />
              </View>
              </TouchableOpacity>
        </View>
       <TodaysReturn ref={sheetRef} />
      </GestureHandlerRootView>
  )
}
export default TodaysReturnScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Colors.kresusBlue
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
    tintColor: Colors.white
  },
  backBorder:{
    width: 25,
    marginLeft: 20,
    marginTop: 20,
  }
})