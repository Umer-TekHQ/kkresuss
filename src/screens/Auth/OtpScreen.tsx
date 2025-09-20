import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

import { authApi } from '../../api/authApi';
import { walletApi } from '../../api/walletApi';
import Background from '../../components/Background';
import LogoAndHeading from '../../components/logoAndHeading';
import OtpForm from '../../components/otpForm';
import TermsSection from '../../components/termsSection';
import TopIcons from '../../components/topIcons';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { useAppSelector } from '../../store/hooks';

const { height } = Dimensions.get('window');

export const OtpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  const [keyboardVisible, setKeyboardVisible] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [otpStarted, setOtpStarted] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [keepUpdated, setKeepUpdated] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const email = useAppSelector(state => state.user.email);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardVisible(true);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleOtpComplete = async (otp: string) => {
    try {
      await authApi.verifyOtp(otp);
      setOtpVerified(true);

      try {
        await walletApi.createWallet();
      } catch (e) {}

      if (acceptTerms) {
        navigation.navigate('OtpSuccess');
      }
    } catch (err: any) {
      Toast.show({ type: 'error', text1: err.message || 'Invalid OTP' });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Background showContent hideBottomImages={keyboardVisible} showLogo={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, paddingHorizontal: 24, paddingBottom: height * 0.03 }}>
            <TopIcons onBack={() => navigation.goBack()} />

            <LogoAndHeading otpStarted={otpStarted} />

            <OtpForm
              otpStarted={otpStarted}
              setOtpStarted={setOtpStarted}
              handleOtpComplete={handleOtpComplete}
              email={email}
              keyboardHeight={keyboardHeight}
            />

            <TermsSection
              acceptTerms={acceptTerms}
              setAcceptTerms={setAcceptTerms}
              otpVerified={otpVerified}
              keepUpdated={keepUpdated}
              setKeepUpdated={setKeepUpdated}
              onSuccessNavigate={() => navigation.navigate('OtpSuccess')}
            />
          </View>
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
};
