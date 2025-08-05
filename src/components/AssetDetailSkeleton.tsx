import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Images } from '../assets';

const { width } = Dimensions.get('window');

const AssetDetailSkeleton = () => {
  return (
    <View style={styles.container}>


      <View style={styles.priceHeader}>
 
  <View style={styles.topBar}>
    <View style={styles.backButton} />
    <View style={styles.titleBlock} />
  </View>

  <View style={styles.priceBox}>
    <View style={styles.priceLarge} />
    <View style={styles.priceChangeRow}>
      <View style={styles.priceChange} />
      <View style={styles.timeBlock} />
    </View>
  </View>
</View>



<View style={styles.chartBox}>
 
  <View style={styles.chartLineArea} />


  <View style={styles.chartFilters}>
    {Array.from({ length: 5 }).map((_, i) => (
      <View key={i} style={styles.filterButton} />
    ))}
  </View>

 
  <View style={styles.divider} />


  <View style={styles.progressBar}>
    <View style={styles.greenBarSkeleton} />
    <View style={styles.redBarSkeleton} />
  </View>


  <View style={styles.chartBottomRow}>
    <View style={styles.chartRowItem}>
      <View style={styles.iconBox} />
      <View style={styles.labelBox} />
    </View>
    <View style={styles.chartRowItem}>
      <View style={styles.labelBox} />
      <View style={styles.iconBox} />
    </View>
  </View>


  <View style={styles.divider} />
</View>

      <View style={styles.actionRow}>
  {Array.from({ length: 4 }).map((_, i) => (
    <View key={i} style={styles.actionButton}>
      <View style={styles.actionIconPlaceholder} />
      <View style={styles.actionTextPlaceholder} />
    </View>
  ))}
</View>

      <View style={styles.positionCard}>

  <View style={styles.cardHeaderRow}>
    <View style={styles.cardTitleSkeleton} />
    <View style={styles.cardIconSkeleton} />
  </View>

  <View style={styles.divider} />

  <View style={styles.rowSpaceBetween}>
    <View style={styles.labelSkeleton} />
    <View style={styles.valueSkeleton} />
  </View>

  <View style={styles.divider} />


  <View style={styles.metricRow}>
    <View style={styles.metricBlock}>
      <View style={styles.iconRow}>
        <View style={styles.metricLabelSkeleton} />
        <View style={styles.iconSmallSkeleton} />
      </View>
      <View style={styles.greenTextSkeleton} />
    </View>

    <View style={styles.metricBlock}>
      <View style={styles.iconRow}>
        <View style={styles.metricLabelSkeleton} />
        <View style={styles.iconSmallSkeleton} />
      </View>
      <View style={styles.redTextSkeleton} />
    </View>
  </View>


  <View style={styles.metricRow}>
    <View style={styles.metricBlock}>
      <View style={styles.metricLabelSkeleton} />
      <View style={styles.lightValueSkeleton} />
    </View>
    <View style={styles.metricBlock}>
      <View style={styles.metricLabelSkeleton} />
      <View style={styles.lightValueSkeleton} />
    </View>
  </View>


  <View style={styles.metricRow}>
    <View style={styles.metricBlock}>
      <View style={styles.iconRow}>
        <View style={styles.metricLabelSkeleton} />
        <View style={styles.iconSmallSkeleton} />
      </View>
      <View style={styles.lightValueSkeleton} />
    </View>

    <View style={styles.metricBlock}>
      <View style={styles.iconRow}>
        <View style={styles.metricLabelSkeleton} />
        <View style={styles.iconSmallSkeleton} />
      </View>
      <View style={styles.lightValueSkeleton} />
    </View>
  </View>
</View>

    </View>
  );
};

export default AssetDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010D2A',
    padding: 16,
  },
priceHeader: {
  marginBottom: 24,
  alignItems: 'center',
},

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
  width: 24,
  height: 24,
  backgroundColor: '#192655',
  borderRadius: 4,
},

titleBlock: {
  width: 100,
  height: 20,
  backgroundColor: '#192655',
  borderRadius: 4,
},

priceBox: {
  alignItems: 'center',
},

priceLarge: {
  width: 160,
  height: 50,
  backgroundColor: '#192655',
  borderRadius: 6,
  marginBottom: 8,
},

priceChangeRow: {
  flexDirection: 'row',
  gap: 6,
},

priceChange: {
  width: 60,
  height: 16,
  backgroundColor: '#192655',
  borderRadius: 4,
},

timeBlock: {
  width: 80,
  height: 16,
  backgroundColor: '#192655',
  borderRadius: 4,
},

  chartFilters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  positionCard: {
    backgroundColor: '#112244',
    padding: 16,
    borderRadius: 12,
  },
chartBox: {
  backgroundColor: '#112244',
  borderRadius: 12,
  marginBottom: 16,
  paddingVertical: 12,
  paddingHorizontal: 16,
},

chartLineArea: {
  height: 150,
  borderRadius: 10,
  backgroundColor: '#192655',
  marginBottom: 12,
},

filterButton: {
  width: 40,
  height: 20,
  backgroundColor: '#192655',
  borderRadius: 4,
},

divider: {
  height: 1,
  backgroundColor: '#334466',
  marginVertical: 10,
},

progressBar: {
  flexDirection: 'row',
  height: 3,
  borderRadius: 4,
  overflow: 'hidden',
  backgroundColor: '#222',
  marginBottom: 12,
},

greenBarSkeleton: {
  backgroundColor: '#192655',
  width: '76%', 
},

redBarSkeleton: {
  backgroundColor: '#192655',
  width: '24%', 
},

chartBottomRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4,
},

chartRowItem: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

iconBox: {
  width: 16,
  height: 16,
  borderRadius: 4,
  backgroundColor: '#192655',
},

labelBox: {
  width: 70,
  height: 12,
  borderRadius: 4,
  backgroundColor: '#192655',
},

actionButton: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#112244',
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 10,
  width: (width - 64) / 4,
},

actionIconPlaceholder: {
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: '#192655',
  marginBottom: 6,
},

actionTextPlaceholder: {
  width: 30,
  height: 10,
  borderRadius: 4,
  backgroundColor: '#192655',
},

cardHeaderRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
},
cardTitleSkeleton: {
  width: 100,
  height: 16,
  backgroundColor: '#192655',
  borderRadius: 4,
},
cardIconSkeleton: {
  width: 20,
  height: 20,
  backgroundColor: '#192655',
  borderRadius: 4,
},
labelSkeleton: {
  width: 60,
  height: 12,
  backgroundColor: '#192655',
  borderRadius: 4,
},
valueSkeleton: {
  width: 80,
  height: 18,
  backgroundColor: '#192655',
  borderRadius: 6,
},
metricLabelSkeleton: {
  width: 70,
  height: 10,
  backgroundColor: '#192655',
  borderRadius: 4,
},
greenTextSkeleton: {
  width: 100,
  height: 14,
  backgroundColor: '#1A1A2E',
  borderRadius: 4,
  marginTop: 4,
},
redTextSkeleton: {
  width: 100,
  height: 14,
  backgroundColor: '#1A1A2E',
  borderRadius: 4,
  marginTop: 4,
},
lightValueSkeleton: {
  width: 80,
  height: 12,
  backgroundColor: '#192655',
  borderRadius: 4,
  marginTop: 4,
},
iconSmallSkeleton: {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: '#192655',
},

 rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  metricBlock: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#1A1A2E',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});