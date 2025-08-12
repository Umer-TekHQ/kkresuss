import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Animated, Keyboard, Image, TouchableOpacity, Platform,} from 'react-native'
import Background from '../../components/Background'
import AppInput from '../../components/AppInput'
import WelcomeStyles from '../../styles/WelcomeScreen.styles'
import { Images } from '../../assets'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AppButton from '../../components/AppButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setEmail } from '../../store/slices/userSlice'


const { height } = Dimensions.get('window')


const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}



const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const [keyboardVisible, setKeyboardVisible] = useState(false)
const [isEmailValid, setIsEmailValid] = useState(false)

  
  const dispatch = useAppDispatch()
  const userEmail = useAppSelector(state => state.user.email)

  const logoScale = useRef(new Animated.Value(1)).current
  const logoTranslateY = useRef(new Animated.Value(0)).current
  const inputTranslateY = useRef(new Animated.Value(0)).current
  const [emailText, setEmailText] = useState(userEmail || '')

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)

      Animated.timing(inputTranslateY, {
        toValue: height * 0.01, 
        duration: 300,
        useNativeDriver: true,
      }).start()
    })

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)

      Animated.timing(inputTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    })

  
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 0.6,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoTranslateY, {
        toValue: -100,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()

    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [])

  const handleEmailChange = (text: string) => {
    setEmailText(text)
   setIsEmailValid(isValidEmail(text))

  }

  const handleContinue = () => {
    dispatch(setEmail(emailText))
    navigation.navigate('Otp')
  }

//server off rightnow

// const handleContinue = async () => { 
//   try {
//     const result = await userVerify(emailText)
//     console.log('Verification success:', result)
//     dispatch(setEmail(emailText))
//     navigation.navigate('Otp', { token: result.token })
//   } 
//   catch (error: any) {
//   const msg = error?.response?.data?.message || 'User not found';
//   ToastAndroid.show(msg, ToastAndroid.SHORT);
// }
//}

  return (
    <View style={{ flex: 1 }}>
      <Background showContent showLogo={false} hideBottomImages={keyboardVisible} showLostAccess={!keyboardVisible}>
      
        <Animated.Image
          source={Images.logo}
          style={[
            WelcomeStyles.logo,
            {
              transform: [
                { scale: logoScale },
                { translateY: logoTranslateY },
              ],
            },
          ]}
          resizeMode="contain"
        />

      
        <Animated.View
          style={[
            WelcomeStyles.content,
            { transform: [{ translateY: inputTranslateY }] },
          ]}
        >
          {!keyboardVisible && (
            <>
              <Text style={WelcomeStyles.heading}>Your Base</Text>
              <Text style={WelcomeStyles.heading}>Control Center.</Text>
              <Text style={WelcomeStyles.subheading}>
                Earn and Explore with heightened security.
              </Text>
              <Text style={WelcomeStyles.caption}>Sign Up or Log In</Text>
            </>
          )}

        <View >
          <AppInput
            placeholder="Enter Email"
            value={emailText}
            onChangeText={handleEmailChange}
            onClear={() => setEmailText('')}
              isElevated={keyboardVisible}
          />
        </View>
        </Animated.View>

       
        {keyboardVisible && (
          <TouchableOpacity
            onPress={Keyboard.dismiss}
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              zIndex: 10,
              top: height * 0.1,
            }}
          >
            <Image
              source={Images.down}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {keyboardVisible && (
          <AppButton
            label="Continue"
            onPress={handleContinue}
            disabled={!isEmailValid} 
          />
        )}
      </Background>
    </View>
  )
}
 
export default WelcomeScreen