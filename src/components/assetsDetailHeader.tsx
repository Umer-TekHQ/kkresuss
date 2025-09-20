import React from 'react';
import { View } from 'react-native';

import ChartSection from './ChartSection';
import { ContactAddress } from './ContactAddress';
import PositionCard from './PositionCard';
import PriceHeader from './PriceHeader';
import { TokenActionButtons } from './TokenActionButtons';

const AssetDetailHeader = ({ data, onBack }: { data: any; onBack: () => void }) => (
  <View>
    <PriceHeader data={data} onBack={onBack} />
    <ChartSection />
    <TokenActionButtons />
    <PositionCard data={data} />
    <ContactAddress contractAddress={data?.contract_address} />
    <View style={{ height: 40 }} />
  </View>
);

export default AssetDetailHeader;

