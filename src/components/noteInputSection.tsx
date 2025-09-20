import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setNote } from '../store/slices/noteSlice';
import { Colors } from '../theme/colors';

const NoteInputSection = () => {
  const note = useAppSelector(state => state.note.note);
  const dispatch = useAppDispatch();

  return (
    <>
      <Text style={styles.noteLabel}>
        Note to Self <Text style={styles.optionalText}>(Optional)</Text>
      </Text>
      <TextInput
        placeholder="What's it for?"
        placeholderTextColor="#ADD2FD"
        style={styles.input}
        value={note}
        onChangeText={(val) => dispatch(setNote(val))}
      />
    </>
  );
};

export default NoteInputSection;

const styles = StyleSheet.create({
  noteLabel: {
    color: Colors.white,
    fontSize: 14,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  optionalText: {
    color: Colors.lightblue,
  },
  input: {
    borderRadius: 10,
    color: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
});
