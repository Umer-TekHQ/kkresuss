import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import Background from '../../components/Background';
import OTPInputBox from '../../components/OTPInputBox';
import CheckboxRow from '../../components/CheckboxRow';
import SecondaryButton from '../../components/SecondaryButton';
import { Images } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { useAppSelector } from '../../store/hooks';
import { authApi } from '../../api/authApi';
import { walletApi } from '../../api/walletApi';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

export const OtpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  const [keyboardVisible, setKeyboardVisible] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [otpStarted, setOtpStarted] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [keepUpdated, setKeepUpdated] = useState(false);

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
    // Create wallet immediately after successful OTP
    try {
      await walletApi.createWallet();
    } catch (e) {
      // If wallet already exists or 404 variations, ignore since Profile will fetch
    }
    navigation.navigate('OtpSuccess');
  } catch (err: any) {
    Toast.show({ type: 'error', text1: err.message || 'Something went wrong' });
  }
};


  return (
    <View style={{ flex: 1 }}>
      <Background showContent hideBottomImages={keyboardVisible} showLogo={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.wrapper}>
            <View style={styles.topIcons}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
                <Image source={Images.backscreen} style={styles.backIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={Images.comment} style={styles.commentIcon} />
              </TouchableOpacity>
            </View>

            <Image source={Images.logo} style={styles.logo} resizeMode="contain" />

            <Text style={styles.heading}>Check Your Email</Text>
            {otpStarted && <Text style={styles.subHeading}>and spam too</Text>}

            <OTPInputBox
              onStartTyping={() => setOtpStarted(true)}
              onComplete={handleOtpComplete}
            />

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
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: height * 0.03,
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
  backIcon: { width: 35, height: 35 },
  commentIcon: { width: 35, height: 35 },
  logo: { position: 'absolute', top: 45, alignSelf: 'center', width: width * 0.3, height: height * 0.12 },
  heading: { marginTop: height * 0.2, letterSpacing: 1, fontSize: 30, fontWeight: '600', color: '#FFFFFF', textAlign: 'center', height: 38 },
  subHeading: { marginTop: height * 0.006, fontSize: 15, lineHeight: 19, color: '#ADD2FD', textAlign: 'center' },
  infoWrapper: { marginTop: height * 0.10 },
  infoText: { fontSize: 14, color: '#ADD2FD', textAlign: 'center' },
  emailText: { fontSize: 14, color: '#ADD2FD', textAlign: 'center', marginTop: height * 0.01 },
  resendWrapper: { marginTop: height * 0.028 },
  divider: { width: '100%', height: 1, backgroundColor: '#ADD2FD33', marginTop: height * 0.035, marginBottom: height * 0.025 },
  checkContainer: { width: '100%', gap: 12, paddingLeft: 2 },
});
