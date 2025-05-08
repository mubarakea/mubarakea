// src/screens/Sync/SyncScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

const SyncScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  const handleSync = async () => {
    setLoading(true);
    try {
      // TODO: replace with your real sync function
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

      const now = new Date().toLocaleString();
      setLastSync(now);
      Alert.alert('Sync Complete', `Last synced at ${now}`);
    } catch (err: any) {
      Alert.alert('Sync Failed', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/sync.png')}
        style={styles.icon}
      />
      <Text style={styles.title}>Sync Data</Text>
      <Text style={styles.subtitle}>
        {loading
          ? 'Syncing…'
          : lastSync
          ? `Last synced at ${lastSync}`
          : 'Never synced'}
      </Text>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSync}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sync Now</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SyncScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 96,
    height: 96,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#263159',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#263159',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
