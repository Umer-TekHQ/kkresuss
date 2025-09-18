import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image,} from 'react-native'

import { Images } from '../../assets'
import AppButton from '../../components/AppButton'
import Background from '../../components/Background'
import SettingBottomSheet from '../../components/SettingBottomSheet'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { Colors } from '../../theme/colors'

const { width, height } = Dimensions.get('window')

  const SettingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const [isSheetOpen, setIsSheetOpen] = useState(true)
  return (
    <View style={styles.container}>
      <Background showContent hideBottomImages={false} showLogo={false}
       containerHeight={height * 0.50}
      >
      
       <TouchableOpacity
          style={styles.leftIcon}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          >
        <Image source={Images.backButton} style={styles.back} />
      </TouchableOpacity>
        <Image source={Images.vaultIcon} style={styles.logo} />
        <View style={styles.contentWrapper}>
          <Text style={styles.heading}>Subscribe Now to{'\n'}Kresus Pro</Text>
          <Text style={styles.subText}>
            Subscribe now and receive $10K of{'\n'}asset insurance coverage.
          </Text>
        </View>
        <View  style={styles.subscribeButton}>
          <AppButton
            label="Subscribe — $9.99/mo."
            onPress={() => {}}
            width="68%"
          />
        </View>  
      </Background> 
      <SettingBottomSheet onClose={() => setIsSheetOpen(false)} />
    </View>
  )
}
export default SettingScreen

const styles = StyleSheet.create({
  container:{
    flex: 1 , 
    backgroundColor:Colors.background
  },
  back:{
    width: 35, 
    height: 35,
  },
 leftIcon: {
    position: 'absolute',
    top: 70,
    left: 10,
    width: 35,
    height: 35,
    zIndex: 10,
  },
  backImage: {
    width: 35,
    height: 35,
   
  },
  logo: {
    position: 'absolute',
    top: 78,
    alignSelf: 'center',
    width: width * 0.20,
    height: height * 0.06,
    resizeMode:'contain'
  },
  contentWrapper: {
    position:"absolute",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: height * 0.18 ,
    gap: 20,
  },
  heading: {
    fontSize: 28,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 36,
    fontFamily: 'PlayfairDisplay-Bold'
  },
  subText: {
    fontSize: 16,
    color: Colors.lightblue,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
  },
sheetContainer: {
  flex: 1,
  width: '100%',
  padding: 20,
},
  subscribeButton:{
    bottom: -150
  }
})
