import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { Colors } from '../../theme/colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'

import { Images } from '../../assets' 
import { BottomSheetUnified } from '../../components/BottomSheet'
import { AppNavigatorParamList } from '../../navigators/routeNames'


  const AdvancedVerificationInfoScreen = () => {
      const translateY = useSharedValue(0);
      const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
    return (
          <GestureHandlerRootView>
            <View style={styles.container}>
                  <Image
                  source={Images.vaultIcon}
                  style={styles.image}
                  />
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View style={styles.backBorder}>
                  <Image
                    source={Images.backButton}
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
    backgroundColor: Colors.kresusBlue
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
    width: 20,
    height: 30,
    fontWeight: '400',
    tintColor: Colors.white
  },
  backBorder:{
    width: 25,
    marginLeft: 20,
    marginTop: 20,
    
  }
})
