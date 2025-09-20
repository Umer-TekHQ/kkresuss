import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

type AssetDetailSkeletonProps = {
  data: { name?: string };
  onBack?: () => void;
};

const AssetDetailSkeleton: React.FC<AssetDetailSkeletonProps> = ({ data, onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.priceHeader}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onBack} style={styles.backButtonReal}>
            <Image source={Images.backButton} style={styles.backIcon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={styles.titleReal}>{data?.name ?? ''}</Text>
        </View>
      </View>

      <SkeletonPlaceholder
        backgroundColor={Colors.background4}
        highlightColor={Colors.background}
        speed={1200}
      >
        <View style={styles.priceBox}>
          <View style={styles.priceLarge} />
          <View style={styles.priceChangeRow}>
            <View style={styles.priceChange} />
            <View style={styles.timeBlock} />
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
      </SkeletonPlaceholder>
    </View>
  );
};

export default AssetDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundAlt,
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
priceBox: {
  alignItems: 'center',
},

priceLarge: {
  marginTop:58,
  width: 200,
  height: 40,
  backgroundColor: Colors.background4,
  borderRadius: 2,
  marginBottom: 12,
},

priceChangeRow: {
  flexDirection: 'row',
  gap: 6,
},

priceChange: {
  width: 60,
  height: 14,
  backgroundColor: Colors.background4,
  borderRadius: 2,
},

timeBlock: {
  width: 80,
  height: 14,
  backgroundColor: Colors.background4,
  borderRadius: 2,
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
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.background4
  },
chartBox: {
  borderRadius: 12,
  marginBottom: 16,
  paddingVertical: 18,
  paddingHorizontal: 16,
},

chartLineArea: {
  height: 120,
  borderRadius: 2,
  backgroundColor: Colors.background4,
  marginBottom: 12,
  marginTop: 20,
},

filterButton: {
  marginTop:42,
  width: 35,
  height: 35,
  backgroundColor: Colors.background4,
  borderRadius: 4,
},

divider: {
  height: 1,
  backgroundColor: Colors.background4,
  marginVertical: 5,
},

progressBar: {
  flexDirection: 'row',
  height: 8,
  borderRadius: 4,
  overflow: 'hidden',
  backgroundColor: Colors.black,
  marginBottom: 12,
},

greenBarSkeleton: {
  backgroundColor: Colors.background4,
  width: '76%', 
},

redBarSkeleton: {
  backgroundColor: Colors.background4,
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
  borderRadius: 12,
  backgroundColor: Colors.fieldBackground,
},

labelBox: {
  width: 70,
  height: 12,
  borderRadius: 4,
  backgroundColor: Colors.fieldBackground,
},

actionButton: {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 10,
  width: (width - 64) / 4,
},

actionIconPlaceholder: {
  width: 38,
  height: 38,
  borderRadius: 22,
  backgroundColor: Colors.fieldBackground,
  marginBottom: 6,
},

actionTextPlaceholder: {
  width: 30,
  height: 10,
  borderRadius: 4,
  backgroundColor: Colors.fieldBackground,
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
 backgroundColor: Colors.fieldBorder,
  borderRadius: 4,
},
cardIconSkeleton: {
  width: 20,
  height: 20,
  backgroundColor: Colors.fieldBorder,
  borderRadius: 4,
},
labelSkeleton: {
  width: 60,
  height: 12,
  backgroundColor: Colors.fieldBorder,
  borderRadius: 4,
},
valueSkeleton: {
  width: 80,
  height: 18,
  backgroundColor: Colors.fieldBorder,
  borderRadius: 6,
},
metricLabelSkeleton: {
  width: 70,
  height: 10,
  backgroundColor: Colors.fieldBorder,
  borderRadius: 4,
},
greenTextSkeleton: {
  width: 100,
  height: 14,
  backgroundColor: Colors.background,
  borderRadius: 4,
  marginTop: 4,
},
redTextSkeleton: {
  width: 100,
  height: 14,
  backgroundColor: Colors.background,
  borderRadius: 4,
  marginTop: 4,
},
lightValueSkeleton: {
  width: 80,
  height: 12,
   backgroundColor: Colors.kresusBlue,
  borderRadius: 4,
  marginTop: 4,
},
iconSmallSkeleton: {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: Colors.kresusBlue,
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
    backgroundColor: Colors.background,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
backButtonReal: {
  position: 'absolute',
  left: 0,
},
titleReal: {
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
},
backIcon: {
  width: 30,
  height: 30,
  resizeMode: 'contain',
  tintColor:'white'
}
});


