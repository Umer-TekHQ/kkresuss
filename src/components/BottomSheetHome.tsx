import React, { useRef, useMemo, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing
} from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Images } from '../assets';

const securityItems = [
  { label: 'Advanced Verification', screen: 'Recovery' },
  { label: 'Recovery Phone', screen: 'Recovery' },
  { label: 'Insurance Coverage' },
  { label: 'Device Biometrics' },
  { label: 'Email Verification' },
];

export interface BottomSheetHomeRef {
  openSheet: () => void;
  closeSheet: () => void;
}

const BottomSheetHome = forwardRef<BottomSheetHomeRef, { navigation: any }>(({ navigation }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => [hp('16.5%'), hp('70%')], []);

  useImperativeHandle(ref, () => ({
    openSheet: () => {
      bottomSheetRef.current?.snapToIndex(1);
    },
    closeSheet: () => {
      bottomSheetRef.current?.snapToIndex(0);
    },
  }));


  const handleSheetChange = useCallback((index: number) => {
    if (index === 1) {
      setIsOpen(true);
    } else if (index === 0) {
      setIsOpen(false);
    }
  }, []);


  const toggleSheet = useCallback(() => {
    if (isOpen) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [isOpen]);

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={0}
      appearsOnIndex={1}
      pressBehavior="none"  
      opacity={0.5} 
    />
  ), []);

  const responsiveHomeHeadMargin = Math.max(0.5, wp('0.5%'));
  const responsiveHomeNumbersMargin = Math.max(30, wp('32%'));

  return (
    <View style={styles.absoluteContainer}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}  
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.background}
        handleComponent={null}
        onChange={handleSheetChange}
        animateOnMount={true}
        enableOverDrag={false}
        enableDynamicSizing={false}
      >

        <BottomSheetView style={styles.contentContainer}>
          <TouchableOpacity onPress={toggleSheet} activeOpacity={0.7}>
            <View style={[styles.head, { marginHorizontal: responsiveHomeHeadMargin }]}>
              <Image source={Images.headimage} style={styles.headImg} />
              <Text style={styles.heading}>My Security Score</Text>
              <Text style={[styles.numbers, { marginLeft: responsiveHomeNumbersMargin }]}>2/5</Text>
              <Animated.Image 
                source={isOpen ? Images.whitecross : Images.up} 
                style={styles.upImg} 
              />
            </View>
          </TouchableOpacity>


          <View style={styles.Liner}>
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
                <TouchableOpacity onPress={item.screen ? () => navigation.navigate(item.screen) : undefined}>
                  <View style={styles.L1}>
                    <Image source={i < 3 ? Images.checked : Images.checked1} style={styles.img1} />
                    <Text style={styles.T1}>{item.label}</Text>
                    {i === 2 && <Image source={Images.probadge1} style={styles.proBdg} />}
                    {i < 3 && (
                      <Image
                        source={Images.back}
                        style={[
                          styles.backBtn,
                          i === 1 && styles.backBtn1,
                          i === 2 && styles.backBtn2,
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
            <View style={styles.btnSty}>
              <Image source={Images.secure1} style={styles.secure} />
              <Text style={styles.btnText}>Manage In Settings</Text>
            </View>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({
  absoluteContainer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: hp('100%'),
    // zIndex: 10,
  },
  background: { 
    backgroundColor: '#030A74', 
    borderTopLeftRadius: wp('4.5%'), 
    borderTopRightRadius: wp('4.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  contentContainer: { 
    flex: 1, 
    paddingBottom: hp('2%'),
  },
  head: { 
    flexDirection: 'row', 
    marginBottom: hp('1%'), 
    textAlign: 'center', 
    alignItems: 'center', 
    marginTop: hp('1.8%'),
    paddingHorizontal: wp('4%'),
  },
  headImg: { 
    width: wp('4.5%'), 
    height: hp('3%'),
    resizeMode: 'contain',
  },
  heading: { 
    color: '#ffffff', 
    fontSize: wp('3.8%'), 
    fontWeight: '600', 
    marginLeft: wp('3%'),
    flex: 1,
  },
  numbers: { 
    fontSize: wp('3.5%'), 
    color: 'gold',
    marginRight: wp('2%'),
  },
  upImg: { 
    width: wp('6.5%'), 
    height: hp('4%'),
    resizeMode: 'contain',
    // marginTop: hp('0.2%'),
    // marginRight: wp('1%'),
  },
  Liner: { 
    flexDirection: 'row', 
    marginHorizontal: wp('4%'), 
    marginTop: hp('1%'),
    alignItems: 'center',
  },
  line1: { 
    width: wp('40%'), 
    height: hp('0.5%'), 
    backgroundColor: 'gold', 
    borderRadius: wp('0.5%'), 
    marginRight: wp('2%'),
  },
  line: { 
    width: wp('15%'), 
    height: hp('0.5%'), 
    backgroundColor: '#10132C', 
    borderRadius: wp('0.5%'), 
    marginRight: wp('2%'),
  },
  Lists: { 
    marginTop: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  list: { 
    marginBottom: hp('2.5%'),
  },
  L1: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  img1: {
    width: wp('7%'), 
    height: hp('4.5%'),
    resizeMode: 'contain',
  },
  T1: { 
    marginLeft: wp('2.5%'), 
    fontSize: wp('5%'), 
    color: '#D4EBFF', 
    flex: 1,
  },
  proBdg: { 
    width: wp('15%'), 
    height: hp('3%'), 
    borderRadius: wp('1%'),
    resizeMode: 'contain',
    marginLeft: wp('2%'),
  },
  backBtn: { 
    width: wp('3%'), 
    height: hp('2%'),
    resizeMode: 'contain',
    tintColor: '#086CE1',
    marginLeft: wp('2%'),
    marginRight:wp('2%')
  },
  backBtn1: {
    marginLeft: wp('10%'),
  },
  backBtn2: {
    marginLeft: wp('2%'),
  },
  button: { 
    alignSelf: 'center', 
    borderWidth: 1, 
    borderColor: 'lightblue', 
    width: wp('50%'), 
    borderRadius: wp('6%'), 
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  btnSty: { 
    flexDirection: 'row', 
    paddingVertical: wp('3%'),
    paddingHorizontal:wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  secure: { 
    width: wp('4.5%'), 
    height: hp('2.8%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
  },
  btnText: { 
    textAlign: 'center', 
    color: 'white',
    fontSize: wp('4%'),
  },
});

export default BottomSheetHome;