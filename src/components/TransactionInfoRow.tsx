import { StyleSheet, Text, View } from 'react-native';
import React from 'react';


type Props={
  note?:string
}
const TransactionInfoRow = ({note}:Props) => {
  const data = [
    { label: 'Network', value: 'Base' },
    { label: 'Sent To', value: '0xa3...5hg1' },
    { label: 'Transaction ID', value: 'a32c...6dg4' },
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
          <Text style={[styles.value, item.isNote && styles.noteValue,item.isNote && { color: '#FFF' },]}>
            {item.value}
          </Text>
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
});