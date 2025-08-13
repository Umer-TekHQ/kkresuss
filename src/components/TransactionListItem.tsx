import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Images } from '../assets';

const TransactionListItem = ({ item }: { item: any }) => {
  const isPositive = item.amountUSD.trim().startsWith('+');


  return(
  <View style={styles.item}>
    <View style={styles.leftSection}>
      <Image
        source={item.type === 'Sent' ? Images.sent : Images.received}
        style={styles.icon}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.meta}>
          {item.type} · {item.time}
        </Text>
      </View>
    </View>

    <View style={styles.rightSection}>
      <Text style={[styles.amount,{ color: isPositive ? '#30DB5B' : '#FFFFFF' }]}>
        {item.amountUSD}
      </Text>
      <Text style={styles.ethAmount}>
        {item.amountETH}
      </Text>
    </View>
  </View>
);
}

export default TransactionListItem;


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
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 20,
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
  },
  ethAmount: {
    fontSize: 13,
    marginTop: 2,
    color: '#ADD2FD'
  },
});
