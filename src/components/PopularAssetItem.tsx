import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

interface PopularAssetItemProps {
  item: {
    token_name: string;
    token_symbol: string;
    token_logo: string;
    price_usd: string;
    price_24h_percent_change?: string;
  };
}

const PopularAssetItem = ({ item }: PopularAssetItemProps) => {
  const percent = parseFloat(item.price_24h_percent_change || '0');
  const profit = Math.abs(percent).toFixed(2);
  const isProfit = percent >= 0;

  const tokenName =
    item.token_name.length > 20
      ? item.token_name.slice(0, 20) + '....'
      : item.token_name;

  return (
    <View style={styles.item}>
      <View style={styles.leftSection}>
        <View style={styles.iconWrapper}>
          <Image
            source={item.token_logo ? { uri: item.token_logo } : Images.usd}
            style={styles.icon}
          />
          <Image source={Images.baseMini} style={styles.networkIcon} />
        </View>

        <View style={styles.nameToken}>
          <Text style={styles.name}>{tokenName}</Text>
          <Text style={styles.meta}>{item.token_symbol}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.amount}>${parseFloat(item.price_usd).toFixed(2)}</Text>
        <View style={styles.profitRow}>
          <Image
            source={isProfit ? Images.greenArrowUp : Images.redDown}
            style={styles.profitIcon}
          />
          <Text
            style={[
              styles.profit,
              { color: isProfit ? Colors.transaction : Colors.redBar },
            ]}
          >
            {profit}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PopularAssetItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    paddingVertical: 12,
  },
  nameToken:{
    marginLeft: 10
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    resizeMode: 'contain',
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.background5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  networkIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 15,
    resizeMode: 'contain',
  },
  name: {
    color: Colors.white,
    fontSize: 13,
  },
  meta: {
    color: Colors.lightblue,
    fontSize: 13,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
  profit: {
    fontSize: 13,
  },
  profitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitIcon: {
    width: 10,
    height: 10,
    marginRight: 4,
    resizeMode: 'contain',
  },
});
