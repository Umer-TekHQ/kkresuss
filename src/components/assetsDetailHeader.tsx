import React from 'react';
import { View, StyleSheet } from 'react-native';
import PriceHeader from './PriceHeader';
import ChartSection from './ChartSection';
import { TokenActionButtons } from './TokenActionButtons';
import PositionCard from './PositionCard';
import { ContactAddress } from './ContactAddress';

const AssetDetailHeader = ({ data, onBack }: { data: any; onBack: () => void }) => (
  <View>
    <PriceHeader data={data} onBack={onBack} />
    <ChartSection />
    <TokenActionButtons />
    <PositionCard data={data} />
    <ContactAddress contractAddress={data?.contract_address} />
    <View style={styles.divider} />
    <View style={{ height: 100 }} />
  </View>
);

export default AssetDetailHeader;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: '#0734A9',
  },
});
