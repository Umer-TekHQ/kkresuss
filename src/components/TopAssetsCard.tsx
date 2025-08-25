import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { Images } from '../assets';

type TopAssetsCardProps = {
  showChange?: boolean;
    onAssetPress?: (asset: Asset) => void;
};
type Asset = {
  name: string;
  short: string;
  change: string;
  price: string;
  amount: string;
  logo: any;
  isPositive: boolean;
};


const assets:Asset [] = [
  {
    name: 'Ethereum',
    short: 'ETH',
    change: '1.92%',
    price: '$2,047.62',
    amount: '8.03',
    logo: Images.etherium,
    isPositive: true,
  },
  {
    name: 'Bitcoin',
    short: 'BTC',
    change: '2.10%',
    price: '$15,751.87',
    amount: '0.02845532',
    logo: Images.bitcoin,
    isPositive: false,
  },
  {
    name: 'Solana',
    short: 'SOL',
    change: '1.93%',
    price: '$209.30',
    amount: '12.5',
    logo: Images.sol,
    isPositive: true,
  },
];

const TopAssetsCard = ({ showChange = true ,onAssetPress }:TopAssetsCardProps) => {
  return (
    <View style={styles.card}>
      {assets.map((item, index) => (
        <View key={index}>
         <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onAssetPress?.(item)}
          >
          <View style={styles.row}>
            <Image source={item.logo} style={styles.logo} />
            <View style={styles.assetInfo}>
              <Text style={styles.assetName}>{item.name}</Text>
              <Text style={styles.assetSymbol}>{item.short}</Text>
            </View>
            {/* {showChange ? (
            <Text style={[styles.change, { color: item.isPositive ? '#5AD78E' : '#FF5A5F' }]}>
              {item.change}
            </Text>
             ) : (
               <View style={styles.change} />
             )} */}
                {showChange ? (
                  <View style={styles.changeContainer}>
                    <Image
                      source={item.isPositive ? Images.greenup : Images.reddown}
                      style={styles.changeIcon}
                    />
                    <Text
                      style={[
                        styles.changeText,
                        { color: item.isPositive ? '#5AD78E' : '#FF5A5F' },
                      ]}
                    >
                      {item.change}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.changeContainer} />
                )}


            <View style={styles.priceBlock}>
                  <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.amount}>{item.amount}</Text>
          
            </View>
         </View>
         </TouchableOpacity>
          {index !== assets.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
};

export default TopAssetsCard;

const styles = StyleSheet.create({
  card: {
    width: 345,
    backgroundColor: '#080C4C',
    borderRadius: 20,
    borderTopWidth: 1,
    borderColor: '#1E2D56',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingVertical: 12,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
  assetInfo: {

    width: 100, 
  },
  assetName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  assetSymbol: {
    color: '#7AB7FD',
    fontSize: 12,
    marginTop: 2,
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
    width: 60,
    textAlign: 'left',
    marginRight: 10,
    right:28,
    bottom:8,
  },
  priceBlock: {
    alignItems: 'flex-end',
    flex: 1,
  },
  price: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    textAlign:'right'
  },
  amount: {
    color: '#7AB7FD',
    fontSize: 13,
    marginBottom: 2,
   // alignSelf: 'flex-start', 
   // left:25,   //increased as per qa reuirement 
  
  },
  divider: {
    height: 1,
    backgroundColor: '#01032C',
    marginLeft: 40,
    width: 287,
    marginVertical: 4,
  },
 changeContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: 60,
  marginRight: 10,
  bottom:7,
  right:32
},
changeIcon: {
  width: 11,
  height: 11,
  resizeMode: 'contain',
  marginRight: 12,
  left:9
},
changeText: {
  fontSize: 13,
  fontWeight: '600',
},


});
