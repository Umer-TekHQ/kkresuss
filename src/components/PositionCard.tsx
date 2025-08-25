import React from 'react';
import { View, Text, StyleSheet, Image ,TouchableOpacity } from 'react-native';
import { Images } from '../assets'
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../navigators/routeNames';


const PositionCard = ({ data }: { data: any }) =>{
   const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
 return (
  <View style={styles.card}>

    <View style={styles.headerRow}>
      <Text style={styles.title}>Your Position</Text>
      <Image source={Images.titanium} style={styles.iconRight} /> 
   
    </View>

    <View style={styles.divider} />

   
    <View style={styles.rowSpaceBetween}>
      <Text style={styles.label}>Value</Text>
      <Text style={styles.value}>${data.position.value}</Text>
    </View>

    <View style={styles.divider} />

<View style={styles.metricRow}>

  <View style={styles.metricBlock}>
    <View style={styles.iconRow}>
      <TouchableOpacity onPress={() => navigation.navigate('TodayReturns')}>
        <Text style={styles.metricLabel}>Today's Return</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TodayReturns')}>
      <Image source={Images.identity} style={styles.iconSmall} />
      </TouchableOpacity>
    </View>

    <View style={styles.valueRow}>
      <Text style={styles.whiteText}>{data.position.todayReturn} </Text>
      <Image
        source={
          parseFloat(data.position.todayReturnPercent) >= 0
            ? Images.greenup
            : Images.reddown
        }
        style={styles.changeIcon}
      />
      <Text
        style={
          parseFloat(data.position.todayReturnPercent) >= 0
            ? styles.greenText
            : styles.redText
        }
      >
        {data.position.todayReturnPercent}
      </Text>
    </View>
  </View>


  <View style={styles.metricBlock}>
    <View style={styles.iconRow}>
      <TouchableOpacity>
        <Text style={styles.metricLabel}>1-Year High</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Image source={Images.identity} style={styles.iconSmall} />
      </TouchableOpacity>
    </View>

    <View style={styles.valueRow}>
      <Text style={styles.whiteText}>{data.position.yearHigh} </Text>
      <Image
        source={
          parseFloat(data.position.yearHighPercent) >= 0
            ? Images.greenup
            : Images.reddown
        }
        style={styles.changeIcon}
      />
      <Text
        style={
          parseFloat(data.position.yearHighPercent) >= 0
            ? styles.greenText
            : styles.redText
        }
      >
        {data.position.yearHighPercent}
      </Text>
    </View>
  </View>
</View>

    <View style={styles.metricRow}>
      <View style={styles.metricBlock}>
        <TouchableOpacity>
        <Text style={styles.metricLabel}>Quantity Owned</Text>
        </TouchableOpacity>
        <Text style={styles.lightValue}>{data.position.quantityOwned}</Text>
      </View>

      <View style={styles.metricBlock}>
         <View style={styles.iconRow}>
        <TouchableOpacity>
        <Text style={styles.metricLabel}>Holders</Text>
        </TouchableOpacity>
        <TouchableOpacity>
         <Image source={Images.identity} style={styles.iconSmall} />
        </TouchableOpacity>       
         </View>
        <Text style={styles.lightValue}>{data.position.holders}</Text>
      </View>
    </View>


    <View style={styles.metricRow}>
      <View style={styles.metricBlock}>
        <View style={styles.iconRow}>
          <TouchableOpacity>
          <Text style={styles.metricLabel}>Circulating Supply</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Image source={Images.identity} style={styles.iconSmall} />
          </TouchableOpacity>
        </View>
        <Text style={styles.lightValue}>{data.position.circulatingSupply}</Text>
      </View>

      <View style={styles.metricBlock}>
        <View style={styles.iconRow}>
          <TouchableOpacity>
          <Text style={styles.metricLabel}>Maximum Supply</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Image source={Images.identity} style={styles.iconSmall} />
          </TouchableOpacity>
        </View>
        <Text style={styles.lightValue}>{data.position.maxSupply}</Text>
      </View>
    </View>




  </View>
);
};
export default PositionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#080C4C',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  iconRight: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  divider: {
    height: 1,
    backgroundColor: '#0734A9',
    marginVertical: 10,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  metricBlock: {
    flex: 1,
    marginRight: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    color: '#ADD2FD',
    fontSize: 13,
  },
  iconSmall: {
    width: 12,
    height: 12,
    marginLeft: 4,
    tintColor:'#ADD2FD'
  },
  greenText: {
    color: '#00FF99',
    fontSize: 13,
    fontWeight: '500',
   // marginTop: 2,
  },
  redText: {
    color: '#FF5C5C',
    fontSize: 13,
    fontWeight: '500',
   // marginTop: 2,
  },
  lightValue: {
    color: 'white',
    fontSize: 15,
    marginTop: 2,
  },
  label: {
  color: '#ADD2FD',
  fontSize: 13,
  marginTop: 4,
},

contractRow: {
  marginTop: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
contractLabel: {
  color: '#999',
  fontSize: 12,
},
copyRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
contractCode: {
  color: '#FFFFFF',
  fontSize: 12,
  marginRight: 6,
},
copyIcon: {
  width: 14,
  height: 14,
  tintColor: '#00FF99',
},
whiteText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '500',
},
metricRowText: {
  marginTop: 2,
},
changeIcon: {
  width: 12,
  height: 12,
  resizeMode: 'contain',
  marginRight: 4,
},
valueRow: {
 flexDirection: 'row',
  alignItems: 'center',
  marginTop: 2,
},


});


