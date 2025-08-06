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
              source={Images.cancel}
              style={styles.cross}
              />
              </View>
              </TouchableOpacity>
                            <View style={styles.launch}>
                <TouchableOpacity style={styles.launch}>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                    Launch <Image source={Images.launcharrow} style={styles.launchbtn}/>
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
  backborder:{
    // backgroundColor: 'grey',
    // borderWidth: 1,
    // width: 35,
    marginLeft: 20,
    marginTop: 20,
    // borderRadius: 20,    
  },
  launch:{
    position: 'static',
    bottom: 0,
    width: '100%',
    height: 500,
    backgroundColor: 'lightblue',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
    launchbtn: {
    width: 10,
    height: 10,
    marginLeft: 10,
    tintColor: 'white',
  },
    launchBtn: {
    backgroundColor: '#0a0a23',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: `center`,
    marginHorizontal: 20,
    borderRadius: 25,
    borderColor: '#4898F3',
    borderWidth: 1.5,
    marginTop: 100,
  },
})
