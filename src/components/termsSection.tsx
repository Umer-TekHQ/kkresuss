import React from 'react';
import { View, StyleSheet } from 'react-native';

import CheckboxRow from "./CheckboxRow";

type Props = {
  acceptTerms: boolean;
  setAcceptTerms: (v: boolean) => void;
  otpVerified: boolean;
  keepUpdated: boolean;
  setKeepUpdated: (v: boolean) => void;
  onSuccessNavigate: () => void;
};

const TermsSection = ({
  acceptTerms,
  setAcceptTerms,
  otpVerified,
  keepUpdated,
  setKeepUpdated,
  onSuccessNavigate,
}: Props) => (
  <View style={styles.checkContainer}>
    <CheckboxRow
      isChecked={acceptTerms}
      onToggle={() => {
        const newValue = !acceptTerms;
        setAcceptTerms(newValue);
        if (newValue && otpVerified) {
          onSuccessNavigate();
        }
      }}
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
);

const styles = StyleSheet.create({
  checkContainer: { width: '100%', gap: 12, paddingLeft: 2 },
});

export default TermsSection;
