import { StyleSheet} from 'react-native';

import { Colors } from '../theme/colors';


export default StyleSheet.create({

skeletonExploreGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  marginTop: 16,
},
skeletonExploreCard: {
  width: '47%',
  height: 160,
  borderRadius: 12,
  backgroundColor: Colors.purpleCard,
  marginTop: 30,
  marginBottom:146,
},

skeletonLine: {
  backgroundColor: Colors.deepNavy,
  borderRadius: 4,
  height: 12,
  marginBottom: 6,
},

skeletonSummaryCard: {
  backgroundColor: Colors.darkIndigo,
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
},
skeletonGraphContainer: {
  height: 80,
  marginVertical: 12,
  backgroundColor: Colors.darkIndigo,
  borderRadius: 8,
  justifyContent: 'center',
},
skeletonGraphLine: {
  height: 2,
  backgroundColor: Colors.deepNavy,
  width: '100%',
},
skeletonFilters: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 12,
},
skeletonFilterButton: {
  backgroundColor: Colors.deepNavy,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  width: '22%',
},
skeletonActions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
},
skeletonActionButton: {
  backgroundColor: Colors.background,
  borderRadius: 12,
  padding: 12,
  width: '23%',
  aspectRatio: 1,
},
skeletonMarketActivity: {
  backgroundColor: Colors.background,
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
},
skeletonMarketHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
},
skeletonTradeButton: {
  backgroundColor: Colors.deepNavy,
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
  width: 80,
  height: 32,
},
skeletonDivider: {
  height: 1,
  backgroundColor: Colors.deepNavy,
  marginVertical: 12,
},
skeletonBuyersSellers: {
  flexDirection: 'row',
  height: 30,
  borderRadius: 15,
  overflow: 'hidden',
},
skeletonBuyerBar: {
  backgroundColor: Colors.rgbaGreen20,
  height: '100%',
},
skeletonSellerBar: {
  backgroundColor: Colors.rgbaRed20,
  height: '100%',
},
skeletonUserCard: {
  flexDirection: 'row',
  backgroundColor: Colors.darkIndigo,
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
  alignItems: 'center',
},
skeletonAvatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: Colors.background,
  marginRight: 12,
},
skeletonTextBlock: {
  flex: 1,
},

});