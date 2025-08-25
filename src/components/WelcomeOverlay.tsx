import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Images } from '../assets/index';
import OverlayBackground from './OverlayBackgroung';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

interface Props {
  onClose: () => void;
}

const WelcomeOverlay: React.FC<Props> = ({ onClose }) => {

  const containerWidth = width * 0.9;
  const containerHeight = width * 1.35;
  const bgtopWidth = width * 0.89;
  const bgtopHeight = width * 0.7;
  const bgbottomWidth = width * 0.9;
  const bgbottomHeight = width * 0.68;

  return (
    <View style={styles.overlay}>
      <View style={[styles.container, { width: containerWidth, height: containerHeight }]}>
        <View style={[styles.bgtop, { width: bgtopWidth, height: bgtopHeight }]}>
          <OverlayBackground
            showContent
            hideBottomImages={false}
            showLogo={false}
            containerHeight={height * 0.36}
            containerWidth={bgtopWidth}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
          >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image source={Images.crossoverlay} />
            </TouchableOpacity>

            <Image source={Images.logo} style={styles.logo} resizeMode="contain" />

            <Text style={styles.title}>
              Start trading and{'\n'}earning now.{'\n'}Fund your wallet.
            </Text>
          </OverlayBackground>
        </View>
        
        <View style={[styles.bgbottom, { width: bgbottomWidth, height: bgbottomHeight }]}>
          <TouchableOpacity style={styles.primaryButton}>
            <Image source={Images.primary} style={styles.icons1} />
            <Text style={styles.primaryText}>Buy Crypto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Image source={Images.primary1} style={styles.icons} />
            <Text style={styles.secondaryText1}>Transfer Crypto into Kresus</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Image source={Images.primary2} style={styles.icons1} />
            <Text style={styles.secondaryText}>Connect Coinbase</Text>
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
    borderColor: "#080C4C",
    backgroundColor: "#01032C"
  },
  bgbottom:{
    backgroundColor:"#10132C",
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 26,
    height: '100%',
    borderColor: "#080C4C",
    borderRightWidth: 1.5,
    borderLeftWidth: 1.5,
    borderBottomWidth: 2
  },
  bgtop:{
    backgroundColor: "#131c91ff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  logo: {
    height: 90,
    marginBottom: 10,
    marginTop: 30,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    marginBottom: 20,
    lineHeight: 36,
    fontFamily: 'PlayfairDisplay-Bold', 
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignContent: 'center',
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 11,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  primaryText: {
    color: '#0A0E27',
    marginLeft: wp('16%'),
    fontSize: 15,
  },
  secondaryButton: {
    flexDirection: 'row',
    borderRadius: 32,
    paddingVertical: 10,
    paddingLeft: 11,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4898F3',
  },
  secondaryText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: wp('10%'),
  },
  secondaryText1: {
    color: '#fff',
    marginLeft: wp('3%'),
  },
  laterText: {
    color: 'white',
    marginTop: 10,
    fontSize: 15,
  },
  icons: {
    width: 36,
    height: 26,
    marginRight: 10,
  },
  icons1:{
    width: 26,
    height: 26,
    marginRight: 10,
  }
});