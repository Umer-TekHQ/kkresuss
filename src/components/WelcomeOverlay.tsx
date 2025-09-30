import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import OverlayBackground from './OverlayBackground';
import { Images } from '../assets/index';
import { Colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

interface Props {
  onClose: () => void;
}

const WelcomeOverlay: React.FC<Props> = ({ onClose }) => {
  const containerWidth = width * 0.9;
  const containerHeight = width * 1.38;
  const bgTopWidth = width * 0.89;
  const bgTopHeight = width * 0.7;
  const bgBottomWidth = width * 0.9;
  const bgBottomHeight = width * 0.68;

  return (
    <View style={styles.overlay}>
      <View
        style={[styles.container, { width: containerWidth, height: containerHeight }]}
      >
        <View
          style={[styles.backGroundTop, { width: bgTopWidth, height: bgTopHeight }]}
        >
          <OverlayBackground
            showContent
            hideBottomImages={false}
            showLogo={false}
            containerHeight={height * 0.36}
            containerWidth={bgTopWidth}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
          >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image source={Images.crossOverlay} />
            </TouchableOpacity>

            <Image source={Images.logo} style={styles.logo} resizeMode="contain" />

            <Text style={styles.title}>
              Start trading and{'\n'}earning now.{'\n'}Fund your wallet.
            </Text>
          </OverlayBackground>
        </View>

        <View
          style={[styles.backGroundBottom, { width: bgBottomWidth, height: bgBottomHeight }]}
        >
          <TouchableOpacity style={styles.primaryButton}>
            <Image source={Images.primary} style={styles.icons21} />
            <Text style={[styles.primaryText, styles.centeredText]}>
              Buy Crypto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Image source={Images.primary1} style={styles.icons} />
            <Text style={[styles.secondaryText1, styles.centeredText]}>
              Transfer Crypto into Kresus
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Image source={Images.primary2} style={styles.icons1} />
            <Text style={[styles.secondaryText, styles.centeredText]}>
              Connect Coinbase
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.laterText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeOverlay;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  container: {
    borderRadius: 24,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: Colors.background2,
    backgroundColor: Colors.background,
  },
  backGroundTop: {
    backgroundColor: Colors.background3,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  backGroundBottom: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 26,
    height: '100%',
    borderColor: Colors.background2,
    borderRightWidth: 1.5,
    borderLeftWidth: 1.5,
    borderBottomWidth: 2,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  logo: {
    height: hp('12%'),
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 25,
    marginBottom: 20,
    lineHeight: 36,
    fontFamily: 'PlayfairDisplay-Bold',
    letterSpacing: 1,
  },
  laterText: {
    color: Colors.white,
    marginTop: 10,
    fontSize: 13,
    textAlign: 'center',
  },
  icons: {
    width: 36,
    height: 26,
    marginRight: 10,
  },
  icons1: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  icons21: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 8,
    width: '100%',
    marginBottom: 10,
    marginTop: 15,
    position: 'relative',
  },
  primaryText: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '500',
  },
  secondaryButton: {
    flexDirection: 'row',
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.blue,
    position: 'relative',
  },
  secondaryText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '500',
  },
  secondaryText1: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '500',
  },
  centeredText: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
  },
});
