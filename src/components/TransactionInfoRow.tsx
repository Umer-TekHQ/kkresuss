import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Images } from '../assets';

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
            <Text style={[styles.value, styles.noteValue, { color: '#FFF' }]}>
              {item.value}
            </Text>
          ) : (
            <View style={styles.valueRow}>
              {/* 👈 Agar Base row hai toh icon left mai */}
              {item.withBase && (
                <Image source={Images.basesmall} style={styles.baseIcon} />
              )}
              <Text style={styles.value}>{item.value}</Text>

              {/* 👈 Agar Copy wale rows hain toh right mai copy icon */}
              {item.withCopy && (
                <TouchableOpacity>
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
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
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
    color: '#ADD2FD',
    fontSize: 15,
  },
  value: {
    color: '#ADD2FD',
    fontSize: 15,
    fontWeight: '500',
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
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 4,
  },
  copyIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#ADD2FD',
    marginLeft: 6,
  },
});
