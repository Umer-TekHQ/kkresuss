import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet,Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Images } from '../assets';

const { width } = Dimensions.get('window');

const graphDataMap: Record<string, number[]> = {
  '1D': [20, 25, 30, 28, 26, 30, 32],
  '1W': [18, 24, 29, 31, 33, 35, 36],
  '1M': [15, 22, 27, 33, 38, 42, 47],
  '1Y': [10, 20, 25, 35, 40, 50, 55],
  'ALL': [5, 15, 20, 30, 40, 45, 50],
};

const ChartSection = () => {
  const [activeFilter, setActiveFilter] = useState('1D');
 const buyersPercent = 76;
  const sellersPercent = 24;
  const chartData = {
    labels: [],
    datasets: [
      {
        data: graphDataMap[activeFilter] || [],
        color: () => '#00FF99',
        strokeWidth: 1.5,
      },
    ],
  };

  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={chartData}
        width={width - 32}
        height={180}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        chartConfig={{
          backgroundColor: '#010D2A',
          backgroundGradientFrom: '#040640',
          backgroundGradientTo: '#040640',
          color: () => '#00FF99',
        }}
        bezier
        style={styles.chartStyle}
      />

      <View style={styles.timeFilterContainer}>
        {['1D', '1W', '1M', '1Y', 'ALL'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.timeFilterButton,
              activeFilter === filter && styles.activeTimeFilterButton,
            ]}
            onPress={() => setActiveFilter(filter)}
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
      <View style={styles.divider} />
      <View style={styles.progressBar}>
        <View style={[styles.greenBar, { width: `${buyersPercent}%` }]} />
        <View style={[styles.redBar, { width: `${sellersPercent}%` }]} />
      </View>

      
      <View style={styles.bottomRow}>
        <View style={styles.rowItem}>
          <Image source={Images.rocket} style={styles.icon} />
          <Text style={styles.label}>{buyersPercent}% Buyers</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>{sellersPercent}% Sellers</Text>
          <Image source={Images.cashout} style={styles.icon} />
        </View>
      </View>
<View style={styles.divider} />
    </View>
  );
};

export default ChartSection;



const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#112244',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 8,
  },
  chartStyle: {
    borderRadius: 12,
  },
  timeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    paddingBottom: 8,
  },
  timeFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activeTimeFilterButton: {
    backgroundColor: '#0734A9',
  },
  timeFilterText: {
    color: '#fff',
    fontSize: 12,
  },
  activeTimeFilterText: {
    color: '#000',
    fontWeight: 'bold',
  },

  progressBar: {
    flexDirection: 'row',
    height: 3,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#222',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  greenBar: {
    backgroundColor: '#4CAF50',
  },
  redBar: {
    backgroundColor: '#f44336',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    marginHorizontal: 6,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },divider: {
    height: 1,
    backgroundColor: '#334466',
    marginVertical: 10,
  },
});
