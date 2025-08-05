import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useState } from 'react';

type SummaryCardProps = {
  currency?: string;
  totalValue?: string;
  changeAmount?: string;
  changePercentage?: string;
  time?: string;
  isPositive?: boolean;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const graphDataMap: Record<string, number[]> = {
  '1D': [20,30,20,10, 65, 70, 48, 56, 60, 72, 40, 55, 30, 68, 66, 70, 75, 15, 20, 30, 40, 45, 50, 40, 30],
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

  const chartData = graphDataMap[activeFilter].map((value) => ({ value }));

  const cardWidth = screenWidth * 0.86;
  const cardHeight = screenHeight * 0.31;

  return (
    <View style={[styles.summaryCard, { height: cardHeight, width: cardWidth, marginRight: screenWidth * 0.05 }]}>
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

      <View style={{ marginTop: 10, marginBottom: 8, height: cardHeight * 0.23, width: '100%' }}>
        <LineChart
          data={chartData}
          width={cardWidth * 0.92}
          height={cardHeight * 0.26}
          curved
          areaChart
          spacing={13}
          thickness={2}
          color="#00FF99"
          startFillColor="#00FF99"
          endFillColor="#00FF99"
          startOpacity={0.45}
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
          initialSpacing={30}
          adjustToWidth
        />
      </View>

      <View style={styles.timeFilterContainer}>
        {['1D', '1W', '1M', '1Y', 'ALL'].map((filter) => (
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
    justifyContent: 'space-around',
    marginTop: 10,
  },
  timeFilterButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#1a1a3c',
  },
  activeTimeFilterButton: {
    backgroundColor: '#0E1E83',
  },
  timeFilterText: {
    color: '#fff',
    fontSize: 12,
  },
  activeTimeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summaryCard: {
    borderTopWidth: 1.5,
    marginTop: 10,
    borderColor: '#0E1E83',
    backgroundColor: '#080C4C',
    borderRadius: 16,
    padding: 10,
    marginBottom: 8,
  },
  summaryTopSection: {
    marginBottom: 3,
  },
  cryptoTotalValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 3,
    marginLeft: 7
  },
  cryptoChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoChangeText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 7
  },
  cryptoChangeTime: {
    color: 'lightblue',
    fontSize: 12,
  },
  positiveChange: {
    color: '#00FF85',
  },
  negativeChange: {
    color: '#FF4D4D',
  },
  currencyhead:{
    width: 62,
    height: 25,
    color: '#ADD2FD',
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 7
  },
});