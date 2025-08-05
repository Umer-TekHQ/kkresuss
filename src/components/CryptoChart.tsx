import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
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

const CryptoChart = () => {
  const [activeFilter, setActiveFilter] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1D');

  const chartData = {
    labels: [],
    datasets: [
      {
        data: graphDataMap[activeFilter],
        color: () => '#00FF99',
        strokeWidth: 1.5,
      },
    ],
  };

  return (
    <View style={styles.chartContainer}>
   
      <TouchableOpacity style={styles.insuredButton}>
        <Image source={Images.insured} style={styles.insuredIcon} />
        <Text style={styles.insuredButtonText}>Get Insured</Text>
      </TouchableOpacity>

     
      <View style={styles.priceContainer}>
        <Text style={styles.price}>$23,000</Text>
        <Text style={styles.subInfo}>
          <Text style={styles.greenText}>$440.22 (1.92%) </Text>
          <Text style={styles.whiteText}>@3:36 am</Text>
        </Text>
      </View>

  
      <LineChart
        data={chartData}
        width={width}
        height={180}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        chartConfig={{
          backgroundColor: '#01021D',
          backgroundGradientFrom: '#01021D',
          backgroundGradientTo: '#01021D',
          fillShadowGradient: '#00FF99',
           fillShadowGradientOpacity: 0.2,
    color: () => '#00FF99',
    strokeWidth: 2,
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
            onPress={() => setActiveFilter(filter as any)}
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

export default CryptoChart;

const styles = StyleSheet.create({
  chartContainer: {
    width: '100%',
    paddingVertical: 2,
  },
  insuredButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#4898F3',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 1,
    alignItems: 'center',
  },
  insuredIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    resizeMode: 'contain',
  },
  insuredButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  priceContainer: {
    marginTop: 6,
    alignItems: 'center',
  },
  price: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: 'bold',
  },
  subInfo: {
    marginTop: 4,
    fontSize: 13,
  },
  greenText: {
    color: '#4CAF50',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  chartStyle: {
    marginTop: 6,
    //  backgroundColor: '#01021D', 
  },
  timeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 2,
    paddingBottom: 4,
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
  chartWrapper: {
  marginHorizontal: 0, 
  paddingHorizontal: 0, 
},

});
