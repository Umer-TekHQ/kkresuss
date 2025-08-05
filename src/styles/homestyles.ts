import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    timeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  timeFilterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#1a1a3c',
  },
  activeTimeFilterButton: {
    backgroundColor: '#00FF99',
  },
  timeFilterText: {
    color: '#fff',
    fontSize: 12,
  },
  activeTimeFilterText: {
    color: '#000',
    fontWeight: 'bold',
  },
    marketActivityCard: {
    width: "100%",
    backgroundColor: '#0B219D', 
    borderRadius: 20,
    padding: 16,
    alignSelf: 'center',
    marginVertical: 10,
  },
  coinInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinLogo: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 12,
  },
  coinName: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    marginBottom: 18,
    marginLeft: 5,
    // fontWeight: '600',
  },
  tradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  tradeIcon: {
    width: 13,
    height: 18,
    marginRight: 6,
    tintColor: 'black'
  },
  tradeButtonText: {
    fontSize: 15,
    color: '#05194B',
    fontWeight: '600',
  },
  priceRow: {
    marginTop: 5,
    flexDirection: 'row',
    marginLeft: 75,

  },
  coinPrice: {
    color: '#fff',
    fontSize: 18,
    // fontWeight: 'bold',
  },
  mktcap:{
    flexDirection: 'row',
    marginLeft: 75,
    marginBottom: 7
  },
  marketDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  marketCapLabel: {
    fontSize: 14,
    color: '#ADD2FD',
  },
  marketCapValue: {
    fontSize: 14,
    color: '#ADD2FD',
    marginLeft: 15,
  },
  priceChangeText: {
    fontSize: 18,
    // fontWeight: '600',
    color: '#00FF85',
    marginLeft: 18,
  },
  positiveChange: {
    color: '#00FF85',
  },
  negativeChange: {
    color: '#FF4D4D',
  },
  buyersSellersContainer: {
    flexDirection: 'row',
    height: 1,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  buyersBar: {
    backgroundColor: '#00FF85',
    height: 5,
  },
  sellersBar: {
    backgroundColor: '#FF4D4D',
    height: 5,
  },
  BSpercent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  buyersText: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#fff',
    fontSize: 12,
  },
  sellersText: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#fff',
    fontSize: 12,
  },
  sectionTitle: {
  color: '#fff',
  fontSize: 22,
  fontWeight: '400',
  marginBottom: 12,
},

cardRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  marginBottom: 20,
},
skeletonExploreGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  marginTop: 16,
},
// headings:{
//   flexDirection: 'row',
//   width: '20%',
//   backgroundColor: 'skyblue',
//   height: 50,
//   marginBottom: 10,

// },
skeletonExploreCard: {
  width: '47%',
  height: 160,
  borderRadius: 12,
  backgroundColor: '#1E1E3F',
  marginTop: 30,
  marginBottom:146,
},

  cardContainer: {
    borderTopWidth: 1,
    borderTopColor: '#0e4c93ff',
    width: '95%',
    height: 300,
    marginLeft: 10,
    backgroundColor: '#0D1A47',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    paddingBottom: 12,
    marginTop: 10,
  },
  earnBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: '#0e4cc7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  earnBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bannerImage: {
    width: '100%',
    height: 240,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomSection: {
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  subtitle: {
    color: '#A0A8BC',
    fontSize: 12,
    marginTop: 2,
  },
  launchButton: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  launchButtonText: {
    color: '#0D1A47',
    fontWeight: '600',
    fontSize: 13,
  },
skeletonLine: {
  backgroundColor: '#1a1a2e',
  borderRadius: 4,
  height: 12,
  marginBottom: 6,
},
activeFooterIcon: {
  width: 24,
  height: 24,
  tintColor: '#ffffff', 
},
inactiveFooterIcon: {
  width: 24,
  height: 24,
  tintColor: '#888',
},
activeFooterText: {
  color: '#ffffff',
  fontWeight: '600',
},
inactiveFooterText: {
  color: '#888',
},
footer: {
  backgroundColor: '#01021d',
  borderTopWidth: 0.5,
  borderTopColor: '#01021d',
},
skeletonSummaryCard: {
  backgroundColor: '#101038',
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
},
skeletonGraphContainer: {
  height: 80,
  marginVertical: 12,
  backgroundColor: '#101038',
  borderRadius: 8,
  justifyContent: 'center',
},
skeletonGraphLine: {
  height: 2,
  backgroundColor: '#1a1a2e',
  width: '100%',
},
skeletonFilters: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 12,
},
skeletonFilterButton: {
  backgroundColor: '#1a1a2e',
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
  backgroundColor: '#101038',
  borderRadius: 12,
  padding: 12,
  width: '23%',
  aspectRatio: 1,
},
skeletonMarketActivity: {
  backgroundColor: '#101038',
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
  backgroundColor: '#1a1a2e',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
  width: 80,
  height: 32,
},
skeletonDivider: {
  height: 1,
  backgroundColor: '#1a1a2e',
  marginVertical: 12,
},
skeletonBuyersSellers: {
  flexDirection: 'row',
  height: 30,
  borderRadius: 15,
  overflow: 'hidden',
},
skeletonBuyerBar: {
  backgroundColor: 'rgba(76, 175, 80, 0.2)',
  height: '100%',
},
skeletonSellerBar: {
  backgroundColor: 'rgba(244, 67, 54, 0.2)',
  height: '100%',
},
skeletonUserCard: {
  flexDirection: 'row',
  backgroundColor: '#101038',
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
  alignItems: 'center',
},
skeletonAvatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#1a1a2e',
  marginRight: 12,
},
skeletonTextBlock: {
  flex: 1,
},
  currencyhead:{
    width: 62,
    height: 25,
    color: '#ADD2FD',
    // fontWeight: 500,
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 7
  },
  summaryCard: {
  borderTopWidth: 1.5,
  borderColor: '#0E1E83',
  backgroundColor: '#080C4C',
  borderRadius: 16,
  padding: 10,
  marginBottom: 8,
},
summaryTopSection: {
  marginBottom: 3,
},
cryptoTotalValue: {
  fontSize: 30,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 3,
  marginLeft: 7

},
cryptoChangeRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
cryptoChangeText: {
  fontSize: 12,
  fontWeight: '700',
  marginLeft: 7

},
cryptoChangeTime: {
  color: 'lightblue',
  fontSize: 12,
},
// timeFilterContainer: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   marginBottom: 5,
//   paddingHorizontal: 5,
// },
// timeFilterButton: {
//   // backgroundColor: '#0734A9',
//   paddingVertical: 5,
//   paddingHorizontal: 5,
//   borderRadius: 5,
// },
// activeTimeFilterButton: {
//   backgroundColor: '#0734A9',
// },
// timeFilterText: {
//   color: 'lightblue',
//   fontSize: 14,
// },
// activeTimeFilterText: {
//   color: 'white',
// },
prostext:{
  color: '#8ba7e8ff',
  fontSize: 19,
  // fontWeight: 500,
  width: 225,
  marginLeft: 10,
  // height: 25,
  // marginBottom: 10,
},
prossection:{
  flexDirection: 'row',
  justifyContent: 'space-between'
},
  bottomSheetContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    pointerEvents: 'box-none',
  },
prosicon:{
  width: 40,
  height: 40,
  // paddingBottom: 6,
  // marginBottom: 14,
},
  cryptoSummaryCard: {
  backgroundColor: '#101038',
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
},

cryptoChangePositive: {
  color: '#4CAF50', 
},
cryptoChangeNegative: {
  color: '#F44336', 
},
  actionButtonsContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    padding: 12,
    alignItems: 'center',
    width: '20%',
  },
  actionButtonIcon: {
    resizeMode: 'cover',
    width: 25,
    height: 25,
    marginBottom: 9,
    marginTop: 10,
    tintColor: 'white',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 13,
  },

  prosBuyingCard: {
    backgroundColor: '#101038',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  prosBuyingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  prosBuyingName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  prosBuyingPrice: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  prosBuyingLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 2,
  },
  prosBuyingMarketCap: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  prosBuyingPercentage: {
    color: '#4CAF50',
    fontSize: 14,
  },


  buyersContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    width: '26%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellersContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    width: '84%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#01021d',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  content: {
    padding: 5,
    paddingBottom: 80, 
  },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 5,
    paddingVertical: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: '#1a1a2e',
    position: 'relative'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#b58904',
  },
  profileName: {
    fontSize: 18,
    color: 'white',
    marginLeft: 15,
    // fontWeight: '500',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  footerIcon: {
    width: 27,
    height: 27,
    marginBottom: 30,
    resizeMode: 'contain',

  },
  realCard: {
    marginBottom: 16,
    backgroundColor: '#101038',
    borderRadius: 16,
    padding: 16,
  },
  realContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  realAvatar: {
    backgroundColor: '#1d1ddf',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  realLine: {
    backgroundColor: '#1d1ddf',
    height: 14,
    width: 120,
    marginBottom: 6,
    borderRadius: 8,
  },
  realLineHalf: {
    backgroundColor: '#1d1ddf',
    height: 14,
    width: 80,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#101038',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  headerLines: {
    marginBottom: 16,
  },
  shortLine: {
    width: '30%',
    height: 14,
    backgroundColor: '#1d1ddf',
    borderRadius: 8,
    marginBottom: 10,
  },
  mediumLine: {
    width: '70%',
    height: 14,
    backgroundColor: '#1d1ddf',
    borderRadius: 8,
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  squareIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#1d1ddf',
    borderRadius: 8,
  },
  rowCard: {
    flexDirection: 'row',
    backgroundColor: '#101038',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1d1ddf',
    marginRight: 12,
  },
  textBlock: {
    flex: 1,
  },
  line: {
    height: 14,
    backgroundColor: '#1d1ddf',
    borderRadius: 8,
    marginBottom: 6,
    width: '80%',
  },
  lineHalf: {
    height: 14,
    backgroundColor: '#1d1ddf',
    borderRadius: 8,
    width: '60%',
  },
  button: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1d1ddf',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0734A9',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  securityIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
});