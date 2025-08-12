import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type SummaryCardProps = {
  currency?: string;
  totalValue?: string;
  changeAmount?: string;
  changePercentage?: string;
  time?: string;
  isPositive?: boolean;
};

const graphDataMap: Record<string, number[]> = {
  '1D': [10,20,20,30,20,10, 65, 70, 48, 56, 60, 72, 40, 55, 30, 68, 66, 70, 75, 15, 20, 30, 40, 45, 50, 40, 30],
  '1W': [12, 70, 48, 55, 52, 63, 70, 42, 58, 28, 66, 64, 28, 73, 28, 22, 32, 38, 43, 52, 42, 33],
  '1M': [14, 42, 92, 67, 55, 65, 74, 39, 53, 31, 70, 67, 62, 78, 37, 21, 29, 42, 47, 54, 38, 29],
  '1Y': [11, 68, 66, 70, 54, 62, 71, 41, 56, 33, 69, 65, 39, 76, 16, 24, 28, 36, 44, 49, 37, 34],
  'ALL':[13, 83, 49, 26, 57, 61, 73, 38, 54, 29, 67, 63, 61, 74, 59, 23, 31, 39, 46, 51, 41, 32],
};

export const SummaryCard: React.FC<SummaryCardProps> = ({
  currency = 'Crypto',
  totalValue = '$21,047.82',
  changeAmount = '$547.12',
  changePercentage = '12.2%',
  time = '3:31 PM',
  isPositive = true,
}) => {
  const [activeFilter, setActiveFilter] = useState('1D');
  const onFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const chartData = graphDataMap[activeFilter].map(value => ({ value }));

  const MAX_CARD_HEIGHT = hp('44%');  
  const MIN_CARD_HEIGHT = hp('28%'); 
  let cardHeight = hp('33%'); 
  if (cardHeight > MAX_CARD_HEIGHT) cardHeight = MAX_CARD_HEIGHT;
  if (cardHeight < MIN_CARD_HEIGHT) cardHeight = MIN_CARD_HEIGHT;

  const cardWidth = wp('85%'); 

  return (
    <View
      style={[
        styles.summaryCard,
        {
          height: cardHeight,
          width: cardWidth,
          marginRight: wp('3.5%'),
          padding: Math.min(0, cardHeight * 0.07), 
        },
      ]}
    >
      <View style={styles.summaryTopSection}>
        <Text style={styles.currencyhead}>{currency}</Text>
        <Text style={styles.cryptoTotalValue}>{totalValue}</Text>
        <View style={styles.cryptoChangeRow}>
          <Text
            style={[
              styles.cryptoChangeText,
              isPositive ? styles.positiveChange : styles.negativeChange,
            ]}
          >
            {changeAmount} ({changePercentage})
          </Text>
          <Text style={styles.cryptoChangeTime}> @ {time}</Text>
        </View>
      </View>

      <View style={{ marginTop: hp('1.3%'), height: cardHeight * 0.23, width: '100%' }}>
        <LineChart
          data={chartData}
          width={cardWidth * 0.9}
          height={cardHeight * 0.20}
          curved
          areaChart
          spacing={12}
          thickness={2}
          color="#00FF99"
          startFillColor="#00FF99"
          endFillColor="#00FF99"
          startOpacity={0.35}
          endOpacity={0.01}
          hideDataPoints
          hideRules
          hideYAxisText
          backgroundColor="transparent"
          isAnimated
          animateOnDataChange
          animationDuration={400}
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisLabelWidth={0}
          initialSpacing={0}
          adjustToWidth
        />
      </View>
      <View style={styles.timeFilterContainer}>
        {['1D', '1W', '1M', '1Y', 'ALL'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.timeFilterButton,
              activeFilter === filter && styles.activeTimeFilterButton,
            ]}
            onPress={() => onFilterChange(filter)}
          >
            <Text
              style={[
                styles.timeFilterText,
                activeFilter === filter && styles.activeTimeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('0.8%'),
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.05,
    borderRightWidth: 0.05,
    borderRadius: wp('3%'),
    marginHorizontal: wp('2.5%'),
    backgroundColor: '#121547ff',
    borderColor: '#23298A',
    padding: hp('1%'),
  },
  timeFilterButton: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.4%'),
    borderRadius: wp('1.2%'),
  },
  activeTimeFilterButton: {
    backgroundColor: '#0E1E83',
  },
  timeFilterText: {
    color: 'lightblue',
    fontSize: wp('3.2%'),
  },
  activeTimeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summaryCard: {
    borderTopWidth: 1.5,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
    marginTop: hp('1%'),
    borderColor: '#0E1E83',
    backgroundColor: '#080C4C',
    borderRadius: wp('5%'),
    padding: wp('2.5%'),
    marginBottom: hp('1.2%'),
  },
  summaryTopSection: {
    marginBottom: hp('0.8%'),
    padding: wp('1%'),
  },
  cryptoTotalValue: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp('0.6%'),
    marginLeft: wp('4%'),
  },
  cryptoChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoChangeText: {
    fontSize: wp('3.2%'),
    fontWeight: '700',
    marginLeft: wp('4%'),
  },
  cryptoChangeTime: {
    color: 'lightblue',
    fontSize: wp('3.2%'),
  },
  positiveChange: {
    color: '#00FF85',
  },
  negativeChange: {
    color: '#FF4D4D',
  },
  currencyhead: {
    width: wp('20%'),
    height: hp('3.5%'),
    color: '#ADD2FD',
    fontSize: wp('5.2%'),
    marginBottom: hp('0.7%'),
    marginLeft: wp('4%'),
    // marginTop: hp('4%'),
  },
});
