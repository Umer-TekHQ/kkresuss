import React from 'react';
import { View, Text, StyleSheet, Image ,TouchableOpacity } from 'react-native';
import { Images } from '../assets'

const PositionCard = ({ data }: { data: any }) => (
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
          <Text style={styles.metricLabel}>Today's Return</Text>
          <Image source={Images.identity} style={styles.iconSmall} />
        </View>
        <Text style={styles.greenText}>
          {data.position.todayReturn} ({data.position.todayReturnPercent})
        </Text>
      </View>

      <View style={styles.metricBlock}> 
        <View style={styles.iconRow}>
          <Text style={styles.metricLabel}>1-Year High</Text>
          <Image source={Images.identity} style={styles.iconSmall} />
        </View>
        <Text style={styles.redText}>
          {data.position.yearHigh} ({data.position.yearHighPercent})
        </Text>
      </View>
    </View>

  
    <View style={styles.metricRow}>
      <View style={styles.metricBlock}>
        <Text style={styles.metricLabel}>Quantity Owned</Text>
        <Text style={styles.lightValue}>{data.position.quantityOwned}</Text>
      </View>

      <View style={styles.metricBlock}>
        <Text style={styles.metricLabel}>Holders</Text>
        <Text style={styles.lightValue}>{data.position.holders}</Text>
      </View>
    </View>


    <View style={styles.metricRow}>
      <View style={styles.metricBlock}>
        <View style={styles.iconRow}>
          <Text style={styles.metricLabel}>Circulating Supply</Text>
          <Image source={Images.identity} style={styles.iconSmall} />
        </View>
        <Text style={styles.lightValue}>{data.position.circulatingSupply}</Text>
      </View>

      <View style={styles.metricBlock}>
        <View style={styles.iconRow}>
          <Text style={styles.metricLabel}>Max Supply</Text>
          <Image source={Images.identity} style={styles.iconSmall} />
        </View>
        <Text style={styles.lightValue}>{data.position.maxSupply}</Text>
      </View>
    </View>




  </View>
);

export default PositionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#112244',
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
    backgroundColor: '#334466',
    marginVertical: 10,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    color: '#FFFFFF',
    fontSize: 20,
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
    color: '#999',
    fontSize: 12,
  },
  iconSmall: {
    width: 12,
    height: 12,
    marginLeft: 4,
  },
  greenText: {
    color: '#00FF99',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  redText: {
    color: '#FF5C5C',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  lightValue: {
    color: '#CCCCCC',
    fontSize: 12,
    marginTop: 2,
  },
  label: {
  color: '#CCCCCC',
  fontSize: 12,
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



});


