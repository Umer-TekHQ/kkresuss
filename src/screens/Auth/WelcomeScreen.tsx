import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Animated,
  Keyboard,
  Image,
  TouchableOpacity,
  BackHandler,
  Easing
} from 'react-native';
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

import { authApi } from '../../api/authApi';
import { Images } from '../../assets';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import Background from '../../components/Background';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setEmail, setOtpToken } from '../../store/slices/userSlice';
import WelcomeStyles from '../../styles/WelcomeScreen.styles';

const { height } = Dimensions.get('window');

const isValidEmail = (email: string): boolean => {
  const regex =
    /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const WelcomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.user.email);
  const logoScale = useRef(new Animated.Value(1)).current;
  const logoTranslateY = useRef(new Animated.Value(0)).current;
  const inputTranslateY = useRef(new Animated.Value(0)).current;
  const [emailText, setEmailText] = useState(userEmail || '');
  const headingOpacity = useRef(new Animated.Value(1)).current;
  const headingTranslateY = useRef(new Animated.Value(0)).current;

    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          BackHandler.exitApp();
          return true;
        };

        const subscription = BackHandler.addEventListener(
          'hardwareBackPress',
          onBackPress
        );

        return () => subscription.remove();
      }, [])
    );

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardVisible(true);

      Animated.parallel([
        Animated.timing(inputTranslateY, {
          toValue: -e.endCoordinates.height / 3, 
          duration: 900, 
          easing: Easing.out(Easing.quad), 
          useNativeDriver: true,
        }),
        Animated.timing(headingOpacity, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(headingTranslateY, {
          toValue: -20,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 0.7,
          damping: 14,
          stiffness: 90,
          useNativeDriver: true,
        }),
        Animated.spring(logoTranslateY, {
          toValue: -80,
          damping: 14,
          stiffness: 90,
          useNativeDriver: true,
        }),
      ]).start();
    });

    const hideSub = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardVisible(false);

      Animated.parallel([
        Animated.timing(inputTranslateY, {
          toValue: 0,
          duration: 600, 
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(headingOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(headingTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          damping: 14,
          stiffness: 90,
          useNativeDriver: true,
        }),
        Animated.spring(logoTranslateY, {
          toValue: 0,
          damping: 14,
          stiffness: 90,
          useNativeDriver: true,
        }),
      ]).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);


  useEffect(() => {
    setIsEmailValid(isValidEmail(emailText));
  }, [emailText]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      Animated.timing(inputTranslateY, {
        toValue: height * 0.03,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      Animated.timing(inputTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

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
    ]).start();

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleEmailChange = (text: string) => {
    setEmailText(text);
    setIsEmailValid(isValidEmail(text));
  };

  const handleContinue = async () => {
    try {
      const response = await authApi.verifyEmail(emailText);

      if (response.token) {
        dispatch(setEmail(emailText));
        dispatch(setOtpToken(response.token));
        navigation.navigate('Otp');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Email not found',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Background
        showContent
        showLogo={false}
        hideBottomImages={keyboardVisible}
        showLostAccess={!keyboardVisible}
      >
        <Animated.Image
          source={Images.logo}
          style={[
            WelcomeStyles.logo,
            {
              transform: [{ scale: logoScale }, { translateY: logoTranslateY }],
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

          <View>
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
  );
};

export default WelcomeScreen;
