import React, { useState,useEffect } from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,Dimensions,KeyboardAvoidingView,Platform,ScrollView,ToastAndroid, Keyboard} from 'react-native'
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
import { OtpInput } from 'react-native-otp-entry';
const { width, height } = Dimensions.get('window')

export const OtpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
 const route = useRoute<RouteProp<AppNavigatorParamList, 'Otp'>>()
 const token = route?.params?.token


 //for keuyboard open useefeect and this us state used
const [keyboardVisible, setKeyboardVisible] = useState(true);
const [keyboardHeight, setKeyboardHeight] = useState(0);
  const email = useAppSelector(state => state.user.email)

  const [acceptTerms, setAcceptTerms] = useState(false)
  const [keepUpdated, setKeepUpdated] = useState(false)
  const [otpStarted, setOtpStarted] = useState(false)

    useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) =>{
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardVisible(true)});

    const hideSub = Keyboard.addListener('keyboardDidHide', () =>{
     setKeyboardHeight(0);
    setKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Background showContent hideBottomImages={keyboardVisible} showLogo={false} > 
         <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >

          <View style={styles.wrapper}>
          
            <View style={styles.topIcons}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Image source={Images.backscreen} style={styles.backIcon} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={Images.comment} style={styles.commentIcon} />
            </TouchableOpacity>
          </View>

           
            <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
         

        
            <Text style={styles.heading}>Check Your Email</Text>

            {otpStarted && <Text style={styles.subHeading}>and spam too</Text>}

             <OtpInput
              numberOfDigits={6}
              onTextChange={() => setOtpStarted(true)}
              hideStick={true}
              //   onFilled={(code) => {
              //   console.log("Entered OTP:", code);
              //   navigation.navigate('OtpSuccess'); 
              // }}
                onFilled={async (code) => {
                  try {
                    const result = await userCodeVerify(code, token);
                    console.log("Raw verify result:", JSON.stringify(result));

                    const msg = result?.message || result?.data?.message || "";

                    if (msg.toLowerCase() !== "code verified successfully") {
                      console.log("Verification failed");
                      ToastAndroid.show(msg || "Wrong OTP", ToastAndroid.SHORT);
                      return;
                    }

                    console.log("Verification success, navigating now...");
                    ToastAndroid.show("OTP verified", ToastAndroid.SHORT);

                    setTimeout(() => {
                      navigation.navigate("OtpSuccess");
                    }, 500);
                  } catch (error: any) {
                    console.log("Error during verification:", error);
                    const msg = typeof error === "string" ? error : "Something went wrong";
                    ToastAndroid.show(msg, ToastAndroid.SHORT);
                  }
                }}
              // theme={{
              //   containerStyle: { marginTop: height * 0.03, alignItems: 'center' },
              //   pinCodeContainerStyle: styles.box,
              //    pinCodeTextStyle: styles.digit,
              //   focusedPinCodeContainerStyle: styles.activeBox,
              // }}
          theme={{
            //container margin set krna abhi 
                  pinCodeContainerStyle: styles.box,
                  focusedPinCodeContainerStyle: styles.activeBox,
                  pinCodeTextStyle: {
                    ...styles.digit,
                    color: 'white',
                  },
                  placeholderTextStyle: {
                    ...styles.digit,
                    color: '#FFFFFF55', 
                  },
                  filledPinCodeContainerStyle: {
                    borderColor: '#CEB55A', 
                  },
                 
                }}

            />

          
            {/* <OTPInputBox onStartTyping={() => setOtpStarted(true)} 
                      
            onComplete={async (code: string) => {
            try {
              const result = await userCodeVerify(code, token);
              console.log("Raw verify result:", JSON.stringify(result));
              const msg = result?.message || result?.data?.message || "";

              if (msg.trim().toLowerCase() !== "code verified successfully") {
                ToastAndroid.show(msg || "Wrong OTP", ToastAndroid.SHORT);
                return;
              }

              ToastAndroid.show("OTP verified", ToastAndroid.SHORT);
              console.log("OTP verified:", result);

              setTimeout(() => {
                navigation.navigate("OtpSuccess");
              }, 500);

            } catch (error: any) {
              console.log(" Verify error:", error);
              const msg = typeof error === "string" ? error : "Something went wrong";
              ToastAndroid.show(msg, ToastAndroid.SHORT);
            }
          }}
          /> */}

           <View style={{ marginBottom: keyboardHeight ? keyboardHeight + 80 : 0 }}>
        
            <View style={styles.infoWrapper}>
              <Text style={styles.infoText}>Security code sent to</Text>
              <Text style={styles.emailText}>{email}</Text>
            </View>

           
            <View style={styles.resendWrapper}>
              <SecondaryButton label="Resend Code" onPress={() => {}} />
            </View>
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
const BOX_SIZE = width / 8;
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

   // top: 70,
   // right: 0,
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
topIcons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'absolute',
  top: 70,
  left: 0,
  right: 0,
  paddingHorizontal: 15,
  zIndex: 10,
},
backIcon: {
  width: 35,
  height: 35,
},
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE * 1.4,
    borderWidth: 1,
    borderColor: '#0734A9',
    borderRadius: 12,
    backgroundColor: 'rgba(8, 12, 76, 0.66)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBox: {
    borderColor: '#CEB55A',
    borderWidth: 1.5,
  },
  digit: {
    fontSize: BOX_SIZE * 0.8,
    textAlign: 'center',
    fontWeight: '300',
    color: '#FFFFFF',
  },
})

