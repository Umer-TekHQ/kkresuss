import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Images } from '../assets';
import SecondaryButtonWithIcon from './SecondaryButtonWithIcon';
import { Colors } from '../theme/colors';

const PriceHeader = ({ data, onBack }: { data: any; onBack?: () => void }) => {
  const currentTime = moment().format('hh:mm A'); 

  const formattedPrice = Number(data.usdPrice || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const changeValue = Number(data.usdePriceChange24hr || 0);
  const formattedChange = Math.abs(changeValue).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const percentChange = Number(data.priceChangePercentChange || 0);
  const formattedPercentChange = Math.abs(percentChange).toFixed(2); 

  const isProfit = changeValue >= 0;


  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={Images.backButton} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          {data.image && (
            <Image
              source={{ uri: data.image }}
              style={styles.tokenImage}
              defaultSource={Images.token4}
            />
          )}
          <Text style={styles.title}>{data.name}</Text>
        </View>
      </View>

      <SecondaryButtonWithIcon label=" Get Insured" onPress={() => {}} />

      <View style={styles.priceBox}>
        <Text style={styles.price}>${formattedPrice}</Text>
        <View style={styles.subContainer}>
          <Image
            source={isProfit ? Images.greenArrowUp : Images.redDown}
            style={styles.changeIcon}
          />
          
            <View style={styles.subContainer}>
            
            <Text
              style={[
                styles.sub,
                { color: isProfit ? Colors.transaction : Colors.redBar },
              ]}
            >
              ${formattedChange} ({formattedPercentChange}%)
              <Text style={styles.sub2}> @ {currentTime}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PriceHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  priceBox: { alignItems: 'center' },
  price: {
    color: Colors.white,
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sub: {
    fontSize: 14,
    marginTop: 4,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  sub2: {
    color: Colors.lightblue,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  changeIcon: {
    width: 10,
    height: 12,
    resizeMode: 'contain',
    marginRight: 4,
    marginTop: 8,
  },
});
