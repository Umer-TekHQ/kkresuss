import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Images } from '../assets';

const TransactionListItem = ({ item }: { item: any }) => (
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
      <Text style={[styles.amount, item.type === 'Sent' ? styles.sent : styles.received]}>
        {item.amountUSD}
      </Text>
      <Text style={[styles.ethAmount, item.type === 'Sent' ? styles.sent : styles.received]}>
        {item.amountETH}
      </Text>
    </View>
  </View>
);

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
    fontSize: 14,
    fontWeight: '500',
  },
  meta: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
  },
  ethAmount: {
    fontSize: 12,
    marginTop: 2,
  },
  sent: {
    color: '#f44336',
  },
  received: {
    color: '#4CAF50',
  },
});
