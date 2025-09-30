import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const TransactionList = ({ transactions }: { transactions: any[] }) => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <View style={styles.leftSection}>
        <Image
          source={item.type === 'Sent' ? Images.sent : Images.received}
          style={styles.icon}
        />
        <View style={styles.titleView}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.meta}>
            {item.type} · {item.time}
          </Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text
          style={[
            styles.amount,
            item.type === 'Sent' ? styles.sent : styles.received,
          ]}
        >
          {item.amountUSD}
        </Text>
        <Text
          style={[
            styles.ethAmount,
            item.type === 'Sent' ? styles.sent : styles.received,
          ]}
        >
          {item.amountETH}
        </Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};
export default TransactionList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.background5,
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
    backgroundColor: Colors.privacy,
  },
  name: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  meta: {
    color: Colors.disabled,
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
    color: Colors.redBar,
  },
  received: {
    color: Colors.greenBar,
  },
  titleView:{
    marginLeft: 10
  }
});



