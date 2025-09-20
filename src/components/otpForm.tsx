import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import OTPInputBox from "./OTPInputBox";
import SecondaryButton from "./SecondaryButton";
import { Colors } from '../theme/colors';

const { height } = Dimensions.get('window');

type Props = {
  otpStarted: boolean;
  setOtpStarted: (v: boolean) => void;
  handleOtpComplete: (otp: string) => void;
  email: string;
  keyboardHeight: number;
};

const OtpForm = ({
  otpStarted,
  setOtpStarted,
  handleOtpComplete,
  email,
  keyboardHeight,
}: Props) => (
  <>
    <OTPInputBox onStartTyping={() => setOtpStarted(true)} onComplete={handleOtpComplete} />

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
  </>
);

const styles = StyleSheet.create({
  infoWrapper: { marginTop: height * 0.1 },
  infoText: { fontSize: 14, color: Colors.lightblue, textAlign: 'center' },
  emailText: { fontSize: 14, color: Colors.lightblue, textAlign: 'center' },
  resendWrapper: { marginTop: height * 0.028 },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.otpBg,
    marginTop: height * 0.035,
    marginBottom: height * 0.025,
  },
});

export default OtpForm;
