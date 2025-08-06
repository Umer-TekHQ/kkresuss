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
    // <View style={styles.container}>
      

      
    //   <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        
   
    //     <View style={styles.topSection}>
    //         <TouchableOpacity
    //            style={styles.leftIcon}
    //             activeOpacity={0.7}
    //             onPress={() => navigation.goBack()}
    //           >
    //             <Image source={Images.backscreen}  />
    //           </TouchableOpacity>
    //       <Image source={Images.vaulticon} style={styles.logoImage} />
    //     </View>

       
    //     <View style={styles.bottomSection}>
    //       <View style={styles.dragIndicator} />

    //       <Text style={styles.heading}>Why Add Advanced Verification?</Text>

    //       <Text style={styles.description}>
    //         Separate from the biometrics used by your phone, adding advanced verification{' '}
    //         <Text style={{ fontStyle: 'italic' }}>ensures an additional layer of protection</Text> when recovering your
    //         Kresus wallet, transferring to a new device, or updating sensitive security settings.
    //       </Text>

    //       {/* Tip Section */}
    //       <View style={styles.tipBox}>
    //         <Text style={styles.tipTitle}>✦ Is that you?</Text>
    //         <Text style={styles.tipText}>
    //           Advanced verification adds an additional layer of authentication to your Kresus wallet to ensure that
    //           only you are able to access your assets.
    //         </Text>
    //       </View>
    //     </View>
    //   </ScrollView>
    // </View>

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
  // container: {
  //   flex: 1,
  //   backgroundColor: '#010D2A',
  // },
  // topSection: {
  //   backgroundColor: '#081744',
  //   height: height * 0.50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // logoImage: {
  //   width: 310,
  //   height: 110,
  //   resizeMode: 'contain',
  // },
  // bottomSection: {
  //   backgroundColor: '#010D2A',
  //   borderTopLeftRadius: 22,
  //   borderTopRightRadius: 22,
  //   marginTop: -20,
  //   paddingHorizontal: 20,
  //   paddingTop: 24,
  //   flexGrow: 1,
  // },
  // dragIndicator: {
  //   alignSelf: 'center',
  //   width: 50,
  //   height: 4,
  //   backgroundColor: '#2D3F6F',
  //   borderRadius: 2,
  //   marginBottom: 20,
  // },
  // heading: {
  //   fontSize: 18,
  //   fontWeight: '700',
  //   color: 'white',
  //   marginBottom: 12,
  // },
  // description: {
  //   fontSize: 14,
  //   color: '#ADD2FD',
  //   lineHeight: 22,
  // },
  // tipBox: {
  //   backgroundColor: '#081744',
  //   padding: 12,
  //   borderRadius: 10,
  //   marginTop: 20,
  // },
  // tipTitle: {
  //   fontSize: 14,
  //   fontWeight: '600',
  //   color: 'white',
  //   marginBottom: 6,
  // },
  // tipText: {
  //   fontSize: 13,
  //   color: '#ADD2FD',
  //   lineHeight: 20,
  // },  leftIcon: {
  //   position: 'absolute',
  //   top: 20,
  //   left: 10,
  //   width: 35,
  //   height: 35,
  //   zIndex: 10,
  // },
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
    // backgroundColor: 'grey',
    // borderWidth: 1,
    width: 25,
    marginLeft: 20,
    marginTop: 20,
    // borderRadius: 20,    
  }
})
