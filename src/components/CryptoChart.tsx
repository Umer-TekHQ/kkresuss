import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

  const MAX_CARD_HEIGHT = hp('44%');  
  const MIN_CARD_HEIGHT = hp('28%'); 
  let cardHeight = hp('33%'); 
  if (cardHeight > MAX_CARD_HEIGHT) cardHeight = MAX_CARD_HEIGHT;
  if (cardHeight < MIN_CARD_HEIGHT) cardHeight = MIN_CARD_HEIGHT;

  const cardWidth = wp('88%'); 

const graphDataMap: Record<string, number[]> = {
  '1D': [1,50,20,30,20,10, 65, 70, 48, 56, 60, 72, 40, 55, 30, 68, 66, 70, 75, 15, 20, 30, 40, 45, 50, 40, 30,32, 38, 43, 52],
  '1W': [12, 70, 48, 55, 52, 63, 70, 42, 58, 72, 40, 55, 30, 68, 66, 70, 75, 15, 20, 30, 40, 45, 50, 40, 30,32, 38, 43, 52, 42, 33],
  '1M': [14, 42, 92, 67, 55, 65, 74, 39, 53, 31, 70, 67, 62, 78, 37, 21, 29, 42, 47, 54, 38, 29, 45, 50, 40, 30,32, 38, 43, 52, 42],
  '1Y': [11, 68, 66, 70, 54, 62, 71, 41, 56, 33, 69, 65, 39, 76, 16, 24, 28, 36, 44, 49, 37, 34, 45, 50, 40, 30,32, 38, 43, 52, 42],
  'ALL':[13, 83, 49, 26, 57, 61, 73, 38, 54, 29, 67, 63, 61, 74, 59, 23, 31, 39, 46, 51, 41, 32, 45, 50, 40, 30,32, 38, 43, 52, 42],
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
      source={Images.greenArrowUp}
      style={styles.greenUpIcon}
    />
    <Text style={styles.greenText}>$440.22 (1.92%) </Text>
    <Text style={styles.whiteText}>@3:36 am</Text>
  </View>
</View>


      <View style={{ marginTop: hp('5.5%'), marginBottom: hp('5%'), height: cardHeight * 0.23, width: '100%' }}>
              <LineChart
                data={chartData}
                width={cardWidth * 1}
                height={cardHeight * 0.20}
                curved
                areaChart
                spacing={12}
                thickness={2}
                color="#00FF99"
                startFillColor="#00FF99"
                endFillColor="#00FF99"
                startOpacity={0.65}
                endOpacity={0.01}
                hideDataPoints
                hideRules
                hideYAxisText
                backgroundColor="transparent"
                isAnimated={true}
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
    borderColor: Colors.blue,
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
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  priceContainer: {
    marginTop: 6,
    alignItems: 'center',
  },
  price: {
    color: Colors.white,
    fontSize: 50,
    fontWeight: 'bold',
  },
  subInfo: {
    marginTop: 4,
    flexDirection:'row',
    alignItems:'center'
  },
  greenText: {
    color: Colors.transaction,
    fontWeight:'semibold',
    fontSize:13,
  },
  whiteText: {
    color: Colors.lightblue,
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
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'center', 
  alignItems: 'center',  
  },
  activeTimeFilterButton: {
    backgroundColor: Colors.fieldBorder,
  },
  timeFilterText: {
    color: Colors.lightblue,
    fontSize: 13,
    fontWeight:'semibold'
  },
  activeTimeFilterText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
