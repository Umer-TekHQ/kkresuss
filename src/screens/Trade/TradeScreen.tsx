import React, { useState, useRef } from 'react';
import { ScrollView, Alert, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppNavigatorParamList } from '../../navigators/routeNames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAmount1, setAmount2, toggleUSD, setToken2 } from '../../store/slices/tradeSlice';
import { Token } from './types';
import { HeaderNav } from '../../components/HeaderNav';
import BottomSheetTrade, { BottomSheetTradeRef } from '../../components/BottomSheetTrade';
import TradeHeaderRow from '../../components/tradeHeaderRow';
import TokenField from '../../components/tokenField';
import ArrowDivider from '../../components/arrowDivider';
import TradeFooter from '../../components/tradeFooter';
import { Colors } from '../../theme/colors';

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

  const sanitizeInput = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return parts[0] + '.' + parts[1];
    return cleaned;
  };

  const formatToSix = (num: number) => parseFloat(num.toFixed(6)).toString();

  const handleToggleUSD = () => {
    if (!amount1 || amount1 === '0') return;
    dispatch(toggleUSD());
  };

  const handleAmount1Change = (text: string) => {
    const safeText = sanitizeInput(text);
    if (!token1 || !token2) {
      dispatch(setAmount1(safeText));
      return;
    }

    const amountNum = parseFloat(safeText) || 0;

    if (isUSD) {
      const tokenAmount = amountNum / tokenRates[token1.abbreviation];
      const converted = (tokenAmount * tokenRates[token1.abbreviation]) / tokenRates[token2.abbreviation];
      dispatch(setAmount1(formatToSix(tokenAmount)));
      dispatch(setAmount2(formatToSix(converted)));
    } else {
      const usdValue = amountNum * tokenRates[token1.abbreviation];
      const converted = usdValue / tokenRates[token2.abbreviation];
      dispatch(setAmount1(safeText));
      dispatch(setAmount2(formatToSix(converted)));
    }
  };

  const handleAmount2Change = (text: string) => {
    const safeText = sanitizeInput(text);
    if (!token1 || !token2) return;

    const amountNum = parseFloat(safeText) || 0;
    const usdValue = amountNum * tokenRates[token2.abbreviation];
    const converted = usdValue / tokenRates[token1.abbreviation];
    dispatch(setAmount2(safeText));
    dispatch(setAmount1(formatToSix(converted)));
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
    if (!validateFields()) {
      Alert.alert('Incomplete Information', 'Please select both tokens and enter valid amounts to continue.', [{ text: 'OK' }]);
      return;
    }

    if (token1?.abbreviation === token2?.abbreviation) {
      Alert.alert('Invalid Selection', 'Trade and Receive tokens cannot be the same.', [{ text: 'OK' }]);
      return;
    }

    tradeSheetRef.current?.openSheet();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.ContentContainer}>
        <HeaderNav />
        <TradeHeaderRow isUSD={isUSD} amount1={amount1} onToggleUSD={handleToggleUSD} />
        <TokenField
          token={token1}
          amount={amount1}
          onAmountChange={handleAmount1Change}
          onPress={() =>
            navigation.navigate('SearchScreen', {
              field: 'token1',
              excludeToken: token2?.abbreviation,
            })
          }
          editable={true}
          hasError={errors.token1 || errors.amount1}
          field="token1"
          isUSD={isUSD}
          tokenRates={tokenRates}
        />
        <ArrowDivider />
        <Text style={styles.title2}>Receive</Text>
        <TokenField
          token={token2}
          amount={amount2}
          onAmountChange={handleAmount2Change}
          onPress={() =>
            navigation.navigate('ReceiveTokenScreen', {
              field: 'token2',
              excludeToken: token1?.abbreviation,
              onSelectToken: (selectedToken: Token) => {
                if (selectedToken.abbreviation === token1?.abbreviation) return;
                dispatch(setToken2(selectedToken));
              },
            })
          }
          editable={false}
          hasError={errors.token2 || errors.amount2}
          field="token2"
          isUSD={isUSD}
          tokenRates={tokenRates}
        />
        <TradeFooter
          onContinue={handleContinue}
          isEnabled={Boolean(
            token1 &&
            token2 &&
            amount1 &&
            amount2 &&
            amount1 !== '0' &&
            amount2 !== '0'
          )}
        />
        <BottomSheetTrade ref={tradeSheetRef} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background5,
  },
  ContentContainer: {
    flexGrow: 1,
  },
  title2: {
    color: Colors.white,
    fontSize: 19,
    marginLeft: 12,
    marginBottom: 8,
  },
});
