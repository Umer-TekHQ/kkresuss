import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Images } from '../assets';
import SecondaryButton from './SecondaryButton';


const PriceHeader = ({ data, onBack }: { data: any, onBack?: () => void }) => (
  
  <View style={styles.container}>
  
    <View style={styles.topBar}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Image source={Images.backscreen} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{data.name}</Text>
    </View>

   
    <SecondaryButton label='Get insured'/>

    
    <View style={styles.priceBox}>
      <Text style={styles.price}>${data.price}</Text>
      <Text style={styles.sub}>{data.priceChange} <Text  style={styles.sub2}> @ {data.time}</Text></Text>
    </View>
  </View>
);

export default PriceHeader;
const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 12,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  insureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E88E5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  insureText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  insureIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  priceBox: { alignItems: 'center' },
  price: {
    
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sub: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 4,
  },
   backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },sub2:{
     color: '#7AB7FD',
  }
});
