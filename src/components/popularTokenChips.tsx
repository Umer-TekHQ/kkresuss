import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Images } from '../assets';
import { Token } from '../screens/Trade/types';
import { Colors } from '../theme/colors';

const popularTokens = [
  { symbol: 'BTRST', logo: Images.token1 },
  { symbol: 'BRETT', logo: Images.token3 },
  { symbol: 'cbETH', logo: Images.token2 },
  { symbol: 'TOSHI', logo: Images.token5 },
  { symbol: 'MOCHI', logo: Images.token6 },
  { symbol: 'BSHIB', logo: Images.token7 },
  { symbol: 'USDT', logo: Images.token4 },
  { symbol: 'XRP', logo: Images.token2 },
  { symbol: 'ADA', logo: Images.token3 },
  { symbol: 'NORMIE', logo: Images.token6 },
  { symbol: 'SNORT', logo: Images.token8 },
];

const PopularTokenChips = ({ onSelect }: { onSelect: (token: Token) => void }) => (
  <View style={styles.tokenChipsRow}>
    {popularTokens.map((token, index) => {
      const selectedToken: Token = {
        id: token.symbol,
        name: token.symbol,
        abbreviation: token.symbol,
        logo: token.logo,
        amount: '0',
        price: '$0.00',
      };

      return (
        <TouchableOpacity
          key={index}
          style={styles.tokenChip}
          onPress={() => onSelect(selectedToken)}
        >
          <Image source={token.logo} style={styles.chipLogo} />
          <Text style={styles.chipText}>{token.symbol}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default PopularTokenChips;

const styles = StyleSheet.create({
  tokenChipsRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tokenChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.lightblue,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 15,
    marginBottom: 10,
  },
  chipLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  chipText: {
    color: Colors.white,
    fontSize: 14,
  },
});
