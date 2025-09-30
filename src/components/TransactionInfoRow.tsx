import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import { Images } from '../assets';
import { Colors } from '../theme/colors';


type Props = {
  note?: string;
};
const TransactionInfoRow = ({ note }: Props) => {
  const data = [
    { label: 'Network', value: 'Base', withBase: true },
    { label: 'Sent To', value: '0xa3...5hg1', withCopy: true },
    { label: 'Transaction ID', value: 'a32c...6dg4', withCopy: true },
    { label: 'Note to Self', value: note ?? '', isNote: true },
  ];
  const handleCopy = (value: string, label: string) => {
    Clipboard.setString(value);
    Toast.show({
      type: 'success',
      text1: 'Copied',
      text2: `${label} copied to clipboard!`,
      position: 'bottom',
      visibilityTime: 1500,
      autoHide: true,
    });
  };
  return (
    <View>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.row,
            item.isNote && styles.noteRow,
            index === data.length - 1 && styles.lastRow,
          ]}
        >
          <Text style={styles.label}>{item.label}</Text>
          {item.isNote ? (
            <Text style={styles.value}>
              {item.value}
            </Text>
          ) : (
            <View style={styles.valueRow}>
              {item.withBase && (
                <Image source={Images.baseSmall} style={styles.baseIcon} />
              )}
              <Text style={styles.value}>{item.value}</Text>
              {item.withCopy && (
                <TouchableOpacity
                  onPress={() => handleCopy(item.value, item.label)}
                >
                  <Image source={Images.copy} style={styles.copyIcon} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};
export default TransactionInfoRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background1,
  },
  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  noteRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    color: Colors.lightblue,
    fontSize: 17,
  },
  value: {
    color: Colors.lightblue,
    fontSize: 17,
    fontWeight: '500',
    marginTop: 4,
  },
  noteValue: {
    marginTop: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  baseIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 4,
  },
  copyIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: Colors.lightblue,
    marginLeft: 6,
  },
});
