import React, { useState } from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,Dimensions,KeyboardAvoidingView,Platform,ScrollView,ToastAndroid} from 'react-native'
import Background from '../../components/Background'
import OTPInputBox from '../../components/OTPInputBox'
import CheckboxRow from '../../components/CheckboxRow'
import SecondaryButton from '../../components/SecondaryButton'
import { Images } from '../../assets'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAppSelector } from '../../store/hooks'
import { userCodeVerify } from '../../utils/api'


const { width, height } = Dimensions.get('window')

export const OtpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
 //const route = useRoute<RouteProp<AppNavigatorParamList, 'Otp'>>()
 //const token = route?.params?.token

  const email = useAppSelector(state => state.user.email)

  const [acceptTerms, setAcceptTerms] = useState(false)
  const [keepUpdated, setKeepUpdated] = useState(false)
  const [otpStarted, setOtpStarted] = useState(false)


  return (
    <View style={{ flex: 1 }}>
      <Background showContent hideBottomImages={false} showLogo={false}>
         <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >

          <View style={styles.wrapper}>
          
            <TouchableOpacity
              style={styles.leftIcon}
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Image source={Images.backscreen} style={{ position:'absolute',width: 35, height: 35, left:15, }} />
            </TouchableOpacity>

           
            <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
            <TouchableOpacity>            
              <Image source={Images.comment} style={styles.commentIcon} />
              </TouchableOpacity>

        
            <Text style={styles.heading}>Check Your Email</Text>

            {otpStarted && <Text style={styles.subHeading}>and spam too</Text>}

          
            <OTPInputBox onStartTyping={() => setOtpStarted(true)} 
               onComplete={() => navigation.navigate('OtpSuccess')}
                //               onComplete={async (code: string) => {
                //   try {
                //     const result = await userCodeVerify(code, token);

                //     // ✅ Check API response
                //     if (!result?.success) {
                //       ToastAndroid.show(result?.message || 'Wrong OTP', ToastAndroid.SHORT);
                //       return;
                //     }
                //     console.log('OTP verified:', result);
                //     navigation.navigate('OtpSuccess');
                //   } catch (error: any) {
                //     const msg = typeof error === 'string' ? error : 'Something went wrong';
                //     ToastAndroid.show(msg, ToastAndroid.SHORT);
                //   }
                // }}
              />

           
            <View style={styles.infoWrapper}>
              <Text style={styles.infoText}>Security code sent to</Text>
              <Text style={styles.emailText}>{email}</Text>
            </View>

           
            <View style={styles.resendWrapper}>
              <SecondaryButton label="Resend Code" onPress={() => {}} />
            </View>

       
            <View style={styles.divider} />

          
            <View style={styles.checkContainer}>
           
          <CheckboxRow
            isChecked={acceptTerms}
             onToggle={() => setAcceptTerms(!acceptTerms)} 


            hasLink={true}
            prefixText="Accept the"
            linkText="terms & conditions"
          />

              <CheckboxRow
                isChecked={keepUpdated}
                onToggle={() => setKeepUpdated(!keepUpdated)}
                 prefixText="Keep me up to date with marketing emails"
              />
            </View>
          </View>

          
        </KeyboardAvoidingView> 
  
      </Background>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: height * 0.03,
    justifyContent: 'flex-start',
  },
  leftIcon: {
    position: 'absolute',
    top: 70,
    left: 0,
    width: 40,
    height: 40,
    zIndex: 10,
  },
  logo: {
    position: 'absolute',
    top: 45,
    alignSelf: 'center',
    width: width * 0.3,
    height: height * 0.12,
  },
  commentIcon: {
    position: 'absolute',
    top: 70,
    right: 0,
    width: 35,
    height: 35,
  },
  heading: {
    marginTop: height * 0.2, 
    fontSize: 30,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    height: 38,
  },
  subHeading: {
    marginTop: height * 0.006,
    fontSize: 15,
    lineHeight: 19,
    color: '#ADD2FD',
    textAlign: 'center',
  },
  infoWrapper: {
    marginTop: height * 0.10,
  },
  infoText: {
    fontSize: 14,
    color: '#ADD2FD',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 14,
    color: '#ADD2FD',
    textAlign: 'center',
    marginTop: height * 0.01,
  },
  resendWrapper: {
    marginTop: height * 0.028,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ADD2FD33',
    marginTop: height * 0.035,
    marginBottom: height * 0.025,
  },
  checkContainer: {
    width: '100%',
    gap: 12,
    paddingLeft: 2,
  },scrollContent: {
  flexGrow: 1,
  justifyContent: 'flex-start',
},

})
