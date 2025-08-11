import React, { ReactNode } from 'react';
import { View, Image, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../assets';

interface Props {
  children?: ReactNode;
  containerHeight?: number | `${number}%`;  
  containerWidth?: number | `${number}%`;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  showContent?: boolean;
  showLogo?: boolean;
  hideBottomImages?: boolean;
}

const OverlayBackground: React.FC<Props> = ({
  children,
  containerHeight = '100%',
  containerWidth = '100%',
  borderTopLeftRadius = 0,
  borderTopRightRadius = 0,
  showContent = true,
  showLogo = true,
  hideBottomImages = false,
}) => {
  const backgroundStyle: StyleProp<ViewStyle> = {
    height: containerHeight,
    width: containerWidth,
    borderTopLeftRadius,
    borderTopRightRadius,
    overflow: 'hidden',
  };

  return (
    <LinearGradient
      colors={['#031B7E', '#031B7E']}
      locations={[0, 1]}
      style={backgroundStyle}
    >
      {showContent && (
        <View style={styles.wrapper}>
          {showLogo && (
            <Image
              source={Images.logo}
              style={styles.logo}
              resizeMode="cover"
            />
          )}

          {!hideBottomImages && (
            <View style={styles.bottomContainer}>
              <Image
                source={Images.waves}
                style={styles.waves}
                resizeMode="stretch"
              />
              <Image
                source={Images.land1}
                style={styles.land1}
                resizeMode="contain"
              />
              <Image
                source={Images.land2}
                style={styles.land2}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      )}
      {children && <View style={styles.childrenContainer}>{children}</View>}
      <View/>
    </LinearGradient>
  );
};

export default OverlayBackground;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  childrenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'center',
    height: 90,
    marginTop: 30,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  waves: {
    width: '100%',
    height: 60,
  },
  land1: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    height: 155,
    width: 180,
    tintColor: '#161f6fff',
  },
  land2: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    height: 150,
    width: 280,
  },
});
