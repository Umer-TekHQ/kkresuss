import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

type Props = {
  logo: any
  name: string
  short: string
  price: number
  availableAmount: number
}

const AssetInfoBox = ({ logo, name, short, price, availableAmount }: Props) => {
  return (
    <View style={styles.ethBox}>
      <View style={styles.ethBoxInner}>
        <Image source={logo} style={styles.ethIcon} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.ethSymbol}>{name}</Text>
          <Text style={styles.ethShort}>{short}</Text>
        </View>
        <View style={styles.priceBlock}>
          <Text style={styles.price}>${price.toLocaleString()}</Text>
          <Text style={styles.ethBalance}>Available: {availableAmount.toFixed(5)} {short}</Text>
        </View>
      </View>
    </View>
  );
};

export default AssetInfoBox;

const styles = StyleSheet.create({
  ethBox: {
    height: 70,
    backgroundColor: '#080C4C',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  ethBoxInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ethIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  ethSymbol: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  ethShort: {
    color: '#7AB7FD',
    fontSize: 12,
    marginTop: 2,
  },
  priceBlock: {
    alignItems: 'flex-end',
    flex: 1,
  },
  price: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  ethBalance: {
    color: '#7AB7FD',
    fontSize: 12,
    marginTop: 2,
  },
});