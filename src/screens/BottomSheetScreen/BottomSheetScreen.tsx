import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetUnified } from '../../components/BottomSheet'
import { Images } from '../../assets/index';



export const BottomSheetScreen = ({navigation}: any) => {
  const translateY = useSharedValue(0);
  return (
      <GestureHandlerRootView>
        <View style={styles.container}>
              <Image
              source={Images.trade1}
              style={styles.image}
              />
              <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backborder}>
              <Image
              source={Images.crossoverlay}
              style={styles.cross}
              />
              </View>
              </TouchableOpacity>
                            <View style={styles.launch}>
                <TouchableOpacity style={styles.launch}>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                    Launch <Image source={Images.backarrow} style={styles.launchbtn}/>
                    </Text>
                </TouchableOpacity>
              </View>
        </View>
      <BottomSheetUnified screen="explore" translateY={translateY} />
      </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#070807'
  },
  image:{
    width: '100%',
    height: 300,
    position: 'absolute',
  },
  cross:{
    color: 'white',
    marginLeft: 5,
    fontSize: 25,
    fontWeight: '700',
    tintColor: 'white',
    
  },
  launch:{},
  launchbtn:{},
  backborder:{
    // backgroundColor: 'grey',
    // borderWidth: 1,
    // width: 35,
    marginLeft: 20,
    marginTop: 20,
    // borderRadius: 20,    
  }
})
