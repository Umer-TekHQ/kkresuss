
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface PopularAssetItemProps {
  item: {
    title: string;
    amountUSD: string;
    amountETH: string;
    profit?: string; 
    logo: any;
  };
}

const PopularAssetItem = ({ item }: { item: PopularAssetItemProps['item'] }) => (
  <View style={styles.item}>
    <View style={styles.leftSection}>
     <View style={styles.iconWrapper}>
      <Image source={item.logo} style={styles.icon} />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.meta}>{item.amountETH}</Text>
      </View>
    </View>

    <View style={styles.rightSection}>
      <Text style={styles.amount}>{item.amountUSD}</Text>
      {item.profit && <Text style={styles.profit}>{item.profit}</Text>}
    </View>
  </View>
);

export default PopularAssetItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  iconWrapper: {
  width: 42,
  height: 42,
  borderRadius: 22,
  backgroundColor: '#1C1C2E',
},
  name: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  meta: {
    color: '#ADD2FD',
    fontSize: 13,
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  profit: {
    fontSize: 13,
    color: '#30DB5B',
    marginTop: 2,
  },
});
