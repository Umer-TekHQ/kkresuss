import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Background from '../../components/Background'
import AppInput from '../../components/AppInput'
import AppButton from '../../components/AppButton'
import { Images } from '../../assets'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setUsername } from '../../store/slices/userSlice'

const { width, height } = Dimensions.get('window')

export const UserNameScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const dispatch = useAppDispatch()
  const savedUsername = useAppSelector(state => state.user.username)

  const [username, setUsernameLocal] = useState(savedUsername || '')
  const isCharTyped = username.length > 0
  const isLengthTooLong = username.length > 20
  const isCharValid = /^[a-zA-Z0-9 ]*$/.test(username)  
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
    if (!isCharTyped) return ''
    return isCharValid ? '✓' : '❌'
  }

  const getLengthSymbol = () => {
    if (!isCharTyped) return ''
    if (isLengthTooLong) return '❌'
    return isLengthValid ? '✓' : ''
  }

  const handleContinue = () => {
    if (isCharValid && isLengthValid && !isLengthTooLong) {
      dispatch(setUsername(username))
      navigation.navigate('BottomNavigator')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Background showContent hideBottomImages={false} showLogo={false}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.leftIcon}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={Images.backscreen} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>

          <Image source={Images.logo} style={styles.logo} />
          <Image source={Images.comment} style={styles.commentIcon} />

          <Text style={styles.heading}>Select a Username</Text>

          <AppInput
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsernameLocal}
            onClear={() => setUsernameLocal('')} 
          />

          <View style={{ gap: 6, paddingLeft: 4 }}>
            <Text style={{ color: getLengthRuleColor() }}>
              {getLengthSymbol()} Must be 8–20 characters
            </Text>
            <Text style={{ color: getCharRuleColor() }}>
              {getCharSymbol()} No special characters
            </Text>
          </View>

          <AppButton 
            label="Continue" 
            onPress={handleContinue} 
            disabled={!isCharValid || !isLengthValid || isLengthTooLong}
          />
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
    top: 45,
    alignSelf: 'center',
    width: width * 0.3,
    height: height * 0.12,
  },
  commentIcon: {
    position: 'absolute',
    top: 70,
    right: 10,
    width: 35,
    height: 35,
  },
  heading: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
})

