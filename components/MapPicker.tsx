import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import WebView from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';

const createHtml = (lat: number, lng: number) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>html, body, #map { height: 100%; margin: 0; }</style>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    const map = L.map('map').setView([${lat}, ${lng}], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    let marker = L.marker([${lat}, ${lng}]).addTo(map);

    map.on('click', function(e) {
      if (marker) map.removeLayer(marker);
      marker = L.marker(e.latlng).addTo(map);
      window.ReactNativeWebView.postMessage(JSON.stringify(e.latlng));
    });

    window.addEventListener("message", function(event) {
      const coords = JSON.parse(event.data);
      if (marker) map.removeLayer(marker);
      map.setView([coords.lat, coords.lng], 13);
      marker = L.marker([coords.lat, coords.lng]).addTo(map);
    });
  </script>
</body>
</html>
`;

const MapPicker = ({ onSelect }: { onSelect: (coords: { lat: number; lng: number }) => void }) => {
  const [initialPosition, setInitialPosition] = useState<{ lat: number; lng: number } | null>(null);
  const webviewRef = useRef<any>(null);

  const requestLocation = async (onFound: (pos: { lat: number; lng: number }) => void) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Location permission is required.');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (pos) => {
          onFound({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.warn(err);
          Alert.alert('Location Error', 'Unable to fetch your current location.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    requestLocation((pos) => setInitialPosition(pos));
  }, []);

  const handleLocateMe = () => {
    requestLocation((pos) => {
      if (webviewRef.current) {
        webviewRef.current.postMessage(JSON.stringify(pos));
      }
    });
  };

  if (!initialPosition) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: createHtml(initialPosition.lat, initialPosition.lng) }}
        onMessage={(event) => {
          const coords = JSON.parse(event.nativeEvent.data);
          onSelect(coords);
        }}
      />
      <TouchableOpacity style={styles.locateButton} onPress={handleLocateMe}>
        <Text style={styles.locateText}>📍 Locate Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapPicker;

const styles = StyleSheet.create({
  container: { flex: 1 },
  locateButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 5,
  },
  locateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
