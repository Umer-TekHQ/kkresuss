import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { Token } from '../screens/Trade/types';
import { Images } from '../assets';
import { Colors } from '../theme/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TokenField = ({
  token,
  amount,
  onAmountChange,
  onPress,
  editable,
  hasError,
  field,
  isUSD,
  tokenRates,
}: {
  token: Token | null;
  amount: string;
  onAmountChange: (text: string) => void;
  onPress: () => void;
  editable: boolean;
  hasError: boolean;
  field: 'token1' | 'token2';
  isUSD: boolean;
  tokenRates: Record<string, number>;
}) => {
  const usdValue = token && amount ? parseFloat(amount) * (tokenRates[token.abbreviation] || 0) : 0;
  const displayMain =
    isUSD && field === 'token1'
      ? usdValue ? usdValue.toString() : ''
      : amount;
  const displaySecondary =
    isUSD && field === 'token1'
      ? `${amount || 0} ${token?.abbreviation || ''}`
      : !isUSD && field === 'token1' && usdValue
      ? `$${usdValue.toFixed(2)}`
      : null;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.tokenField, hasError && styles.errorField]}>
      {token ? (
        <View style={styles.tokenInputContainer}>
          <TextInput
            style={[styles.amountInput, !editable && styles.disabledInput]}
            value={displayMain}
            onChangeText={onAmountChange}
            keyboardType="numeric"
            editable={editable}
            placeholder="0"
            placeholderTextColor={Colors.lightblue}
            selectTextOnFocus={editable}
          />
          <View style={styles.tokenDisplay}>
            <Image source={token.logo} style={styles.tokenLogo} />
            <Text style={styles.tokenSymbol}>{token.abbreviation}</Text>
          </View>
          <Image source={Images.downArrow} style={styles.downFieldArrow} />
        </View>
      ) : (
        <View style={styles.placeHolderView}>
          <Text style={[styles.placeholderText, hasError && styles.errorText]}>Select Token</Text>
          <Image source={Images.downArrow} style={styles.downFieldArrow} />
        </View>
      )}
      {field === 'token1' && displaySecondary ? <Text style={styles.secondaryText}>{displaySecondary}</Text> : null}
      {hasError && <Text style={styles.errorMessage}>This field is required</Text>}
    </TouchableOpacity>
  );
};

export default TokenField;

const styles = StyleSheet.create({
  tokenField: {
    height: hp('11%'),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.fieldBorder,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginBottom: 16,
  },
  errorField: {
    borderColor: Colors.redBar,
  },
  tokenInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountInput: {
    color: Colors.lightblue,
    fontSize: 30,
    flex: 1,
    marginTop: -7,
  },
  disabledInput: {
    color: Colors.lightblue,
  },
  tokenDisplay: {
    alignItems: 'center',
    marginLeft: 14,
  },
  tokenLogo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 15,
  },
  tokenSymbol: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
    marginRight: 15,
  },
  downFieldArrow: {
    width: 13,
    height: 8,
    tintColor: Colors.downArrow,
  },
  placeHolderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.lightblue,
    fontSize: 34,
  },
  errorText: {
    color: Colors.redBar,
  },
  errorMessage: {
    color: Colors.redBar,
    fontSize: 12,
    marginTop: 4,
  },
  secondaryText: {
    color: Colors.lightblue,
    fontSize: 14,
    marginTop: -17,
    marginLeft: 5,
  },
});
