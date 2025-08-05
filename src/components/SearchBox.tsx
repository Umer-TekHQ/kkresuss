
import React from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Images } from '../assets';

interface SearchBoxProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onQrPress?: () => void;
  onClear?: () => void;
}

const SearchBox = ({
  value,
  onChangeText,
  placeholder = "Search",
  onQrPress,
  onClear,
}: SearchBoxProps) => {
  const showClearIcon = value.length > 0;

  return (
    <View style={styles.searchContainer}>
      <Image source={Images.search} style={styles.searchIcon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ADD2FD"
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={showClearIcon ? onClear : onQrPress}>
        <Image
          source={showClearIcon ? Images.cross : Images.qr}
          style={styles.rightIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#086DE1',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#ADD2FD',
  },
  rightIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
    resizeMode: 'contain',
    right:4,
  },
});
