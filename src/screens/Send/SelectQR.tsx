import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import AssetsHeader from '../../components/AssetsHeader ';

const SelectQR = () => {
  return (
    <View style={styles.wrapper}>
  
      <View style={styles.headerContainer}>
        <AssetsHeader title="Scan QR Code" />
      </View>

     
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>Add a Base address to send.</Text>
        </View>

        <View style={styles.cameraBox}>
          <Camera
            style={styles.camera}
            cameraType={CameraType.Back}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectQR;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#01021D',
  },
  headerContainer: {
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textView: {
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    color: '#ADD2FD',
    textAlign: 'center',
    fontSize: 15,
  },
  cameraBox: {
    width: 343,
    height: 343,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#ADD2FD',
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
});