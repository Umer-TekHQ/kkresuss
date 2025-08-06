import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView,TouchableOpacity} from 'react-native'
import { Images } from '../../assets' 
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { BottomSheetUnified } from '../../components/BottomSheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'


const { width, height } = Dimensions.get('window')

const AdvancedVerificationInfoScreen = () => {
    const translateY = useSharedValue(0);
    const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  return (
 
          <GestureHandlerRootView>
            <View style={styles.container}>
                  <Image
                  source={Images.vaulticon}
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
            <BottomSheetUnified screen="AdvanceVerification" translateY={translateY} />
            
          </GestureHandlerRootView>
  )
}

export default AdvancedVerificationInfoScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#080C4C'
  },
  image:{
    width: '60%',
    height: 160,
    position: 'absolute',
    marginTop: 100,
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
    width: 25,
    marginLeft: 20,
    marginTop: 20,
    
  }
})
