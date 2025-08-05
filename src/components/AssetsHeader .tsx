import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../assets'; 
import { ImageSourcePropType } from 'react-native';




interface HeaderProps {
  title: string;
  showRightIcons?: boolean;
   leftIcon?: ImageSourcePropType;
}

const AssetsHeader: React.FC<HeaderProps> = ({ title, showRightIcons = false ,leftIcon}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* <Image source={Images.backscreen} style={styles.icon} /> */}
        <Image source={leftIcon || Images.backscreen} style={styles.icon} />

      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {showRightIcons ? (
        <View style={styles.rightIcons}>
          <Image source={Images.bothsolanabase} style={styles.icon} />
          <Image source={Images.down} style={[styles.icon, { marginLeft: 8 }]} />
        </View>
      ) : (
        <View style={styles.rightIcons} />
      )}
    </View>
  );


};

export default AssetsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop:10,

  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  
  },
  icon: {
    left:5,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    right:5,
  },
});
