import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { Token } from './types';
import { HeaderNav } from '../../components/HeaderNav';
import { Images } from '../../assets';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAmount1, setAmount2, toggleUSD } from '../../store/slices/tradeSlice';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TradeSwitch from '../../components/TradeSwitch';
import BottomSheetTrade, { BottomSheetTradeRef } from '../../components/BottomSheetTrade';

export const TradeScreen = () => {
  const dispatch = useAppDispatch();
  const { token1, token2, amount1, amount2, isUSD } = useAppSelector((state) => state.trade);
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  const tradeSheetRef = useRef<BottomSheetTradeRef>(null);

  const [errors, setErrors] = useState({
    token1: false,
    token2: false,
    amount1: false,
    amount2: false,
  });

  const tokenRates: Record<string, number> = {
    NORMIE: 0.001733,
    SNORT: 0.000502,
    USDC: 1,
    rETH: 4915.27,
    AERO: 495.27,
    BRETT: 0.0576,
    TOSHI: 0.052976,
    BSHIB: 0,
    cbETH: 0.000209561,
    MOCHI: 66497700,
    ADA: 49536.1,
    XPR: 49536.1,
  };

  const handleToggleUSD = () => {
    dispatch(toggleUSD());
  };

  const validateFields = () => {
    const newErrors = {
      token1: !token1,
      token2: !token2,
      amount1: !amount1 || amount1 === '0',
      amount2: !amount2 || amount2 === '0',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  const handleContinue = () => {
    if (validateFields()) {
      tradeSheetRef.current?.openSheet();  
    } else {
      Alert.alert(
        'Incomplete Information',
        'Please select both tokens and enter valid amounts to continue.',
        [{ text: 'OK' }]
      );
    }
  };

  const formatToSix = (num: number) => parseFloat(num.toFixed(6)).toString();

  const sanitizeInput = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return parts[0] + '.' + parts[1];
    return cleaned;
  };

  const handleAmount1Change = (text: string) => {
    const safeText = sanitizeInput(text);
    if (isUSD) {
      const usdAmount = parseFloat(safeText) || 0;
      if (token1 && tokenRates[token1.abbreviation]) {
        const tokenAmount = usdAmount / tokenRates[token1.abbreviation];
        dispatch(setAmount1(formatToSix(tokenAmount)));
      }
      if (token1 && token2 && tokenRates[token1.abbreviation] && tokenRates[token2.abbreviation]) {
        const tokenAmount = usdAmount / tokenRates[token1.abbreviation];
        const converted = tokenAmount * tokenRates[token1.abbreviation] / tokenRates[token2.abbreviation];
        dispatch(setAmount2(formatToSix(converted)));
      }
    } else {
      dispatch(setAmount1(safeText));
      if (token1 && token2 && tokenRates[token1.abbreviation] && tokenRates[token2.abbreviation]) {
        const amountNum = parseFloat(safeText) || 0;
        const usdValue = amountNum * tokenRates[token1.abbreviation];
        const converted = usdValue / tokenRates[token2.abbreviation];
        dispatch(setAmount2(formatToSix(converted)));
      }
    }
  };

  const handleAmount2Change = (text: string) => {
    dispatch(setAmount2(text));
    if (token1 && token2 && tokenRates[token1.abbreviation] && tokenRates[token2.abbreviation]) {
      const amountNum = parseFloat(text) || 0;
      const usdValue = amountNum * tokenRates[token2.abbreviation];
      const converted = usdValue / tokenRates[token1.abbreviation];
      dispatch(setAmount1(formatToSix(converted)));
    }
  };

  const renderTokenField = (
    token: Token | null,
    amount: string,
    onAmountChange: (text: string) => void,
    onPress: () => void,
    editable: boolean,
    hasError: boolean,
    field: 'token1' | 'token2'
  ) => {
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
              placeholderTextColor="#97B8E1"
            />
            <View style={styles.tokenDisplay}>
              <Image source={token.logo} style={styles.tokenLogo} />
              <Text style={styles.tokenSymbol}>{token.abbreviation}</Text>
            </View>
            <Image source={Images.downarrow} style={styles.downfieldarrow} />
          </View>
        ) : (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.placeholderText, hasError && styles.errorText]}>Select Token</Text>
            <Image source={Images.downarrow} style={styles.downfieldarrow} />
          </View>
        )}

        {field === 'token1' && displaySecondary ? (
          <Text style={styles.secondaryText}>{displaySecondary}</Text>
        ) : null}

        {hasError && <Text style={styles.errorMessage}>This field is required</Text>}
      </TouchableOpacity>
    );
  };

  const isContinueEnabled =
    token1 && token2 && amount1 && amount2 && amount1 !== '0' && amount2 !== '0';

  return (
    <View style={styles.container}>
      <HeaderNav />

      <View style={styles.headerRow}>
        <Text style={styles.title}>Trade</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.enterUsdText}>Enter USD</Text>
          <TradeSwitch onValueChange={handleToggleUSD} value={isUSD} />
        </View>
      </View>

      {renderTokenField(
        token1,
        amount1,
        handleAmount1Change,
        () => navigation.navigate('SearchScreen', { field: 'token1', excludeToken: token2?.abbreviation }),
        true,
        errors.token1 || errors.amount1,
        'token1'
      )}

      <View style={styles.arrowContainer}>
        <Image source={Images.downarroww} style={styles.downarrow} />
      </View>

      <Text style={styles.title2}>Receive</Text>

      {renderTokenField(
        token2,
        amount2,
        handleAmount2Change,
        () => navigation.navigate('ReceiveTokenScreen', { field: 'token2', excludeToken: token1?.abbreviation }),
        true,
        errors.token2 || errors.amount2,
        'token2'
      )}

      <View style={styles.footer}>
        <Text style={styles.gasText}>30 gas-free transactions remaining</Text>
        <TouchableOpacity
          style={[styles.continueBtn, isContinueEnabled && { backgroundColor: '#FFFFFF' }]}
          onPress={handleContinue}
        >
          <Text style={[styles.continueText, isContinueEnabled && { color: '#01021D' }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      <BottomSheetTrade ref={tradeSheetRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#01021D' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 5 },
  title: { color: '#FFFFFF', fontSize: 19, marginLeft: 12 },
  title2: { color: '#FFFFFF', fontSize: 19, marginLeft: 12, marginBottom: 5 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  enterUsdText: { color: '#ADD2FD', marginRight: 8, fontSize: 13 },
  tokenField: {
    height: hp('11%'),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0734A9',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginBottom: 16,
  },
  errorField: { borderColor: '#FF4D4F' },
  errorText: { color: '#FF4D4F' },
  errorMessage: { color: '#FF4D4F', fontSize: 12, marginTop: 4 },
  tokenInputContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  amountInput: { color: '#97B8E1', fontSize: 30, flex: 1, marginTop: -7 },
  disabledInput: { color: '#667', opacity: 0.7 },
  arrowContainer: { alignItems: 'center', marginVertical: 8 },
  downarrow: { width: wp('4%'), height: hp('2.7%'), marginLeft: 15, tintColor: '#086DE1' },
  downfieldarrow: { width: 13, height: 8, tintColor: '#4898F3' },
  placeholderText: { color: '#ADD2FD', fontSize: 34 },
  gasText: { color: '#ADD2FD', fontSize: 14, textAlign: 'center', marginBottom: 30 },
  continueBtn: {
    backgroundColor: '#0734A9',
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  continueText: { fontSize: 22, fontWeight: '500' },
  tokenDisplay: { alignItems: 'center', marginLeft: 14 },
  tokenLogo: { width: 40, height: 40, borderRadius: 12, marginRight: 15 },
  tokenSymbol: { color: '#fff', fontSize: 15, fontWeight: '500', marginRight: 15 },
  footer: { marginTop: hp('20%') },
  secondaryText: { color: '#ADD2FD', fontSize: 14, marginTop: -17, marginLeft: 5 },
});
