import { useNavigation } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState ,useEffect,useCallback} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  BackHandler
} from 'react-native'

import { Images } from '../../assets'
import AppButton from '../../components/AppButton'
import AppInput from '../../components/AppInput'
import Background from '../../components/Background'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setUsername } from '../../store/slices/userSlice'


const { width, height } = Dimensions.get('window')
export const UserNameScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const dispatch = useAppDispatch()
  const savedUsername = useAppSelector(state => state.user.username)
useFocusEffect(
  useCallback(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      })
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => backHandler.remove()
  }, [navigation])
)
  useEffect(() => {
  const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true))
  const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false))
  return () => {
    showSub.remove()
    hideSub.remove()
  }
}, [])
const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [username, setUsernameLocal] = useState(savedUsername || '')
  const isCharTyped = username.length > 0
  const isLengthTooLong = username.length > 20
  const isCharValid = /^[a-zA-Z0-9]*$/.test(username)  
  const isLengthValid = username.length >= 8 && username.length <= 20
  const getCharRuleColor = () => {
    if (!isCharTyped) return '#ADD2FD'
    return isCharValid ? '#FFFFFF' : 'red'
  }
  const getLengthRuleColor = () => {
    if (!isCharTyped) return '#ADD2FD'
    if (isLengthTooLong) return 'red'
    return isLengthValid ? '#FFFFFF' : '#ADD2FD'
  }
const getCharSymbol = () => {
  if (!isCharTyped) return null; 
  if (isCharValid) {
    return (
      <Image
        source={Images.tickAuth}
        style={{ width: 18, height: 20, marginTop: 5 }}
        resizeMode="contain"
      />
    );
  }
  return (
    <Text style={{ color: 'red', fontSize: 16 }}>❌</Text>
  );
};

const getLengthSymbol = () => {
  if (!isCharTyped) return null;
  if (isLengthTooLong) {
    return (
      <Text style={{ color: 'red', fontSize: 16 }}>❌</Text>
    );
  }
  if (isLengthValid) {
    return (
      <Image
        source={Images.tickAuth}
        style={{ width: 18, height: 20, }}
        resizeMode="contain"
      />
    );
  }
  return null;
};

  const handleContinue = () => {
    if (isCharValid && isLengthValid && !isLengthTooLong) {
      dispatch(setUsername(username));
      navigation.dispatch(StackActions.replace('MainStack'));
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Background showContent hideBottomImages={keyboardVisible} showLogo={false}>
        <View style={styles.wrapper}>
          
          <TouchableOpacity
            style={styles.leftIcon}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={Images.backScreen} style={{ width: 30, height: 30, marginLeft: 5 }} />
          </TouchableOpacity>
          <Image source={Images.logo} style={styles.logo} />
          <TouchableOpacity style={styles.commentIcon} activeOpacity={0.7}>
          <Image source={Images.comment} style={{ width: 40, height: 40, }} />
           </TouchableOpacity>
          <Text style={styles.heading}>Select a Username</Text>
          <AppInput
            placeholder="Username"
            value={username}
            onChangeText={setUsernameLocal}
            onClear={() => setUsernameLocal('')} 
            style={{ backgroundColor: '#090F5F' }} 
          />
          <View style={{ gap: 6, paddingLeft: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {getLengthSymbol()}
              <Text style={{ color: getLengthRuleColor(), marginLeft: 6 }}>
                Must be 8–20 characters
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {getCharSymbol()}
              <Text style={{ color: getCharRuleColor(), marginLeft: 6 }}>
                No special characters
              </Text>
            </View>
          </View>

          <View style={styles.buttonPosition} >
          <AppButton 
            label="Continue" 
            onPress={handleContinue} 
            disabled={!isCharValid || !isLengthValid || isLengthTooLong}
          />
          </View>
        </View>
      </Background>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.2,
    justifyContent: 'flex-start',
  },
  leftIcon: {
    position: 'absolute',
    top: 70,
    left: 10,
    width: 35,
    height: 35,
    zIndex: 10,
  },
    logo: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    width: width * 0.25,
    height: height * 0.09,
  },
  commentIcon: {
    position: 'absolute',
    top: 70,
    right: 18,
    width: 35,
    height: 35,

  },
  heading: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  buttonPosition:{
    flex: 1, 
    justifyContent: 'flex-end',
    marginTop:10,
  }
})
