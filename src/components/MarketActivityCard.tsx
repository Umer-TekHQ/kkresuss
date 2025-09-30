import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';

import { Images } from '../assets/index';
import { Colors } from '../theme/colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width: screenWidth } = Dimensions.get('window');

type MarketActivityCardProps = {
  coinName?: string;
  coinPrice?: string;
  marketCap?: string;
  priceChange?: string;
  isPositive?: boolean;
  buyersPercentage?: number;
  sellersPercentage?: number;
};

export const MarketActivityCard: React.FC<MarketActivityCardProps> = ({
  coinName = 'Jupiter',
  coinPrice = '$1.04',
  marketCap = '$1.41B',
  priceChange = '0.05%',
  isPositive = true,
  buyersPercentage = 40,
  sellersPercentage = 60,
}) => {
  const cardWidth = wp('88%')
  const gap = cardWidth * 0.13;

  return (
    <View style={[styles.marketActivityCard, { width: cardWidth }]}>
        <View style={styles.coinInfoHeader}>
            <Image 
              source={Images.coinLogo}
              style={styles.coinLogo}
              resizeMode="contain"
            />
          <View style={[{ flexDirection: 'row', gap: gap }]}>
            <View>
              <View>
                <Text style={styles.coinName}>{coinName}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.coinPrice}>{coinPrice}</Text>
                <Text style={styles.priceChangeText}> <Image source={Images.greenArrowUp} style={styles.greenArrow} />  {priceChange}</Text>
              </View>
              <View style={styles.marketCapital}>
                <Text style={styles.marketCapLabel}>Mkt Cap</Text>
                <Text style={styles.marketCapValue}>{marketCap}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.tradeButton}>
                <Image 
                  source={Images.tradeLogo}
                  style={styles.tradeIcon}
                  resizeMode="contain"
                />
                <Text style={styles.tradeButtonText}>Trade</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.marketDataRow}>
          <Text style={isPositive ? styles.positiveChange : styles.negativeChange} />
        </View>
      <View style={styles.buyersSellersContainer}>
        <View style={[styles.buyersBar, { width: `${buyersPercentage}%` }]} />
        <View style={[styles.sellersBar, { width: `${sellersPercentage}%` }]} />
      </View>
      <View style={styles.BsPercent}>
        <View style={styles.buyersSellers}>
          <Image source={Images.buyerLogo} resizeMode="contain" style={styles.bsLogo} />
          <Text style={styles.buyersText}>{buyersPercentage}% Buyers</Text>
        </View>
        <View style={styles.buyersSellers}>
          <Text style={styles.sellersText}>Sellers {sellersPercentage}%</Text>
          <Image source={Images.sellerLogo} resizeMode="contain" style={styles.bsLogo2} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    marketActivityCard: {
    width: "100%",
    marginRight: wp('3.5%'),
    backgroundColor: Colors.background3, 
    borderRadius: 15,
    padding: 10,
  },
  buyersSellers:{
    flexDirection: 'row', 
    gap: 5 
  },
    coinName: {
    color: Colors.white,
    fontSize: 16,
    marginTop: 5,
  },
    coinInfoHeader: {
    flexDirection: 'row',
  },
  coinLogo: {
    width: screenWidth * 0.16,
    height: screenWidth * 0.16,
    marginTop:5,
    marginRight: 10,
    borderRadius: 12
  },
  greenArrow:{
    width: 10,
    height: 10
  },
  tradeButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tradeIcon: {
    width: 11,
    height: 16,
    marginRight: 6,
    tintColor: Colors.black
  },
  tradeButtonText: {
    fontSize: 13,
    color: Colors.background,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',

  },
  coinPrice: {
    color: Colors.white,
    fontSize: 14,
  },
  marketCapital:{
    flexDirection: 'row',
  },
  marketDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  marketCapLabel: {
    fontSize: 13,
    color: Colors.lightblue,
  },
  marketCapValue: {
    fontSize: 13,
    color: Colors.lightblue,
    marginLeft: 5,
  },
  priceChangeText: {
    fontSize: 14,
    color: Colors.graphGreen,
    marginLeft: 18,
  },
  positiveChange: {
    color: Colors.greenBar,
  },
  negativeChange: {
    color: Colors.redBar,
  },
  buyersSellersContainer: {
    flexDirection: 'row',
    height: 2,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: Colors.dim,
    marginHorizontal: 12,
  },
  buyersBar: {
    backgroundColor: Colors.greenBar,
    marginRight: 4,
  },
  sellersBar: {
    backgroundColor: Colors.redBar,
  },
  BsPercent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginHorizontal: 12,
  },
  buyersText: {
    flexDirection: 'row',
    alignItems: 'center',
    color:  Colors.white,
    fontSize: 14,
  },
  bsLogo:{
    width: 16,
    height: 16,
  },
  bsLogo2:{
    width: 18,
    height: 18,
  },
  sellersText: {
    flexDirection: 'row',
    alignItems: 'center',
    color: Colors.white,
    fontSize: 14,
  },
  })