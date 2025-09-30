import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Images } from '../assets'; 
import { Colors } from '../theme/colors';

const truncateText = (text: string, maxLength: number) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
const getStatusLogo = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return Images.pending;
    case 'received':
      return Images.received;
    case 'sent':
      return Images.sent;
    case 'failed':
      return Images.failed;
    default:
      return Images.logo || Images.pending; 
  }
};
const getTextColor = (status: string, field: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return Colors.background4;
    case 'received':
      if (field === 'name') return Colors.white;
      if (field === 'keyword') return Colors.transaction;
      return Colors.lightblue;
    case 'sent':
      if (field === 'name' || field === 'keyword') return Colors.white;
      return Colors.lightblue;
    case 'failed':
      if (field === 'status') return Colors.red;
      if (field === 'name') return Colors.white;
      return Colors.lightblue;
    default:
      return Colors.lightblue;
  }
};
const TransactionCard = ({ item }: { item: any }) => {
  return (
    <View style={styles.transactionRow}>
     
      <Image source={getStatusLogo(item.status)} style={styles.txnLeftImage} />


      <View style={styles.titleView}>
        <Text style={[styles.txnTitle, { color: getTextColor(item.status, 'name') }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.txnStatus, { color: getTextColor(item.status, 'status') }]}  numberOfLines={1}>
          {item.status} • {item.time}
        </Text>
      </View>

      <View style={styles.titleSubView}>
        <Text style={[styles.txnTitle, { color: getTextColor(item.status, 'keyword') }]}>{item.keyword}</Text>
        <Text style={[styles.txnSub, { color: getTextColor(item.status, 'nft') }]}>{truncateText(item.nftName, 10)}</Text>
      </View>

      <Image source={item.nft} style={styles.txnRightImage} />
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 10,
    marginBottom: 10,
    height: 70,
  },
  titleSubView:{
    alignItems: 'flex-end'
  },
  titleView:{
    flex: 1, 
    paddingHorizontal: 10
  },
  txnLeftImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  txnRightImage: {
    width: 35,
    height: 35,
    borderRadius: 5,
    marginLeft: 10,
  },
  txnTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  txnStatus: {
    fontSize: 13,
    marginTop: 2,
  },
  txnSub: {
    fontSize: 13,
    marginTop: 2,
  },
});
