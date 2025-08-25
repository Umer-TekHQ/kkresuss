import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from '../styles/homestyles';
import { Images } from '../assets/index';

const { width: screenWidth } = Dimensions.get('window');

type MarketActivityCardProps = {
  coinName?: string;
  coinPrice?: string;
  marketCap?: string;
  priceChange?: string;
  isPositive?: boolean;
  buyersPercentage?: number;
  sellersPercentage?: number;
  coinLogoPath?: any; 
  tradeIconPath?: any;
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
  const cardWidth = screenWidth * 0.87;
  const gap = cardWidth * 0.08;

  return (
    <View style={[styles.marketActivityCard, { width: cardWidth }]}>
        <View style={styles.coinInfoHeader}>
            <Image 
              source={Images.coinlogo}
              style={styles.coinLogo}
              resizeMode="contain"
            />
          <View style={{ flexDirection: 'row', gap: gap }}>
            <View>
              <View>
                <Text style={styles.coinName}>{coinName}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.coinPrice}>{coinPrice}</Text>
                <Text style={styles.priceChangeText}> {priceChange}</Text>
              </View>
              <View style={styles.mktcap}>
                <Text style={styles.marketCapLabel}>Mkt Cap</Text>
                <Text style={styles.marketCapValue}>{marketCap}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.tradeButton}>
                <Image 
                  source={Images.tradelogo}
                  style={styles.tradeIcon}
                  resizeMode="contain"
                />
                <Text style={styles.tradeButtonText}>Trade</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.marketDataRow}>
          <Text style={[
            isPositive ? styles.positiveChange : styles.negativeChange
          ]}>
          </Text>
        </View>
      <View style={styles.buyersSellersContainer}>
        <View style={[styles.buyersBar, { width: `${buyersPercentage}%` }]} />
        <View style={[styles.sellersBar, { width: `${sellersPercentage}%` }]} />
      </View>
      <View style={styles.BSpercent}>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Image source={Images.buyerlogo} resizeMode="contain" />
          <Text style={styles.buyersText}>{buyersPercentage}% Buyers</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={styles.sellersText}>Sellers {sellersPercentage}%</Text>
          <Image source={Images.sellerlogo} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};

