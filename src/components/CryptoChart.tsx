import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import { Images } from '../assets'; 
import { LineChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');

const graphDataMap: Record<string, number[]> = {
  '1D': [12, 70, 48, 55, 52, 63, 70, 42, 58, 28, 66, 64, 28, 73, 28, 22, 32, 38, 43, 52, 42, 33],
  '1W': [18, 24, 29, 31, 33, 35, 36],
  '1M': [15, 22, 27, 33, 38, 42, 47],
  '1Y': [10, 20, 25, 35, 40, 50, 55],
  'ALL': [5, 15, 20, 30, 40, 45, 50,10,40,20],
};

const CryptoChart = () => {
  const [activeFilter, setActiveFilter] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1D');


  const chartData = graphDataMap[activeFilter].map((value) => ({
    value,
  }));

  return (
    <View style={styles.chartContainer}>
     
      <TouchableOpacity style={styles.insuredButton}>
        <Image source={Images.insured} style={styles.insuredIcon} />
        <Text style={styles.insuredButtonText}>Get Insured</Text>
      </TouchableOpacity>

      <View style={styles.priceContainer}>
  <Text style={styles.price}>$23,000</Text>

  <View style={styles.subInfo}>
    <Image
      source={Images.greenup}
      style={styles.greenUpIcon}
    />
    <Text style={styles.greenText}>$440.22 (1.92%) </Text>
    <Text style={styles.whiteText}>@3:36 am</Text>
  </View>
</View>


      <View style={{ marginTop: 10 }}>
        <LineChart
          data={chartData}
          width={width}
          height={130}
          curved
          areaChart
          spacing={width / (chartData.length -1)} 
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
          adjustToWidth={false}
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
    //fontSize: 13,
    flexDirection:'row',
    alignItems:'center'
  },
  greenText: {
    color: '#30DB5B',
    fontWeight:'semibold',
    fontSize:13,
  },
  whiteText: {
    color: '#ADD2FD',
    fontWeight:'semibold',
    fontSize:13,
  },
greenUpIcon: {
  width: 12,
  height: 12,
  resizeMode: 'contain',
  marginRight: 4,
},

  timeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 6,
    paddingBottom: 4,
  },
  timeFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
   height:30,
    justifyContent: 'center', 
  alignItems: 'center',  
  },
  activeTimeFilterButton: {
    backgroundColor: '#0734A9',
  },
  timeFilterText: {
    color: '#7AB7FD',
    fontSize: 13,
    fontWeight:'semibold'
  },
  activeTimeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
