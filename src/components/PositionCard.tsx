import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Images } from '../assets';
import { AppNavigatorParamList } from '../navigators/routeNames';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function formatNumber(num: any) {
  if (num === undefined || num === null) return '0';
  if (num === Infinity) return '∞';
  if (typeof num === 'string' && num.toLowerCase() === 'infinity') return '∞';
  const n = Number(num);
  if (isNaN(n)) return num;
  return n.toLocaleString();
}

const InfoIcon = () => (
  <Image source={Images.pros} style={styles.infoIcon} />
);

const UpDownIcon = ({ percent }: { percent: number }) => (
  <Image
    source={percent >= 0 ? Images.greenArrowUp : Images.redDown}
    style={styles.percentIcon}
  />
);

const PositionCard = ({ data }: { data: any }) => {
  const {
    logo,
    value,
    yearHigh,
    yearHighPercent,
    quantityOwned,
    holders,
    circulatingSupply,
    maxSupply,
    usdePriceChange24hr,
    priceChangePercentChange,
  } = data || {};

    const percent = Number(priceChangePercentChange ?? 0);
    const isProfit = percent >= 0;

    const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Your Position</Text>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.tokenImage} />
        ) : (
          <Image source={Images.titanium} style={styles.tokenImage} />
        )}
      </View>
      <View style={styles.divider} />
      <View style={styles.valueRowMain}>
        <Text style={styles.valueLabel}>Value</Text>
        <Text style={styles.valueMain}>
          {value !== undefined ? `$${formatNumber(value)}` : '$0.00'}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <View style={styles.metricLabelRow}>
            <Text style={styles.metricLabel}>Today's Return</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TodayReturns')}>
                <InfoIcon />
            </TouchableOpacity>
            
          </View>
            <View style={styles.metricValueRow}>
              <Text style={styles.metricValue}>
                {usdePriceChange24hr !== undefined ? `$${formatNumber(usdePriceChange24hr)}` : '$0.00'}
              </Text>
              <Image
                source={isProfit ? Images.greenArrowUp : Images.redDown}
                style={{ width: 12, height: 12, marginHorizontal: 4 }}
              />
              <Text style={isProfit ? styles.greenText : styles.redText}>
                {`${Math.abs(percent).toFixed(2)}%`}
              </Text>
            </View>
        </View>
        <View style={styles.metricBlock}>
          <View style={styles.metricLabelRow}>
            <Text style={styles.metricLabel}>1-Year High</Text>
            <TouchableOpacity>
                <InfoIcon />
            </TouchableOpacity>
            
          </View>
          <View style={styles.metricValueRow}>
            <Text style={styles.metricValue}>
              {yearHigh !== undefined ? `$${formatNumber(yearHigh)}` : '$0.00'}
            </Text>
            <UpDownIcon percent={Number(yearHighPercent ?? 0)} />
            <Text
              style={(Number(yearHighPercent ?? 0)) >= 0 ? styles.greenText : styles.redText}
            >
              {`${Math.abs(Number(yearHighPercent ?? 0)).toFixed(2)}%`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <View style={styles.metricLabelRow}>
            <Text style={styles.metricLabel}>Quantity Owned</Text>
            <TouchableOpacity>
                <InfoIcon />
            </TouchableOpacity>
          </View>
          <Text style={styles.metricValue}>{formatNumber(quantityOwned)}</Text>
        </View>
        <View style={styles.metricBlock}>
          <View style={styles.metricLabelRow}>
            <Text style={styles.metricLabel}>Holders</Text>
            <TouchableOpacity>
                <InfoIcon />
            </TouchableOpacity>
          </View>
          <Text style={styles.metricValue}>{formatNumber(holders)}</Text>
        </View>
      </View>
      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <View style={styles.metricLabelRow}>
            <Text style={styles.metricLabel}>Circulating Supply</Text>
            <TouchableOpacity>
                <InfoIcon />
            </TouchableOpacity>
          </View>
          <Text style={styles.metricValue}>{formatNumber(circulatingSupply)}</Text>
        </View>
        <View style={styles.metricBlock}>
          <View style={styles.metricLabelRow}>
            <Text style={styles.metricLabel}>Maximum Supply</Text>
            <TouchableOpacity>
                <InfoIcon />
            </TouchableOpacity>
          </View>
          <Text style={styles.metricValue}>{formatNumber(maxSupply)}</Text>
        </View>
      </View>
    </View>
  );
};

export default PositionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#080C4C',
    marginHorizontal: 8,
    marginBottom: 16,
    padding: 20,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  tokenImage: {
    width: 35,
    height: 35,
    borderRadius: 24,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#0734A9',
    marginVertical: 14,
  },
  valueRowMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  valueLabel: {
    color: '#ADD2FD',
    fontSize: 16,
    fontWeight: '500',
  },
  valueMain: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 2,
  },
  metricBlock: {
    flex: 1,
    marginRight: 12,
  },
  metricLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  metricLabel: {
    color: '#ADD2FD',
    fontSize: 14,
    marginRight: 4,
  },
  infoIcon: {
    width: 25,
    height: 25,
    tintColor: '#ADD2FD',
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  metricValue: {
    color: '#fff',
    fontSize: 16,
    marginRight: 6,
  },
  percentIcon: {
    width: 14,
    height: 12,
    marginRight: 2,
    marginLeft: 2,
    resizeMode: 'contain',
  },
  greenText: {
    color: '#30DB5B',
    fontSize: 15,
    fontWeight: '600',
  },
  redText: {
    color: '#FF4D4F',
    fontSize: 15,
    fontWeight: '600',
  },
});