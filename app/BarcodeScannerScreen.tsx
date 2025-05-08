import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
const BarcodeScannerScreen = ({ navigation }: any) => {
  const [scanned, setScanned] = useState(false);

  const handleBarcodeRead = (event: any) => {
    if (scanned) return;
    setScanned(true);
    const code = event.nativeEvent.codeStringValue;
    navigation.navigate('SalesEntry', {
      newItem: { name: `Item for ${code}`, price: 1.25 },
    });
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons
          name="arrow-back"
          size={28}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Camera view */}
      <Camera
        scanBarcode={true}
        onReadCode={handleBarcodeRead}
        showFrame={true}
        laserColor="red"
        frameColor="white"
        style={StyleSheet.absoluteFill}
      />

      {/* Feedback text */}
      {scanned && (
        <Text style={styles.scannedText}>Item scanned. Returning…</Text>
      )}
    </View>
  );
};

export default BarcodeScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20, // account for notch/status bar
    left: 20,
    zIndex: 10,
  },
  scannedText: {
    position: 'absolute',
    bottom: 40,
    textAlign: 'center',
    width: '100%',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
