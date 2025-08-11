import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal,
  Platform
} from 'react-native';
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
} from 'react-native-reanimated';
import { Images } from '../assets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../navigators/routeNames'
import { ProfileBottom } from '../screens/Profile/ProfileBottomSheet';
import { useAppSelector } from '../store/hooks';
import SwipeToSend from './SwipeButton';
import SwipeButton from './SwipeButton';
import LinearGradient from 'react-native-linear-gradient';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  translateY: Animated.SharedValue<number>;
  screen: 'home' | 'explore' | 'pro' | 'profile' | 'profilebottom' | 'trade'|'todaysReturn' | 'AdvanceVerification';
}

const TRANSLATE_Y_CONFIG = {
  home: {
    initial: -SCREEN_HEIGHT / 6.7,
    min: -SCREEN_HEIGHT / 6.7,
    max: -SCREEN_HEIGHT / 1.5,
  },
  explore: {
    initial: -SCREEN_HEIGHT / 1.6,
    min: -SCREEN_HEIGHT / 1.6,
    max: -SCREEN_HEIGHT,
  },
  pro: {
    initial: -SCREEN_HEIGHT / 1.8,
    min: -SCREEN_HEIGHT / 1.8,
    max: -SCREEN_HEIGHT,
  },
  profile: {
    initial: -SCREEN_HEIGHT / 10,
    min: -SCREEN_HEIGHT / 10,
    max: -SCREEN_HEIGHT / 2.5,
  },
  profilebottom: {
    initial: -SCREEN_HEIGHT / 1.8,
    min: -SCREEN_HEIGHT / 1.8,
    max: -SCREEN_HEIGHT,
  },
    trade: {
    initial: -SCREEN_HEIGHT / 10,
    min: -SCREEN_HEIGHT / 10,
    max: -SCREEN_HEIGHT / 1.35,
  },
todaysReturn: {
  
   initial: -SCREEN_HEIGHT / 1.8,
    min: -SCREEN_HEIGHT / 1.8,
    max: -SCREEN_HEIGHT,
},
AdvanceVerification:{
    initial: -SCREEN_HEIGHT / 1.8,
    min: -SCREEN_HEIGHT / 1.8,
    max: -SCREEN_HEIGHT,
}


};

const screenStyles = {
  home: { backgroundColor: '#030A74' },
  explore: { backgroundColor: '#010217' },
  pro: { backgroundColor: '#01032C' },
  profile: { backgroundColor: '#010217' },
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
  
  const { token1, token2, amount1, amount2 } = useAppSelector(state => state.trade);
  
  const openSheet = () => {
    translateY.value = withSpring(TRANSLATE_Y_CONFIG[screen].max, { 
      damping: 15,  
      stiffness: 80, 
      mass: 0.8,     
    });
  };
  
  const closeSheet = () => {
    translateY.value = withSpring(TRANSLATE_Y_CONFIG[screen].initial, { 
      damping: 15,
      stiffness: 80,
      mass: 0.8,
    });
  };
  
  useImperativeHandle(ref, () => ({
    openSheet,
    closeSheet
  }));

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      const { min, max } = TRANSLATE_Y_CONFIG[screen];
      translateY.value = Math.max(Math.min(event.translationY + context.value.y, min), max);
    })
    .onEnd((event) => {
      const { min, max } = TRANSLATE_Y_CONFIG[screen];
      const midPoint = (min + max) / 2;
      
      const shouldOpenFully = event.velocityY < -500 || 
                             (event.velocityY > -200 && translateY.value < midPoint);
      
      if (shouldOpenFully) {
        translateY.value = withSpring(max, { 
          damping: 15,
          stiffness: 80,
          mass: 0.8,
          velocity: event.velocityY
        });
      } else {
        translateY.value = withSpring(min, { 
          damping: 15,
          stiffness: 80,
          mass: 0.8,
          velocity: event.velocityY
        });
      }
    });

  useEffect(() => {
    if (translateY.value === 0 || translateY.value === SCREEN_HEIGHT) {
      translateY.value = withSpring(TRANSLATE_Y_CONFIG[screen].initial, { 
        damping: 15,
        stiffness: 80,
        mass: 0.8,
      });
    }
  }, [screen]);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const responsiveHomeHeadMargin = Math.max(5, SCREEN_WIDTH * 0.012);
  const responsiveHomeNumbersMargin = Math.max(30, SCREEN_WIDTH * 0.18);

  const isAtMax = useDerivedValue(() => {
    return (
      (screen === 'home' && translateY.value === TRANSLATE_Y_CONFIG.home.max) ||
      (screen === 'profile' && translateY.value === TRANSLATE_Y_CONFIG.profile.max)
    );
  });

  const showDimBackground = useDerivedValue(() =>
  screen === 'trade' && translateY.value === TRANSLATE_Y_CONFIG.trade.max
);

  return (
    <>
      {showDimBackground.value && (
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: Platform.OS === 'ios'
              ? 'rgba(0,0,0,0.7)'
              : 'rgba(0,0,0,0.7)',
            zIndex: 999,
          }}
        />
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
                <View style={[styles.head, { marginHorizontal: responsiveHomeHeadMargin }]}>
                  <Image source={Images.bottomhead} style={styles.headimg} />
                  <Text style={styles.heading}>My Security Score</Text>
                  <Text style={[styles.numbers, { marginLeft: responsiveHomeNumbersMargin }]}>1/5</Text>
                  <View>
                  <Animated.Image
                    source={isAtMax.value ? Images.down : Images.up}
                    style={styles.upimg}
                  />
                  </View>
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
                  {[
                    'Advanced Verification',
                    'Recovery Phone',
                    'Insurance Coverage',
                    'Device Biometrics',
                    'Email Verification',
                  ].map((item, i) => (
                    <View style={styles.list} key={i}>
                      <View style={styles.L1}>
                        <Image
                          source={i < 3 ? Images.checked : Images.checked1}
                          style={styles.img1}
                        />
                        <Text style={styles.T1}>{item}</Text>
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
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.button}>
                  <View style={styles.btnsty}>
                    <Image source={Images.secure} style={styles.secure} />
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
            <View style={{ flex: 1 }}>
              <View style={styles.head}>
                {!isAtMax.value && (
                  <Image source={Images.profileheadlogo} style={styles.headimgP} />
                )}
                <Text
                  style={[
                    styles.headingP,
                    isAtMax.value && { marginLeft: 0 }, 
                  ]}
                >
                  Supported Networks
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    flex: 1,
                    marginRight: SCREEN_WIDTH * 0.04,
                  }}
                >
                  <Animated.Image
                    source={isAtMax.value ? Images.downarrow : Images.up}
                    style={styles.upimgP}
                  />
                </View>
              </View>
              <View style={styles.l1}>
                <Image source={Images.base} style={styles.solanalogo} />
                <Text style={styles.l1text}> Base Network</Text>
                <Text style={styles.l12text}>Crypto and NFTs</Text>
              </View>
              <View style={styles.l12}>
                <Image source={Images.slb} style={styles.solanalogo} />
                <Text style={styles.l1text}> Solana Network</Text>
                <Text style={styles.l121text}>Crypto only</Text>
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
            <View style={styles.tradebottomsheet}>
              <View style={styles.lineTB} />
              <View style={styles.head}>
                <Image source={Images.tradebottom} style={styles.headimg} />
                <Text style={styles.headingTB}>Transaction Ready</Text>
                <TouchableOpacity 
                  style={styles.closeButton} 
                  onPress={closeSheet}
                >
                  <Image source={Images.pros} style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
              {token1 && token2 && (
                <>
                  <View style={styles.inputfields}>
                    <View style={styles.tokenInputContainer}>
                      {token1 ? (
                        <>
                          <Text style={styles.tradeAmount}>{amount1}</Text>
                          <View style={styles.tokenDisplay}>
                            <Text style={styles.tokenSymbol}>
                              {token1.abbreviation}
                            </Text>
                            <Image 
                              source={token1.logo} 
                              style={styles.tokenLogo} 
                            />
                            
                          </View>
                        </>
                      ) : (
                        <Text style={styles.placeholderText}>Select Token</Text>
                      )}
                    </View>
                    
                    <View style={styles.arrowContainer}>
                      <Image source={Images.downarroww} style={styles.downarrow} />
                    </View>
                    
                    <View style={styles.tokenInputContainer}>
                      {token2 ? (
                        <>
                        <View style={styles.tokenDisplay}>
                          <Text style={styles.tradeAmount}>{amount2}</Text>
                          <Text style={styles.tokenSymbol}>
                              {token2.abbreviation}
                            </Text>
                            <Image 
                              source={token2.logo} 
                              style={styles.tokenLogo} 
                            />
                            
                          </View>
                        </>
                      ) : (
                        <Text style={styles.placeholderText}>Select Token</Text>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.feescontainer}>
                    <Text style={styles.fees}>Fees</Text>
                    <Text style={styles.fees}>1.73144653 SNORT</Text>
                  </View>
                  <Text style={styles.bottomtext1}>Kresus covers your network fee</Text>
                  <View>
                    <SwipeButton
                      placeholder='Swipe to Trade'
                      onNavigate={() => {
                        translateY.value = withSpring(0, { damping: 50 });
                      }}
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
          
            <Text style={styles.bottompara1}>
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
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#030A74',
    position: 'absolute',
    top: SCREEN_HEIGHT,
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
    // backgroundColor: 'white',
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
    marginVertical: 10,
    height: 10,
    width: 10,
  },
  fees:{
    color: 'lightblue'
  },
  feescontainer:{
    flexDirection:'row',
    marginTop: 10,
    marginHorizontal: 22,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#28569B',
    paddingVertical: 20,
    justifyContent: 'space-between'
  },
  bottomtext1:{
    color: 'lightblue',
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
    // color: '#ADD2FD',
    color: "#fff",
    lineHeight: 20,
    marginLeft: 27,
  },
  linner:{
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  line: {
    width: 55,
    height: 4,
    marginLeft: 4,
    backgroundColor: '#10132C',
    alignSelf: 'center',
    marginVertical: 15,
    // marginRight: 10,
    marginHorizontal: 8,
    borderRadius: 2,
  },
  lineTB:{
    width: 55,
    height: 4,
    marginLeft: 4,
    backgroundColor: '#030A74',
    alignSelf: 'center',
    marginTop: 15,
    // marginRight: 10,
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
    // marginRight: 10,
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
  // PBline:{
  //   width: 50,
  //   height: 4,
  //   backgroundColor: '#030A74',
  //   alignSelf: 'center',
  //   marginVertical: 15,
  //   borderRadius: 2,
  // },
  line1: {
    width: SCREEN_WIDTH * 0.42,
    height: 4,
    backgroundColor: 'gold',
    alignSelf: 'center',
    borderRadius: 2,
    marginHorizontal: 4,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 12,
    // justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    },
  headimg: {
    // fontSize: 25,
    padding: 12,
    // marginBottom: 15,
    marginLeft: 15,
    width: SCREEN_WIDTH * 0.062,
    height: SCREEN_WIDTH * 0.07,
    marginTop: 7,
    // marginTop: 2,
    // tintColor: 'gold',
  },
  headimgP:{
    padding: 12,
    marginLeft: 15,
    width: SCREEN_WIDTH * 0.09,
    height: SCREEN_WIDTH * 0.07,
  },
  heading: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6,
    marginLeft: 30,
  },
  headingAV:{
    color: '#ffffff',
    fontSize: 32,
    // fontWeight: '600',
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
    marginTop: 2,
    marginLeft: 15,
    // marginLeft: SCREEN_WIDTH * 0.04,
  },
  headingTB:{
    color: '#2ED459',
    fontSize: 15,
    // fontWeight: '600',
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
    marginLeft: SCREEN_WIDTH * 0.06,
    marginTop: 5,
    // width: SCREEN_WIDTH * 0.07,
    // height: SCREEN_HEIGHT * 0.04,
  },
  upimgP:{
    // marginRight: SCREEN_WIDTH * 0.08,
    display: 'flex',
    justifyContent: 'flex-end',
    width: SCREEN_WIDTH * 0.05,
    height: SCREEN_HEIGHT * 0.01,
    tintColor: '#ADD2FD'
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
    tintColor: 'lightblue',
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
  },
  btnsty: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  Lists: {},
  list: {
    marginHorizontal: 20,
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
    // tintColor: 'darkblue',
  },
  l1:{
    flexDirection:'row',
    // marginTop: 10,
    // marginLeft: 20,
    // borderTopWidth: 0.5,
    // // borderBottomWidth: 0.5,
    // borderColor: 'lightblue',
    paddingVertical: 20,
  },
  l12:{
    flexDirection:'row',
    // marginTop: 10,
    // marginLeft: 22,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'lightblue',
    paddingVertical: 20,
  },
  l1text:{
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  l12text:{
    color: '#ADD2FD',
    marginTop: 2,
    marginLeft: SCREEN_WIDTH * 0.3,
    fontSize: 15,
  },
  l121text:{
    color: '#ADD2FD',
    marginTop: 2,
    marginLeft: SCREEN_WIDTH * 0.35,
    fontSize: 15,
  },
  solanalogo:{
    width: 30,
    height: 30,
  },
  bottomtext:{
    color: '#ADD2FD',
    fontSize: 15,
    // marginHorizontal: 25,
    marginTop: 15,
  },
  LMBtn:{
    backgroundColor: '#0a0a23',
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 15,
    borderColor: '#4898F3',
    borderWidth: 1.5,
    marginTop: 15,
  },
  tokenInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: 65,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28569B',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  tradeAmount: {
    color: '#97B8E1',
    fontSize: 24,
    flex: 1,
  },
  tokenDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '500',
    marginRight: 4,
  },
  placeholderText: {
    color: '#97B8E1',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
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
