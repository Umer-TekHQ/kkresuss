import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Colors } from '../../theme/colors';
import { useAppSelector } from '../../store/hooks';
import { tokens } from './tokens';
import { Token } from './types';
import { Card } from '../../components/CompletionCard';
import TradeHeader from '../../components/tradeHeader';
import TokenSwapCard from '../../components/tokenSwapCard';
import ReceivedBox from '../../components/receivedBox';
import TradeCompleteBanner from '../../components/tradeCompleteBanner';
import TransactionIdCard from '../../components/transactionIdCard';
import BaseScanButton from '../../components/baseScanButton';
import { Images } from '../../assets/index';

const TradeStatusScreen = ({ navigation }: any) => {
  const tradeState = useAppSelector(state => state.trade);

  const [tradeData, setTradeData] = useState({
    token1: null as Token | null,
    token2: null as Token | null,
    amount1: '',
    amount2: '',
  });

  useEffect(() => {
    if (tradeState.token1 || tradeState.token2) {
      setTradeData({
        token1: tradeState.token1,
        token2: tradeState.token2,
        amount1: tradeState.amount1,
        amount2: tradeState.amount2,
      });
    }
  }, []);

  const normieToken = tokens.find(t => t.abbreviation === 'NORMIE');
  const defaultToken1 = normieToken || tokens[5] || {
    id: '6',
    name: 'Normie',
    abbreviation: 'NORMIE',
    logo: Images.token6,
    amount: '6,806.5292',
    price: '$396.14',
  };

  const defaultToken2 = {
    id: '8',
    name: 'Snort',
    abbreviation: 'SNORT',
    logo: Images.token8,
    amount: '865.58817085',
    price: '$396.14',
  };

  const displayToken1 = tradeData.token1 || tradeState.token1 || defaultToken1;
  const displayToken2 = tradeData.token2 || tradeState.token2 || defaultToken2;
  const displayAmount1 = tradeData.amount1 || tradeState.amount1 || '6,806.529209';
  const displayAmount2 = tradeData.amount2 || tradeState.amount2 || '865.58817085';

  return (
    <ScrollView style={styles.container}>
      <TradeHeader navigation={navigation} />
      <TokenSwapCard token1={displayToken1} token2={displayToken2} />
      <ReceivedBox token={displayToken2} amount={displayAmount2} />
      <TradeCompleteBanner />
      <Card
        label="Traded"
        value={`${displayAmount1} ${displayToken1.abbreviation}`}
        usd="$396.14 USD"
      />
      <Card
        label="Provider Fees"
        value={`${displayAmount2} ${displayToken2.abbreviation}`}
        usd="$0.01 USD"
      />
      <Card
        label={
          <>
            <Text style={{ color: Colors.lightblue, fontSize: 15 }}>Network Fees</Text>
            <Text style={{ color: Colors.lightblue, fontSize: 15 }}> (Waived)</Text>
          </>
        }
        value={`${displayAmount2} ${displayToken2.abbreviation}`}
        usd="$0.01 USD"
        strike
      />
      <TransactionIdCard />
      <BaseScanButton />
    </ScrollView>
  );
};

export default TradeStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background5,
  },
});
