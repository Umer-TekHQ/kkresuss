import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Images } from "../assets";
import { Colors } from "../theme/colors";

interface BottomSheetProfileProps {
  navigation: any;
}

export interface BottomSheetProfileRef {
  openSheet: () => void;
  closeSheet: () => void;
  navigation: any;
}

const BottomSheetProfile = forwardRef<
  BottomSheetProfileRef,
  BottomSheetProfileProps
>(({ navigation }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => [hp("8%"), hp("45%")], []);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  useImperativeHandle(ref, () => ({
    openSheet,
    closeSheet,
    navigation,
  }));

  const rotation = useSharedValue(0);
  const sheetPosition = useSharedValue(0);
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      sheetPosition.value,
      [0, 0.5],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity: withTiming(opacity, { duration: 150 }),
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      sheetPosition.value,
      [0, 1],
      [0, -50],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { translateX: withTiming(translateX, { duration: 150 }) },
      ],
    };
  });

  const handleSheetChange = useCallback((index: number) => {
    rotation.value = withTiming(index === 1 ? 180 : 0, {
      duration: 150,
      easing: Easing.out(Easing.ease),
    });
    sheetPosition.value = index;
    setIsOpen(index === 1);
  }, []);

  const toggleSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(isOpen ? 0 : 1);
  }, [isOpen]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
        pressBehavior="collapse"
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      enableOverDrag={false} 
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleComponent={null}
      onChange={handleSheetChange}
      animateOnMount
      enableDynamicSizing={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={toggleSheet}>
          <View style={styles.headProfileRow}>
            <Animated.View style={logoAnimatedStyle}>
              <Image
                source={Images.profileHeadLogo}
                style={styles.headImage}
              />
            </Animated.View>

            <Animated.Text
              style={[styles.headingP, textAnimatedStyle]}
            >
              Supported Networks
            </Animated.Text>

            <View
              style={styles.headerSub}
            >
              <Animated.Image
                source={Images.up}
                style={styles.imageUp}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.expandableContent}>
          <View style={styles.l1}>
            <View style={styles.rowLeft}>
              <Image source={Images.base} style={styles.baseLogo} />
              <Text style={styles.l1text}> Base Network</Text>
            </View>
            <Text style={styles.trailingText}>Crypto and NFTs</Text>
          </View>

          <View style={styles.l12}>
            <View style={styles.rowLeft}>
              <Image
                source={Images.solanaLogo}
                style={styles.solanaLogo}
              />
              <Text style={styles.l1textS}> Solana Network</Text>
            </View>
            <Text style={styles.trailingText}>Crypto only</Text>
          </View>

          <Text style={styles.bottomText}>
            Do not send assets over Ethereum Mainnet or they will be lost.
          </Text>

          <TouchableOpacity
            style={styles.LBtn}
            onPress={() => {
              navigation.navigate("ProfileBottom");
              closeSheet();
            }}
          >
            <Text style={styles.learnMore}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    paddingTop: hp("1%"),
  },
  headerSub:{
    width: 28,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  expandableContent: {
    flex: 1,
    paddingBottom: hp("2%"),
  },
  learnMore:{
    color: Colors.white
  },
  imageUp:{
    width: 28,
    height: 25,
    marginTop: 7,
    tintColor: Colors.blue,
  },
  headProfileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
    marginBottom: 7,
  },
  headImage: {
    padding: wp("3%"),
    marginTop: 5,
    width: wp("9%"),
    height: hp("5%"),
    resizeMode: "contain",
  },
  headingP: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
    flex: 1,
    marginLeft: wp("5%"),
  },
  l1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: wp("4%"),
    borderTopWidth: 0.3,
    borderColor: Colors.background1,
    paddingVertical: 20,
    borderTopRightRadius: 20,
  },
  l12: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: wp("4%"),
    borderTopWidth: 0.3,
    borderColor: Colors.background1,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  l1text: {
    color: Colors.white,
    fontSize: 18,
    marginLeft: 10,
  },
  l1textS: {
    color: Colors.white,
    fontSize: 18,
    marginLeft: 10,
  },
  trailingText: {
    color: Colors.lightblue,
    marginTop: 2,
    fontSize: 15,
    textAlign: "right",
  },
  solanaLogo: {
    width: 25,
    height: 25,
  },
  baseLogo: {
    width: 25,
    height: 25,
  },
  bottomText: {
    color: Colors.lightblue,
    marginHorizontal: wp("5%"),
    marginTop: 15,
  },
  LBtn: {
    backgroundColor: Colors.background,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: wp("5%"),
    borderRadius: 20,
    borderColor: Colors.blue,
    borderWidth: 1,
    marginTop: 15,
  },
});

export default BottomSheetProfile;
