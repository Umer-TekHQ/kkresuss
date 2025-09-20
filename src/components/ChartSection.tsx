import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

const graphDataMap: Record<string, number[]> = {
  '1D': [14, 42, 92,67, 55, 65, 74, 39, 53, 31, 70, 67, 62, 78, 37, 21, 29, 42, 47, 54, 38, 29 ],
  '1W': [12, 70, 48, 55, 52, 63, 70, 42, 58, 28, 66, 64, 28, 73, 28, 22, 32, 38, 43, 52, 42, 33],
  '1M': [14, 42, 92, 67, 55, 65, 74, 39, 53, 31, 70, 67, 62, 78, 37, 21, 29, 42, 47, 54, 38, 29],
  '1Y': [11, 68, 66, 70, 54, 62, 71, 41, 56, 33, 69, 65, 39, 76, 16, 24, 28, 36, 44, 49, 37, 34],
  'ALL':[13, 83, 49, 26, 57, 61, 73, 38, 54, 29, 67, 63, 61, 74, 59, 23, 31, 39, 46, 51, 41, 32],
};

const ChartSection = () => {
  const [activeFilter, setActiveFilter] = useState('1D');
  const buyersPercent = 76;
  const sellersPercent = 24;
  const chartData = graphDataMap[activeFilter].map((value) => ({ value }));

  return (
    <View style={styles.chartContainer}>
      
      <LineChart
        data={chartData}
        width={width * 0.91}
        height={140}
        curved
        areaChart
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
        endSpacing={0}
        adjustToWidth
      />

      <View style={{marginHorizontal:16}}>
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
          <Image source={Images.buyerLogo} style={styles.icon} />
          <Text style={styles.label}>{buyersPercent}% Buyers</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Sellers{sellersPercent}%</Text>
          <Image source={Images.sellerLogo} style={styles.icon2} />
        </View>
      </View>

      <View style={styles.divider} />
      </View>
    </View>
  );
};

export default ChartSection;

const styles = StyleSheet.create({
  chartContainer: {
    borderRadius: 12,
  },
  timeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
   
  },
  timeFilterButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    textAlign:'center',
    justifyContent:'center'
  },
  activeTimeFilterButton: {
    backgroundColor: Colors.fieldBorder,
  },
  timeFilterText: {
    color: Colors.lightblue,
    fontSize: 12,
  },
  activeTimeFilterText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  progressBar: {
    flexDirection: 'row',
    height: 3,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: Colors.black,
    marginBottom: 12,
    gap: 2,
  },
  greenBar: {
    backgroundColor: Colors.greenBar,
  },
  redBar: {
    backgroundColor: Colors.redBar,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 6,
  },
  icon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  icon2: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.fieldBorder,
    marginVertical: 10,
  },
});



