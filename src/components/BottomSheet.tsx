import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Platform,
  Dimensions
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GestureDetector, Gesture, TextInput } from 'react-native-gesture-handler';
import { forwardRef, useImperativeHandle } from 'react';
import Animated,
{
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  useDerivedValue,
  withClamp,
  withDelay,
  interpolate,Extrapolate,
  useAnimatedReaction,
  runOnJS
} from 'react-native-reanimated';
import { Images } from '../assets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../navigators/routeNames'
import { useAppSelector } from '../store/hooks';
import SwipeButton from './SwipeButton';
import LinearGradient from 'react-native-linear-gradient';


interface Props {
  translateY: Animated.SharedValue<number>;
  screen: 'home' | 'explore' | 'pro' | 'profile' | 'profilebottom' | 'trade'|'todaysReturn' | 'AdvanceVerification';
}

const TRANSLATE_Y_CONFIG = {
  home: {
    initial: -hp('16.93%'),
    min: -hp('16.93%'),
    max: -hp('70.67%'),
  },
  explore: {
    initial: -hp('62.50%'),
    min: -hp('62.50%'),
    max: -hp('100%'),
  },
  pro: {
    initial: -hp('55.56%'),
    min: -hp('55.56%'),
    max: -hp('100%'),
  },
  profile: {
    initial: -hp('9%'),
    min: -hp('10%'),
    max: -hp('50%'),
  },
  profilebottom: {
    initial: -hp('55.56%'),
    min: -hp('55.56%'),
    max: -hp('100%'),
  },
    trade: {
    initial: -hp('5%'),
    min: -hp('10%'),
    max: -hp('34.07%'),
  },
  todaysReturn: {
    
    initial: -hp('55.56%'),
      min: -hp('55.56%'),
      max: -hp('100%'),
  },
  AdvanceVerification:{
      initial: -hp('55.56%'),
      min: -hp('55.56%'),
      max: -hp('100%'),
  }
};

const screenStyles = {
  home: { backgroundColor: '#030A74' },
  explore: { backgroundColor: '#010217' },
  pro: { backgroundColor: '#01032C' },
  profile: { backgroundColor: '#05051C' },
  profilebottom: { backgroundColor: '#010217' },
  trade: {backgroundColor: '#01032C'},
  todaysReturn: { backgroundColor: '#01021D' },
  AdvanceVerification: { backgroundColor: '#01032C' },
};
export interface BottomSheetUnifiedRef {
  openSheet: () => void;
  closeSheet: () => void;
}

 const BottomSheetUnifiedComponent = (
  { translateY, screen }: Props,
  ref: React.Ref<BottomSheetUnifiedRef>
) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  const context = useSharedValue({ y: 0 });
  const initialY = useSharedValue(TRANSLATE_Y_CONFIG.home.initial);
  const minY = useSharedValue(TRANSLATE_Y_CONFIG.home.min);
  const maxY = useSharedValue(TRANSLATE_Y_CONFIG.home.max);

  
  const { token1, token2, amount1, amount2 } = useAppSelector(state => state.trade);
  
  const openSheet = () => {
    translateY.value = withSpring(maxY.value, { 
      damping: 15,  
      stiffness: 80, 
      mass: 0.8,     
    });
    setBlockingPointerEvents(true);
  };
  
  const closeSheet = () => {
    translateY.value = withSpring(initialY.value, { 
      damping: 15,
      stiffness: 80,
      mass: 0.8,
    });
    setBlockingPointerEvents(false);
  };
  const dimOpacity = useSharedValue(0);

  const dimStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [maxY.value, initialY.value],
      [0.5, 0],
      Extrapolate.CLAMP
    );
    dimOpacity.value = opacity; 
    return { opacity };
  });

  const [blockingPointerEvents, setBlockingPointerEvents] = React.useState(false);

  useAnimatedReaction(
    () => {
      const range = maxY.value - minY.value;
      const progress = Math.max(0, Math.min(1, (translateY.value - minY.value) / range));
      return progress;
    },
    (progress) => {
      runOnJS(setBlockingPointerEvents)(progress > 0.95);
    }
  );

  useImperativeHandle(ref, () => ({
    openSheet,
    closeSheet
  }));

  const computeTranslateConfig = (s: Props['screen']) => {
    switch (s) {
      case 'home':
        return {
          initial: -hp('15.93%'),
          min: -hp('15.93%'),
          max: -hp('70.67%'),
        };
      case 'explore':
        return {
          initial: -hp('62.50%'),
          min: -hp('62.50%'),
          max: -hp('100%'),
        };
      case 'pro':
        return {
          initial: -hp('55.56%'),
          min: -hp('55.56%'),
          max: -hp('100%'),
        };
      case 'profile':
        return {
          initial: -hp('9%'),
          min: -hp('10%'),
          max: -hp('50%'),
        };
      case 'profilebottom':
        return {
          initial: -hp('55.56%'),
          min: -hp('55.56%'),
          max: -hp('100%'),
        };
      case 'trade':
        return {
          initial: -hp('5%'),
          min: -hp('10%'),
          max: -hp('74.07%'),
        };
      case 'todaysReturn':
        return {
          initial: -hp('55.56%'),
          min: -hp('55.56%'),
          max: -hp('100%'),
        };
      case 'AdvanceVerification':
        return {
          initial: -hp('55.56%'),
          min: -hp('55.56%'),
          max: -hp('100%'),
        };
      default:
        return {
          initial: -hp('16.93%'),
          min: -hp('16.93%'),
          max: -hp('60.67%'),
        };
    }
  };

  useEffect(() => {
    const { initial, min, max } = computeTranslateConfig(screen);
    initialY.value = initial;
    minY.value = min;
    maxY.value = max;
    if (translateY.value === 0 || translateY.value === hp('100%')) {
      translateY.value = withSpring(initial, { 
        damping: 15,
        stiffness: 80,
        mass: 0.8,
      });
    }
  }, [screen]);

  useEffect(() => {
    const handler = () => {
      const { initial, min, max } = computeTranslateConfig(screen);
      initialY.value = initial;
      minY.value = min;
      maxY.value = max;
    };
    const sub = Dimensions.addEventListener('change', handler);
    return () => {
      if (sub && typeof sub.remove === 'function') sub.remove();
    };
  }, [screen]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.max(
        Math.min(event.translationY + context.value.y, minY.value),
        maxY.value
      );
    })
    .onEnd((event) => {
      const midPoint = (minY.value + maxY.value) / 2;
      
      const shouldOpenFully = event.velocityY < -500 || 
                              (event.velocityY > -200 && translateY.value < midPoint);
      
      if (shouldOpenFully) {
        translateY.value = withSpring(maxY.value, { 
          damping: 15,
          stiffness: 80,
          mass: 0.8,
          velocity: event.velocityY
        });
      } else {
        translateY.value = withSpring(minY.value, { 
          damping: 15,
          stiffness: 80,
          mass: 0.8,
          velocity: event.velocityY
        });
      }
    });


  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const responsiveHomeHeadMargin = Math.max(0.5, wp('0.5%'));
  const responsiveHomeNumbersMargin = Math.max(30, wp('18%'));
  
  const securityItems = [
    { label: 'Advanced Verification', screen: 'Recovery' as const },
    { label: 'Recovery Phone', screen: 'Recovery' as const },
    { label: 'Insurance Coverage' },
    { label: 'Device Biometrics' },
    { label: 'Email Verification' },
  ] as const;

  const isAtMax = useDerivedValue(() => {
    return translateY.value === maxY.value;
  });
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isAtMax.value ? 0 : 1, ),
  }));
  const LOGO_WIDTH = 45; 
  const LOGO_MARGIN = 8; 
  const headingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(isAtMax.value ? -(LOGO_WIDTH + LOGO_MARGIN) : 0, {
        }),
      },
    ],
  }));

  const showDimBackground = useDerivedValue(() =>
    screen === 'trade' && translateY.value === maxY.value
  );

  const arrowStyle = useAnimatedStyle(() => {
    const range = maxY.value - minY.value;
    const progress = Math.max(0, Math.min(1, (translateY.value - minY.value) / range));
    const rotateDeg = progress * 180; 
    return { transform: [{ rotate: `${rotateDeg}deg` }] };
  });
  
  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: 'black' },
          dimStyle,
        ]}
      />
      {blockingPointerEvents && (
        <View style={[StyleSheet.absoluteFillObject]} pointerEvents="auto" />
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[
          styles.container,
          screenStyles[screen],
          rStyle,
          showDimBackground.value && { zIndex: 1000 }
        ]}>
      {screen === 'home' && (
          <>
            <TouchableOpacity activeOpacity={1} onPress={openSheet}>
              <View style={styles.linehome} />
              <View style={[styles.head, { marginHorizontal: responsiveHomeHeadMargin }]}>
                <Image source={Images.bottomhead} style={styles.headimg} />
                <Text style={styles.heading}>My Security Score</Text>
                <Text style={[styles.numbers, { marginLeft: responsiveHomeNumbersMargin }]}>2/5</Text>
                <TouchableOpacity onPress={(e) => { e.stopPropagation(); closeSheet(); }}>
                  <Animated.Image
                    source={Images.up}
                    style={[styles.upimg, arrowStyle]}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.linner}>
                <LinearGradient
                  colors={['#2B36E4', '#CEB55B']} 
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.line1}
                />
                {[...Array(3)].map((_, i) => (
                  <View key={i} style={styles.line} />
                ))}
              </View>

              <View style={styles.Lists}>
                {securityItems.map((item, i) => (
                  <View style={styles.list} key={i}>
                    <TouchableOpacity onPress={'screen' in item ? () => navigation.navigate(item.screen) : undefined}>
                      <View style={styles.L1}>
                        <Image
                          source={i < 3 ? Images.checked : Images.checked1}
                          style={styles.img1}
                        />
                        <Text style={styles.T1}>{item.label}</Text>
                        {i === 2 && (
                          <Image source={Images.probadge} style={styles.probdg} />
                        )}
                        {i < 3 && (
                          <Image
                            source={Images.back}
                            style={[
                              styles.backbtn,
                              i === 1 && styles.backbtn1,
                              i === 2 && styles.backbtn2,
                            ]}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
                <View style={styles.btnsty}>
                  <Image source={Images.secure1} style={styles.secure} />
                  <Text style={styles.btntext}>Manage In Settings</Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
              </>
            )}

          {screen === 'pro' && (
            <>
              <View style={styles.line} />
              <Text style={styles.headingPro}>See What the Pros are Buying</Text>
              <Text style={styles.bottompara1}>
                Sourced from on-chain data, 'Top Buys' reveals which coins historically profitable
                traders are buying right now, to help you find potentially winning trades ahead of
                the rest. Please conduct your own research before making any trades.
              </Text>
            </>
          )}

          {screen === 'explore' && (
            <>
              <View style={styles.line} />
              <Text style={styles.headingPro}>Uniswap</Text>
              <Text style={styles.toppara}>
                Swap, earn, and build on the leading decentralized crypto trading protocol.
              </Text>
              <Text style={styles.bottompara}>
                UniSwap is a decentralized exchange that enables the trading of digital assets. UNI is
                the cryptocurrency the UniSwap platform uses. Anyone can earn UNI by agreeing to not
                sell or trade their crypto holdings. The UniSwap platform is governed by UNI holders
                in proportion to how much UNI they own.
              </Text>
              <View>
              
              </View>
            </>
          )}

          {screen === 'profile' && (
            <View>
              <View style={styles.headProfileRow}>
                <Animated.Image
                  source={Images.profileheadlogo}
                  style={[styles.headimgP, logoAnimatedStyle]}
                />

                <Animated.Text style={[styles.headingP, headingAnimatedStyle]}>
                  Supported Networks
                </Animated.Text>

                <Animated.Image source={Images.up} style={[styles.upimgP, arrowStyle]} />
              </View>
              <View style={styles.l1}>
                <View style={styles.rowLeft}>
                  <Image source={Images.base} />
                  <Text style={styles.l1text}> Base Network</Text>
                </View>
                <Text style={styles.trailingText}>Crypto and NFTs</Text>
              </View>
              <View style={styles.l12}>
                <View style={styles.rowLeft}>
                  <Image source={Images.solanalogo} style={styles.solanalogo} />
                  <Text style={styles.l1textS}> Solana Network</Text>
                </View>
                <Text style={styles.trailingText}>Crypto only</Text>
              </View>
              <Text style={styles.bottomtext}>
                Do not sent assets over Ethereum mainnets or they will be lost.
              </Text>
              <TouchableOpacity
                style={styles.LMBtn}
                onPress={() => {
                  navigation.navigate('ProfileBottom');
                }}
              >
                <Text style={{ color: 'white' }}>Learn More</Text>
              </TouchableOpacity>
            </View>
          )}
          {screen === 'profilebottom' && (
            <>
              <View style={styles.lineProfile} />
              <Text style={styles.headingPro}>Supported Networks</Text>
              <Text style={styles.toppara1}>
                Kresus wallet is designed specifically for seamless transactions with tokens and NFTs on the Base network, as well as tokens on the Solana networks. It's crucial to ensure that you are sending and receiving assets exclusively on these networks, as transactions on other networks-- like Etherium MainNet--can lead to the permanent loss of your assets.
              </Text>
              <Text style={styles.heading1}>Double Check</Text>
              <Text style={styles.toppara1}>
                Always double-check the networks compatibility before making a transfer to protect your valuable tokens and NFTs. If you have any questions or need assistance, our support team is here to help.
              </Text>
            </>
          )}
           {screen === 'trade' && (
              <View style={[styles.tradebottomsheet, { paddingTop: hp('2%') }]}>
                <View style={[styles.lineTB, { width: wp('15%'), height: hp('0.5%'), marginTop: hp('1%') }]} />

                <View style={[styles.head, { marginBottom: hp('1%') }]}>
                  <Image source={Images.tradebottom} style={[styles.headimg, { width: wp('4%'), height: hp('2.5%'), marginLeft: wp('3%'), marginTop: hp('1%') }]} />
                  <Text style={[styles.headingTB, { fontSize: wp('4.5%'), marginLeft: wp('4%') }]}>Transaction Ready</Text>
                  <TouchableOpacity style={styles.closeButton} onPress={closeSheet}>
                    <Image source={Images.pros} style={[styles.closeIcon, { width: wp('6%'), height: hp('6%') , paddingBottom: hp('5%') }]} />
                  </TouchableOpacity>
                </View>

                {token1 && token2 && (
                  <>
                    <View style={styles.inputfields}>

                      <View style={[styles.tokenInputContainer, { width: wp('90%'), height: hp('10%'), marginVertical: hp('1%') }]}>
                        <Text style={[styles.labelText, { fontSize: wp('3.5%'), color: '#ADD2FD', marginBottom: hp('0.5%') }]}>
                          TRADING
                        </Text>
                        <View style={styles.tokenDisplay}>
                          <View>
                            <Text style={[styles.tradeAmount, { fontSize: wp('5%') }]}>{amount1}</Text>
                            <Text style={[styles.tokenSymbol, { fontSize: wp('4%') }]}>{token1.abbreviation}</Text>
                          </View>
                          <Image source={token1.logo} style={[styles.tokenLogo, { width: wp('10%'), height: wp('10%') }]} />
                        </View>
                      </View>

                      <View style={styles.arrowContainer}>
                        <Image source={Images.downarroww} style={[styles.downarrow, { width: wp('3%'), height: hp('2%') }]} />
                      </View>

                      <View style={[styles.tokenInputContainer, { width: wp('90%'), height: hp('10%'), marginVertical: hp('1%') }]}>
                        <Text style={[styles.labelText, { fontSize: wp('3.5%'), color: '#ADD2FD', marginBottom: hp('0.5%') }]}>
                          FOR
                        </Text>
                        <View style={styles.tokenDisplay}>
                          <View>
                            <Text style={[styles.tradeAmount, { fontSize: wp('5%') }]}>{amount2}</Text>
                            <Text style={[styles.tokenSymbol, { fontSize: wp('4%'), }]}>{token2.abbreviation}</Text>
                          </View>
                          <Image source={token2.logo} style={[styles.tokenLogo, { width: wp('10%'), height: wp('10%') }]} />
                        </View>
                      </View>

                    </View>

                    <View style={[styles.feescontainer, { marginHorizontal: wp('5%'), paddingVertical: hp('2%') }]}>
                      <Text style={[styles.fees, { fontSize: wp('4.5' ) }]}>Fees</Text>
                      <Text style={[styles.fees, { fontSize: wp('4.5%') }]}>1.73144653 SNORT</Text>
                    </View>

                    <Text style={[styles.bottomtext1, { fontSize: wp('4.5%'), marginTop: hp('1%') }]}>
                      Kresus covers your network fee
                    </Text>

                    <View style={{ marginTop: hp('2%') }}>
                      <SwipeButton
                        placeholder='Swipe to Trade'
                        onNavigate={() => { translateY.value = withSpring(0, { damping: 50 }); }}
                      />
                    </View>
                  </>
                )}
              </View>
            )}


          {screen === 'todaysReturn' && (
            <View>
            
                <View style={styles.line} />
            <Text style={styles.headingPro}>Today's Return</Text>
          
            <Text style={styles.bottompara2}>
                Today’s return refers to the percentage change in the value of a crypto investment from the beginning 
                of the day to the current time. It measures the gain or loss on the investment within a single 
                trading day, reflecting the token’s price fluctuations over that period. This metric helps investors 
                quickly assess the day’s performance of their crypto holdings.
            </Text>
          </View>
          )}


 
          {screen === 'AdvanceVerification' && (
          <>
            <View style={styles.lineAV} />
            <Text style={styles.headingAV}>Why Add Advanced Verification?</Text>
            <Text style={styles.bottomparaAV}>
              Separate from the biometrics used by your phone, adding advanced verification{' '}
              <Text>ensures an additional layer of protection</Text> when recovering your
              Kresus wallet, transferring to a new device, or updating sensitive security settings.
            </Text>
            <View style={styles.tipBox}>
             <Text style={styles.tipTitle}> <Text style={{color: 'blue'}}>✦   </Text> Is that you?</Text>
            <Text style={styles.tipText}>
             Advanced verification adds an additional layer of authentication to your Kresus wallet to ensure that
             only you are able to access your assets.
             </Text>
           </View>
          </>
        )}

        </Animated.View>
      </GestureDetector>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#030A74',
    position: 'absolute',
    top: hp('100%'),
    borderRadius: 15,
  },
  bgcolorprofile:{
    backgroundColor:'#010217',
    width: '100%'
  },
  inputfields:{
    alignItems: 'center'
  },
  input1:{
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28569B',
  },
  downarrow: {
    width: 12,
    height: 18,
    marginLeft: 15,
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  fees:{
    color: '#ADD2FD'
  },
  feescontainer:{
    flexDirection:'row',
    marginTop: 20,
    marginHorizontal: 22,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#28569B',
    paddingVertical: 20,
    justifyContent: 'space-between'
  },
  bottomtext1:{
    color: '#ADD2FD',
    marginTop: 15,
    textAlign: 'center'
  },
  wavesbg:{
    marginTop: 20,
    width: '100%',
    height: 80
  },
    tipBox: {
    borderTopWidth: 1,
    borderTopColor: '#030A74',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 20,
    marginLeft: 27,
  },
  linner:{
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  line: {
    width: 55,
    height: 4,
    marginLeft: 4,
    backgroundColor: '#10132C',
    alignSelf: 'center',
    marginVertical: 15,
    marginHorizontal: 8,
    borderRadius: 2,
  },
  linehome:{
    width: 55,
    height: 4,
    marginLeft: 4,
    backgroundColor: '#0734A9',
    alignSelf: 'center',
    marginTop:5,
    marginHorizontal: 8,
    borderRadius: 2,
  },
  labelText: {
  letterSpacing: 0.5,
},

tokenDisplay: {
  flexDirection: 'row',
  // justifyContent: 'flex-end',
  alignItems: 'center',
},

  lineTB:{
    width: 55,
    height: 4,
    marginLeft: 4,
    backgroundColor: '#030A74',
    alignSelf: 'center',
    marginTop: 15,
    marginHorizontal: 8,
    borderRadius: 2,
  },
  lineAV:{
    width: 55,
    height: 4,
    marginLeft: 4,
    backgroundColor: '#030A74',
    alignSelf: 'center',
    marginTop: 15,
    marginHorizontal: 8,
    borderRadius: 2,
  },
  tradebottomsheet:{
    borderRadius: 35,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: '#10178A'
  },
  lineProfile: {
    width: 40,
    height: 4,
    backgroundColor: '#030A74',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },

  line1: {
    width: 120,
    height: 4,
    alignSelf: 'center',
    backgroundColor: 'gold',
    borderRadius: 2,
    marginHorizontal: 4,
  },
  head: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 7,
    textAlign: 'center',
    alignItems: 'center',
    },
  headimg: {
    padding: 12,
    marginLeft: 15,
  },
  headimgP: {
  padding: wp('3%'), 
  marginTop: 5,
  width: wp('9%'),
  height: hp('5%'),
  resizeMode: 'contain'
},
  heading: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6,
    marginLeft: 30,
  },
  headProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    marginTop: 5,
    marginBottom: 7,
  },
  headingAV:{
    color: '#ffffff',
    fontSize: 32,
    marginTop: 20,
    marginLeft: 20,
  },
  heading1:{
    marginTop: 20,
    marginLeft: 15,
    fontSize: 15,
    color: '#ffffff'
  },
  headingP: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
    flex: 1,
    marginLeft: wp('2%'),
  },
  headingTB:{
    color: '#2ED459',
    fontSize: 15,
    marginTop: 6,
    marginLeft: 20,
  },
  headingPro: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  numbers: {
    marginLeft: 70,
    marginTop: 5,
    fontSize: 18,
    color: 'gold',
  },
  upimg: {
    marginLeft: 15,
    marginTop: 5,
  },
  upimgP:{
    marginTop: 5,
    width: 28,
    height: 25,
    tintColor: '#4898F3'
  },
  TBlogo: {
    marginLeft: 150,
    width: 35,
    height: 40,
    tintColor: 'lightblue'
  },
  toppara: {
    color: '#ffffff',
    marginLeft: 15,
    marginRight: 100,
    marginTop: 15,
    fontWeight: '700',
  },
  toppara1: {
    color: '#A2C5EF',
    fontSize: 20,
    marginLeft: 15,
    marginRight: 20,
    marginTop: 20,
    // fontWeight: '700',
  },
  bottompara: {
    color: '#ffffff',
    marginHorizontal: 15,
    marginTop: 15,
    fontWeight: '400',
  },
  bottomparaAV:{
    fontSize: 20,
    color: '#ffffff',
    marginHorizontal: 15,
    marginTop: 20,
  },
  bottompara1:{
    color: '#B3C7DF',
    marginHorizontal: 15,
    marginTop: 25,
    fontSize: 20,
    // fontWeight: '400',
  },
  bottompara2:{
    color: '#ADD2FD',
    marginHorizontal: 15,
    marginTop: 25,
    fontSize: 20,
    // fontWeight: '400',
  },

  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'lightblue',
    width: 175,
    borderRadius: 25,
    marginVertical: 10,
  },
  launchBtn: {
    backgroundColor: '#0a0a23',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: `center`,
    marginHorizontal: 20,
    borderRadius: 25,
    borderColor: '#4898F3',
    borderWidth: 1.5,
    marginTop: 100,
  },
  btntext: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
  },
  backbtn: {
    fontSize: 10,
    marginLeft: 90,
    marginTop: 12,
    tintColor: '#086CE1',
  },
  backbtn1: {
    marginLeft: 143,
  },
  backbtn2: {
    marginLeft: 20,
  },
  probdg: {
    marginLeft: 50,
    marginTop: 10,
  },
  secure: {
    marginTop: 8,
    width: 19,
    height: 24
  },
  btnsty: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  Lists: {},
  list: {
    marginHorizontal: 12,
    marginBottom: 15,
  },
  L1: {
    flexDirection: 'row',
  },
  T1: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 20,
    color: 'white',
  },
  img1: {
    marginTop: 4,
  },
  l1:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: wp('4%'),
    borderTopWidth: 0.5,
    borderColor: '#101684',
    paddingVertical: 20,
    borderTopRightRadius: 20,

  },
  l12:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: wp('4%'),
    borderTopWidth: 0.5,
    borderColor: '#101684',
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  l1text:{
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  l1textS:{
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
  },
  trailingText:{
    color: 'lightblue',
    marginTop: 2,
    fontSize: 15,
    textAlign: 'right'
  },
  solanalogo:{
    width: 20,
    height: 20,
  },
  bottomtext:{
    color: 'lightblue',
    marginHorizontal: wp('5%'),
    marginTop: 15,
  },
  LMBtn:{
    backgroundColor: '#0a0a23',
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    borderRadius: 20,
    borderColor: '#4898F3',
    borderWidth: 1,
    marginTop: 15,
  },
  tokenInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#4898F3',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  tradeAmount: {
    color: '#FFF',
    fontSize: 24,
    marginRight: 10,
  },
  tokenLogo: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 8,
  },
  tokenSymbol: {
    color: '#fff',
    fontSize: 12,
    marginRight: 4,
    display: 'flex',
    justifyContent: 'flex-end',
    letterSpacing: 0.5,
  },
  placeholderText: {
    color: '#97B8E1',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    right: 3,
    top: 0,
    padding: 5,
  },
  closeIcon: {
    height: 40,
    width: 30,
    marginBottom: 10,
    tintColor: 'lightblue',
  },
  launchbtn: {
    width: 10,
    height: 10,
    marginLeft: 10,
    tintColor: 'white',
  },
});

export const BottomSheetUnified = forwardRef(BottomSheetUnifiedComponent);
