import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import AssetDetailHeader from './assetsDetailHeader';
import TransactionListItem from './TransactionListItem';

const AssetDetailList = ({
  data,
  transactions,
  onBack,
}: {
  data: any;
  transactions: any[];
  onBack: () => void;
}) => (
  <FlatList
    style={styles.container}
    data={transactions}
    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
    renderItem={({ item }) => <TransactionListItem item={item} />}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    ListHeaderComponent={<AssetDetailHeader data={data} onBack={onBack} />}
  />
);

export default AssetDetailList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#010D2A' },
  separator: {
    height: 1,
    backgroundColor: '#222',
    marginHorizontal: 16,
  },
});
