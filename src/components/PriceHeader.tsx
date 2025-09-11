import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Images } from '../assets';
import SecondaryButtonWithIcon from './SecondaryButtonWithIcon'


const PriceHeader = ({ data, onBack }: { data: any, onBack?: () => void }) => (
  
  <View style={styles.container}>
  
    <View style={styles.topBar}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Image source={Images.backScreen} style={styles.backIcon} />
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
      <Text style={styles.price}>${data.price}</Text>
 <View style={styles.subContainer}>
<Image source={Images.greenUp} style={styles.changeIcon} />
      <Text style={styles.sub}>
        {data.priceChange}
      <Text  style={styles.sub2}> @ {data.time}</Text>
      </Text>
   </View>
    </View>
  </View>
);

export default PriceHeader;
const styles = StyleSheet.create({
  container: {
     alignItems: 'center' ,
     paddingVertical:16,
     paddingHorizontal:16,
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
    color: '#30DB5B',
    fontSize: 14,
    marginTop: 4,
  },
   backIcon: {
    width: 30,
    height:30,
    resizeMode: 'contain',
    tintColor:'white'
  },sub2:{
     color: '#7AB7FD',
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
  marginTop:2,
},

});
