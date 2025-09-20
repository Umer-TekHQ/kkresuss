import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';

import { Images } from '../../assets';
import BottomSheetProfile from '../../components/BottomSheetProfile';
import ProfileCard from '../../components/ProfileCards';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { Colors } from '../../theme/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type WalletCard = {
  icon: any;
  title: string;
  address: string;
  background: any;
  copyValue?: string;
};

export default function CardReceiveScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  const route = useRoute();
  const { card } = route.params as { card: WalletCard };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.back}
      >
        <Image
          source={Images.backButton}
          style={styles.backArrow}
        />
      </TouchableOpacity>

      <Text style={styles.head1}>Receive on Solana</Text>
    </View>

      <View style={styles.card}>
        <ProfileCard {...card} />
      </View>

      <View style={styles.qr}>
        <Image
          source={Images.qr}
          style={{
            width: screenWidth * 0.55,
            height: screenWidth * 0.55,
            resizeMode: 'contain'
          }}
        />
      </View>

      <BottomSheetProfile navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.black, paddingTop: 10 },
  head1: { color: Colors.white, fontSize: 16, textAlign: 'center'},
  backArrow: { 
     width: screenWidth * 0.08,
     height: screenWidth * 0.08 
  },
  header:{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingVertical: 10
    },
  back:{ position: 'absolute', left: 15},
  card: { display: 'flex', alignItems: 'center', marginTop: screenHeight * 0.04  },
  qr: { alignItems: 'center', marginTop: screenHeight * 0.15  },

});



