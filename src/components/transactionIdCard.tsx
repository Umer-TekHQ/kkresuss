import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { Images } from '../assets';
import { Colors } from '../theme/colors';

const TransactionIdCard = () => (
  <View style={styles.card}>
    <Text style={styles.label}>Transaction ID</Text>
    <View style={styles.row}>
      <Text style={styles.text}>a32c...6dg4</Text>
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString('a32c...6dg4');
          Toast.show({
            type: 'success',
            text1: 'Copied',
            text2: 'Transaction ID copied!',
            position: 'bottom',
            visibilityTime: 1500,
            autoHide: true,
          });
        }}
      >
        <Image source={Images.copy} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

export default TransactionIdCard;

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginTop: 10, flexDirection:'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: Colors.fieldBorder, paddingVertical: 16 },
  label: { color: Colors.lightblue, fontSize: 16, marginBottom: 5 },
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { color: Colors.lightblue },
  icon: { width: 18, height: 18, marginLeft: 8, tintColor: Colors.lightblue },
});
