import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image,} from 'react-native'
import Background from '../../components/Background'
import AppButton from '../../components/AppButton'
import { Images } from '../../assets'
import SettingBottomSheet from '../../components/SettingBottomSheet'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'


const { width, height } = Dimensions.get('window')

  const SettingScreen = () => {

    
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const [isSheetOpen, setIsSheetOpen] = useState(true)

  return (
    <View style={{ flex: 1 , backgroundColor:'#0B0B49'}}>
      <Background showContent hideBottomImages={false} showLogo={false}
       containerHeight={height * 0.50}
      >
      
       <TouchableOpacity
                 style={styles.leftIcon}
                 activeOpacity={0.7}
                 onPress={() => navigation.goBack()}
               >
                 <Image source={Images.backscreen} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>


        <Image source={Images.vaulticon} style={styles.logo} />

      
        <View style={styles.contentWrapper}>
          <Text style={styles.heading}>Subscribe Now to{'\n'}Kresus Pro</Text>
          <Text style={styles.subText}>
            Subscribe now and receive $10K of{'\n'}asset insurance coverage.
          </Text>
        </View>

      
        <View style={styles.buttonWrapper}>
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
    top: 74,
    alignSelf: 'center',
    width: width * 0.20,
    height: height * 0.05,
    resizeMode:'contain'
  },
  contentWrapper: {
    position:"absolute",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: height * 0.20 ,
    gap: 12,
  },
  heading: {
    fontSize: 30,
    fontWeight: '600', 
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 38,
  },
  subText: {
    fontSize: 19,
    color: '#ADD2FD',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: height * 0.01 - 30,
    width: '100%',
    alignItems: 'center',
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
})
